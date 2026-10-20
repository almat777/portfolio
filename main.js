(() => {
    'use strict';
    const byId = id => document.getElementById(id);
    let language = 'en';
    try { language = localStorage.getItem('preferredLanguage') === 'ru' ? 'ru' : 'en'; } catch { /* Storage may be unavailable. */ }
    let activeProject = null;
    let slideIndex = 0;
    let projectOpener = null;
    let projectHash = '';
    const projectDialog = byId('projectDialog');
    const imageDialog = byId('imageDialog');
    const search = byId('projectSearch');
    const menuToggle = byId('hamburger');
    const menu = byId('navLinks');

    function setMenu(open) {
        menu.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', language === 'ru' ? (open ? 'Закрыть меню' : 'Открыть меню') : (open ? 'Close navigation' : 'Open navigation'));
    }

    function updateProjects() {
        const query = search.value.trim().toLocaleLowerCase();
        const filtered = projectsData.filter(project => [project.titleEn, project.titleRu, project.descEn, project.descRu, project.categoryEn, project.categoryRu, ...(project.tech || [])].join(' ').toLocaleLowerCase().includes(query));
        renderProjects(filtered, language, byId('projectCardsContainer'));
        byId('noResults').hidden = filtered.length > 0;
        byId('clearSearch').hidden = !search.value;
        byId('projectCount').textContent = `${String(filtered.length).padStart(2, '0')} / ${String(projectsData.length).padStart(2, '0')}`;
        byId('searchInfo').textContent = language === 'ru' ? `Показано проектов: ${filtered.length} из ${projectsData.length}` : `${filtered.length} of ${projectsData.length} projects shown`;
    }

    function translatePage() {
        document.documentElement.lang = language;
        document.title = language === 'ru' ? 'Алмат Абдималик — Автоматизация и робототехника' : 'Almat Abdimalik — Automation & Robotics';
        document.querySelectorAll('[data-en][data-ru]').forEach(element => { element.textContent = element.dataset[language]; });
        document.querySelectorAll('[data-placeholder-en]').forEach(element => { element.placeholder = element.getAttribute(`data-placeholder-${language}`); });
        document.querySelectorAll('[data-label-en]').forEach(element => { element.setAttribute('aria-label', element.getAttribute(`data-label-${language}`)); });
        document.querySelectorAll('[data-alt-en]').forEach(element => { element.alt = element.getAttribute(`data-alt-${language}`); });
        const languageLabel = language === 'ru' ? 'Switch to English' : 'Переключить на русский';
        byId('langToggle').setAttribute('aria-label', languageLabel);
        byId('projectLanguageToggle').setAttribute('aria-label', languageLabel);
        byId('projectLanguageToggle').textContent = language === 'ru' ? 'RU → EN' : 'EN → RU';
        setMenu(menu.classList.contains('active'));
        updateProjects();
        if (activeProject) renderDetail();
        document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
    }

    function toggleLanguage() {
        language = language === 'en' ? 'ru' : 'en';
        try { localStorage.setItem('preferredLanguage', language); } catch { /* Keep the choice for this visit. */ }
        translatePage();
    }

    function updateSlide() {
        if (!activeProject?.media?.length) return;
        const item = activeProject.media[slideIndex];
        byId('galleryStage').innerHTML = generateMediaSlide(item, language);
        byId('galleryCaption').textContent = (language === 'ru' ? item.altRu || item.titleRu || item.labelRu : item.altEn || item.titleEn || item.label) || '';
        byId('galleryCounter').textContent = `${String(slideIndex + 1).padStart(2, '0')} / ${String(activeProject.media.length).padStart(2, '0')}`;
        byId('galleryThumbnails').querySelectorAll('[data-slide]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.slide) === slideIndex)));
    }

    function changeSlide(index) {
        if (!activeProject?.media?.length) return;
        slideIndex = (index + activeProject.media.length) % activeProject.media.length;
        updateSlide();
    }

    function renderDetail() {
        byId('projectDetail').innerHTML = generateProjectDetail(activeProject, language);
        updateSlide();
    }

    function openProject(id, opener) {
        const project = projectsData.find(item => item.id === Number(id));
        if (!project || (activeProject?.id === project.id && projectDialog.open)) return;
        activeProject = project;
        slideIndex = 0;
        projectOpener = opener || document.activeElement;
        setMenu(false);
        renderDetail();
        if (!projectDialog.open) projectDialog.showModal();
        projectDialog.scrollTop = 0;
        document.body.classList.add('modal-open');
        byId('projectClose').focus({ preventScroll: true });
    }

    function closeImage() { if (imageDialog.open) imageDialog.close(); }
    function closeProject() { closeImage(); if (projectDialog.open) projectDialog.close(); }

    function openImage() {
        const item = activeProject?.media?.[slideIndex];
        if (!item || item.type !== 'image') return;
        const label = (language === 'ru' ? item.altRu : item.altEn) || '';
        byId('fullImage').src = item.src;
        byId('fullImage').alt = label;
        byId('fullImageCaption').textContent = label;
        imageDialog.showModal();
        byId('imageClose').focus();
    }

    function syncProjectHash() {
        const match = window.location.hash.match(/^#project-(\d+)$/);
        if (match) { closeImage(); openProject(match[1]); }
        else closeProject();
    }

    document.addEventListener('click', event => {
        const trigger = event.target.closest('[data-project]');
        if (trigger) {
            const id = trigger.dataset.project;
            projectHash = window.location.hash && !window.location.hash.startsWith('#project-') ? window.location.hash : '#projects';
            window.history.pushState(null, '', `#project-${id}`);
            openProject(id, trigger);
        }
        if (!event.target.closest('.navigation')) setMenu(false);
    });
    byId('projectDetail').addEventListener('click', event => {
        const thumbnail = event.target.closest('[data-slide]');
        if (thumbnail) changeSlide(Number(thumbnail.dataset.slide));
        if (event.target.closest('#galleryPrev')) changeSlide(slideIndex - 1);
        if (event.target.closest('#galleryNext')) changeSlide(slideIndex + 1);
        if (event.target.closest('[data-zoom]')) openImage();
    });
    byId('projectClose').addEventListener('click', closeProject);
    byId('imageClose').addEventListener('click', closeImage);
    byId('langToggle').addEventListener('click', toggleLanguage);
    byId('projectLanguageToggle').addEventListener('click', toggleLanguage);
    menuToggle.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    search.addEventListener('input', updateProjects);
    byId('clearSearch').addEventListener('click', () => { search.value = ''; updateProjects(); search.focus(); });

    projectDialog.addEventListener('close', () => {
        closeImage();
        byId('projectDetail').replaceChildren(); // Unload embedded video/audio on close.
        activeProject = null;
        document.body.classList.remove('modal-open');
        if (/^#project-\d+$/.test(window.location.hash)) window.history.replaceState(null, '', projectHash || '#projects');
        if (projectOpener?.isConnected) projectOpener.focus({ preventScroll: true });
        else document.querySelector('[data-project]')?.focus({ preventScroll: true });
        projectOpener = null;
    });
    imageDialog.addEventListener('close', () => { byId('fullImage').removeAttribute('src'); });
    [projectDialog, imageDialog].forEach(dialog => dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !projectDialog.open) setMenu(false);
        if (!projectDialog.open || imageDialog.open || event.target.matches('input,textarea')) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            changeSlide(slideIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });
    window.addEventListener('hashchange', syncProjectHash);
    window.addEventListener('popstate', syncProjectHash);
    window.matchMedia('(min-width: 641px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
    byId('footerYear').textContent = new Date().getFullYear();
    translatePage();
    syncProjectHash();
})();
