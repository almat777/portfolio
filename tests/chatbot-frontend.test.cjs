const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = name => fs.readFileSync(path.join(root, name), 'utf8');
const endpoint = 'https://script.google.com/macros/s/OWN_TEST_DEPLOYMENT/exec';

// A deliberately small DOM fake exercises production event handlers without a browser.
class Element {
    constructor(tag, owner) {
        this.tagName = tag.toUpperCase(); this.owner = owner; this.children = [];
        this.attributes = {}; this.dataset = {}; this.listeners = new Map();
        this.value = ''; this.hidden = false; this.disabled = false; this._text = '';
    }
    set textContent(value) { this._text = String(value); this.children = []; }
    get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
    set innerHTML(_) { throw new Error('Model or visitor HTML must never be injected.'); }
    append(...nodes) { nodes.forEach(node => this.appendChild(node)); }
    appendChild(node) { node.parent = this; this.children.push(node); return node; }
    replaceChildren(...nodes) { this.children.forEach(node => { node.parent = null; }); this.children = []; this._text = ''; this.append(...nodes); }
    get firstElementChild() { return this.children[0] || null; }
    get isConnected() { return Boolean(this.parent && (this.parent === this.owner.body || this.parent.isConnected)); }
    remove() { if (this.parent) this.parent.children = this.parent.children.filter(child => child !== this); this.parent = null; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return name === 'href' ? this.href || null : this.attributes[name] || null; }
    addEventListener(type, handler) { const list = this.listeners.get(type) || []; list.push(handler); this.listeners.set(type, list); }
    dispatch(type, extra = {}) {
        const event = { type, target: this, preventDefault() { this.defaultPrevented = true; }, ...extra };
        for (const handler of this.listeners.get(type) || []) handler(event);
        return event;
    }
    querySelector(selector) { return this.owner.find(this, selector)[0] || null; }
    focus() { this.owner.activeElement = this; }
}

function makeDocument(language) {
    const document = {
        documentElement: { lang: language }, nodes: {}, listeners: new Map(),
        createElement(tag) { return new Element(tag, this); },
        createTextNode(text) { const node = new Element('#text', this); node.textContent = text; return node; },
        getElementById(id) { return this.nodes[id] || null; },
        find(parent, selector) {
            const result = [];
            const visit = node => {
                for (const child of node.children) {
                    if (selector.startsWith('.') && (child.className || '').split(' ').includes(selector.slice(1))) result.push(child);
                    if (selector === '[data-chat-question]' && child.dataset.chatQuestion) result.push(child);
                    if (selector === 'a' && child.tagName === 'A') result.push(child);
                    visit(child);
                }
            };
            visit(parent); return result;
        },
        querySelectorAll(selector) { return this.find(this.body, selector); },
        addEventListener: Element.prototype.addEventListener,
        dispatch: Element.prototype.dispatch
    };
    document.body = new Element('body', document);
    for (const suffix of ['Toggle', 'Container', 'Messages', 'Form', 'Input', 'Send', 'Stop', 'Clear', 'Retry', 'Status', 'Mode', 'Count']) {
        const node = document.createElement(suffix === 'Input' ? 'textarea' : 'div');
        document.nodes['chatbot' + suffix] = node; document.body.appendChild(node);
    }
    document.nodes.chatbotContainer.hidden = true;
    const icon = document.createElement('span'); icon.className = 'toggle-icon'; document.nodes.chatbotToggle.appendChild(icon);
    for (const name of ['diploma', 'contribution', 'skills', 'contact']) {
        const button = document.createElement('button'); button.dataset.chatQuestion = name; document.body.appendChild(button);
    }
    return document;
}

async function settle() { for (let i = 0; i < 15; i++) await Promise.resolve(); }

function harness({ config = {}, language = 'en', fetchImpl } = {}) {
    const document = makeDocument(language);
    const timers = new Map(); let timerId = 0;
    const calls = [];
    const storage = new Map();
    const environment = {
        document, URLSearchParams, AbortController, console,
        setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
        clearTimeout(id) { timers.delete(id); },
        localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
        window: { PORTFOLIO_ASSISTANT_CONFIG: config, crypto: { randomUUID: () => '00000000-0000-4000-8000-000000000000' } },
        fetch(url, options) { calls.push({ url, options }); return fetchImpl ? fetchImpl(url, options) : Promise.reject(new Error('Unexpected network request')); }
    };
    Object.defineProperty(environment, 'navigator', { get() { throw new Error('Do not collect user agent or visitor fingerprints.'); } });
    const context = vm.createContext(environment);
    vm.runInContext(source('projects-data.js') + '\n' + source('assistant-knowledge.js') + '\n' + source('chatbot.js'), context, { timeout: 1000 });
    const nodes = document.nodes;
    return {
        document, nodes, calls, timers,
        async submit(question) { nodes.chatbotInput.value = question; nodes.chatbotInput.dispatch('input'); nodes.chatbotForm.dispatch('submit'); await settle(); },
        async click(id) { nodes[id].dispatch('click'); await settle(); },
        messages() { return nodes.chatbotMessages.children; },
        kind(kind) { return nodes.chatbotMessages.children.filter(node => node.className === 'chat-message chat-message-' + kind); },
        async expireTimers() { for (const callback of [...timers.values()]) callback(); await settle(); }
    };
}

