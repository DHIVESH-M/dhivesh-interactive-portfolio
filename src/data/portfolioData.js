export const personalInfo = {
  name: "Dhivesh M",
  tagline: "Turning Ideas Into Intelligent Real-World Experiences.",
  role: "B.Sc. Artificial Intelligence & Machine Learning Student",
  subRole: "AI/ML Developer | Creative Technologist",
  education: {
    degree: "B.Sc. Artificial Intelligence and Machine Learning",
    institution: "Rathinam College of Arts and Science (Rathinam Global University)",
    year: "2nd Year Undergraduate (Expected 2028)",
    location: "Pollachi, Tamil Nadu, India"
  },
  bio: [
    "I'm a second-year B.Sc. Artificial Intelligence and Machine Learning student at Rathinam Global University, passionate about AI model development, real-time edge computing, IoT, and emerging interactive technology.",
    "Rather than treating artificial intelligence as abstract theory, I focus on applying machine learning algorithms, telemetry hardware, and interactive software to solve genuine challenges.",
    "Driven by curiosity and a hands-on builder mindset, I actively compete in innovation hackathons, construct end-to-end prototypes, and continuously explore emerging technologies."
  ],
  contacts: {
    email: "mdhivesh265@gmail.com",
    phone: "+91 80155 56443",
    location: "Pollachi, Coimbatore, Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/dhivesh-m-198b74377",
    github: "https://github.com/DHIVESH-M",
    resumePdf: "/resume/resume.pdf"
  }
};

// Skills with Animated Progress Bar Data (Visual Placeholders - Easy to Edit)
export const skillsWithPercentages = [
  {
    category: "Programming",
    skills: [
      { id: "java", name: "Java", pct: 75, icon: "fa-mug-hot", desc: "Object-oriented programming, data structures, application logic, and algorithm design.", status: "Core Expertise" },
      { id: "c", name: "C", pct: 70, icon: "fa-code", desc: "Low-level memory management, systems programming, and embedded firmware logic.", status: "Foundational" },
      { id: "python", name: "Python", pct: 80, icon: "fa-python", desc: "Data processing, machine learning workflows, automation scripts, and neural model prototyping.", status: "Core Language" }
    ]
  },
  {
    category: "AI & Machine Learning",
    skills: [
      { id: "ai-models", name: "AI Model Building", pct: 75, icon: "fa-brain", desc: "Developing custom neural architectures, fine-tuning hyperparameters, and model evaluation.", status: "Applied Domain" },
      { id: "ml", name: "Machine Learning", pct: 72, icon: "fa-robot", desc: "Supervised and unsupervised learning, regression, classification, and feature engineering.", status: "Applied Domain" },
      { id: "realtime-ai", name: "Real-Time AI Projects", pct: 70, icon: "fa-bolt", desc: "Integrating intelligent decision models into real-time pipelines, sensor streams, and edge systems.", status: "Applied Systems" }
    ]
  },
  {
    category: "Creative & Development Tools",
    skills: [
      { id: "blender", name: "Blender", pct: 55, icon: "fa-cube", desc: "3D polygonal modeling, asset creation, scene composition, and spatial texturing.", status: "Intermediate" },
      { id: "illustrator", name: "Adobe Illustrator", pct: 85, icon: "fa-palette", desc: "Vector graphics creation, visual brand identity, UI iconography, and technical schematics.", status: "Intermediate" },
      { id: "unity", name: "Unity — Learning", pct: 40, icon: "fa-gamepad", desc: "Exploring real-time 3D simulation, interactive physics, and virtual game mechanics.", status: "Active Learning" },
      { id: "aws", name: "AWS — Learning", pct: 45, icon: "fa-cloud", desc: "Understanding cloud computing instances, S3 storage, and deployment fundamentals.", status: "Active Learning" }
    ]
  }
];

