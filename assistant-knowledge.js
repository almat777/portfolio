// Shared by the website and Apps Script. Keep verified facts here, projects in projects-data.js.
function getPortfolioKnowledge_() {
    return {
        profile: {
            nameEn: 'Almat Abdimalik',
            nameRu: 'Алмат Абдималик',
            roleEn: 'Automation and Robotics Engineer',
            roleRu: 'Инженер по автоматизации и робототехнике',
            locationEn: 'Almaty, Kazakhstan',
            locationRu: 'Алматы, Казахстан',
            email: 'almatinow@gmail.com',
            phone: '+7 708 169 5426',
            github: 'https://github.com/almat777',
            linkedin: 'https://www.linkedin.com/in/almat-abdimalik/',
            telegram: 'https://t.me/TheRealAlmat',
            cv: 'https://almat777.github.io/portfolio/media/Almat_Abdimalik_CV.pdf',
            personalContributionEn: 'For the team graduation project at KBTU, Almat worked on PLC control, SCADA and the KUKA robot subsystem.',
            personalContributionRu: 'В командном дипломном проекте КБТУ Алмат занимался управлением на PLC, SCADA и подсистемой робота KUKA.'
        },
        projects: projectsData.map(project => ({
            id: project.id,
            titleEn: project.titleEn, titleRu: project.titleRu,
            subtitleEn: project.subtitleEn, subtitleRu: project.subtitleRu,
            descEn: project.descEn, descRu: project.descRu,
            categoryEn: project.categoryEn, categoryRu: project.categoryRu,
            year: project.year || null,
            tech: project.tech || [],
            detailsEn: project.detailsEn || [], detailsRu: project.detailsRu || [],
            links: project.links || [],
            portfolioUrl: 'https://almat777.github.io/portfolio/#project-' + project.id
        })),
        limits: [
            'Only the diploma contribution to PLC, SCADA and KUKA has been individually confirmed. Other subsystem work and overall project results belong to the team.',
            'Do not invent age, GPA, grades, employers, employment history, years of experience, salary, availability for work or commercial terms.',
            'Do not attribute the entire diploma project, RoArm development, all MATLAB code or CAD design solely to Almat.',
            'The industrial ML project is quality prediction and decision support, not a verified autonomous closed-loop controller.',
            'Only use facts and source links present in this knowledge. The assistant cannot browse or inspect new repositories during a conversation.'
        ]
    };
}

