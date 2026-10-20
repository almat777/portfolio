// All project content is maintained in projects-data.js.
function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function projectText(project, key, language) {
    return project[`${key}${language === 'ru' ? 'Ru' : 'En'}`] || project[`${key}En`] || '';
}

function safeProjectUrl(value) {
    return /^(https?:\/\/|media\/)/i.test(value || '') ? escapeHTML(value) : '#';
}

function getYouTubeId(url) {
    const match = String(url || '').match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|watch\?(?:[^#]*&)?v=))([\w-]{11})(?:[^\w-]|$)/);
    return match ? match[1] : null;
}

function projectTechTags(project) {
    return `<ul class="tech-tags">${(project.tech || []).map(tag => `<li class="tech-tag">${escapeHTML(tag)}</li>`).join('')}</ul>`;
}

function generateProjectCard(project, language) {
    const isRu = language === 'ru';
    const image = (project.media || []).find(item => item.type === 'image');
    const cover = project.cover || image?.src;
    const title = projectText(project, 'title', language);
    const tagLimit = project.featured ? 5 : 4;
    const tags = project.tech || [];
    return `<article class="project-card${project.featured ? ' featured' : ''}">
        <button type="button" class="project-open" data-project="${project.id}" aria-haspopup="dialog" aria-controls="projectDialog" aria-label="${escapeHTML(isRu ? `Подробнее: ${title}` : `Explore: ${title}`)}">
            <span class="project-cover">${cover ? `<img src="${safeProjectUrl(cover)}" alt="${escapeHTML(projectText(project, 'coverAlt', language) || (isRu ? image?.altRu : image?.altEn))}" loading="lazy" width="900" height="560">` : ''}<span class="project-index">${String(project.id).padStart(2, '0')}</span><span class="project-open-indicator" aria-hidden="true">↗</span></span>
            <span class="project-card-body"><span class="project-category"><span>${escapeHTML(projectText(project, 'category', language))}</span>${project.year ? `<span class="project-year">${escapeHTML(project.year)}</span>` : ''}</span>
            <span class="project-title">${escapeHTML(title)}</span><span class="project-description">${escapeHTML(projectText(project, 'desc', language))}</span>
            ${project.featured ? `<span class="featured-contribution">${escapeHTML(projectText(project, 'contributionLabel', language))}</span>` : ''}
            <span class="tech-tags">${tags.slice(0, tagLimit).map(tag => `<span class="tech-tag">${escapeHTML(tag)}</span>`).join('')}${tags.length > tagLimit ? `<span class="tech-tag">+${tags.length - tagLimit}</span>` : ''}</span>
            <span class="project-card-footer"><span>${isRu ? 'Открыть проект' : 'Explore project'}</span><span aria-hidden="true">↗</span></span></span>
        </button></article>`;
}

function renderProjects(projects, language, container) {
    container.innerHTML = projects.map(project => generateProjectCard(project, language)).join('');
}

function generateProjectDetail(project, language) {
    const isRu = language === 'ru';
    const details = projectText(project, 'details', language) || [];
    const links = [...(project.links || [])].sort((a, b) => Number(b.type === 'github') - Number(a.type === 'github'));
    return `<div class="detail-heading"><div><p class="eyebrow">${escapeHTML(projectText(project, 'category', language))}${project.year ? ` / ${escapeHTML(project.year)}` : ''}</p><h2 id="projectTitle">${escapeHTML(projectText(project, 'title', language))}</h2><p>${escapeHTML(projectText(project, 'subtitle', language))}</p></div><span class="detail-project-number" aria-hidden="true">${String(project.id).padStart(2, '0')}</span></div>
        ${(project.media || []).length ? `<div class="project-gallery"><div class="gallery-stage" id="galleryStage"></div><div class="gallery-caption-row"><p class="gallery-caption" id="galleryCaption" aria-live="polite"></p><div class="gallery-navigation"><button type="button" class="icon-button" id="galleryPrev" aria-label="${isRu ? 'Предыдущее медиа' : 'Previous media'}"${project.media.length < 2 ? ' hidden' : ''}>←</button><span class="gallery-counter" id="galleryCounter"></span><button type="button" class="icon-button" id="galleryNext" aria-label="${isRu ? 'Следующее медиа' : 'Next media'}"${project.media.length < 2 ? ' hidden' : ''}>→</button></div></div><div class="gallery-thumbnails" id="galleryThumbnails" aria-label="${isRu ? 'Галерея проекта' : 'Project gallery'}">${project.media.map((item, index) => `<button type="button" class="gallery-thumbnail" data-slide="${index}" aria-pressed="false" aria-label="${escapeHTML((isRu ? item.altRu || item.titleRu : item.altEn || item.titleEn) || `${isRu ? 'Медиа' : 'Media'} ${index + 1}`)}">${item.type === 'image' ? `<img src="${safeProjectUrl(item.src)}" alt="" loading="lazy">` : `<span>${item.type === 'audio' ? 'AUDIO' : '▶ VIDEO'}</span>`}</button>`).join('')}</div></div>` : ''}
        <div class="detail-layout"><div><p class="detail-summary" id="projectSummary">${escapeHTML(projectText(project, 'desc', language))}</p>${details.map((section, index) => `<section class="detail-section${project.featured && index === 0 ? ' contribution' : ''}"><h3>${escapeHTML(section.title)}</h3><p>${escapeHTML(section.text)}</p></section>`).join('')}</div><aside class="detail-sidebar"><h3>${isRu ? 'Технологии' : 'Technology stack'}</h3>${projectTechTags(project)}${links.length ? `<h3>${isRu ? 'Материалы проекта' : 'Explore the work'}</h3><div class="detail-links">${links.map(link => `<a href="${safeProjectUrl(link.url)}" target="_blank" rel="noopener noreferrer"${link.type === 'github' ? ' class="source-link"' : ''}><span>${escapeHTML(isRu ? link.textRu : link.textEn)}</span><span aria-hidden="true">↗</span></a>`).join('')}</div>` : `<p class="detail-note">${isRu ? 'За подробностями и материалами можно обратиться ко мне.' : 'Get in touch for more information about this work.'}</p><a href="mailto:almatinow@gmail.com" class="text-link">${isRu ? 'Написать' : 'Get in touch'} ↗</a>`}</aside></div>`;
}

function generateMediaSlide(item, language) {
    const isRu = language === 'ru';
    const label = (isRu ? item.altRu || item.titleRu || item.labelRu : item.altEn || item.titleEn || item.label) || (isRu ? 'Изображение проекта' : 'Project media');
    if (item.type === 'image') return `<button type="button" class="gallery-zoom" data-zoom aria-label="${escapeHTML(isRu ? `Увеличить: ${label}` : `Enlarge: ${label}`)}"><img src="${safeProjectUrl(item.src)}" alt="${escapeHTML(label)}"><span class="gallery-expand" aria-hidden="true">⤢</span></button>`;
    if (item.type === 'youtube') {
        const id = getYouTubeId(item.url);
        if (id) return `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${escapeHTML(label)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
    if (item.type === 'video') return `<video controls preload="metadata" aria-label="${escapeHTML(label)}" src="${safeProjectUrl(item.src)}"></video>`;
    if (item.type === 'audio') return `<audio controls preload="metadata" aria-label="${escapeHTML(label)}" src="${safeProjectUrl(item.src)}"></audio>`;
    return `<a class="media-external" href="${safeProjectUrl(item.url || item.src)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`;
}
