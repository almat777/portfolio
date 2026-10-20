// Projects Data Structure - Simplified Format
// To add a new project, simply add a new object to the array below
// Media types supported: 'image', 'video', 'youtube', 'audio'

const projectsData = [

    {
        id: 1,
        featured: true,
        cover: "media/diploma/render_laboratory_cell.png",
        coverAltEn: "Laboratory painting cell design",
        coverAltRu: "Модель лабораторной покрасочной ячейки",
        contributionLabelEn: "My contribution: PLC · SCADA · KUKA",
        contributionLabelRu: "Мой вклад: PLC · SCADA · KUKA",
        year: "2026",
        categoryEn: "Graduation project · KBTU",
        categoryRu: "Дипломный проект · КБТУ",
        titleEn: "Multirobot Painting Control System",
        titleRu: "Система управления роботизированной покраской",
        subtitleEn: "Two painting arms. One KUKA. A coordinated production cycle.",
        subtitleRu: "Два покрасочных манипулятора, KUKA и единый рабочий цикл.",
        descEn: "A laboratory cell that connects two RoArm-M2-S painting arms, a KUKA robot and a conveyor through Siemens PLC control and MATLAB supervision.",
        descRu: "Лабораторная ячейка, объединяющая два покрасочных RoArm-M2-S, робот KUKA и конвейер под управлением Siemens PLC и MATLAB.",
        detailsEn: [
            { title: "My contribution", text: "I worked on PLC control, SCADA and the KUKA robot subsystem within the team project." },
            { title: "The process", text: "Parts move through painting, drying and unloading. Two arms paint together; the KUKA transfers the finished part from the conveyor." },
            { title: "Control architecture", text: "The S7-1500 sequences the equipment and conveyor PID. MATLAB and Simulink coordinate robot tasks using PLC sensor states over OPC UA." },
            { title: "Robot motion", text: "The RoArm application plans zig-zag painting paths over HTTP/JSON. KUKA pick-and-place uses smooth trajectories and a TCP/IP handshake through KukaVarProxy." },
            { title: "Operator view", text: "WinCC screens show the process, operating modes, alarms and conveyor control. MATLAB interfaces provide trajectory previews and live robot telemetry." },
            { title: "Team", text: "KBTU graduation project by Almat Abdimalik, Rassul Zeinulla, Collins Masimba and Ayan Rakhmetkali, supervised by T. I. Samigulin." }
        ],
        detailsRu: [
            { title: "Мой вклад", text: "Моя зона работы в командном проекте — управление на PLC, SCADA и подсистема робота KUKA." },
            { title: "Рабочий цикл", text: "Деталь проходит покраску, сушку и разгрузку. Два манипулятора красят одновременно, затем KUKA переносит готовую деталь с конвейера." },
            { title: "Архитектура управления", text: "S7-1500 управляет последовательностью операций и PID-регулятором конвейера. MATLAB и Simulink координируют роботов по состояниям датчиков PLC через OPC UA." },
            { title: "Движение роботов", text: "Приложение RoArm строит зигзагообразные траектории покраски и передаёт команды по HTTP/JSON. KUKA выполняет плавное перемещение через TCP/IP и KukaVarProxy." },
            { title: "Интерфейс оператора", text: "Экраны WinCC отображают процесс, режимы, аварии и управление конвейером. Интерфейсы MATLAB показывают траектории и текущую телеметрию роботов." },
            { title: "Команда", text: "Дипломный проект КБТУ: Almat Abdimalik, Rassul Zeinulla, Collins Masimba и Ayan Rakhmetkali. Руководитель — Т. И. Самигулин." }
        ],
        media: [
            { type: "image", src: "media/dev1.jpg", altEn: "Multirobot Painting System", altRu: "Система Многороботной Покраски" },
            { type: "image", src: "media/diploma/Physical_System_Implementation.png", altEn: "Physical laboratory painting cell", altRu: "Собранная лабораторная покрасочная ячейка" },
            { type: "image", src: "media/diploma/render_laboratory_cell.png", altEn: "Laboratory cell design", altRu: "Модель лабораторной ячейки" },
            { type: "image", src: "media/diploma/gui_kuka_pickplace.jpg", altEn: "MATLAB KUKA pick-and-place interface", altRu: "Интерфейс перемещения KUKA в MATLAB" },
            { type: "image", src: "media/diploma/gui_roarm_painting.jpg", altEn: "Dual-arm painting interface", altRu: "Интерфейс управления двумя покрасочными манипуляторами" },
            { type: "image", src: "media/diploma/hmi_control_panel.jpg", altEn: "WinCC operator control panel", altRu: "Панель оператора WinCC" },
            { type: "image", src: "media/diploma/architecture_block_diagram.png", altEn: "Painting cell control architecture", altRu: "Архитектура управления покрасочной ячейкой" },
            { type: "youtube", url: "https://www.youtube.com/embed/CDdXuiCqLzY", titleEn: "Full system demonstration", titleRu: "Демонстрация всей системы" }
        ],
        tech: ["MATLAB", "Simulink", "TIA Portal V19", "Siemens S7-1500", "WinCC", "OPC UA", "RoArm-M2-S", "KUKA", "PID", "HTTP/JSON", "KukaVarProxy"],
        links: [
            { type: "youtube", url: "https://youtu.be/CDdXuiCqLzY", textEn: "Watch demo", textRu: "Демонстрация" },
            { type: "github", url: "https://github.com/rassulz/multirobot_painting_control_system", textEn: "GitHub", textRu: "GitHub" },
            { type: "document", url: "https://github.com/rassulz/multirobot_painting_control_system/blob/main/docs/Diploma_Final.pdf", textEn: "Thesis · PDF", textRu: "Диплом · PDF" },
            { type: "presentation", url: "https://github.com/rassulz/multirobot_painting_control_system/blob/main/docs/Diploma_presentation.pdf", textEn: "Slides · PDF", textRu: "Презентация · PDF" }
        ]
    },
    {
        id: 2,
        featured: false,
        categoryEn: "Feedback control",
        categoryRu: "Автоматическое управление",
        titleEn: "Self-balancing Twin-Propeller System",
        titleRu: "Балансирующая система с двумя винтами",
        subtitleEn: "From tilt sensing to motor control.",
        subtitleRu: "От измерения наклона до управления двигателями.",
        descEn: "A control project focused on implementing and tuning a PID controller for a self-balancing BLDC motor system, demonstrating feedback control, stability analysis, and real-time motor regulation.",
        descRu: "Проект по управлению, посвящённый реализации и настройке PID-контроллера для системы с бесщеточным двигателем, демонстрирующий управление с обратной связью, анализ устойчивости и регулирование двигателя в реальном времени.",
        detailsEn: [
            { title: "Control problem", text: "Balance a twin-propeller system by correcting its tilt with feedback from an MPU-6050 inertial sensor." },
            { title: "Embedded loop", text: "An Arduino Uno estimates tilt with a complementary filter, runs PID control and sends PWM commands to the two BLDC motor controllers." },
            { title: "Model and hardware", text: "The project includes a MATLAB/Simulink model, Simscape Electrical motor simulation and Fusion 360 files for the printed frame." }
        ],
        detailsRu: [
            { title: "Задача управления", text: "Удерживать равновесие системы с двумя винтами, корректируя наклон по обратной связи от инерциального датчика MPU-6050." },
            { title: "Встроенный регулятор", text: "Arduino Uno оценивает наклон комплементарным фильтром, выполняет PID-регулирование и передаёт PWM-команды двум контроллерам BLDC-двигателей." },
            { title: "Модель и конструкция", text: "Проект включает модель MATLAB/Simulink, моделирование двигателя в Simscape Electrical и файлы Fusion 360 для печатной рамы." }
        ],
        media: [
            { type: "image", src: "media/prop.jpg", altEn: "Self Balancing Inverted Pendulum", altRu: "Самобалансирующийся Инвертированный Маятник" },
            { type: "youtube", url: "https://www.youtube.com/embed/BOMwI3oKbro", titleEn: "Balancing system demonstration", titleRu: "Демонстрация балансирующей системы" }
        ],
        tech: ["Arduino Uno", "MPU-6050", "BLDC + ESC", "PID Control", "C++", "MATLAB/Simulink", "Simscape Electrical", "Fusion 360"],
        links: [
            { type: "github", url: "https://github.com/rassulz/pid_self_balance_bldc", textEn: "GitHub", textRu: "GitHub" },
            { type: "youtube", url: "https://youtu.be/BOMwI3oKbro", textEn: "YouTube", textRu: "YouTube" }
        ]
    },
    {
        id: 3,
        featured: false,
        categoryEn: "Industrial machine learning",
        categoryRu: "Машинное обучение в промышленности",
        titleEn: "Machine Learning for Industrial Processes",
        titleRu: "Машинное обучение в промышленных процессах",
        subtitleEn: "Product quality prediction meets industrial data.",
        subtitleRu: "Прогноз качества на основе промышленных данных.",
        descEn: "A quality-prediction study using iron-ore flotation data, Python regression models and a PLC communication concept based on MATLAB and OPC UA.",
        descRu: "Прогноз качества по данным флотации железной руды: регрессионные модели Python и концепция связи с PLC через MATLAB и OPC UA.",
        detailsEn: [
            { title: "Industrial question", text: "Predict silica concentration in iron concentrate from process measurements in the Quality Prediction in a Mining Process dataset." },
            { title: "Data and models", text: "The Python workflow explores the data and compares Linear Regression with Random Forest using MAE, MSE and R²." },
            { title: "Automation connection", text: "MATLAB acts as the OPC UA client in the PLC integration concept. Predictions support monitoring and operator decisions." },
            { title: "Team", text: "Project by Almat Abdimalik and Rassul Zeinulla." }
        ],
        detailsRu: [
            { title: "Промышленная задача", text: "Прогнозировать содержание кремнезёма в железном концентрате по измерениям из набора Quality Prediction in a Mining Process." },
            { title: "Данные и модели", text: "Python используется для анализа данных и сравнения Linear Regression с Random Forest по MAE, MSE и R²." },
            { title: "Связь с автоматизацией", text: "В концепции интеграции с PLC MATLAB выступает клиентом OPC UA. Прогнозы помогают мониторингу и принятию решений оператором." },
            { title: "Команда", text: "Авторы проекта — Almat Abdimalik и Rassul Zeinulla." }
        ],
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
        featured: false,
        categoryEn: "Technical documentation",
        categoryRu: "Техническая документация",
        titleEn: "Siemens SIMIT Digital Twin Guide",
        titleRu: "Методическое руководство по программе Simit Digital Twin",
        subtitleEn: "A practical reference for industrial simulation.",
        subtitleRu: "Практическое руководство по промышленной симуляции.",
        descEn: "A comprehensive methodological manual for the Simit Digital Twin software for KBTU, providing detailed instructions and best practices for using the platform in industrial simulation and modeling.",
        descRu: "Полное методическое руководство по программе Simit Digital Twin для KBTU, предоставляющее подробные инструкции и лучшие практики для использования платформы в промышленной симуляции и моделировании.",
        detailsEn: [
            { title: "Purpose", text: "A methodological resource for using Siemens SIMIT in educational work at KBTU." },
            { title: "Focus", text: "Industrial process simulation, digital twins and virtual commissioning." },
            { title: "Toolset", text: "Siemens SIMIT, TIA Portal and PLCSIM Advanced connect process modeling with the automation environment." }
        ],
        detailsRu: [
            { title: "Назначение", text: "Методический материал по использованию Siemens SIMIT в учебной работе КБТУ." },
            { title: "Тематика", text: "Симуляция промышленных процессов, цифровые двойники и виртуальная пусконаладка." },
            { title: "Инструменты", text: "Siemens SIMIT, TIA Portal и PLCSIM Advanced связывают моделирование процесса со средой автоматизации." }
        ],
        media: [
            { type: "image", src: "media/simit.jpeg", altEn: "Simit Digital Twin", altRu: "Simit Digital Twin" },
        ],
        tech: ["Siemens SIMIT", "Digital Twin", "Industrial Simulation", "Virtual Commissioning", "TIA Portal", "PLCSIM Advanced", "Technical Writing", "Process Modeling"],


    },
    {
        id: 5,
        featured: false,
        categoryEn: "Technical documentation",
        categoryRu: "Техническая документация",
        titleEn: "Siemens S7-1500 Programming Guide",
        titleRu: "Методическое руководство по программированию S7-1500 PLC",
        subtitleEn: "Structured guidance for Siemens PLC programming.",
        subtitleRu: "Системное руководство по программированию Siemens PLC.",
        descEn: "A comprehensive methodological manual for the S7-1500 PLC programming for KBTU, providing detailed instructions and best practices for using the platform in industrial automation and control.",
        descRu: "Полное методическое руководство по программированию S7-1500 PLC для KBTU, предоставляющее подробные инструкции и лучшие практики для использования платформы в промышленной автоматизации и управлении.",
        detailsEn: [
            { title: "Purpose", text: "A methodological guide to Siemens S7-1500 programming for KBTU." },
            { title: "Programming tools", text: "TIA Portal, LAD/FBD/SCL and S7-GRAPH form the project's PLC programming toolset." },
            { title: "Automation context", text: "The project brings together PLC control, WinCC/HMI and PID regulation in an industrial automation context." }
        ],
        detailsRu: [
            { title: "Назначение", text: "Методическое руководство по программированию Siemens S7-1500 для КБТУ." },
            { title: "Средства программирования", text: "Инструменты проекта: TIA Portal, LAD/FBD/SCL и S7-GRAPH." },
            { title: "Контекст автоматизации", text: "Проект объединяет управление на PLC, WinCC/HMI и PID-регулирование в контексте промышленной автоматизации." }
        ],
        media: [
            { type: "image", src: "media/manual_1500.jpeg", altEn: "S7-1500 PLC Programming", altRu: "Программирование S7-1500 PLC" }
        ],
        tech: ["Siemens S7-1500", "TIA Portal", "LAD/FBD/SCL", "S7-GRAPH", "WinCC", "PID Control", "Industrial Automation", "HMI", "Control Systems", "Technical Writing"],

    }

];