// Deterministic portfolio guide used without a configured AI service, or after an outage.
// Every answer is labelled as portfolio material in the UI; this is not generative AI.
function getPortfolioGuideAnswer_(question, language, lastProjectId) {
    const isRu = language === 'ru';
    const suffix = isRu ? 'Ru' : 'En';
    const knowledge = getPortfolioKnowledge_();
    const profile = knowledge.profile;
    const query = String(question || '').toLowerCase().replace(/ё/g, 'е');
    const projects = knowledge.projects;
    const projectSource = project => ({ label: project['title' + suffix], href: '#project-' + project.id });
    const result = (answer, sources, projectId) => ({ answer, sources: sources || [], projectId: projectId || null });

    if (/gpa|salary|зарплат|возраст|сколько.{0,16}лет|сколько.{0,16}зараб|работодател|дата рож|years of experience|available for work|job availability/.test(query)) {
        return result(isRu ? 'В материалах портфолио нет подтверждённых данных об этом. Лучше уточнить у Алмата напрямую: ' + profile.email + '.' : 'The portfolio does not contain verified information about this. Please ask Almat directly at ' + profile.email + '.', [{ label: isRu ? 'Написать Алмату' : 'Email Almat', href: 'mailto:' + profile.email }]);
    }
    if (/контакт|почт|связ|написать|телефон|contact|email|e-mail|reach|telegram|linkedin/.test(query)) {
        return result(isRu ? 'Связаться с Алматом: ' + profile.email + '\nТелефон: ' + profile.phone + '\nГород: ' + profile.locationRu + '.' : 'Contact Almat: ' + profile.email + '\nPhone: ' + profile.phone + '\nBased in ' + profile.locationEn + '.', [{ label: 'Email', href: 'mailto:' + profile.email }, { label: 'LinkedIn', href: profile.linkedin }, { label: 'Telegram', href: profile.telegram }]);
    }
    if (/резюме|\bcv\b|\bresume\b|education|образован/.test(query)) {
        return result(isRu ? 'Образование, навыки и опыт собраны в резюме Алмата. Дипломный проект выполнен в КБТУ в 2026 году; подробности доступны в карточке проекта.' : "Almat's education, skills and experience are in his resume. The graduation project was completed at KBTU in 2026; see its project case study for details.", [{ label: isRu ? 'Открыть резюме · PDF' : 'View resume · PDF', href: 'media/Almat_Abdimalik_CV.pdf' }, ...(projects.find(p => p.id === 1) ? [projectSource(projects.find(p => p.id === 1))] : [])]);
    }
    if (/вклад|твоя часть|ты делал|делал алмат|занимался|ответствен|отвечал|contribut|your role|responsib|personally|what did (you|almat) do/.test(query)) {
        const diploma = projects.find(project => project.id === 1);
        return result(profile['personalContribution' + suffix] + '\n\n' + (isRu ? 'Это командный проект: общий результат и работа над остальными подсистемами не приписываются одному участнику.' : 'This is a team project. The overall result and work on other subsystems are credited to the team.'), diploma ? [projectSource(diploma)] : [], diploma?.id);
    }
    if (/все.{0,10}проект|всех.{0,10}проект|какие проект|список.{0,12}проект|your projects|all projects|list projects|what projects/.test(query)) {
        return result((isRu ? 'В портфолио представлены:\n' : 'The portfolio includes:\n') + projects.map(project => '• ' + project['title' + suffix]).join('\n'), projects.map(projectSource));
    }

    const aliases = [
        [1, /диплом|покрас|роарм|кука|kuka|roarm|painting|multirobot|graduat|diploma/],
        [2, /баланс|маятник|винт|bldc|pendulum|propeller|balanc|mpu.?6050|arduino/],
        [3, /машинн|прогноз|кремн|machine learning|\bml\b|silica|flotation|random forest|regression/],
        [4, /simit|симит|цифров.{0,10}двойн|digital twin/],
        [5, /s7.?1500.{0,20}(guide|manual|программ|метод)|метод.{0,20}(plc|плк)|plc.{0,20}(guide|manual)/]
    ];
    const matchedId = aliases.find(item => item[1].test(query))?.[0];
    const followUp = /^(а |и |and |what about |how about )|\b(it|this|that)\b|в нем|в нём|в этом|там/.test(query);
    const project = projects.find(item => item.id === (matchedId || (followUp ? lastProjectId : null)));
    if (project) {
        const details = project['details' + suffix];
        const techQuestion = /технол|стек|stack|technolog|инструмент|tool/.test(query);
        const architectureQuestion = /архитект|как.{0,15}работ|architecture|how.{0,10}work/.test(query);
        const sections = architectureQuestion ? details.filter(item => /Архитект|Рабочий цикл|Control architecture|The process/.test(item.title)) : [];
        let answer = project['title' + suffix] + '\n\n' + project['desc' + suffix];
        if (sections.length) answer += '\n\n' + sections.map(item => item.title + ': ' + item.text).join('\n\n');
        if (techQuestion || !sections.length) answer += '\n\n' + (isRu ? 'Технологии: ' : 'Technologies: ') + project.tech.join(', ') + '.';
        const repository = project.links.find(link => link.type === 'github');
        return result(answer, [projectSource(project), ...(repository ? [{ label: 'GitHub', href: repository.url }] : [])], project.id);
    }
    if (/навык|стек|технолог|умеет|skills|stack|technolog|\bplc\b|\bscada\b|\bwincc\b|tia portal/.test(query)) {
        return result(isRu ? 'Основное направление Алмата — промышленная автоматизация и робототехника. Подтверждённый вклад в дипломе: PLC, SCADA и KUKA. В проектах также используются Siemens S7-1500, TIA Portal, WinCC, MATLAB/Simulink, OPC UA, Python и Arduino.' : "Almat focuses on industrial automation and robotics. His confirmed graduation-project contribution is PLC, SCADA and KUKA. The projects also use Siemens S7-1500, TIA Portal, WinCC, MATLAB/Simulink, OPC UA, Python and Arduino.", [{ label: isRu ? 'Смотреть проекты' : 'Explore projects', href: '#projects' }]);
    }
    if (/кто|расскажи.{0,12}алмат|об алмат|about almat|who (is|are)|introduce|hello|привет|здравств/.test(query)) {
        return result(isRu ? 'Алмат Абдималик — инженер по автоматизации и робототехнике из Алматы. Он работает с PLC, SCADA и промышленными роботами. Я — помощник по его портфолио: могу показать проекты, объяснить диплом и найти контакты.' : "Almat Abdimalik is an automation and robotics engineer based in Almaty. He works with PLCs, SCADA and industrial robots. I'm his portfolio guide: I can show projects, explain the graduation system and find contact information.", [{ label: isRu ? 'Обо мне' : 'About Almat', href: '#about' }, { label: 'GitHub', href: profile.github }]);
    }
    return result(isRu ? 'В материалах портфолио нет точного ответа на этот вопрос. Могу рассказать о дипломе, личном вкладе Алмата, технологиях, остальных проектах или контактах.' : "I don't have an exact answer in the portfolio materials. I can help with the graduation project, Almat's contribution, technologies, other projects or contact information.", [{ label: isRu ? 'Посмотреть все проекты' : 'Explore all projects', href: '#projects' }]);
}
