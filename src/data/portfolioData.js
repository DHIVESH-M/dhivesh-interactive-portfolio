export const personalInfo = {
  name: "Dhivesh M",
  tagline: "Turning Ideas Into Intelligent Real-World Experiences.",
  role: "AI/ML Developer & Creative Technologist",
  education: {
    degree: "B.Sc. Artificial Intelligence and Machine Learning",
    institution: "Rathinam College of Arts and Science (Rathinam Global University)",
    year: "2nd Year Undergraduate (Expected 2028)",
    location: "Pollachi, Tamil Nadu, India"
  },
  bio: [
    "I am a passionate AI/ML developer and creative technologist based in Pollachi, Tamil Nadu. Rather than treating artificial intelligence as abstract theory, I focus on applying machine learning, intelligent algorithms, and real-time computing to solve practical challenges.",
    "My creative toolkit spans both logic and imagination — from developing core AI models and C/Java programs to crafting 3D assets in Blender, experimenting with interactive experiences in Unity, and designing responsive hardware systems with microcontrollers.",
    "Driven by curiosity and a hands-on builder mindset, I actively compete in innovation hackathons, construct end-to-end prototypes, and continuously explore emerging technologies."
  ],
  contacts: {
    email: "mdhivesh265@gmail.com",
    phone: "+91 80155 56443",
    location: "Pollachi, Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/dhivesh-m-198b74377",
    github: "https://github.com/DHIVESH-M",
    resumePdf: "/resume/resume.pdf"
  }
};

export const technicalSkills = [
  {
    category: "Programming",
    items: [
      {
        name: "Java",
        status: "Project Applied",
        description: "Object-oriented programming, data structures, application logic, and algorithm design.",
        icon: "java",
        experience: "Core"
      },
      {
        name: "C",
        status: "Project Applied",
        description: "Low-level memory management, systems programming, procedural algorithms, and embedded logic.",
        icon: "c",
        experience: "Foundational"
      },
      {
        name: "Python",
        status: "Project Applied",
        description: "Data processing, machine learning workflows, automation scripts, and neural model prototyping.",
        icon: "python",
        experience: "Core"
      }
    ]
  },
  {
    category: "Artificial Intelligence",
    items: [
      {
        name: "AI Model Building",
        status: "Project Applied",
        description: "Developing custom neural architectures, fine-tuning model parameters, and algorithmic evaluation.",
        icon: "brain-circuit",
        experience: "Specialized"
      },
      {
        name: "Real-Time Projects",
        status: "Project Applied",
        description: "Integrating intelligent decision models into real-time pipelines, sensor streams, and edge systems.",
        icon: "zap",
        experience: "Specialized"
      }
    ]
  },
  {
    category: "Creative Technologies",
    items: [
      {
        name: "Unity — Learning",
        status: "Learner",
        description: "Exploring real-time 3D simulation, interactive gameplay mechanics, spatial environments, and physics.",
        icon: "gamepad-2",
        experience: "Exploring"
      },
      {
        name: "Blender",
        status: "Project Applied",
        description: "3D polygonal modeling, scene composition, hard-surface modeling, asset texturing, and rendering.",
        icon: "cube",
        experience: "Intermediate"
      },
      {
        name: "Adobe Illustrator",
        status: "Project Applied",
        description: "Vector graphics creation, visual brand identity, UI iconography, and technical diagrams.",
        icon: "palette",
        experience: "Intermediate"
      }
    ]
  },
  {
    category: "Cloud Computing",
    items: [
      {
        name: "AWS — Learning",
        status: "Learner",
        description: "Understanding core cloud architecture, compute instances, cloud storage, and deployment fundamentals.",
        icon: "cloud",
        experience: "Exploring"
      }
    ]
  }
];

