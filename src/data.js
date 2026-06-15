export const skillsData = [
  // Backend
  {
    name: "Node.js",
    category: "backend",
    level: 95,
    yearsOfExp: 3,
    icon: "Nodejs",
    details: ["Express & custom middleware designs", "Asynchronous control flow & Event Loop", "Worker threads & cluster modules for CPU-heavy tasks"]
  },
  {
    name: "Express.js",
    category: "backend",
    level: 95,
    yearsOfExp: 3,
    icon: "Express",
    details: ["Highly scalable RESTful API designs", "Custom security integrations (CSRF, Rate Limiting)", "Model-View-Controller & router patterns"]
  },
  {
    name: "GraphQL",
    category: "backend",
    level: 95,
    yearsOfExp: 2,
    icon: "GraphQL",
    details: ["Schema design & Resolver logic optimization", "Query/Mutation design structures", "N+1 issue mitigation approaches"]
  },
  {
    name: "REST APIs",
    category: "backend",
    level: 98,
    yearsOfExp: 3,
    icon: "RestApi",
    details: ["Standard standard compliance (verbs, statuses)", "Dynamic route bindings & security layers", "High-performance paginated queries"]
  },
  {
    name: "OAuth 2.0",
    category: "backend",
    level: 90,
    yearsOfExp: 2,
    icon: "ShieldCheck",
    details: ["Custom auth server implementations", "Access & refresh token rotators", "Third-party IDP handshakes"]
  },
  {
    name: "Server-Side Scripting",
    category: "backend",
    level: 88,
    yearsOfExp: 3,
    icon: "CodeXml",
    details: ["Automated task schedules & Cron jobs", "System diagnostics & file parser scripts", "CLI orchestration utilities"]
  },

  // Frontend
  {
    name: "React.js",
    category: "frontend",
    level: 80,
    yearsOfExp: 3,
    icon: "React",
    details: ["Functional hooks & State managers", "Performance tuning (Memo, Callback, Re-render control)", "Modular component composition"]
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: 80,
    yearsOfExp: 3,
    icon: "Wind",
    details: ["Modern layouts (Flexbox, Grid, Bento Grid)", "Seamless transitions & adaptive themes", "High aesthetic layouts & custom tokens"]
  },
  {
    name: "HTML5 & CSS3",
    category: "frontend",
    level: 85,
    yearsOfExp: 3,
    icon: "Code",
    details: ["Accessible semantics & clean hierarchy", "Complex custom keyframe animations", "Responsive designs first approach"]
  },
  {
    name: "AWS S3 Integration",
    category: "frontend",
    level: 85,
    yearsOfExp: 2,
    icon: "CloudUpload",
    details: ["Presigned URLs for direct client uploads", "Access bucket policies with high security", "Image optimizations & CDN caching"]
  },
  {
    name: "CI/CD & Deployment",
    category: "frontend",
    level: 65,
    yearsOfExp: 2,
    icon: "Workflow",
    details: ["Automated GitHub workflows", "Build checkers & lint run guards", "Vercel / Cloud Run instance pipelines"]
  },

  // Databases
  {
    name: "MongoDB",
    category: "database",
    level: 95,
    yearsOfExp: 3,
    icon: "Database",
    details: ["Dynamic multi-tenant schema compilation", "Aggregation pipelines for bulk reports", "Index strategies for faster traversals"]
  },
  {
    name: "PostgreSQL",
    category: "database",
    level: 88,
    yearsOfExp: 2,
    icon: "DatabaseBackup",
    details: ["Structured relational modeling", "Constraints, Join queries, and Views", "Sleek query plans audits and tuning"]
  },
  {
    name: "Redis",
    category: "database",
    level: 90,
    yearsOfExp: 2,
    icon: "HardDriveDownload",
    details: ["Speed booster: API caching (40% faster)", "Distributed Pub/Sub message broker", "Key expirations & session backings"]
  },
  {
    name: "Data Modeling",
    category: "database",
    level: 90,
    yearsOfExp: 3,
    icon: "Network",
    details: ["SQL Normalization / Denormalization balances", "Mongoose schema mappings", "Efficient transactional graph layouts"]
  },
  {
    name: "Query Optimization",
    category: "database",
    level: 93,
    yearsOfExp: 2,
    icon: "TrendingUp",
    details: ["Indexes creation analysis", "Database execution plan inspections", "Optimizing long Jquery joins & aggregations"]
  },

  // Tools & DevOps
  {
    name: "Docker & K8s",
    category: "tools",
    level: 75,
    yearsOfExp: 2,
    icon: "Layers",
    details: ["Custom multi-stage containerizations", "Distributed service orchestrations", "ConfigMaps, secrets, and volume bindings"]
  },
  {
    name: "Git & GitHub",
    category: "tools",
    level: 94,
    yearsOfExp: 4,
    icon: "Github",
    details: ["Rebase setups & custom merge resolutions", "Polished structural branch systems", "GitHub Actions and automations"]
  },
  {
    name: "Postman",
    category: "tools",
    level: 99,
    yearsOfExp: 3,
    icon: "Send",
    details: ["Automated API regression tests", "Environment vars management", "Schema assertions & mock environments"]
  },
  {
    name: "Jest & Testing",
    category: "tools",
    level: 85,
    yearsOfExp: 2,
    icon: "ClipboardCheck",
    details: ["Comprehensive unit & test files with 90%+ cover", "Mock modules, spiders, and spy spies", "Supertest API test runner integration"]
  },
  {
    name: "WebSockets",
    category: "tools",
    level: 90,
    yearsOfExp: 2,
    icon: "Radio",
    details: ["WS protocol connection handshakes", "Heartbeats to prevent idle timeouts", "Pub/Sub scale out with Redis support"]
  }
];

