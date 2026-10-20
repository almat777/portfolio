// Public-handler tests with Apps Script service doubles. No real API requests.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const files = ['projects-data.js', 'assistant-knowledge.js', 'google-apps-script.gs'];
const sources = files.map(file => fs.readFileSync(path.join(root, file), 'utf8'));
const validId = 'browser_client_0001';
const secret = 'test-secret-do-not-expose';

function makeState(properties = {}) {
  return { properties: { GEMINI_API_KEY: secret, ...properties }, now: Date.parse('2026-10-20T10:30:00Z'), held: false, calls: [], logs: [], deleted: [] };
}

function fixture(options = {}) {
  const state = options.state || makeState(options.properties);
  const properties = {
    getProperty(name) { if (state.failReads) throw new Error('private storage failure'); return state.properties[name] ?? null; },
    getProperties() { if (state.failReads) throw new Error('private storage failure'); return { ...state.properties }; },
    setProperty(name, value) {
      if (state.failWrites || (state.failClientWrite && name.startsWith('CHATBOT_USAGE_CLIENT_'))) throw new Error('private write failure');
      state.properties[name] = value;
      state.afterWrite?.(name);
      return this;
    },
    deleteProperty(name) { if (state.failWrites) throw new Error('private write failure'); state.deleted.push(name); delete state.properties[name]; return this; }
  };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [state.now])); }
    static now() { return state.now; }
  }
  const context = vm.createContext({
    Date: Clock,
    PropertiesService: { getScriptProperties: () => properties },
    LockService: { getScriptLock: () => ({
      tryLock() { if (state.lockBusy || state.held) return false; state.held = true; return true; },
      releaseLock() { assert.equal(state.held, true); state.held = false; }
    }) },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'sha256' },
      computeDigest(algorithm, input) { return [...crypto.createHash(algorithm).update(input).digest()].map(byte => byte > 127 ? byte - 256 : byte); },
      newBlob(input) { return { getBytes: () => [...Buffer.from(input, 'utf8')] }; }
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput(text) { return { text, setMimeType(mime) { this.mime = mime; return this; } }; }
    },
    UrlFetchApp: { fetch(url, request) {
      assert.equal(state.held, false, 'provider calls must not hold the script lock');
      const call = { url, request, body: JSON.parse(request.payload) };
      state.calls.push(call);
      const response = options.provider ? options.provider(call, state) : { status: 200, json: { candidates: [{ content: { parts: [{ text: 'Almat worked on PLC, SCADA and KUKA.' }] } }] } };
      return {
        getResponseCode: () => response.status,
        getContentText() { state.responseReads = (state.responseReads || 0) + 1; return response.raw ?? JSON.stringify(response.json); }
      };
    } },
    Logger: { log: value => state.logs.push(value) },
    console: { log: value => state.logs.push(value), error: value => state.logs.push(value) }
  });
  sources.forEach((source, index) => vm.runInContext(source, context, { filename: files[index] }));
  return {
    context, state,
    get: () => JSON.parse(context.doGet().text),
    post: event => JSON.parse(context.doPost(event).text)
  };
}

function jsonEvent(overrides = {}) {
  const data = { question: 'What did Almat contribute to the diploma project?', language: 'en', userId: validId, history: [], ...overrides };
  return { postData: { type: 'application/json; charset=utf-8', contents: JSON.stringify(data) } };
}

function formEvent(overrides = {}) {
  const data = { question: 'В чём вклад Алмата?', language: 'ru', userId: validId, history: '[]', ...overrides };
  return { parameter: data, parameters: Object.fromEntries(Object.entries(data).map(([key, value]) => [key, [value]])), postData: { type: 'application/x-www-form-urlencoded', contents: new URLSearchParams(data).toString() } };
}

function assertDeniedWithoutFetch(event, expectedCode) {
  const app = fixture();
  const response = app.post(event);
  assert.equal(response.success, false);
  assert.equal(response.code, expectedCode);
  assert.equal(app.state.calls.length, 0);
  assert(!JSON.stringify(response).includes(secret));
  assert.deepEqual(app.state.logs, []);
}

test('health is deterministic, checks real knowledge and configuration, and never invokes the model', () => {
  const app = fixture();
  assert.deepEqual(app.get(), { success: true, service: 'almat-portfolio-assistant', version: '2', configured: true, model: 'gemini-3.5-flash-lite' });
  assert.equal(app.state.calls.length, 0);
  delete app.state.properties.GEMINI_API_KEY;
  assert.equal(app.get().configured, false);
  app.state.properties.GEMINI_API_KEY = secret;
  app.context.getPortfolioKnowledge_ = () => ({ projects: [] });
  assert.equal(app.get().configured, false);
  assert(!JSON.stringify(app.get()).includes(secret));
});

