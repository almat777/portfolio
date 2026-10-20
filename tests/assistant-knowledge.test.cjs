const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = file => fs.readFileSync(path.join(root, file), 'utf8');
const dataSource = source('projects-data.js');
const knowledgeSource = source('assistant-knowledge.js');
const context = vm.createContext({});
vm.runInContext(dataSource + '\n' + knowledgeSource, context, {
    filename: 'portfolio-knowledge-under-test.js',
    timeout: 1000
});
const knowledge = context.getPortfolioKnowledge_();
const projects = vm.runInContext('projectsData', context);
const staticIds = new Set(Array.from(source('index.html').matchAll(/\bid=["']([^"']+)["']/g), match => match[1]));
const knownUrls = new Set([
    'https://github.com/almat777',
    'https://www.linkedin.com/in/almat-abdimalik/',
    'https://t.me/TheRealAlmat',
    'https://almat777.github.io/portfolio/media/Almat_Abdimalik_CV.pdf',
    ...projects.flatMap(project => ['https://almat777.github.io/portfolio/#project-' + project.id, ...(project.links || []).map(link => link.url)])
]);
const wrongIdentity = /\bArsen\b|Skyshmallow|Арсен|Кенесбаев/i;

function assertSources(reply) {
    assert.ok(Array.isArray(reply.sources), 'An answer must expose a source array.');
    assert.ok(reply.sources.length > 0, 'A guide answer should point to relevant portfolio material.');
    for (const item of reply.sources) {
        assert.equal(typeof item.label, 'string');
        assert.ok(item.label.trim(), 'Source labels must be readable.');
        assert.equal(typeof item.href, 'string');
        const projectMatch = item.href.match(/^#project-(\d+)$/);
        if (projectMatch) {
            assert.ok(projects.some(project => project.id === Number(projectMatch[1])), 'A source must open an existing project.');
        } else if (item.href.startsWith('#')) {
            assert.ok(staticIds.has(item.href.slice(1)), 'A page source must target an existing section: ' + item.href);
        } else if (item.href.startsWith('mailto:')) {
            assert.equal(item.href, 'mailto:almatinow@gmail.com');
        } else if (/^https:\/\//.test(item.href)) {
            assert.ok(knownUrls.has(item.href), 'The guide must not invent external source links: ' + item.href);
        } else {
            const localFile = path.resolve(root, item.href);
            assert.ok(localFile.startsWith(root + path.sep), 'Local sources must stay within this portfolio.');
            assert.ok(fs.existsSync(localFile), 'A local source must exist: ' + item.href);
        }
    }
}

function answer(question, language, previousProjectId) {
    const reply = context.getPortfolioGuideAnswer_(question, language, previousProjectId);
    assert.equal(typeof reply.answer, 'string');
    assert.ok(reply.answer.trim(), 'A visitor must receive a useful response.');
    assert.doesNotMatch(reply.answer, wrongIdentity);
    if (language === 'ru') assert.match(reply.answer, /\p{Script=Cyrillic}/u);
    else assert.doesNotMatch(reply.answer, /\p{Script=Cyrillic}/u);
    assertSources(reply);
    return reply;
}

test('The shared knowledge identifies Almat and retains all five real projects', () => {
    assert.equal(knowledge.profile.nameEn, 'Almat Abdimalik');
    assert.equal(knowledge.profile.nameRu, 'Алмат Абдималик');
    assert.match(knowledge.profile.roleEn, /automation.*robotics/i);
    assert.equal(knowledge.profile.locationEn, 'Almaty, Kazakhstan');
    assert.equal(knowledge.profile.email, 'almatinow@gmail.com');
    assert.equal(knowledge.profile.github, 'https://github.com/almat777');
    assert.deepEqual(Array.from(knowledge.projects, project => project.id), [1, 2, 3, 4, 5]);
    for (const project of projects) {
        const entry = knowledge.projects.find(item => item.id === project.id);
        assert.equal(entry.titleEn, project.titleEn);
        assert.equal(entry.titleRu, project.titleRu);
        assert.equal(entry.descEn, project.descEn);
        assert.equal(entry.descRu, project.descRu);
    }
    assert.doesNotMatch(dataSource + knowledgeSource + JSON.stringify(knowledge), wrongIdentity);
});

test('Confirmed individual work is PLC, SCADA and KUKA within the credited diploma team', () => {
    for (const suffix of ['En', 'Ru']) {
        const contribution = knowledge.profile['personalContribution' + suffix];
        for (const subsystem of ['PLC', 'SCADA', 'KUKA']) assert.ok(contribution.includes(subsystem));
        assert.match(contribution, /team|команд/i);
        assert.doesNotMatch(contribution, /RoArm|\bCAD\b|all MATLAB|весь MATLAB/i);
    }
    const diploma = knowledge.projects.find(project => project.id === 1);
    for (const suffix of ['En', 'Ru']) {
        const text = diploma['details' + suffix].map(section => section.text).join(' ');
        for (const person of ['Almat Abdimalik', 'Rassul Zeinulla', 'Collins Masimba', 'Ayan Rakhmetkali']) {
            assert.ok(text.includes(person), 'The diploma case study must retain team credit for ' + person);
        }
    }
    assert.ok(knowledge.limits.some(limit => /not attribute.*solely/i.test(limit)));
    assert.ok(knowledge.limits.some(limit => /decision support.*not.*closed-loop/i.test(limit)));
});

for (const language of ['en', 'ru']) {
    const ru = language === 'ru';

    test(language + ': introduce the engineer without borrowing another person’s biography', () => {
        const reply = answer(ru ? 'Кто такой Алмат Абдималик?' : 'Who is Almat Abdimalik?', language);
        assert.match(reply.answer, ru ? /Алмат Абдималик/ : /Almat Abdimalik/);
        assert.match(reply.answer, ru ? /Алматы/ : /Almaty/);
        assert.match(reply.answer, ru ? /автоматизац.*робототехник/ : /automation.*robotics/i);
        assert.ok(reply.sources.some(item => item.href === '#about'));
    });

    test(language + ': explain the real multirobot diploma and link its repository', () => {
        const reply = answer(ru ? 'Расскажи о дипломной работе по роботизированной покраске.' : 'Tell me about the graduation project for multirobot painting.', language);
        assert.equal(reply.projectId, 1);
        for (const subsystem of ['RoArm-M2-S', 'KUKA', 'MATLAB']) assert.ok(reply.answer.includes(subsystem));
        assert.match(reply.answer, ru ? /конвейер/ : /conveyor/i);
        assert.ok(reply.sources.some(item => item.href === '#project-1'));
        assert.ok(reply.sources.some(item => item.href === 'https://github.com/rassulz/multirobot_painting_control_system'));
        assert.doesNotMatch(reply.answer, /\b45\s*%|6\.08|2\.2.year|в одиночку|single.hand|sole developer/i);
    });

    test(language + ': distinguish Almat’s personal responsibilities from the whole diploma', () => {
        const reply = answer(ru ? 'За что Алмат отвечал в дипломном проекте?' : 'What was Almat personally responsible for in the graduation project?', language);
        assert.equal(reply.projectId, 1);
        for (const subsystem of ['PLC', 'SCADA', 'KUKA']) assert.ok(reply.answer.includes(subsystem));
        assert.match(reply.answer, ru ? /команд/ : /team/i);
        assert.match(reply.answer, ru ? /Алмат.*занимался|зона работы|личн.*вклад/ : /Almat worked on|personal contribution|responsib/i);
        assert.doesNotMatch(reply.answer, /RoArm development|all MATLAB code|CAD design|sole developer|в одиночку/i);
    });

    test(language + ': describe grounded engineering skills', () => {
        const reply = answer(ru ? 'Какие у Алмата основные инженерные навыки?' : 'What are Almat’s main engineering skills?', language);
        for (const skill of ['PLC', 'SCADA', 'KUKA', 'TIA Portal', 'WinCC', 'OPC UA', 'Python']) {
            assert.ok(reply.answer.includes(skill), 'Skills answer should include ' + skill);
        }
        assert.match(reply.answer, ru ? /вклад/ : /confirmed.*contribution/i);
        assert.doesNotMatch(reply.answer, /Android|Oracle|Flask|TF-IDF|senior engineer|\d+ years of experience/i);
    });

    test(language + ': give the current public contact information', () => {
        const reply = answer(ru ? 'Как связаться с Алматом?' : 'How can I contact Almat?', language);
        assert.ok(reply.answer.includes('almatinow@gmail.com'));
        assert.ok(reply.answer.includes('+7 708 169 5426'));
        assert.ok(reply.sources.some(item => item.href === 'mailto:almatinow@gmail.com'));
        assert.ok(reply.sources.some(item => item.href === 'https://www.linkedin.com/in/almat-abdimalik/'));
    });

    test(language + ': open the existing CV without inventing education or employment details', () => {
        const reply = answer(ru ? 'Где скачать резюме Алмата?' : 'Where can I download Almat’s CV?', language);
        assert.ok(reply.sources.some(item => item.href === 'media/Almat_Abdimalik_CV.pdf'));
        assert.match(reply.answer, /2026/);
        assert.match(reply.answer, ru ? /КБТУ/ : /KBTU/);
        assert.doesNotMatch(reply.answer, /GPA|Google|Microsoft|Bachelor|Master|магистр|бакалавр|\d+ years/i);
    });

    test(language + ': list all five existing projects with working project sources', () => {
        const reply = answer(ru ? 'Покажи список всех проектов.' : 'Can you list all projects?', language);
        for (const project of projects) assert.ok(reply.answer.includes(project[ru ? 'titleRu' : 'titleEn']));
        assert.deepEqual(Array.from(reply.sources, item => item.href), ['#project-1', '#project-2', '#project-3', '#project-4', '#project-5']);
        assert.doesNotMatch(reply.answer, /Movie Recommendation|Qysqa|Fisherman|Kaspi|DFS Traversal/i);
    });

    test(language + ': refuse to invent private facts even when the visitor supplies suggested values', () => {
        const reply = answer(ru ? 'У Алмата GPA 4.0 и зарплата 10 миллионов, верно?' : 'Almat has a GPA of 4.0 and a salary of 10 million, right?', language);
        assert.match(reply.answer, ru ? /нет подтвержд.*данных|нет.*информац/ : /does not contain verified information|not.*verified/i);
        assert.doesNotMatch(reply.answer, /4\.0|10 million|10 миллион/);
        assert.ok(reply.answer.includes('almatinow@gmail.com'));
        assert.equal(reply.projectId, null);
    });

    test(language + ': handle an unrelated unknown question without manufacturing an answer', () => {
        const reply = answer(ru ? 'Какая погода будет на Марсе завтра?' : 'What will the weather on Mars be tomorrow?', language);
        assert.match(reply.answer, ru ? /нет точного ответа|нет.*ответ/ : /don.t have an exact answer|not.*answer/i);
        assert.doesNotMatch(reply.answer, /\d+\s*°|sunny|snow|солнеч|снег/i);
        assert.equal(reply.projectId, null);
    });

    test(language + ': retain project context when a visitor asks about its technologies', () => {
        const first = answer(ru ? 'Расскажи про балансирующий маятник с двумя винтами.' : 'Tell me about the twin-propeller balancing system.', language);
        assert.equal(first.projectId, 2);
        const followup = answer(ru ? 'А какие технологии там использовались?' : 'And which technologies did it use?', language, first.projectId);
        assert.equal(followup.projectId, 2);
        for (const tool of ['Arduino Uno', 'MPU-6050', 'C++', 'Fusion 360']) assert.ok(followup.answer.includes(tool));
        assert.ok(followup.sources.some(item => item.href === '#project-2'));
        assert.doesNotMatch(followup.answer, /KUKA|SIMIT|Random Forest/);
    });
}