export const experienceData = [
  {
    id: "exp1",
    role: "Software Engineer",
    company: "AGMAH",
    period: "Sep 2023 - Present",
    techTags: [
      "Node.js", "Express.js", "React.js", "MongoDB", "PostgreSQL",
      "GraphQL", "Redis", "Docker", "Kubernetes", "OAuth 2.0", "Worker Threads", "Jest"
    ],
    highlights: [
      "Developed and optimized scalable backend services using Node.js and Express, managing data with MongoDB (NoSQL) and PostgreSQL (SQL) databases.",
      "Engineered frontend interfaces with modern React.js/Tailwind CSS, creating reusable custom components and integrating robust REST & GraphQL APIs.",
      "Designed and implemented a custom OAuth 2.0 security server to protect microservice APIs and support full user access credentials control.",
      "Integrated Redis caching to cache repetitive database queries, achieving up to 40% reduction in API response times.",
      "Scaled application processing capability by implementing multi-threaded computing with Node Worker Threads for intensive background operations, keeping the main Web server event loop completely unblocked.",
      "Ensured system design safety by integrating defensive layers including rate limits, api throttling, and comprehensive CSRF protect controls.",
      "Constructed comprehensive automation testing blocks using Jest, assuring top-tier code reliability, testability, and fast deployments.",
      "Packaged microservices in Docker containers and coordinated multi-instance deployments via Kubernetes clusters."
    ]
  },
  {
    id: "exp2",
    role: "Software Developer Trainee",
    company: "Function Up",
    period: "Jan 2023 - Aug 2023",
    techTags: ["WebSockets", "Redis Pub/Sub", "AWS S3", "Express", "Node.js", "MongoDB"],
    highlights: [
      "Built low-latency real-time communications by utilizing WebSockets backing distributed node instances via Redis Pub/Sub.",
      "Designed and managed active file storage mechanisms using securely configured AWS S3 buckets for fast document/assets retrievals.",
      "Gained deep skills in clean REST pattern constructs, structured data schemas, and backend caching layers."
    ]
  }
];

export const projectsData = [
  {
    id: "proj1",
    title: "Smart-Supervisor",
    description: "An intelligent, multi-tenant IoT & Content management supervisor engineered to coordinate connected devices and secure multi-tenant libraries.",
    summary: "Created to address strict client data isolation challenges while handling live data reporting from smart controllers.",
    role: "Core Full-Stack Architect",
    techTags: ["Node.js", "MongoDB", "Zenoh Pub/Sub", "React.js", "E-Books Management", "Multi-tenancy"],
    keyFeatures: [
      "Multi-Tenant Collection Dynamic Isolation: Dynamically connects Mongoose schemas on-the-fly per organization, guaranteeing absolute logical partition.",
      "IoT Messaging Core: Integrated low-overhead Zenoh Pub/Sub networks for fluid, bi-directional telemetry stream from remote monitors.",
      "E-Book Publisher Module: Built an administrative book compiler handling PDF encryption, structured reading indices, and granular reader logs."
    ],
    systemHighlights: [
      {
        title: "Dynamic Model Router",
        description: "Enables single Node instance to securely support hundreds of companies without cross-tenant leakage by generating dynamic MongoDB connections."
      },
      {
        title: "IoT Socket Streamer",
        description: "Streams bidirectional telemetry values with under 15ms delay, allowing realtime control of connected industrial nodes."
      }
    ]
  },
  {
    id: "proj2",
    title: "High-Performance Product & Cart Engine",
    description: "A fast, resilient E-commerce shopping core designed to handle high-concurrency listings, file attachments, and blazing fast lookups.",
    summary: "Built as a production-grade prototype detailing advanced state tracking, database caching strategies, and asset handling in AWS S3.",
    role: "Backend Lead",
    techTags: ["Express.js", "Redis Memory Store", "AWS S3", "Authentication", "Jest Testing"],
    keyFeatures: [
      "Redis Core Speedup: Intercepted heavy catalog queries with smart Redis caching, dropping database response metrics by 40% under spike load.",
      "AWS S3 Cloud Media Pipeline: Built robust secure server pipeline using pre-signed S3 links for reliable, secure user profile/product image uploads.",
      "Auth Barrier & Security: Layered JSON Web Tokens, cryptographic hashes, and token expiration rules to fully defend the purchase funnel."
    ],
    systemHighlights: [
      {
        title: "Redis Cache Coordinator",
        description: "Maintains cache coherence via transactional write-through rules, assuring zero stale prices on flash sale spikes."
      },
      {
        title: "Presigned Link Uploads",
        description: "Frees server network resources by authorizing direct, secure multipart photo uploads straight from client forms to AWS S3 storage."
      }
    ]
  }
];

export const educationData = {
  institution: "Savitribai Phule Pune University",
  degree: "Bachelor of Science ",
  period: "2019 - 2022", // Fixed minor typo from Pune University
  gpa: "8.4 / 10.0 CGPA",
  milestones: [
    "Graduated with High Distinction honours."
  ]
};