const ok = answer => ({ ok: true, json: async () => ({ success: true, answer }) });

test('Unconfigured or unrelated endpoints use the labelled local portfolio guide without network', async () => {
    for (const config of [{}, { endpoint: 'https://attacker.example/collect' }, { endpoint: 'https://script.google.com/macros/s/test/dev' }]) {
        const h = harness({ config });
        assert.equal(h.nodes.chatbotMode.textContent, 'Portfolio guide');
        await h.submit('What was Almat responsible for in the graduation project?');
        assert.equal(h.calls.length, 0);
        const answer = h.kind('guide').at(-1).textContent;
        assert.match(answer, /Almat.*PLC.*SCADA.*KUKA/s);
        assert.match(answer, /team/i);
        assert.doesNotMatch(answer, /Arsen|Skyshmallow|sole developer/i);
        assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'false');
    }
});

test('Configured AI posts only question, language, bounded history and a pseudonymous ID to the owner endpoint', async () => {
    const h = harness({ config: { endpoint, apiKey: 'DO_NOT_SEND_THIS_KEY' }, fetchImpl: async () => ok('Almat worked on PLC, SCADA and KUKA in the team project.') });
    await h.submit('What was Almat responsible for?');
    assert.equal(h.calls.length, 1);
    const { url, options } = h.calls[0];
    assert.equal(url, endpoint);
    assert.equal(options.method, 'POST');
    assert.equal(options.credentials, 'omit');
    assert.equal(options.referrerPolicy, 'no-referrer');
    assert.equal(options.redirect, 'follow');
    assert.equal(options.headers, undefined, 'Custom headers would trigger a preflight.');
    assert.deepEqual([...options.body.keys()].sort(), ['history', 'language', 'question', 'userId']);
    assert.equal(options.body.get('language'), 'en');
    assert.equal(options.body.get('history'), '[]');
    assert.match(options.body.get('userId'), /^visitor_[\w-]+$/);
    assert.doesNotMatch(options.body.toString(), /DO_NOT_SEND|api.?key|user.?agent|referrer|ipAddress/i);
    assert.equal(h.kind('ai').length, 2, 'The welcome and successful answer use the AI label.');
    assert.equal(h.nodes.chatbotMode.textContent, 'AI assistant');
    await h.submit('Which technologies did it use?');
    assert.deepEqual(JSON.parse(h.calls[1].options.body.get('history')), [
        { role: 'user', content: 'What was Almat responsible for?' },
        { role: 'assistant', content: 'Almat worked on PLC, SCADA and KUKA in the team project.' }
    ]);
    assert.equal(h.timers.size, 0);
});

test('Failed, malformed, HTML, empty and limited responses show a service notice and guide fallback', async t => {
    const cases = [
        ['network rejection', async () => { throw new Error('network'); }, /temporarily unavailable/i],
        ['HTTP rejection', async () => ({ ok: false }), /temporarily unavailable/i],
        ['HTML instead of JSON', async () => ({ ok: true, json: async () => { throw new SyntaxError('<html>'); } }), /temporarily unavailable/i],
        ['malformed object', async () => ({ ok: true, json: async () => ({ answer: 'unexpected' }) }), /temporarily unavailable/i],
        ['empty answer', async () => ok('   '), /temporarily unavailable/i],
        ['oversized answer', async () => ok('x'.repeat(6001)), /temporarily unavailable/i],
        ['rate limit', async () => ({ ok: true, json: async () => ({ success: false, code: 'RATE_LIMITED' }) }), /limit.*reached/i],
        ['unconfigured server', async () => ({ ok: true, json: async () => ({ success: false, code: 'NOT_CONFIGURED' }) }), /not available yet/i]
    ];
    for (const [name, fetchImpl, notice] of cases) await t.test(name, async () => {
        const h = harness({ config: { endpoint }, fetchImpl });
        await h.submit('Tell me about the graduation project');
        assert.equal(h.kind('notice').length, 1);
        assert.match(h.kind('notice')[0].textContent, notice);
        assert.match(h.kind('guide').at(-1).textContent, /KUKA/);
        assert.equal(h.nodes.chatbotMode.dataset.mode, 'guide');
        assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'false');
        assert.equal(h.nodes.chatbotStop.hidden, true);
        assert.equal(h.nodes.chatbotRetry.hidden, false);
        assert.equal(h.timers.size, 0);
    });
});