export const technicalSkills = [
  {
    category: "Programming",
    items: [
      { name: "Java", status: "Project Applied", description: "Object-oriented programming, data structures, application logic, and algorithm design.", icon: "java", experience: "Core" },
      { name: "C", status: "Project Applied", description: "Low-level memory management, systems programming, procedural algorithms, and embedded logic.", icon: "c", experience: "Foundational" },
      { name: "Python", status: "Project Applied", description: "Data processing, machine learning workflows, automation scripts, and neural model prototyping.", icon: "python", experience: "Core" }
    ]
  },
  {
    category: "Artificial Intelligence",
    items: [
      { name: "AI Model Building", status: "Project Applied", description: "Developing custom neural architectures, fine-tuning model parameters, and algorithmic evaluation.", icon: "brain-circuit", experience: "Specialized" },
      { name: "Real-Time Projects", status: "Project Applied", description: "Integrating intelligent decision models into real-time pipelines, sensor streams, and edge systems.", icon: "zap", experience: "Specialized" }
    ]
  },
  {
    category: "Creative Technologies",
    items: [
      { name: "Unity — Learning", status: "Learner", description: "Exploring real-time 3D simulation, interactive gameplay mechanics, spatial environments, and physics.", icon: "gamepad-2", experience: "Exploring" },
      { name: "Blender", status: "Project Applied", description: "3D polygonal modeling, scene composition, hard-surface modeling, asset texturing, and rendering.", icon: "cube", experience: "Intermediate" },
      { name: "Adobe Illustrator", status: "Project Applied", description: "Vector graphics creation, visual brand identity, UI iconography, and technical diagrams.", icon: "palette", experience: "Intermediate" }
    ]
  },
  {
    category: "Cloud Computing",
    items: [
      { name: "AWS — Learning", status: "Learner", description: "Understanding core cloud architecture, compute instances, cloud storage, and deployment fundamentals.", icon: "cloud", experience: "Exploring" }
    ]
  }
];

