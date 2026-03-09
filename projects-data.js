// Projects Data Structure - Simplified Format
// To add a new project, simply add a new object to the array below
// Media types supported: 'image', 'video', 'youtube', 'audio'

const projectsData = [
    
    {
        id: 1,
        titleEn: "Development of multirobot painting control system with realtime monitoring",
        titleRu: "Разработка системы управления несколькими роботами для покраски с мониторингом в реальном времени",
        descEn: "An automated multirobot painting line that coordinates industrial manipulators, conveyor motion, and process monitoring in real time to improve efficiency, coating quality, and operator safety.",
        descRu: "Автоматизированная линия покраски с несколькими роботами, которая координирует работу промышленных манипуляторов, движение конвейера и мониторинг процесса в реальном времени для повышения эффективности, качества покрытия и безопасности операторов.",
        media: [
            { type: "image", src: "media/dev1.jpg", altEn: "Multirobot Painting System", altRu: "Система Многороботной Покраски" },
            { type: "youtube", url: "https://www.youtube.com/embed/7L7fTCguy7g", titleEn: "Course project", titleRu: "Курсовой проект" }
        ],
        tech: ["MATLAB", "TIA Portal", "Siemens PLC", "RoArm-M2-S", "KUKA", "PID", "Wi-Fi/HTTP", "Real-Time Monitoring"],
        links: [
            { type: "youtube", url: "https://www.youtube.com/embed/7L7fTCguy7g", textEn: "YouTube", textRu: "YouTube" },
            { type: "github", url: "https://github.com/rassulz/multirobot_painting_control_system", textEn: "GitHub", textRu: "GitHub" }
        ]
    },
    {
        id: 2,
        titleEn: "Self Balancing Twin-Propeller Inverted-Pendulum",
        titleRu: "Самобалансирующийся Инвертированный Маятник с Двойными Винтами",
        descEn: "A control project focused on implementing and tuning a PID controller for a self-balancing BLDC motor system, demonstrating feedback control, stability analysis, and real-time motor regulation.",
        descRu: "Проект по управлению, посвящённый реализации и настройке PID-контроллера для системы с бесщеточным двигателем, демонстрирующий управление с обратной связью, анализ устойчивости и регулирование двигателя в реальном времени.",
        media: [
            { type: "image", src: "media/prop.jpg", altEn: "Self Balancing Inverted Pendulum", altRu: "Самобалансирующийся Инвертированный Маятник" },
            { type: "youtube", url: "https://www.youtube.com/embed/7L7fTCguy7g", titleEn: "First video", titleRu: "Первое видео" }
        ],
        tech: ["Flask", "TMDB API", "Scikit-learn", "TF-IDF", "Cosine Similarity", "NLP", "Matplotlib", "Waitress", "Ngrok"],
        links: [
            { type: "github", url: "https://github.com/rassulz/pid_self_balance_bldc", textEn: "GitHub", textRu: "GitHub" },
            { type: "youtube", url: "https://youtu.be/BOMwI3oKbro", textEn: "YouTube", textRu: "YouTube" }
        ]
    },
    {
        id: 3,
        titleEn: "Machine Learning Integration with PLC for Industrial Process Control",
        titleRu: "Интеграция Машинообучения с PLC для Управления Промышленными Процессами",
        descEn: "An industrial automation project that integrates machine learning models with PLC systems using OPC UA, enabling data-driven quality prediction and intelligent process monitoring in an industrial environment.",
        descRu: "Промышленный проект автоматизации, который интегрирует модели машинного обучения с системами PLC с помощью OPC UA, обеспечивая предсказание качества на основе данных и интеллектуальный мониторинг процессов в промышленной среде.",
        media: [
            { type: "image", src: "media/PLC_ML_picture.png", altEn: "Machine Learning Integration with PLC", altRu: "Интеграция Машинообучения с PLC" }
        ],
        tech: ["HTML/CSS/JS", "Google Sheets API", "Google Forms", "Google Apps Script", "Analytics", "Bilingual", "Responsive Design"],
        links: [
            { type: "github", url: "https://github.com/almat777/ML_PLC_industry", textEn: "GitHub", textRu: "GitHub" },
            { type: "youtube", url: "https://youtube.com/shorts/U-6GGcndfKo", textEn: "YouTube", textRu: "YouTube" }
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
