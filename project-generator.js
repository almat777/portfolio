// Project Generator and Carousel Manager
// This file handles dynamic project card generation and carousel functionality

// Extract YouTube video ID from URL (supports regular videos and Shorts)
function getYouTubeId(url) {
    // Handle YouTube Shorts: youtube.com/shorts/VIDEO_ID or youtu.be/VIDEO_ID
    const shortsMatch = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) {
        return shortsMatch[1];
    }
    
    // Handle regular YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Generate carousel HTML
function generateCarousel(mediaItems, projectId, currentLang) {
    if (!mediaItems || mediaItems.length === 0) {
        return '<div class="project-media no-media"></div>';
    }

    // Check if all items are audio (special layout for audio comparison)
    const allAudio = mediaItems.every(item => item.type === 'audio');
    
    if (allAudio && mediaItems.length === 2) {
        // Special layout for 2 audio files (no carousel needed)
        const audioHTML = mediaItems.map(item => {
            const label = currentLang === 'en' ? (item.label || 'Audio') : (item.labelRu || item.label || 'Audio');
            const audioType = item.src.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg';
            return `
                <div class="audio-player-wrapper">
                    <div class="audio-label">${label}</div>
                    <audio controls preload="metadata">
                        <source src="${item.src}" type="${audioType}">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
        }).join('');
        
        return `
            <div class="project-media audio-comparison">
                ${audioHTML}
            </div>
        `;
    }
    
    if (allAudio && mediaItems.length > 2) {
        // Create carousel with 2 audio files per page
        const pages = [];
        for (let i = 0; i < mediaItems.length; i += 2) {
            const pageItems = mediaItems.slice(i, i + 2);
            const audioHTML = pageItems.map(item => {
                const label = currentLang === 'en' ? (item.label || 'Audio') : (item.labelRu || item.label || 'Audio');
                const audioType = item.src.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg';
                return `
                    <div class="audio-player-wrapper">
                        <div class="audio-label">${label}</div>
                        <audio controls preload="metadata">
                            <source src="${item.src}" type="${audioType}">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                `;
            }).join('');
            
            pages.push(`<div class="carousel-item" data-index="${i / 2}">${audioHTML}</div>`);
        }
        
        const carouselItems = pages.join('');
        const indicators = pages.map((_, index) => 
            `<button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`
        ).join('');
        
        return `
            <div class="project-media">
                <div class="project-carousel audio-carousel" data-project-id="${projectId}">
                    <button class="carousel-controls carousel-prev" aria-label="Previous slide">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="carousel-controls carousel-next" aria-label="Next slide">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="carousel-container">
                        ${carouselItems}
                    </div>
                    <div class="carousel-indicators">
                        ${indicators}
                    </div>
                </div>
            </div>
        `;
    }
    
    if (mediaItems.length === 1) {
        // Single item - no carousel needed
        const item = mediaItems[0];
        let mediaHTML = '';
        
        if (item.type === 'image') {
            const alt = currentLang === 'en' ? (item.altEn || item.alt) : (item.altRu || item.alt);
            mediaHTML = `<img src="${item.src}" alt="${alt}" loading="lazy">`;
        } else if (item.type === 'video') {
            const alt = currentLang === 'en' ? (item.altEn || item.alt) : (item.altRu || item.alt);
            mediaHTML = `<video controls><source src="${item.src}" type="video/mp4">Your browser does not support the video tag.</video>`;
        } else if (item.type === 'youtube') {
            const videoId = getYouTubeId(item.url);
            if (videoId) {
                mediaHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
            } else {
                const title = currentLang === 'en' ? (item.titleEn || item.title) : (item.titleRu || item.title);
                mediaHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${title || 'Watch Video'}</a>`;
            }
        } else if (item.type === 'audio') {
            const label = currentLang === 'en' ? (item.label || 'Audio') : (item.labelRu || item.label || 'Audio');
            const audioType = item.src.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg';
            mediaHTML = `
                <div class="audio-player-wrapper">
                    <div class="audio-label">${label}</div>
                    <audio controls preload="metadata">
                        <source src="${item.src}" type="${audioType}">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
        }
        
        return `
            <div class="project-media">
                <div class="project-carousel single-item">
                    <div class="carousel-container">
                        <div class="carousel-item">${mediaHTML}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Multiple items - create carousel
    const carouselItems = mediaItems.map((item, index) => {
        let mediaHTML = '';
        
        if (item.type === 'image') {
            const alt = currentLang === 'en' ? (item.altEn || item.alt) : (item.altRu || item.alt);
            mediaHTML = `<img src="${item.src}" alt="${alt}" loading="lazy">`;
        } else if (item.type === 'video') {
            const alt = currentLang === 'en' ? (item.altEn || item.alt) : (item.altRu || item.alt);
            mediaHTML = `<video controls><source src="${item.src}" type="video/mp4">Your browser does not support the video tag.</video>`;
        } else if (item.type === 'youtube') {
            const videoId = getYouTubeId(item.url);
            if (videoId) {
                mediaHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
            } else {
                const title = currentLang === 'en' ? (item.titleEn || item.title) : (item.titleRu || item.title);
                mediaHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${title || 'Watch Video'}</a>`;
            }
        } else if (item.type === 'audio') {
            const label = currentLang === 'en' ? (item.label || 'Audio') : (item.labelRu || item.label || 'Audio');
            const audioType = item.src.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg';
            mediaHTML = `
                <div class="audio-player-wrapper">
                    <div class="audio-label">${label}</div>
                    <audio controls preload="metadata">
                        <source src="${item.src}" type="${audioType}">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
        }
        
        return `<div class="carousel-item" data-index="${index}">${mediaHTML}</div>`;
    }).join('');

    const indicators = mediaItems.map((_, index) => 
        `<button class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`
    ).join('');

    return `
        <div class="project-media">
            <div class="project-carousel" data-project-id="${projectId}">
                <button class="carousel-controls carousel-prev" aria-label="Previous slide">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-controls carousel-next" aria-label="Next slide">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="carousel-container">
                    ${carouselItems}
                </div>
                <div class="carousel-indicators">
                    ${indicators}
                </div>
            </div>
        </div>
    `;
}

// Generate project card HTML
function generateProjectCard(project, currentLang) {
    const carouselHTML = generateCarousel(project.media || [], project.id, currentLang);
    
    const techStackHTML = (project.tech || project.techStack || []).map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    const linksHTML = (project.links || []).map(link => {
        const iconMap = {
            github: 'fab fa-github',
            youtube: 'fab fa-youtube',
            instagram: 'fab fa-instagram',
            demo: 'fas fa-external-link-alt',
            presentation: 'fa-solid fa-lightbulb',
            documentation: 'fa-solid fa-book'
        };
        
        const icon = iconMap[link.type] || 'fas fa-link';
        const text = currentLang === 'en' ? (link.textEn || link.text) : (link.textRu || link.text) || link.type;
        const isExternal = !link.url.startsWith('#');
        const relAttr = isExternal ? 'rel="noopener noreferrer"' : '';
        const targetAttr = isExternal ? 'target="_blank"' : '';
        
        return `<a href="${link.url}" ${targetAttr} ${relAttr}><i class="${icon}"></i> ${text}</a>`;
    }).join('');

    const title = currentLang === 'en' ? project.titleEn : project.titleRu;
    const description = currentLang === 'en' ? project.descEn : project.descRu;

    return `
        <div class="project-card" data-project-id="${project.id}">
            ${carouselHTML}
            <div class="project-content">
                <h3 class="project-title lang-${currentLang}">${title}</h3>
                <p class="project-description lang-${currentLang}">${description}</p>
                <div class="tech-stack">
                    ${techStackHTML}
                </div>
                <div class="project-links">
                    ${linksHTML}
                </div>
            </div>
        </div>
    `;
}

// Initialize carousel functionality
function initCarousel(carouselElement) {
    const container = carouselElement.querySelector('.carousel-container');
    const items = carouselElement.querySelectorAll('.carousel-item');
    const prevBtn = carouselElement.querySelector('.carousel-prev');
    const nextBtn = carouselElement.querySelector('.carousel-next');
    const indicators = carouselElement.querySelectorAll('.carousel-indicator');
    
    if (items.length <= 1) return; // No carousel needed for single item
    
    let currentIndex = 0;
    
    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    carouselElement.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Render all projects
function renderProjects(projects, currentLang, container) {
    container.innerHTML = projects.map(project => 
        generateProjectCard(project, currentLang)
    ).join('');
    
    // Initialize carousels
    container.querySelectorAll('.project-carousel:not(.single-item)').forEach(carousel => {
        initCarousel(carousel);
    });
    
    // Update language visibility
    updateLanguageVisibility(currentLang);
}

// Update language visibility for dynamically generated content
function updateLanguageVisibility(currentLang) {
    document.querySelectorAll('.project-title, .project-description').forEach(el => {
        const langClass = Array.from(el.classList).find(cls => cls.startsWith('lang-'));
        if (langClass) {
            const lang = langClass.replace('lang-', '');
            el.style.display = lang === currentLang ? '' : 'none';
        }
    });
}

