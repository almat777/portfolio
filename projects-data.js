// Projects Data Structure - Simplified Format
// To add a new project, simply add a new object to the array below
// Media types supported: 'image', 'video', 'youtube'

const projectsData = [
    {
        id: 1,
        titleEn: "Movie Recommendation System",
        titleRu: "Система Рекомендации Фильмов",
        descEn: "Built a movie recommender with content-based filtering (TF-IDF + cosine similarity), with ability to watch trailers, user auth, dark/light mode, and an Akinator-style assistant. Processed 5,000+ TMDB movies.",
        descRu: "Разработал систему рекомендации фильмов с контентной фильтрацией (TF-IDF + косинусное сходство), с возможностью просмотра трейлеров, авторизацией пользователей, тёмной/светлой темой и помощником в стиле Akinator. Обработано более 5000 фильмов из TMDB.",
        media: [
            { type: "image", src: "media/popcorn (1).png", altEn: "Movie Recommendation System", altRu: "Система Рекомендации Фильмов" }
        ],
        tech: ["Flask", "TMDB API", "Scikit-learn", "TF-IDF", "Cosine Similarity", "Matplotlib", "Waitress", "Ngrok"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/Movie-Recommendation-System-for-ML", textEn: "GitHub", textRu: "GitHub" },
            { type: "presentation", url: "https://www.canva.com/design/DAGnKi5m3TE/lA1QYrb8ai3ZamYxoTOMNg/edit?utm_content=DAGnKi5m3TE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" },
            { type: "documentation", url: "https://www.canva.com/design/DAGYi1dxqsQ/MlkfnETaGHBtzuR4I5AamQ/edit?utm_content=DAGYi1dxqsQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Documentation", textRu: "Документация" }
        ]
    },
    {
        id: 2,
        titleEn: "Online Bank Database",
        titleRu: "База Данных Онлайн-Банка",
        descEn: "Designed a Kaspi-style database with normalized schemas for customers, cards, loans, etc. Wrote 30+ optimized queries, added triggers and indexes for speed.",
        descRu: "Разработал базу данных в стиле Kaspi с нормализованными схемами для клиентов, карт, кредитов и т.д. Написал более 30 оптимизированных запросов, добавил триггеры и индексы для повышения скорости.",
        media: [
            { type: "image", src: "media/p_bank.png", altEn: "Online Bank Database", altRu: "База Данных Онлайн-Банка" }
        ],
        tech: ["Oracle APEX", "SQL", "Java", "Miro", "Canva"],
        links: [
            { type: "presentation", url: "https://www.canva.com/design/DAGnKrudz-E/Jb7eJfVraFReA8v_S2Mx8w/edit?utm_content=DAGnKrudz-E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 3,
        titleEn: "DFS Traversal Animation",
        titleRu: "Анимация Алгоритма DFS",
        descEn: "Created an interactive DFS visualizer with animations, SFX, and embedded YouTube explainer. Responsive design and fully commented source code.",
        descRu: "Создал интерактивный визуализатор алгоритма поиска в глубину с анимациями, звуковыми эффектами и встроенным объяснением с YouTube. Адаптивный дизайн и полностью прокомментированный исходный код.",
        media: [
            { type: "image", src: "media/algorithm.png", altEn: "DFS Traversal Animation", altRu: "Анимация Алгоритма DFS" }
        ],
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "GitHub Pages"],
        links: [
            { type: "demo", url: "https://skyshmallow.github.io/algos_project/", textEn: "Live Demo", textRu: "Демо" },
            { type: "presentation", url: "https://www.canva.com/design/DAGnKrfjVAM/YCGeO-OsgH0m1_y4LjEfcQ/edit?utm_content=DAGnKrfjVAM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 4,
        titleEn: "Qysqa",
        titleRu: "Qysqa",
        descEn: "AI learning platform, creates open/closed tests and evaluates answers, allows user to upload multiple types of data(.txt .pptx .pdf .docx youtube-video etc.) and ask questions about selected data",
        descRu: "Платформа для обучения с ИИ, создаёт открытые/закрытые тесты и оценивает ответы, позволяет пользователю загружать различные типы данных (.txt .pptx .pdf .docx youtube-видео и т.д.) и задавать вопросы по выбранным данным",
        media: [
            { type: "image", src: "media/qysqa.png", altEn: "Qysqa AI Learning Platform", altRu: "Платформа для обучения с ИИ Qysqa" }
        ],
        tech: ["HTML/CSS/JS", "Gemini API", "Flask", "Python", "youtube-transcript-api", "BeautifulSoup4"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/qysqa", textEn: "GitHub", textRu: "GitHub" },
            { type: "presentation", url: "https://www.canva.com/design/DAGnKoFN27Q/z6sDIdcEZAHixtGoYherAw/edit?utm_content=DAGnKoFN27Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 5,
        titleEn: "AI human tracking camera",
        titleRu: "Камера с ИИ-отслеживанием человека",
        descEn: "Working on it's own power supply Camera with API to manual control and AI tracking of human and voice control",
        descRu: "Камера с собственным источником питания, API для ручного управления, ИИ-отслеживанием человека и голосовым управлением",
        media: [
            { type: "image", src: "media/esp32.jpg", altEn: "AI human tracking camera", altRu: "Камера с ИИ-отслеживанием человека" },
            { type: "youtube", url: "https://youtu.be/XqcitDN1cJ0", titleEn: "AI Camera Demo", titleRu: "Демо ИИ-камеры" }
        ],
        tech: ["Esp32", "Arduino Uno", "C#", "Python", "pyttsx3", "speech_recognition", "threading"],
        links: [
            { type: "youtube", url: "https://youtu.be/XqcitDN1cJ0?si=n_tiQgsUzuvXvrtY", textEn: "YouTube", textRu: "YouTube" },
            { type: "github", url: "https://github.com/Skyshmallow/esp32-cam", textEn: "Github", textRu: "Github" },
            { type: "presentation", url: "https://www.canva.com/design/DAGmRnk1kqE/oPWG_Vj-OcQYo4zj-ceDEQ/view?utm_content=DAGmRnk1kqE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3bfc266085", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 6,
        titleEn: "Gesture control drawing",
        titleRu: "Рисование с помощью жестов",
        descEn: "Created an AI-powered hand gesture drawing application that tracks hand movements to create digital art. The system detects finger positions in real-time and translates them into drawing commands or eraser.",
        descRu: "Создал приложение для рисования жестами на основе ИИ, которое отслеживает движения рук для создания цифрового искусства. Система определяет положение пальцев в реальном времени и преобразует их в команды рисования или ластик.",
        media: [
            { type: "image", src: "media/gesture.jpg", altEn: "Gesture Control Drawing", altRu: "Рисование с помощью жестов" }
        ],
        tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
        links: [
            { type: "instagram", url: "https://www.instagram.com/p/DFf4ZYFsIH_/", textEn: "Instagram", textRu: "Instagram" }
        ]
    },
    {
        id: 7,
        titleEn: "Personal Portfolio Website",
        titleRu: "Персональный Веб-сайт Портфолио",
        descEn: "Built a modern, responsive portfolio website featuring bilingual support (EN/RU), intelligent search with real-time highlighting, comprehensive analytics system, and integrated feedback collection. Includes dark theme, smooth animations, and mobile-first design.",
        descRu: "Разработал современный адаптивный веб-сайт портфолио с двуязычной поддержкой (EN/RU), интеллектуальным поиском с подсветкой в реальном времени, комплексной системой аналитики и интегрированным сбором отзывов. Включает тёмную тему, плавные анимации и mobile-first дизайн.",
        media: [
            { type: "image", src: "media/portfolio.png", altEn: "Personal Portfolio Website", altRu: "Персональный Веб-сайт Портфолио" }
        ],
        tech: ["HTML/CSS/JS", "Google Sheets API", "Google Forms", "Google Apps Script", "Analytics", "Bilingual"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/personal-portfolio", textEn: "GitHub", textRu: "GitHub" },
            { type: "demo", url: "#", textEn: "Live Site", textRu: "Сайт" }
        ]
    },
    {
        id: 8,
        titleEn: "Fisherman App",
        titleRu: "Приложение для рыбака",
        descEn: "Fisherman is an Android application developed using Android Studio. It features both light and dark themes, adjustable text size for better accessibility, and voice search powered by Google Speech Services. This project demonstrates skills in Android UI design, activity lifecycle management, and integration of voice-based interaction.",
        descRu: "Fisherman — это Android-приложение, разработанное в Android Studio. В нём реализованы светлая и тёмная темы, настройка размера текста для удобства пользователей, а также голосовой поиск с использованием Google Speech Services. Проект демонстрирует навыки в создании UI, управлении жизненным циклом активностей и интеграции голосового управления.",
        media: [
            { type: "image", src: "media/Fisherman.jpg", altEn: "Fisherman app", altRu: "Приложение для рыбака" },
            { type: "youtube", url: "https://youtube.com/shorts/ySeRwMbyQSw", titleEn: "Fisherman App Demo", titleRu: "Демо приложения Fisherman" }
        ],
        tech: ["Android Studio", "XML", "Java", "Google Speech Services", "Gradle"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/Fisherman", textEn: "GitHub", textRu: "GitHub" },
            { type: "youtube", url: "https://youtube.com/shorts/ySeRwMbyQSw?si=3eVpu5sxlmrunGiD", textEn: "YouTube", textRu: "YouTube" }
        ]
    },
    {
        id: 9,
        titleEn: "AI-Enhanced RAG System with Cross-Platform Extension",
        titleRu: "AI-Усиленная RAG Система с Кроссплатформенным Расширением",
        descEn: "Built a comprehensive RAG (Retrieval-Augmented Generation) system integrated into Google AI Studio via browser extension for PC and mobile. Features Qdrant vector database with Google Drive integration, automated data pipeline via Telegram bot, and n8n workflows deployed on custom domain (n8n.arsen.codes) using Cloudflare tunneling. Includes one-click automation script (start.bat) for Docker stack management and intelligent token cleaning algorithm that reduces context by ~70%.",
        descRu: "Разработал комплексную RAG (Retrieval-Augmented Generation) систему, интегрированную в Google AI Studio через браузерное расширение для ПК и мобильных устройств. Включает векторную базу данных Qdrant с интеграцией Google Drive, автоматизированный конвейер данных через Telegram-бота и n8n воркфлоу, развёрнутые на персональном домене (n8n.arsen.codes) с использованием Cloudflare туннелирования. Содержит скрипт автоматизации в один клик (start.bat) для управления Docker стеком и интеллектуальный алгоритм очистки токенов, сокращающий контекст на ~70%.",
        media: [
            { type: "image", src: "media/rag/RAG_extension.png", altEn: "RAG Mode Toggle in Google AI Studio", altRu: "Переключатель RAG режима в Google AI Studio" },
            { type: "image", src: "media/rag/n8n_look.png", altEn: "n8n Workflow Interface", altRu: "Интерфейс n8n Воркфлоу" },
            { type: "image", src: "media/rag/docker_n8n.png", altEn: "Docker Stack with n8n", altRu: "Docker Стек с n8n" },
            { type: "image", src: "media/rag/start_bat.png", altEn: "One-Click Automation Script", altRu: "Скрипт Автоматизации в Один Клик" },
            { type: "image", src: "media/rag/thought_process.png", altEn: "Token Cleaning Showcase", altRu: "Демонстрация Очистки Токенов" },
            { type: "image", src: "media/rag/tg_thought_cleaning.png", altEn: "Telegram Bot Command Menu", altRu: "Меню Команд Telegram Бота" }
        ],
        tech: ["Browser Extension", "Qdrant", "Google Drive API", "Telegram Bot API", "n8n", "Docker", "Cloudflare Tunnel", "Vector Embeddings", "RAG"],
        links: []
    },
    {
        id: 10,
        titleEn: "WhatsApp, Instagram, Telegram AI Bots",
        titleRu: "WhatsApp, Instagram, Telegram AI Боты",
        descEn: "Built three separate AI-powered automation bots for Instagram, Telegram, and WhatsApp that respond to messages from my personal accounts. Each bot is orchestrated through n8n workflows with platform-specific integrations: Instagram uses Meta's official APIs, Telegram uses Bot API, and WhatsApp is powered by Evolution API deployed in Docker. Demonstrates versatility in working with diverse messaging platform APIs and ability to create scalable automation solutions.",
        descRu: "Создал три отдельных AI-бота для автоматизации Instagram, Telegram и WhatsApp, отвечающих на сообщения от моих личных аккаунтов. Каждый бот управляется через n8n воркфлоу с платформо-специфичными интеграциями: Instagram использует официальные API Meta, Telegram использует Bot API, а WhatsApp работает на Evolution API, развёрнутом в Docker. Демонстрирует универсальность в работе с различными API платформ обмена сообщениями и способность создавать масштабируемые решения автоматизации.",
        media: [
            { type: "image", src: "media/instagram.png", altEn: "Instagram AI Bot in Action", altRu: "Instagram AI Бот в Действии" },
            { type: "image", src: "media/tg_example.jpg", altEn: "Telegram Bot Example", altRu: "Пример Telegram Бота" },
            { type: "image", src: "media/whatsapp.jpeg", altEn: "WhatsApp Bot Response", altRu: "Ответ WhatsApp Бота" }
        ],
        tech: ["Meta API", "Instagram API", "Telegram Bot API", "Evolution API", "WhatsApp", "Docker", "n8n", "AI/LLM Integration", "Workflow Automation"],
        links: []
    },
    {
        id: 11,
        titleEn: "Network Monitoring & GIS Platform — KazNetCom",
        titleRu: "Система Мониторинга Сети и GIS Платформа — KazNetCom",
        descEn: "During my DevOps internship at KazNetCom, managed a Dockerized Frigate NVR system with NVIDIA CUDA acceleration to optimize server performance. Built a comprehensive monitoring stack using Zabbix & Grafana with custom dashboards for real-time network infrastructure tracking. Integrated Telegram notifications for instant alerts on base station outages. Engineered a custom GIS platform combining OpenStreetMap/Yandex Maps with draw.io editor for interactive network diagram visualization.",
        descRu: "Во время стажировки DevOps-инженером в KazNetCom управлял Dockerized системой Frigate NVR с аппаратным ускорением NVIDIA CUDA для оптимизации производительности сервера. Создал комплексную систему мониторинга с использованием Zabbix & Grafana с пользовательскими дашбордами для отслеживания сетевой инфраструктуры в реальном времени. Интегрировал уведомления Telegram для мгновенных оповещений о сбоях базовых станций. Разработал кастомную GIS платформу, объединяющую OpenStreetMap/Yandex Maps с редактором draw.io для интерактивной визуализации сетевых диаграмм.",
        media: [
            { type: "image", src: "media/knc_freegate.png", altEn: "Frigate NVR System", altRu: "Система Frigate NVR" },
            { type: "image", src: "media/knc_map_uiux.png", altEn: "Custom GIS Platform UI/UX", altRu: "UI/UX Кастомной GIS Платформы" },
            { type: "image", src: "media/knc_map_inside_mufta.png", altEn: "Interactive Network Diagram Visualization", altRu: "Интерактивная Визуализация Сетевых Диаграмм" },
            { type: "image", src: "media/knc_tgbot.png", altEn: "Telegram Notification Bot", altRu: "Бот Уведомлений в Telegram" }
        ],
        tech: ["Docker", "Frigate NVR", "NVIDIA CUDA", "Zabbix", "Grafana", "Telegram API", "OpenStreetMap", "Yandex Maps", "draw.io", "Linux", "DevOps"],
        links: []
    },
    {
        id: 12,
        titleEn: "Enterprise AI Assistant & Data Pipeline — FinReg Agency",
        titleRu: "Корпоративный AI Ассистент и Конвейер Данных — FinReg",
        descEn: "Designed and implemented two end-to-end systems on the n8n platform during internship at Financial Regulatory Agency. Built a sophisticated RAG system for an AI assistant including full data pipeline: web scraping, text vectorization (embeddings), and storage/retrieval from PostgreSQL with PGVector extension. Developed automated report generation system integrating GLPI and Bitrix24 through reverse-engineered APIs and LLM-powered data extraction from .docx files (Ollama). Architected fault-tolerant asynchronous workflows using distributed locking mechanism in PostgreSQL to resolve race conditions. Implemented a PULL-based data retrieval model to bypass network security restrictions.",
        descRu: "Разработал и внедрил две комплексные системы на платформе n8n во время стажировки в Агентстве финансового регулирования. Создал продвинутую RAG систему для AI ассистента, включая полный конвейер данных: веб-скрейпинг, векторизацию текста (embeddings) и хранение/извлечение из PostgreSQL с расширением PGVector. Разработал систему автоматической генерации отчётов с интеграцией GLPI и Bitrix24 через реверс-инжиниринг API и извлечением структурированных данных из .docx файлов с помощью LLM (Ollama). Спроектировал отказоустойчивые асинхронные воркфлоу, используя механизм распределённых блокировок в PostgreSQL для решения состояний гонки. Реализовал PULL-модель получения данных для обхода ограничений сетевой безопасности.",
        media: [
            { type: "image", src: "media/agency_finduser.png", altEn: "AI Assistant User Search Interface", altRu: "Интерфейс Поиска Пользователей AI Ассистента" },
            { type: "image", src: "media/agency_finduser_result.png", altEn: "AI Assistant Search Results", altRu: "Результаты Поиска AI Ассистента" },
            { type: "image", src: "media/agency_glpi_ticket.png", altEn: "Automated GLPI Ticket Creation", altRu: "Автоматическое Создание Заявок в GLPI" },
            { type: "image", src: "media/agency_img_to_text.png", altEn: "LLM-Powered Data Extraction", altRu: "Извлечение Данных с Помощью LLM" }
        ],
        tech: ["n8n", "PostgreSQL", "PGVector", "RAG", "Web Scraping", "Embeddings", "GLPI", "Bitrix24", "Ollama", "LLM", "API Reverse Engineering", "Distributed Systems"],
        links: []
    }
];
