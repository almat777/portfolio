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
        tech: ["Arduino Uno", "MPU-6050", "BLDC + ESC", "PID Control", "C++", "MATLAB/Simulink", "Simscape Electrical", "Fusion 360"],
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
        tech: ["Python", "MATLAB", "OPC UA", "Siemens PLC", "Jupyter Notebook", "scikit-learn", "pandas", "NumPy", "matplotlib", "seaborn", "Random Forest", "Linear Regression"],
        links: [
            { type: "github", url: "https://github.com/almat777/ML_PLC_industry", textEn: "GitHub", textRu: "GitHub" },
            { type: "youtube", url: "https://youtube.com/shorts/U-6GGcndfKo", textEn: "YouTube", textRu: "YouTube" }
        ]
    },
    {
        id: 4,
        titleEn: "Methodological Manual for Simit Digital Twin Software",
        titleRu: "Методическое руководство по программе Simit Digital Twin",
        descEn: "A comprehensive methodological manual for the Simit Digital Twin software for KBTU, providing detailed instructions and best practices for using the platform in industrial simulation and modeling.",
        descRu: "Полное методическое руководство по программе Simit Digital Twin для KBTU, предоставляющее подробные инструкции и лучшие практики для использования платформы в промышленной симуляции и моделировании.",
        media: [
            { type: "image", src: "media/simit.jpeg", altEn: "Simit Digital Twin", altRu: "Simit Digital Twin" },
        ],
        tech: ["Siemens SIMIT", "Digital Twin", "Industrial Simulation", "Virtual Commissioning", "TIA Portal", "PLCSIM Advanced", "Technical Writing", "Process Modeling"],
        
    
    },
    {
        id: 5,
        titleEn: "Methodological Manual for S7-1500 PLC Programming",
        titleRu: "Методическое руководство по программированию S7-1500 PLC",
        descEn: "A comprehensive methodological manual for the S7-1500 PLC programming for KBTU, providing detailed instructions and best practices for using the platform in industrial automation and control.",
        descRu: "Полное методическое руководство по программированию S7-1500 PLC для KBTU, предоставляющее подробные инструкции и лучшие практики для использования платформы в промышленной автоматизации и управлении.",
        media: [
            { type: "image", src: "media/manual_1500.jpeg", altEn: "S7-1500 PLC Programming", altRu: "Программирование S7-1500 PLC" }
        ],
        tech: ["Siemens S7-1500", "TIA Portal", "LAD/FBD/SCL", "S7-GRAPH", "WinCC", "PID Control", "Industrial Automation", "HMI", "Control Systems", "Technical Writing"],
        
    }
    
];