export const featuredProjects = [
  {
    id: "skillpath-ai",
    title: "SkillPath AI",
    badge: "AI Platform",
    tagline: "Personalized AI Learning & Adaptive Career Gap Intelligence",
    description: "An AI-powered learning and skill development platform designed with multi-agent orchestration. Analyzes user proficiency distributions, maps market-driven career gap metrics, and curates personalized bite-sized learning roadmaps with interactive 3D visualizations.",
    category: "Artificial Intelligence",
    status: "Active Prototype",
    technologies: ["AI Model Development", "Machine Learning", "Real-time AI", "Multi-Agent System"],
    githubUrl: "https://github.com/DHIVESH-M/skillpath-ai",
    liveDemo: null,
    highlights: [
      "Multi-agent architecture orchestrating 6 specialized AI evaluation agents",
      "Dynamic skill gap calibration against real-world AI career benchmarks",
      "Adaptive bite-sized learning trail with gamified checkpoints",
      "Interactive 3D constellation visualizer for skill dependencies"
    ],
    themeColor: "#00f0ff"
  },
  {
    id: "mindspace-ai",
    title: "Mindspace AI",
    badge: "Personal Assistant",
    tagline: "Intelligent Personal Assistant with Voice Interaction & Memory",
    description: "A comprehensive personal AI assistant featuring bidirectional voice interaction, curated morning news briefings, semantic memory retention, and proactive task assistance tailored to daily developer productivity.",
    category: "Artificial Intelligence",
    status: "Active Development",
    technologies: ["AI Model Development", "Real-time AI Projects", "Voice Computing", "Python"],
    githubUrl: "https://github.com/DHIVESH-M/project_jarvis",
    liveDemo: null,
    highlights: [
      "Natural voice synthesis and speech recognition interface",
      "Context-aware long-term memory buffer for conversational continuity",
      "Automated news briefing and weather telemetry aggregation",
      "Hands-free workflow automation triggers"
    ],
    themeColor: "#3b82f6"
  },
  {
    id: "worqiz",
    title: "WORQIZ",
    badge: "Marketplace Concept",
    tagline: "Decentralized Workforce Connection for Local Workers & Merchants",
    description: "A digital multi-sided platform concept connecting blue-collar workers, local field agents, and local shop owners. Streamlines on-demand service dispatch, local employment discovery, and merchant supply chains.",
    category: "Platform Concept",
    status: "Concept & Prototype",
    technologies: ["Java", "System Design", "Database Modeling", "Application Logic"],
    githubUrl: "https://github.com/DHIVESH-M/worqiz",
    liveDemo: null,
    highlights: [
      "Triangular user ecosystem connecting workers, agents, and merchants",
      "Localized proximity dispatch algorithms",
      "Transparent service rating and wage verification mechanisms",
      "Offline-first SMS and lightweight network support"
    ],
    themeColor: "#00f0ff"
  },
  {
    id: "aquashield",
    title: "AquaShield (Aegis-H2O)",
    badge: "IoT + AI Environmental",
    tagline: "Smart Wastewater Intelligence & Microfiber Particle Monitoring",
    description: "A smart environmental IoT filtration and telemetry project created for the Smart India Hackathon (SIH). Intercepts microplastic and microfiber pollution from commercial washing machine effluent using multi-stage filtration and real-time turbidity/sensor telemetry.",
    category: "Real-time AI & IoT",
    status: "SIH Finalist / Research",
    technologies: ["C", "Real-time AI Projects", "Blender", "IoT & Embedded C"],
    githubUrl: "https://github.com/Super-Clusters-sih/Aegis-H2O",
    liveDemo: null,
    highlights: [
      "Multi-layer physical particle interception engineered for wastewater lines",
      "Real-time sensor telemetry with ESP32 microcontrollers and embedded C",
      "Blender 3D industrial housing and fluid dynamics visualization",
      "Predictive filter saturation alerts and maintenance scheduling"
    ],
    themeColor: "#38bdf8"
  },
  {
    id: "namma-ooru-vivasai",
    title: "Namma Ooru Vivasai",
    badge: "AgriTech Concept",
    tagline: "Direct Rural Agricultural Marketplace for Farmers & Buyers",
    description: "A rural agricultural marketplace platform connecting local farmers directly with bulk buyers, urban consumers, and cooperative markets. Eliminates exploitative intermediary layers and ensures fair trade transparency.",
    category: "AgriTech Concept",
    status: "Prototype Tested",
    technologies: ["Java", "System Architecture", "Adobe Illustrator", "Data Flow"],
    githubUrl: "https://github.com/DHIVESH-M/oru-village",
    liveDemo: null,
    highlights: [
      "Zero-middleman marketplace connecting agrarian producers to commercial buyers",
      "Bilingual interface designed specifically for rural usability",
      "Real-time regional mandi price telemetry and harvest forecasting",
      "Vector branding and intuitive agricultural iconography"
    ],
    themeColor: "#10b981"
  },
  {
    id: "road-safety-sos",
    title: "Road Safety SOS (DRONE-036)",
    badge: "Hardware & Safety",
    tagline: "Emergency Crash Detection & Automated Highway Beaconing System",
    description: "An emergency road safety hardware project engineered for rapid highway accident response. Combines accelerometer impact sensors, GPS telemetry, and automatic SOS beacon dispatch to notify emergency responders within seconds of an incident.",
    category: "Hardware & Safety",
    status: "Hardware Prototype",
    technologies: ["C", "Real-time AI Projects", "Embedded Systems", "Hardware Architecture"],
    githubUrl: "https://github.com/DHIVESH-M/DRONE-036",
    liveDemo: null,
    highlights: [
      "Instantaneous deceleration and impact vector classification",
      "Autonomous cellular/satellite emergency SOS coordinate transmission",
      "Fail-safe power backup and anti-shock enclosure design",
      "Integrated distress beacon for high-speed highway visibility"
    ],
    themeColor: "#f59e0b"
  }
];

