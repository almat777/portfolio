(() => {
    'use strict';

    const byId = id => document.getElementById(id);
    const elements = {
        toggle: byId('chatbotToggle'), panel: byId('chatbotContainer'), messages: byId('chatbotMessages'),
        form: byId('chatbotForm'), input: byId('chatbotInput'), send: byId('chatbotSend'),
        stop: byId('chatbotStop'), clear: byId('chatbotClear'), retry: byId('chatbotRetry'),
        status: byId('chatbotStatus'), mode: byId('chatbotMode'), count: byId('chatbotCount')
    };
    if (Object.values(elements).some(element => !element)) return;

    const copy = {
        en: {
            guide: 'Portfolio guide', ai: 'AI assistant', you: 'You', notice: 'Service notice',
            welcome: "Hi! I'm Almat's portfolio assistant. Ask about his projects, technologies or his work on PLC, SCADA and KUKA.",
            pending: 'Preparing an answer…', cancelled: 'Request cancelled.',
            empty: 'Type a question first.', tooLong: 'Please keep your question within 1,000 characters.',
            unavailable: 'AI replies are temporarily unavailable. Here is an answer from the portfolio materials.',
            limited: 'The AI request limit has been reached. Here is an answer from the portfolio materials.',
            notConfigured: 'AI replies are not available yet. Here is an answer from the portfolio materials.',
            timeout: 'The AI service took too long to respond. Here is an answer from the portfolio materials.',
            sources: 'Related links', diploma: 'Tell me about the graduation project',
            contribution: 'What was Almat responsible for in the graduation project?',
            skills: 'What technologies does Almat work with?', contact: 'How can I contact Almat?'
        },
        ru: {
            guide: 'По материалам портфолио', ai: 'ИИ-помощник', you: 'Ты', notice: 'Статус сервиса',
            welcome: 'Привет! Я помощник по портфолио Алмата. Спроси о проектах, технологиях или его работе с PLC, SCADA и KUKA.',
            pending: 'Готовлю ответ…', cancelled: 'Запрос отменён.',
            empty: 'Сначала напиши вопрос.', tooLong: 'Сократи вопрос до 1 000 символов.',
            unavailable: 'ИИ временно недоступен. Вот ответ по материалам портфолио.',
            limited: 'Лимит ИИ-запросов исчерпан. Вот ответ по материалам портфолио.',
            notConfigured: 'ИИ-ответы пока недоступны. Вот ответ по материалам портфолио.',
            timeout: 'ИИ не успел ответить. Вот ответ по материалам портфолио.',
            sources: 'Ссылки по теме', diploma: 'Расскажи о дипломном проекте',
            contribution: 'За что Алмат отвечал в дипломном проекте?',
            skills: 'С какими технологиями работает Алмат?', contact: 'Как связаться с Алматом?'
        }
    };
    const config = window.PORTFOLIO_ASSISTANT_CONFIG || {};
    const endpoint = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(config.endpoint || '') ? config.endpoint : '';
    const timeoutMs = Number.isFinite(config.timeoutMs) ? Math.max(5000, Math.min(60000, config.timeoutMs)) : 30000;
    const knowledge = getPortfolioKnowledge_();
    const allowedLinks = new Set([
        '#projects', '#about', 'media/Almat_Abdimalik_CV.pdf', 'mailto:' + knowledge.profile.email,
        ...['github', 'linkedin', 'telegram', 'cv'].map(key => knowledge.profile[key]),
        ...knowledge.projects.flatMap(project => ['#project-' + project.id, project.portfolioUrl, ...project.links.map(link => link.url)])
    ]);
    let language = document.documentElement.lang === 'ru' ? 'ru' : 'en';
    let mode = endpoint ? 'ai' : 'guide';
    let history = [];
    let lastProjectId = null;
    let pending = null;
    let requestSequence = 0;
    let lastFailedQuestion = '';
    let welcomeElement = null;

    function visitorId() {
        let id;
        try { id = localStorage.getItem('portfolioAssistantVisitorId'); } catch { /* Use a session identifier. */ }
        if (!/^[A-Za-z0-9][A-Za-z0-9_-]{15,95}$/.test(id || '')) {
            id = 'visitor_' + (window.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
            try { localStorage.setItem('portfolioAssistantVisitorId', id); } catch { /* Keep it in memory. */ }
        }
        return id;
    }
    const userId = visitorId();

    function safeHref(raw) {
        if (!allowedLinks.has(raw)) return null;
        // Keep known portfolio links on the current preview or published page.
        if (raw.startsWith('https://almat777.github.io/portfolio/#')) return raw.slice(raw.indexOf('#'));
        if (raw === knowledge.profile.cv) return 'media/Almat_Abdimalik_CV.pdf';
        if (/^(https?:\/\/|mailto:|#|media\/)/.test(raw)) return raw;
        return null;
    }

    function richText(container, text) {
        // Only text, emphasis and allow-listed source links. Never inject model HTML.
        const pattern = /\*\*([^*\n]+)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<>]+)/g;
        let offset = 0;
        for (const match of text.matchAll(pattern)) {
            container.appendChild(document.createTextNode(text.slice(offset, match.index)));
            if (match[1]) {
                const strong = document.createElement('strong'); strong.textContent = match[1]; container.appendChild(strong);
            } else {
                const url = match[3] || match[4].replace(/[.,;!]+$/, '');
                const href = safeHref(url);
                if (href) {
                    const link = document.createElement('a'); link.textContent = match[2] || url; link.href = href;
                    if (/^https?:/.test(href)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
                    container.appendChild(link);
                    if (!match[3]) container.appendChild(document.createTextNode(match[4].slice(url.length)));
                } else container.appendChild(document.createTextNode(match[0]));
            }
            offset = match.index + match[0].length;
        }
        container.appendChild(document.createTextNode(text.slice(offset)));
    }

    function addMessage(text, kind, answerLanguage, sources) {
        const message = document.createElement('article'); message.className = 'chat-message chat-message-' + kind;
        const label = document.createElement('p'); label.className = 'chat-message-label'; label.dataset.kind = kind;
        label.textContent = copy[language][kind];
        const content = document.createElement('div'); content.className = 'chat-message-text'; content.lang = answerLanguage;
        richText(content, String(text).slice(0, 6000));
        message.append(label, content);
        const validSources = (sources || []).filter(source => safeHref(source.href));
        if (validSources.length) {
            const links = document.createElement('div'); links.className = 'chat-message-sources'; links.setAttribute('aria-label', copy[answerLanguage].sources);
            validSources.forEach(source => {
                const link = document.createElement('a'); link.textContent = source.label + ' ↗'; link.href = safeHref(source.href);
                if (/^https?:/.test(link.getAttribute('href'))) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
                links.appendChild(link);
            });
            message.appendChild(links);
        }
        elements.messages.appendChild(message);
        while (elements.messages.children.length > 40) elements.messages.firstElementChild.remove();
        elements.messages.scrollTop = elements.messages.scrollHeight;
        return content;
    }

    function updateControls() {
        const busy = Boolean(pending);
        elements.send.disabled = busy || !elements.input.value.trim();
        elements.stop.hidden = !busy;
        elements.retry.hidden = busy || !lastFailedQuestion;
        elements.form.setAttribute('aria-busy', String(busy));
        elements.count.textContent = elements.input.value.length + ' / 1000';
        elements.mode.textContent = copy[language][mode];
        elements.mode.dataset.mode = mode;
        elements.status.textContent = busy ? copy[language].pending : '';
        document.querySelectorAll('[data-chat-question]').forEach(button => { button.disabled = busy; });
    }

    function reset() {
        requestSequence++;
        pending?.abort(); pending = null; history = []; lastProjectId = null; lastFailedQuestion = '';
        elements.messages.replaceChildren();
        mode = endpoint ? 'ai' : 'guide';
        welcomeElement = addMessage(copy[language].welcome, mode, language);
        elements.input.value = '';
        updateControls();
    }

    function portfolioReply(question, answerLanguage) {
        const reply = getPortfolioGuideAnswer_(question, answerLanguage, lastProjectId);
        if (reply.projectId) lastProjectId = reply.projectId;
        mode = 'guide';
        addMessage(reply.answer, 'guide', answerLanguage, reply.sources);
    }

    async function submit(question) {
        if (pending) return;
        question = String(question || '').trim();
        if (!question || question.length > 1000) { elements.status.textContent = copy[language][question ? 'tooLong' : 'empty']; return; }
        const answerLanguage = /[а-яё]/i.test(question) ? 'ru' : language;
        addMessage(question, 'you', answerLanguage);
        elements.input.value = '';
        lastFailedQuestion = '';
        if (!endpoint) { portfolioReply(question, answerLanguage); updateControls(); return; }

        const sequence = ++requestSequence;
        const controller = new AbortController(); pending = controller;
        updateControls();
        let timedOut = false;
        const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, timeoutMs);
        try {
            const sentHistory = history.slice();
            const body = new URLSearchParams({ question, language: answerLanguage, history: JSON.stringify(sentHistory), userId });
            // URL encoding expands Cyrillic text. Bound the actual wire body, keeping recent exchanges.
            while (body.toString().length > 30000 && sentHistory.length) {
                sentHistory.splice(0, 2);
                body.set('history', JSON.stringify(sentHistory));
            }
            const response = await fetch(endpoint, { method: 'POST', body, signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer', redirect: 'follow' });
            if (!response.ok) throw new Error('SERVICE_UNAVAILABLE');
            const data = await response.json();
            if (sequence !== requestSequence) return;
            if (!data || data.success !== true || typeof data.answer !== 'string' || !data.answer.trim() || data.answer.length > 6000) {
                throw new Error(typeof data?.code === 'string' ? data.code : 'INVALID_RESPONSE');
            }
            mode = 'ai';
            addMessage(data.answer, 'ai', answerLanguage);
            history.push({ role: 'user', content: question }, { role: 'assistant', content: data.answer.slice(0, 2000) });
            history = history.slice(-12);
        } catch (error) {
            if (sequence !== requestSequence) return;
            const reason = timedOut ? 'timeout' : error.message === 'NOT_CONFIGURED' ? 'notConfigured' : /LIMIT|RATE_LIMITED/.test(error.message) ? 'limited' : 'unavailable';
            addMessage(copy[answerLanguage][reason], 'notice', answerLanguage);
            portfolioReply(question, answerLanguage);
            lastFailedQuestion = question;
        } finally {
            clearTimeout(timeout);
            if (sequence === requestSequence) { pending = null; updateControls(); }
        }
    }

    elements.toggle.addEventListener('click', () => {
        elements.panel.hidden = !elements.panel.hidden;
        elements.toggle.setAttribute('aria-expanded', String(!elements.panel.hidden));
        elements.toggle.querySelector('.toggle-icon').textContent = elements.panel.hidden ? '+' : '−';
        if (!elements.panel.hidden) elements.input.focus({ preventScroll: true });
    });
    elements.form.addEventListener('submit', event => { event.preventDefault(); submit(elements.input.value); });
    elements.input.addEventListener('input', updateControls);
    elements.input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); submit(elements.input.value); }
    });
    elements.stop.addEventListener('click', () => {
        requestSequence++; pending?.abort(); pending = null;
        addMessage(copy[language].cancelled, 'notice', language); updateControls(); elements.input.focus();
    });
    elements.clear.addEventListener('click', () => { reset(); elements.input.focus(); });
    elements.retry.addEventListener('click', () => { if (lastFailedQuestion) submit(lastFailedQuestion); });
    document.querySelectorAll('[data-chat-question]').forEach(button => button.addEventListener('click', () => submit(copy[language][button.dataset.chatQuestion])));
    document.addEventListener('portfolio:languagechange', event => {
        language = event.detail.language === 'ru' ? 'ru' : 'en';
        document.querySelectorAll('.chat-message-label').forEach(label => { label.textContent = copy[language][label.dataset.kind]; });
        if (welcomeElement?.isConnected) { welcomeElement.textContent = copy[language].welcome; welcomeElement.lang = language; }
        updateControls();
    });
    reset();
})();