export const featuredProjects = [
  {
    id: "skillpath-ai",
    title: "SkillPath AI",
    badge: "AI Platform",
    category: "AI & Machine Learning",
    tagline: "Personalized AI Learning & Adaptive Career Gap Intelligence",
    description: "An AI-powered learning and skill development platform designed with multi-agent orchestration. Analyzes user proficiency distributions, maps market-driven career gap metrics, and curates personalized bite-sized learning roadmaps with interactive visualizations.",
    image: "/assets/projects/skillpath-ai.svg",
    status: "Active Prototype",
    featured: true,
    technologies: ["AI Model Development", "Machine Learning", "Real-time AI", "Multi-Agent System"],
    githubUrl: "https://github.com/DHIVESH-M/skillpath-ai",
    liveDemo: null,
    highlights: [
      "Multi-agent architecture orchestrating specialized AI evaluation agents",
      "Dynamic skill gap calibration against real-world AI career benchmarks",
      "Adaptive bite-sized learning trail with gamified checkpoints",
      "Interactive dependency visualizer for technical competencies"
    ],
    themeColor: "#5b8cff"
  },
  {
    id: "mindspace-ai",
    title: "Mindspace AI",
    badge: "Personal Assistant",
    category: "AI & Machine Learning",
    tagline: "Intelligent Personal Assistant with Cognitive Interaction & Memory",
    description: "A comprehensive personal AI assistant featuring voice interaction, curated intelligence briefings, semantic memory retention, and proactive task assistance tailored to daily developer productivity.",
    image: "/assets/projects/mindspace-ai.svg",
    status: "Active Development",
    featured: true,
    technologies: ["AI Model Development", "Real-time AI Projects", "Voice Computing", "Python"],
    githubUrl: "https://github.com/DHIVESH-M/project_jarvis",
    liveDemo: null,
    highlights: [
      "Natural voice synthesis and speech recognition interface",
      "Context-aware long-term memory buffer for conversational continuity",
      "Automated news briefing and weather telemetry aggregation",
      "Hands-free workflow automation triggers"
    ],
    themeColor: "#9b6bff"
  },
  {
    id: "worqiz",
    title: "WORQIZ",
    badge: "Marketplace Concept",
    category: "Web & Platforms",
    tagline: "Decentralized Workforce Connection for Local Workers & Merchants",
    description: "A digital multi-sided platform concept connecting blue-collar workers, local field agents, and local shop owners. Streamlines on-demand service dispatch, local employment discovery, and merchant supply chains.",
    image: "/assets/projects/worqiz.svg",
    status: "Concept & Prototype",
    featured: true,
    technologies: ["Java", "System Design", "Database Modeling", "Application Logic"],
    githubUrl: "https://github.com/DHIVESH-M/worqiz",
    liveDemo: null,
    highlights: [
      "Triangular user ecosystem connecting workers, agents, and merchants",
      "Localized proximity dispatch algorithms",
      "Transparent service rating and wage verification mechanisms",
      "Offline-first SMS and lightweight network support"
    ],
    themeColor: "#5be6ff"
  },
  {
    id: "aquashield",
    title: "AquaShield (Aegis-H2O)",
    badge: "IoT + Sustainability",
    category: "IoT & Hardware",
    tagline: "Smart Wastewater Intelligence & Microfiber Particle Monitoring",
    description: "A smart environmental IoT filtration and telemetry project created for the Smart India Hackathon (SIH). Intercepts microplastic and microfiber pollution from commercial washing machine effluent using multi-stage filtration and real-time turbidity/sensor telemetry.",
    image: "/assets/projects/aquashield.svg",
    status: "SIH Finalist / Research",
    featured: true,
    technologies: ["C", "Real-time AI Projects", "Blender", "IoT & Embedded C"],
    githubUrl: "https://github.com/Super-Clusters-sih/Aegis-H2O",
    liveDemo: null,
    highlights: [
      "Multi-layer physical particle interception engineered for wastewater lines",
      "Real-time sensor telemetry with ESP32 microcontrollers and embedded C",
      "Blender 3D industrial housing and fluid dynamics visualization",
      "Predictive filter saturation alerts and maintenance scheduling"
    ],
    themeColor: "#00f0ff"
  },
  {
    id: "namma-ooru-vivasai",
    title: "Namma Ooru Vivasai",
    badge: "AgriTech Concept",
    category: "Web & Platforms",
    tagline: "Direct Rural Agricultural Marketplace for Farmers & Buyers",
    description: "A rural agricultural marketplace platform connecting local farmers directly with bulk buyers, urban consumers, and cooperative markets. Eliminates exploitative intermediary layers and ensures fair trade transparency.",
    image: "/assets/projects/namma-ooru-vivasai.svg",
    status: "Prototype Tested",
    featured: true,
    technologies: ["Java", "System Architecture", "Adobe Illustrator", "Data Flow"],
    githubUrl: "https://github.com/DHIVESH-M/oru-village",
    liveDemo: null,
    highlights: [
      "Zero-middleman marketplace connecting agrarian producers to commercial buyers",
      "Bilingual interface designed specifically for rural usability",
      "Real-time regional mandi price telemetry and harvest forecasting",
      "Vector branding and intuitive agricultural iconography"
    ],
    themeColor: "#4ade80"
  },
  {
    id: "road-safety-sos",
    title: "Road Safety SOS (DRONE-036)",
    badge: "Hardware & Safety",
    category: "IoT & Hardware",
    tagline: "Emergency Crash Detection & Automated Highway Beaconing System",
    description: "An emergency road safety hardware project engineered for rapid highway accident response. Combines accelerometer impact sensors, GPS telemetry, and automatic SOS beacon dispatch to notify emergency responders within seconds of an incident.",
    image: "/assets/projects/road-safety-sos.svg",
    status: "Hardware Prototype",
    featured: true,
    technologies: ["C", "Real-time AI Projects", "Embedded Systems", "Hardware Architecture"],
    githubUrl: "https://github.com/DHIVESH-M/DRONE-036",
    liveDemo: null,
    highlights: [
      "Instantaneous deceleration and impact vector classification",
      "Automated GSM broadcast packet dispatch to emergency trauma hubs",
      "Accurate GPS coordinate telemetry under low-signal conditions",
      "Low-power standby firmware logic programmed in C"
    ],
    themeColor: "#ff5b5b"
  },
  {
    id: "future-edge-ai",
    title: "Autonomous Edge AI System",
    badge: "Upcoming R&D",
    category: "AI & Machine Learning",
    tagline: "Low-Power Neuromorphic Edge Inference Node",
    description: "An active research architecture exploring quantized neural inference on low-power microcontrollers for real-time acoustic anomaly detection and edge telemetry.",
    image: "/assets/projects/upcoming-project.svg",
    status: "In Research & Design",
    featured: false,
    isUpcoming: true,
    technologies: ["C", "Python", "Quantized Tensors", "Embedded Edge"],
    githubUrl: null,
    liveDemo: null,
    highlights: [
      "Model quantization pipeline for sub-50mW edge microcontrollers",
      "On-device acoustic feature extraction without cloud dependency",
      "Autonomous power-state management"
    ],
    themeColor: "#9b6bff"
  }
];