export const learningJourney = [
  {
    stage: "Phase 01",
    title: "Foundations in C & Java",
    timeframe: "Core Foundation",
    status: "Mastered in Projects",
    description: "Mastered fundamental computer science principles, procedural problem-solving in C, and object-oriented architectural patterns in Java. Built CLI utilities, memory management routines, and algorithmic problem-solving models.",
    skills: ["C Programming", "Java Programming", "Data Structures", "Algorithms"]
  },
  {
    stage: "Phase 02",
    title: "Artificial Intelligence & ML",
    timeframe: "Specialization",
    status: "Active Application",
    description: "Dove deep into machine learning mathematics, neural networks, supervised/unsupervised model training, and feature extraction. Applied AI to text analysis, predictive analytics, and classification tasks.",
    skills: ["Machine Learning", "AI Model Development", "Data Pipelines", "Model Evaluation"]
  },
  {
    stage: "Phase 03",
    title: "Real-Time AI & Hardware Systems",
    timeframe: "Applied Engineering",
    status: "Hackathons & Prototypes",
    description: "Bridged software intelligence with physical hardware. Built IoT sensor integration for AquaShield (microplastic filtration) and emergency distress systems for Road Safety SOS using embedded C and microcontrollers.",
    skills: ["Real-time AI Projects", "Embedded C", "IoT Telemetry", "Hardware Integration"]
  },
  {
    stage: "Phase 04",
    title: "3D Design & Interactive Tech",
    timeframe: "Creative Exploration",
    status: "Active Learner & Creator",
    description: "Expanded into visual and interactive dimensions. Creating 3D models and hard-surface prototypes in Blender, crafting vector graphics in Adobe Illustrator, and exploring interactive 3D simulations in Unity.",
    skills: ["Blender", "Adobe Illustrator", "Unity (Learner)", "3D Spatial Design"]
  },
  {
    stage: "Phase 05",
    title: "Cloud Computing & Scalability",
    timeframe: "Expanding Horizons",
    status: "Active Learner",
    description: "Expanding into cloud architecture, scalable compute deployment, and model hosting fundamentals on Amazon Web Services (AWS).",
    skills: ["AWS (Learner)", "Cloud Storage", "Compute Fundamentals", "Deployment"]
  }
];

export const heroGlassFragments = [
  { id: 1, label: "Java", category: "Programming", top: "18%", left: "14%", rotate: "-8deg", delay: 0.1 },
  { id: 2, label: "Python", category: "Programming", top: "22%", left: "46%", rotate: "4deg", delay: 0.2 },
  { id: 3, label: "C Language", category: "Programming", top: "26%", left: "78%", rotate: "12deg", delay: 0.3 },
  { id: 4, label: "AI Model Building", category: "Artificial Intelligence", top: "42%", left: "10%", rotate: "6deg", delay: 0.4 },
  { id: 5, label: "Real-Time Projects", category: "Artificial Intelligence", top: "68%", left: "16%", rotate: "-14deg", delay: 0.5 },
  { id: 6, label: "Blender 3D", category: "Creative", top: "54%", left: "84%", rotate: "-6deg", delay: 0.6 },
  { id: 7, label: "Unity — Learning", category: "Creative", top: "84%", left: "34%", rotate: "8deg", delay: 0.7 },
  { id: 8, label: "Adobe Illustrator", category: "Creative", top: "82%", left: "64%", rotate: "-10deg", delay: 0.8 },
  { id: 9, label: "AWS — Learning", category: "Cloud", top: "72%", left: "82%", rotate: "10deg", delay: 0.9 },
];
