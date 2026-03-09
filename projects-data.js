// Projects Data Structure - Simplified Format
// To add a new project, simply add a new object to the array below
// Media types supported: 'image', 'video', 'youtube', 'audio'

const projectsData = [
    
    {
        id: 6,
        titleEn: "Development of multirobot painting control system with realtime monitoring",
        titleRu: "Разработка системы управления несколькими роботами для покраски с мониторингом в реальном времени",
        descEn: "Development of a multirobot painting control system with realtime monitoring capabilities. The system allows for coordinated control of multiple robots during the painting process, ensuring consistent quality and efficiency.",
        descRu: "Разработка системы управления несколькими роботами для покраски с возможностью мониторинга в реальном времени. Система позволяет координировать действия нескольких роботов во время процесса покраски, обеспечивая согласованность качества и эффективность.",
        media: [
            { type: "image", src: "media/qysqa.png", altEn: "Qysqa AI Learning Platform", altRu: "Платформа для обучения с ИИ Qysqa" }
        ],
        tech: ["HTML/CSS/JS", "Gemini API", "Flask", "Python", "youtube-transcript-api", "BeautifulSoup4", "Document Processing"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/qysqa", textEn: "GitHub", textRu: "GitHub" },
            { type: "presentation", url: "https://www.canva.com/design/DAGnKoFN27Q/z6sDIdcEZAHixtGoYherAw/edit?utm_content=DAGnKoFN27Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 7,
        titleEn: "Movie Recommendation System",
        titleRu: "Система Рекомендации Фильмов",
        descEn: "Built a movie recommender with content-based filtering (TF-IDF + cosine similarity), with ability to watch trailers, user auth, dark/light mode, and an Akinator-style assistant. Processed 5,000+ TMDB movies with advanced NLP techniques for personalized recommendations.",
        descRu: "Разработал систему рекомендации фильмов с контентной фильтрацией (TF-IDF + косинусное сходство), с возможностью просмотра трейлеров, авторизацией пользователей, тёмной/светлой темой и помощником в стиле Akinator. Обработано более 5000 фильмов из TMDB с использованием продвинутых NLP техник для персонализированных рекомендаций.",
        media: [
            { type: "image", src: "media/popcorn (1).png", altEn: "Movie Recommendation System", altRu: "Система Рекомендации Фильмов" }
        ],
        tech: ["Flask", "TMDB API", "Scikit-learn", "TF-IDF", "Cosine Similarity", "NLP", "Matplotlib", "Waitress", "Ngrok"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/Movie-Recommendation-System-for-ML", textEn: "GitHub", textRu: "GitHub" },
            { type: "presentation", url: "https://www.canva.com/design/DAGnKi5m3TE/lA1QYrb8ai3ZamYxoTOMNg/edit?utm_content=DAGnKi5m3TE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" },
            { type: "documentation", url: "https://www.canva.com/design/DAGYi1dxqsQ/MlkfnETaGHBtzuR4I5AamQ/edit?utm_content=DAGYi1dxqsQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Documentation", textRu: "Документация" }
        ]
    },
    {
        id: 8,
        titleEn: "Personal Portfolio Website",
        titleRu: "Персональный Веб-сайт Портфолио",
        descEn: "Built a modern, responsive portfolio website featuring bilingual support (EN/RU), intelligent search with real-time highlighting, comprehensive analytics system, and integrated feedback collection. Includes dark theme, smooth animations, mobile-first design, and advanced lightbox with navigation for project images.",
        descRu: "Разработал современный адаптивный веб-сайт портфолио с двуязычной поддержкой (EN/RU), интеллектуальным поиском с подсветкой в реальном времени, комплексной системой аналитики и интегрированным сбором отзывов. Включает тёмную тему, плавные анимации, mobile-first дизайн и продвинутый лайтбокс с навигацией для изображений проектов.",
        media: [
            { type: "image", src: "media/portfolio.png", altEn: "Personal Portfolio Website", altRu: "Персональный Веб-сайт Портфолио" }
        ],
        tech: ["HTML/CSS/JS", "Google Sheets API", "Google Forms", "Google Apps Script", "Analytics", "Bilingual", "Responsive Design"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/personal-portfolio", textEn: "GitHub", textRu: "GitHub" },
            { type: "demo", url: "#", textEn: "Live Site", textRu: "Сайт" }
        ]
    },
    {
        id: 9,
        titleEn: "AI Human Tracking Camera",
        titleRu: "Камера с ИИ-отслеживанием Человека",
        descEn: "IoT camera system working on its own power supply with API for manual control, AI-powered human tracking, and voice control capabilities. Integrates ESP32 and Arduino Uno with computer vision algorithms for real-time human detection and automated tracking.",
        descRu: "IoT система камеры с собственным источником питания, API для ручного управления, ИИ-отслеживанием человека и голосовым управлением. Интегрирует ESP32 и Arduino Uno с алгоритмами компьютерного зрения для обнаружения людей в реальном времени и автоматического отслеживания.",
        media: [
            { type: "image", src: "media/esp32.jpg", altEn: "AI human tracking camera", altRu: "Камера с ИИ-отслеживанием человека" },
            { type: "youtube", url: "https://youtu.be/XqcitDN1cJ0", titleEn: "AI Camera Demo", titleRu: "Демо ИИ-камеры" }
        ],
        tech: ["ESP32", "Arduino Uno", "C#", "Python", "pyttsx3", "speech_recognition", "Computer Vision", "IoT", "Threading"],
        links: [
            { type: "youtube", url: "https://youtu.be/XqcitDN1cJ0?si=n_tiQgsUzuvXvrtY", textEn: "YouTube", textRu: "YouTube" },
            { type: "github", url: "https://github.com/Skyshmallow/esp32-cam", textEn: "Github", textRu: "Github" },
            { type: "presentation", url: "https://www.canva.com/design/DAGmRnk1kqE/oPWG_Vj-OcQYo4zj-ceDEQ/view?utm_content=DAGmRnk1kqE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3bfc266085", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 10,
        titleEn: "Online Bank Database",
        titleRu: "База Данных Онлайн-Банка",
        descEn: "Designed a Kaspi-style database with normalized schemas for customers, cards, loans, transactions, and accounts. Wrote 30+ optimized SQL queries, implemented triggers for automatic updates, and added indexes for performance optimization. Complete ER diagram and database architecture documentation.",
        descRu: "Разработал базу данных в стиле Kaspi с нормализованными схемами для клиентов, карт, кредитов, транзакций и счетов. Написал более 30 оптимизированных SQL запросов, реализовал триггеры для автоматических обновлений и добавил индексы для повышения производительности. Полная ER диаграмма и документация архитектуры базы данных.",
        media: [
            { type: "image", src: "media/p_bank.png", altEn: "Online Bank Database", altRu: "База Данных Онлайн-Банка" }
        ],
        tech: ["Oracle APEX", "SQL", "Database Design", "Normalization", "Triggers", "Indexing", "Java", "Miro", "Canva"],
        links: [
            { type: "presentation", url: "https://www.canva.com/design/DAGnKrudz-E/Jb7eJfVraFReA8v_S2Mx8w/edit?utm_content=DAGnKrudz-E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 11,
        titleEn: "Gesture Control Drawing",
        titleRu: "Рисование с Помощью Жестов",
        descEn: "Created an AI-powered hand gesture drawing application that tracks hand movements to create digital art. The system detects finger positions in real-time using MediaPipe and translates them into drawing commands or eraser functionality with OpenCV for image processing.",
        descRu: "Создал приложение для рисования жестами на основе ИИ, которое отслеживает движения рук для создания цифрового искусства. Система определяет положение пальцев в реальном времени с помощью MediaPipe и преобразует их в команды рисования или ластик с использованием OpenCV для обработки изображений.",
        media: [
            { type: "image", src: "media/gesture.jpg", altEn: "Gesture Control Drawing", altRu: "Рисование с помощью жестов" }
        ],
        tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Hand Tracking", "Real-time Processing"],
        links: [
            { type: "instagram", url: "https://www.instagram.com/p/DFf4ZYFsIH_/", textEn: "Instagram", textRu: "Instagram" }
        ]
    },
    {
        id: 12,
        titleEn: "DFS Traversal Animation",
        titleRu: "Анимация Алгоритма DFS",
        descEn: "Created an interactive DFS (Depth-First Search) visualizer with step-by-step animations, sound effects, and embedded YouTube explainer. Features responsive design, fully commented source code, and educational value for algorithm learning.",
        descRu: "Создал интерактивный визуализатор алгоритма поиска в глубину с пошаговыми анимациями, звуковыми эффектами и встроенным объяснением с YouTube. Включает адаптивный дизайн, полностью прокомментированный исходный код и образовательную ценность для изучения алгоритмов.",
        media: [
            { type: "image", src: "media/algorithm.png", altEn: "DFS Traversal Animation", altRu: "Анимация Алгоритма DFS" }
        ],
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "GitHub Pages", "Algorithm Visualization"],
        links: [
            { type: "demo", url: "https://skyshmallow.github.io/algos_project/", textEn: "Live Demo", textRu: "Демо" },
            { type: "presentation", url: "https://www.canva.com/design/DAGnKrfjVAM/YCGeO-OsgH0m1_y4LjEfcQ/edit?utm_content=DAGnKrfjVAM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton", textEn: "Presentation", textRu: "Презентация" }
        ]
    },
    {
        id: 13,
        titleEn: "Fisherman App",
        titleRu: "Приложение для Рыбака",
        descEn: "Android application developed using Android Studio with light and dark themes, adjustable text size for accessibility, and voice search powered by Google Speech Services. Demonstrates Android UI design, activity lifecycle management, and voice-based interaction integration.",
        descRu: "Android-приложение, разработанное в Android Studio со светлой и тёмной темами, настройкой размера текста для удобства пользователей и голосовым поиском с использованием Google Speech Services. Демонстрирует Android UI дизайн, управление жизненным циклом активностей и интеграцию голосового управления.",
        media: [
            { type: "image", src: "media/Fisherman.jpg", altEn: "Fisherman app", altRu: "Приложение для рыбака" },
            { type: "youtube", url: "https://youtube.com/shorts/ySeRwMbyQSw", titleEn: "Fisherman App Demo", titleRu: "Демо приложения Fisherman" }
        ],
        tech: ["Android Studio", "XML", "Java", "Google Speech Services", "Material Design", "Gradle"],
        links: [
            { type: "github", url: "https://github.com/Skyshmallow/Fisherman", textEn: "GitHub", textRu: "GitHub" },
            { type: "youtube", url: "https://youtube.com/shorts/ySeRwMbyQSw?si=3eVpu5sxlmrunGiD", textEn: "YouTube", textRu: "YouTube" }
        ]
    }
];