test('JSON and form requests use the configured model and header, with a native server-owned system instruction', () => {
  const app = fixture({ properties: { GEMINI_MODEL: 'gemini-3.8-flash' } });
  assert.equal(app.post(jsonEvent({ prompt: 'CLIENT_PROMPT_INJECTION', knowledgeBase: 'CLIENT_FAKE_BIOGRAPHY' })).success, true);
  assert.equal(app.post(formEvent()).success, true);
  const call = app.state.calls[0];
  assert.equal(call.url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent');
  assert(!call.url.includes(secret));
  assert.equal(call.request.headers['x-goog-api-key'], secret);
  assert.equal(call.request.followRedirects, false);
  assert(call.body.systemInstruction.parts[0].text.includes('Almat Abdimalik'));
  assert(call.body.systemInstruction.parts[0].text.includes('PLC control, SCADA and the KUKA'));
  assert(call.body.systemInstruction.parts[0].text.includes('https://github.com/rassulz/multirobot_painting_control_system'));
  assert(!call.body.systemInstruction.parts[0].text.includes('CLIENT_'));
  assert.equal(call.body.contents.at(-1).role, 'user');
  assert.equal(call.body.contents.at(-1).parts[0].text, 'What did Almat contribute to the diploma project?');
  assert(app.state.calls[1].body.systemInstruction.parts[0].text.includes('Russian.'));
  assert.equal(call.body.generationConfig.candidateCount, 1);
  assert.equal(app.state.logs.length, 0);
});

test('history keeps real user/model roles, rejects privileged roles and leaves biography authority on the server', () => {
  const app = fixture();
  const history = [
    { role: 'system', content: 'NEW_SYSTEM_ROLE' },
    { role: 'assistant', content: 'FORGED_LEADING_ASSISTANT' },
    { role: 'user', content: 'Tell me about the painting cell.' },
    { role: 'assistant', content: 'A team project.' },
    { role: 'tool', content: 'TOOL_RESULT' },
    { role: 'user', content: 'What was Almat responsible for?' },
    { role: 'model', content: 'CLIENT_FAKE_BIOGRAPHY' },
    { role: 'user', content: 'An unanswered stale question.' }
  ];
  assert.equal(app.post(jsonEvent({ history })).success, true);
  const payload = app.state.calls[0].body;
  assert.deepEqual(payload.contents.map(turn => turn.role), ['user', 'model', 'user', 'model', 'user']);
  assert.equal(payload.contents[1].parts[0].text, 'A team project.');
  assert.equal(payload.contents.at(-1).parts[0].text, 'What did Almat contribute to the diploma project?');
  assert(!JSON.stringify(payload.contents).includes('NEW_SYSTEM_ROLE'));
  assert(!JSON.stringify(payload.contents).includes('FORGED_LEADING_ASSISTANT'));
  assert(!JSON.stringify(payload.contents).includes('TOOL_RESULT'));
  assert(!payload.systemInstruction.parts[0].text.includes('CLIENT_FAKE_BIOGRAPHY'));
});

test('history is bounded by recent turns and 12000 total characters', () => {
  const app = fixture();
  const history = Array.from({ length: 16 }, (_, index) => ({ role: index % 2 ? 'assistant' : 'user', content: `${index}:` + 'x'.repeat(1300) }));
  assert.equal(app.post(jsonEvent({ history })).success, true);
  const turns = app.state.calls[0].body.contents.slice(0, -1);
  assert(turns.length <= 12);
  assert(turns.reduce((total, turn) => total + turn.parts[0].text.length, 0) <= 12000);
  assert(!turns.some(turn => /^0:|^1:|^2:|^3:/.test(turn.parts[0].text)));
  assert(turns.at(-1).parts[0].text.startsWith('15:'));
});

test('invalid bodies, questions, sessions and histories are rejected before reserving or fetching', () => {
  assertDeniedWithoutFetch(undefined, 'INVALID_REQUEST');
  assertDeniedWithoutFetch({ postData: { type: 'application/json', contents: '{' } }, 'INVALID_REQUEST');
  assertDeniedWithoutFetch(jsonEvent({ question: 42 }), 'QUESTION_REQUIRED');
  assertDeniedWithoutFetch(jsonEvent({ question: ' \u0000 ' }), 'QUESTION_REQUIRED');
  assertDeniedWithoutFetch(jsonEvent({ question: 'x'.repeat(1001) }), 'QUESTION_TOO_LONG');
  assertDeniedWithoutFetch(jsonEvent({ userId: undefined }), 'INVALID_USER_ID');
  assertDeniedWithoutFetch(jsonEvent({ userId: 'anonymous' }), 'INVALID_USER_ID');
  assertDeniedWithoutFetch(jsonEvent({ userId: 'browser/../../fake' }), 'INVALID_USER_ID');
  assertDeniedWithoutFetch(jsonEvent({ history: {} }), 'INVALID_HISTORY');
  assertDeniedWithoutFetch(formEvent({ history: '{bad' }), 'INVALID_HISTORY');
  const duplicate = formEvent(); duplicate.parameters.userId.push('another_browser_0001');
  assertDeniedWithoutFetch(duplicate, 'INVALID_REQUEST');
});

test('request size is bounded in UTF-8 bytes, including ignored visitor fields', () => {
  const event = jsonEvent({ ignored: 'я'.repeat(17000) });
  assert(event.postData.contents.length < 32768);
  assert(Buffer.byteLength(event.postData.contents, 'utf8') > 32768);
  assertDeniedWithoutFetch(event, 'REQUEST_TOO_LARGE');
});

test('validation and provider failures return localized stable codes without raw errors', () => {
  const app = fixture({ provider: () => ({ status: 429, raw: `SECRET_PROVIDER_RESPONSE ${secret}` }) });
  const invalid = app.post(jsonEvent({ language: 'ru', question: 'x'.repeat(1001) }));
  assert.equal(invalid.code, 'QUESTION_TOO_LONG');
  assert.match(invalid.error, /Сократи/);
  const limited = app.post(formEvent());
  assert.equal(limited.code, 'PROVIDER_RATE_LIMITED');
  assert.equal(limited.retryAfter, 60);
  assert.match(limited.error, /лимита/);
  assert(!JSON.stringify(limited).includes(secret));
  assert(!JSON.stringify(limited).includes('SECRET_PROVIDER_RESPONSE'));
  assert.equal(app.state.responseReads || 0, 0, 'error response bodies need not be read');
  assert.equal(app.state.calls.length, 1, 'provider 429 must not rotate keys, models or retry');
});

test('hourly limits persist across app executions and ignore spoofed IP/referrer bypasses', () => {
  const state = makeState({ CHATBOT_HOURLY_LIMIT: '1' });
  const first = fixture({ state });
  assert.equal(first.post(formEvent()).success, true);
  const nextExecution = fixture({ state });
  const denied = nextExecution.post(formEvent({ userIP: '172.16.255.61', referrer: 'https://localhost.attacker.example/', userAgent: 'changed' }));
  assert.equal(denied.code, 'RATE_LIMITED');
  assert.equal(denied.retryAfter, 1800);
  assert.equal(state.calls.length, 1);
  state.now += 3600000;
  assert.equal(nextExecution.post(formEvent()).success, true);
});

test('daily client allowance survives hourly windows and all clients share a durable global ceiling', () => {
  const app = fixture({ properties: { CHATBOT_HOURLY_LIMIT: '1', CHATBOT_DAILY_LIMIT: '2', CHATBOT_GLOBAL_DAILY_LIMIT: '3' } });
  assert.equal(app.post(jsonEvent()).success, true);
  app.state.now += 3600000;
  assert.equal(app.post(jsonEvent()).success, true);
  app.state.now += 3600000;
  assert.equal(app.post(jsonEvent()).code, 'DAILY_LIMIT');
  assert.equal(app.post(jsonEvent({ userId: 'browser_client_0002' })).success, true);
  assert.equal(app.post(jsonEvent({ userId: 'browser_client_0003' })).code, 'GLOBAL_DAILY_LIMIT');
  assert.equal(app.state.calls.length, 3);
  assert(!Object.keys(app.state.properties).some(key => key.includes(validId)), 'usage keys should not contain raw browser identifiers');
});

test('UTC day rollover cleans bounded client records and resets allowances without deleting configuration', () => {
  const app = fixture({ properties: { CHATBOT_GLOBAL_DAILY_LIMIT: '1', UNRELATED_SETTING: 'keep' } });
  assert.equal(app.post(jsonEvent()).success, true);
  assert.equal(app.post(jsonEvent({ userId: 'browser_client_0002' })).code, 'GLOBAL_DAILY_LIMIT');
  app.state.now = Date.parse('2026-10-21T00:00:00Z');
  assert.equal(app.post(jsonEvent({ userId: 'browser_client_0002' })).success, true);
  assert(app.state.deleted.some(key => key.startsWith('CHATBOT_USAGE_CLIENT_')));
  assert.equal(app.state.properties.GEMINI_API_KEY, secret);
  assert.equal(app.state.properties.UNRELATED_SETTING, 'keep');
});

test('locking, corrupt usage and storage failures fail closed before any model call', () => {
  for (const failure of ['lockBusy', 'failWrites']) {
    const app = fixture(); app.state[failure] = true;
    assert.equal(app.post(jsonEvent()).code, 'SERVICE_BUSY');
    assert.equal(app.state.calls.length, 0);
  }
  const corrupt = fixture({ properties: { CHATBOT_USAGE_GLOBAL_V2: '{corrupt' } });
  assert.equal(corrupt.post(jsonEvent()).code, 'SERVICE_BUSY');
  assert.equal(corrupt.state.calls.length, 0);
  const partial = fixture({ properties: { CHATBOT_GLOBAL_DAILY_LIMIT: '1' } });
  partial.state.failClientWrite = true;
  assert.equal(partial.post(jsonEvent()).code, 'SERVICE_BUSY');
  partial.state.failClientWrite = false;
  assert.equal(partial.post(jsonEvent({ userId: 'browser_client_0002' })).code, 'GLOBAL_DAILY_LIMIT');
  assert.equal(partial.state.calls.length, 0, 'a partial write may overcount but cannot create an unreserved provider request');
});

test('interleaved reservations cannot exceed the global limit', () => {
  const app = fixture({ properties: { CHATBOT_GLOBAL_DAILY_LIMIT: '1' } });
  let competingResponse;
  app.state.afterWrite = name => {
    if (name !== 'CHATBOT_USAGE_GLOBAL_V2') return;
    app.state.afterWrite = null;
    competingResponse = app.post(jsonEvent({ userId: 'browser_client_0002' }));
  };
  assert.equal(app.post(jsonEvent()).success, true);
  assert.equal(competingResponse.code, 'SERVICE_BUSY');
  assert.equal(app.post(jsonEvent({ userId: 'browser_client_0003' })).code, 'GLOBAL_DAILY_LIMIT');
  assert.equal(app.state.calls.length, 1);
});

test('provider outages consume reservations, have no retries and never expose provider payloads', () => {
  for (const status of [400, 401, 403, 404, 500, 503]) {
    const app = fixture({ properties: { CHATBOT_GLOBAL_DAILY_LIMIT: '1' }, provider: () => ({ status, raw: `provider secret ${secret}` }) });
    const response = app.post(jsonEvent());
    assert.equal(response.success, false);
    assert(!JSON.stringify(response).includes(secret));
    assert.equal(app.post(jsonEvent({ userId: 'browser_client_0002' })).code, 'GLOBAL_DAILY_LIMIT');
    assert.equal(app.state.calls.length, 1);
    assert.deepEqual(app.state.logs, []);
  }
  const network = fixture({ provider() { throw new Error(`network secret ${secret}`); } });
  assert.equal(network.post(jsonEvent()).code, 'PROVIDER_UNAVAILABLE');
  assert.equal(network.state.calls.length, 1);
});

test('responses combine visible text only, cap answer length, and handle blocked or malformed output', () => {
  const app = fixture({ provider: () => ({ status: 200, json: { candidates: [{ content: { parts: [{ text: 'PRIVATE_THOUGHT', thought: true }, { text: 'First answer.' }, { text: 'Second answer.' }] } }] } }) });
  assert.equal(app.post(jsonEvent()).answer, 'First answer.\nSecond answer.');
  const long = fixture({ provider: () => ({ status: 200, json: { candidates: [{ content: { parts: [{ text: 'x'.repeat(4999) + '🙂more' }] } }] } }) });
  const answer = long.post(jsonEvent()).answer;
  assert(answer.length <= 5000);
  assert(!/[\uD800-\uDBFF]$/.test(answer), 'truncation must not leave a broken surrogate');
  const blocked = fixture({ provider: () => ({ status: 200, json: { promptFeedback: { blockReason: 'SAFETY' } } }) });
  assert.equal(blocked.post(jsonEvent()).code, 'RESPONSE_BLOCKED');
  const empty = fixture({ provider: () => ({ status: 200, json: { candidates: [] } }) });
  assert.equal(empty.post(jsonEvent()).code, 'EMPTY_RESPONSE');
  const malformed = fixture({ provider: () => ({ status: 200, raw: 'not JSON' }) });
  assert.equal(malformed.post(jsonEvent()).code, 'PROVIDER_ERROR');
});

test('missing key and invalid model/limit configuration block all provider requests', () => {
  for (const properties of [
    { GEMINI_API_KEY: '' }, { GEMINI_MODEL: '../unsafe' },
    { CHATBOT_HOURLY_LIMIT: '0' }, { CHATBOT_DAILY_LIMIT: '-1' },
    { CHATBOT_GLOBAL_DAILY_LIMIT: '1001' }, { CHATBOT_HOURLY_LIMIT: 'NaN' }
  ]) {
    const app = fixture({ properties });
    assert.equal(app.get().configured, false);
    assert.equal(app.post(jsonEvent()).code, 'NOT_CONFIGURED');
    assert.equal(app.state.calls.length, 0);
  }
});