test('Timed out requests abort and produce an explicitly labelled guide answer', async () => {
    const h = harness({ config: { endpoint, timeoutMs: 5000 }, fetchImpl: (_, options) => new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(new Error('aborted')))) });
    await h.submit('What technologies does Almat use?');
    assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'true');
    await h.expireTimers();
    assert.match(h.kind('notice')[0].textContent, /too long/i);
    assert.equal(h.kind('guide').length, 1);
    assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'false');
    assert.equal(h.nodes.chatbotStop.hidden, true);
});

test('Cancel and clear ignore late responses and a fresh request can complete', async t => {
    for (const action of ['chatbotStop', 'chatbotClear']) await t.test(action, async () => {
        let resolveOld;
        let count = 0;
        const h = harness({ config: { endpoint }, fetchImpl: () => ++count === 1 ? new Promise(resolve => { resolveOld = resolve; }) : Promise.resolve(ok('Fresh answer')) });
        await h.submit('First question');
        assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'true');
        await h.click(action);
        assert.equal(h.calls[0].options.signal.aborted, true);
        assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'false');
        await h.submit('New question');
        resolveOld(ok('STALE ANSWER MUST NOT APPEAR'));
        await settle();
        assert.doesNotMatch(h.nodes.chatbotMessages.textContent, /STALE ANSWER/);
        assert.match(h.nodes.chatbotMessages.textContent, /Fresh answer/);
        assert.equal(h.nodes.chatbotForm.getAttribute('aria-busy'), 'false');
        assert.equal(h.nodes.chatbotStop.hidden, true);
        assert.equal(h.timers.size, 0);
        if (action === 'chatbotClear') assert.equal(h.kind('you').length, 1);
    });
});

test('Language changes preserve a draft, translate labels and submit Russian text in Russian', async () => {
    const h = harness({ config: { endpoint }, fetchImpl: async () => ok('Алмат занимался PLC, SCADA и KUKA.') });
    h.nodes.chatbotInput.value = 'Мой незавершённый вопрос';
    h.nodes.chatbotInput.dispatch('input');
    h.document.dispatch('portfolio:languagechange', { detail: { language: 'ru' } });
    assert.equal(h.nodes.chatbotInput.value, 'Мой незавершённый вопрос');
    assert.equal(h.nodes.chatbotMode.textContent, 'ИИ-помощник');
    assert.match(h.messages()[0].textContent, /помощник.*Алмата/);
    await h.submit('За что Алмат отвечал в дипломном проекте?');
    assert.equal(h.calls[0].options.body.get('language'), 'ru');
    assert.equal(h.kind('ai').at(-1).children[1].lang, 'ru');
    h.document.dispatch('portfolio:languagechange', { detail: { language: 'en' } });
    assert.equal(h.kind('ai').at(-1).children[0].textContent, 'AI assistant');
    assert.equal(h.kind('ai').at(-1).children[1].lang, 'ru', 'Existing answer language remains accurate.');
    assert.equal(h.nodes.chatbotInput.tagName, 'TEXTAREA');
});

test('Visitor and model markup stay text; only known source URLs become safe links', async () => {
    const answer = '<img src=x onerror=alert(1)> **PLC** [bad](javascript:alert(1)) [unknown](https://attacker.example) [GitHub](https://github.com/almat777) https://github.com/almat777';
    const h = harness({ config: { endpoint }, fetchImpl: async () => ok(answer) });
    await h.submit('<script>alert(1)</script>');
    const text = h.kind('ai').at(-1).children[1];
    assert.match(text.textContent, /<img src=x onerror=alert\(1\)>/);
    assert.match(h.kind('you')[0].textContent, /<script>alert\(1\)<\/script>/);
    const links = h.document.find(text, 'a');
    assert.equal(links.length, 2);
    for (const link of links) {
        assert.equal(link.href, 'https://github.com/almat777');
        assert.equal(link.target, '_blank');
        assert.equal(link.rel, 'noopener noreferrer');
    }
    const tags = [];
    const walk = node => { tags.push(node.tagName); node.children.forEach(walk); }; walk(text);
    assert.equal(tags.includes('SCRIPT'), false); assert.equal(tags.includes('IMG'), false);
});

test('Multilingual conversations keep request history within the backend form-size budget', async () => {
    const h = harness({ config: { endpoint }, fetchImpl: async () => ok('Инженерная работа '.repeat(115)) });
    for (let i = 0; i < 12; i++) await h.submit(('Вопрос о дипломной работе ' + i + ' ').repeat(30).slice(0, 990));
    assert.equal(h.calls.length, 12);
    for (const { options } of h.calls) {
        assert.ok(options.body.toString().length <= 30000, 'A URL-encoded Russian conversation must fit the backend request limit.');
        const history = JSON.parse(options.body.get('history'));
        assert.ok(history.length <= 12);
        for (let i = 0; i < history.length; i += 2) {
            assert.equal(history[i].role, 'user'); assert.equal(history[i + 1].role, 'assistant');
        }
    }
});