export const hackathons = [
  {
    title: "Smart India Hackathon (SIH)",
    role: "Core Technical Contributor",
    description: "Collaborated with a cross-functional team to rapidly prototype AquaShield, an environmental IoT filtration and telemetry platform under national-level time constraints.",
    status: "National Finalist"
  },
  {
    title: "Internal College Hackathons",
    role: "Team Lead & Developer",
    description: "Led ideation, embedded C firmware implementation, and rapid UI prototyping across multiple competitive campus innovation challenges at Rathinam Global University.",
    status: "Awarded Distinction"
  },
  {
    title: "Campus Innovation Challenges",
    role: "AI/ML Prototyper",
    description: "Applied machine learning and practical problem-solving to address regional agriculture, road safety, and community logistics within tight deadlines.",
    status: "Top Prototype Selection"
  }
];

export const verifiedCertifications = [
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM & Coursera",
    status: "Verified Completion",
    code: "IBM"
  },
  {
    title: "C for Everyone: Structured Programming",
    issuer: "University of California, Santa Cruz",
    status: "Verified Completion",
    code: "UC"
  },
  {
    title: "Applications of Generative AI in L&D",
    issuer: "LinkedIn Learning",
    status: "Verified Completion",
    code: "in"
  },
  {
    title: "AI-Driven Project Management: Techniques & Insights",
    issuer: "LinkedIn Learning",
    status: "Verified Completion",
    code: "in"
  },
  {
    title: "AI for Business Professionals",
    issuer: "HP LIFE",
    status: "Verified Completion",
    code: "HP"
  },
  {
    title: "Entrepreneurship: From Idea to Business",
    issuer: "Udemy",
    status: "Verified Completion",
    code: "Ud"
  }
];

export const achievementsByNumbers = [
  { num: 6, label: "Projects Completed", suffix: "+" },
  { num: 6, label: "Certificates Earned", suffix: "" },
  { num: 10, label: "Hackathons & Challenges", suffix: "+" },
  { num: 10, label: "GitHub Repositories", suffix: "+" }
];

export const educationInfo = {
  degree: "B.Sc. Artificial Intelligence and Machine Learning",
  institution: "Rathinam Global Deemed to be University",
  location: "Pollachi / Coimbatore, Tamil Nadu",
  year: "Expected Graduation — 2028"
};

// 3D Glass Fragments with Real Skills for Hero Video Reveal
export const heroGlassFragments = [
  { id: 1, label: "Java", category: "Programming", top: "18%", left: "14%", rotate: "-8deg", delay: 0.1 },
  { id: 2, label: "Python", category: "Programming", top: "22%", left: "46%", rotate: "4deg", delay: 0.2 },
  { id: 3, label: "C Language", category: "Programming", top: "26%", left: "78%", rotate: "12deg", delay: 0.3 },
  { id: 4, label: "AI Model Building", category: "Artificial Intelligence", top: "42%", left: "10%", rotate: "6deg", delay: 0.4 },
  { id: 5, label: "Real-Time AI Projects", category: "Artificial Intelligence", top: "68%", left: "16%", rotate: "-14deg", delay: 0.5 },
  { id: 6, label: "Blender 3D", category: "Creative Tools", top: "54%", left: "84%", rotate: "-6deg", delay: 0.6 },
  { id: 7, label: "Unity — Learning", category: "Creative Tools", top: "84%", left: "34%", rotate: "8deg", delay: 0.7 },
  { id: 8, label: "Adobe Illustrator", category: "Design", top: "82%", left: "64%", rotate: "-10deg", delay: 0.8 },
  { id: 9, label: "AWS — Learning", category: "Cloud", top: "72%", left: "82%", rotate: "10deg", delay: 0.9 },
];
