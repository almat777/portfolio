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
    }
];
