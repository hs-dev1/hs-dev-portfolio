export interface Experience {
    company: string;
    title: string;
    location: string;
    type: string;
    startDate: string;
    endDate: string;
    duration: string;
    achievements: string[];
    techStack: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    featured: boolean;
    badge?: string;
    links: {
        ios?: string;
        android?: string;
        web?: string;
    };
    image?: string;
    gallery?: string[];
    category: 'Mobile' | 'Web' | 'Desktop';
}

export interface Skill {
    name: string;
    proficiency: number;
    yearsOfExperience?: number;
}

export interface SkillCategory {
    category: string;
    skills: Skill[];
}

export interface OpenSourcePackage {
    name: string;
    description: string;
    link: string;
    downloads?: number;
    likes?: number;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

// Personal Information
export const personalInfo = {
    name: "HUSSNAIN",
    fullName: "Muhammad Hussnain",
    title: "Senior Software Engineer",
    subtitle: "Architecting Full-Stack Excellence",
    location: "Lahore, Pakistan",
    email: "dev.hussnain1@gmail.com",
    phone: "+92-312-4615484",
    yearsOfExperience: "4+",
    appsBuilt: "15+",
    developersMentored: "8+",
    profile: "Senior Software Engineer with 4+ years of expertise in full-stack development, specializing in cross-platform mobile applications, modern web technologies, and scalable backend systems. Proven track record in building complete product ecosystems including mobile apps (iOS/Android), responsive web applications, progressive web apps (PWAs), desktop applications, RESTful APIs, and administrative dashboards for international clients.",
};

// Experience Data
export const experiences: Experience[] = [
    {
        company: "Assort Tech Pvt Ltd",
        title: "Senior Software Engineer",
        location: "Lahore, Pakistan",
        type: "On-site",
        startDate: "Nov 2021",
        endDate: "Present",
        duration: "4 years +",
        achievements: [
            "Led full-stack development of cross-platform applications using Flutter, React, Next.js, and Node.js for international clients",
            "Architected and implemented scalable RESTful APIs using Node.js and Express.js handling 100K+ requests daily",
            "Developed SSR and SSG web applications using Next.js for improved SEO and performance",
            "Built real-time backend services using Socket.io and WebSockets for chat and live notifications",
            "Designed microservices architecture with Node.js, improving system scalability and maintainability",
            "Created admin dashboards using React.js with Chart.js and Recharts for analytics and reporting",
            "Implemented JWT, OAuth 2.0, and Firebase Authentication systems",
            "Integrated payment gateways (Stripe, PayPal) with secure backend processing",
            "Developed dynamic UI generation system using JSON schemas for runtime interface creation",
            "Optimized database queries and implemented Redis caching, reducing API response times by 65%",
            "Built CI/CD pipelines using GitHub Actions automating testing and deployment",
            "Mentored 8+ developers, conducted code reviews, and established coding standards",
        ],
        techStack: ["Flutter", "React", "Next.js", "Node.js", "Express.js", "Firebase", "GraphQL", "REST APIs", "Redis", "MongoDB", "PostgreSQL"],
    },
    {
        company: "Teknosol",
        title: "Android Developer",
        location: "Lahore, Pakistan",
        type: "Hybrid",
        startDate: "Apr 2021",
        endDate: "Sep 2021",
        duration: "6m",
        achievements: [
            "Developed native Android applications using Kotlin and Java with modern architecture patterns",
            "Implemented MVVM architecture and clean code principles for maintainable codebases",
            "Integrated RESTful APIs using Retrofit and handled async operations with Kotlin Coroutines",
            "Utilized Room Database for local data persistence and offline-first capabilities",
            "Implemented Firebase services including Authentication, Firestore, Cloud Messaging, and Analytics",
            "Collaborated with backend developers to define API contracts and optimize data transfer",
            "Conducted unit testing and UI testing to ensure application reliability",
        ],
        techStack: ["Kotlin", "Java", "Android SDK", "Room Database", "Firebase", "Retrofit", "MVVM", "Coroutines"],
    },
];

// Projects Data
export const projects: Project[] = [
    {
        id: "debt-buster",
        title: "Debt Buster",
        description: "Full-stack financial management platform with dynamic JSON-to-UI system",
        longDescription: "Architected complete full-stack financial management platform with Node.js backend handling user authentication, financial calculations, and data management. Features RESTful APIs with comprehensive error handling and React-based admin dashboard for content management.",
        techStack: ["Flutter", "Node.js", "Express.js", "MongoDB", "Firebase", "React Admin Panel"],
        featured: true,
        badge: "Full-Stack",
        category: "Mobile",
        links: {},
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
        ]
    },
    {
        id: "nibble",
        title: "Nibble",
        description: "Full-stack platform connecting users with exclusive deals from local businesses",
        longDescription: "Platform connecting users with exclusive deals from local businesses. Built GraphQL API layer for efficient data querying and real-time updates. Implemented geolocation services, push notifications via FCM, and SEO-optimized landing pages using Next.js with server-side rendering.",
        techStack: ["Flutter", "Node.js", "Firebase", "GraphQL", "Next.js", "FCM"],
        featured: true,
        category: "Mobile",
        links: {
            ios: "https://apps.apple.com/us/app/craving-coalitions/id6444896587",
            android: "https://play.google.com/store/apps/details?id=com.thenibble.app&hl=en",
        },
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"]
    },
    {
        id: "proxy-navigator",
        title: "Proxy Navigator",
        description: "Full-stack investor platform with real-time market insights and analytics",
        longDescription: "Developed investor platform offering voting recommendations and real-time market insights. Built REST APIs with Node.js for stock data aggregation, implemented WebSocket connections for real-time stock ticker updates, and created responsive web application using React with Redux.",
        techStack: ["Flutter", "React", "Node.js", "PostgreSQL", "AWS", "WebSocket", "Redux"],
        featured: true,
        category: "Mobile",
        links: {
            ios: "https://apps.apple.com/app/proxy-navigator",
            android: "https://play.google.com/store/apps/details?id=com.proxynav",
        },
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "safespace",
        title: "SafeSpace",
        description: "Full-stack safety platform with real-time chat and emergency features",
        longDescription: "Comprehensive safety platform with Node.js backend using Socket.io for real-time messaging and location tracking. Implemented geofencing, safe route calculation algorithms, and React admin panel for content moderation. Integrated third-party emergency services APIs.",
        techStack: ["Flutter", "Node.js", "Socket.io", "MongoDB", "Google Maps API", "React Admin"],
        featured: true,
        category: "Mobile",
        links: {},
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "spot-app",
        title: "SPOT APP",
        description: "Sports facility booking platform for Saudi market with multi-language support",
        longDescription: "Sports facility booking application for Saudi Arabian market with location-based features. Implemented booking system with real-time availability updates using Firebase Firestore and integrated payment processing workflows.",
        techStack: ["Flutter", "Firebase", "Google Maps API", "Multi-language Support", "Payment Integration"],
        featured: false,
        category: "Mobile",
        links: {
            ios: "https://apps.apple.com/us/app/spot-application/id1667434816",
        },
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "my-yogi",
        title: "My Yogi",
        description: "Wellness platform with subscription-based content and Stripe integration",
        longDescription: "Wellness and yoga platform with subscription-based content delivery. Implemented Stripe payment integration with subscription management and built custom video player with offline download capabilities.",
        techStack: ["Flutter", "Firebase", "Stripe Integration", "Custom UI/UX", "Video Streaming"],
        featured: false,
        category: "Mobile",
        links: {
            ios: "https://apps.apple.com/us/app/myyogi-app/id6466390099",
            android: "https://play.google.com/store/apps/details?id=com.myyogi.app&hl=en",
        },
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "aquatics-connect",
        title: "Aquatics Connect",
        description: "Aquatics services platform with booking and scheduling features",
        longDescription: "Aquatics services platform with booking management and scheduling features. Implemented location-based search and filtering for service providers with calendar integration for automated scheduling and reminders.",
        techStack: ["Flutter", "Firebase", "Google Maps API", "Calendar Integration", "Notifications"],
        featured: false,
        category: "Mobile",
        links: {
            ios: "https://apps.apple.com/app/aquatics-connect",
        },
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "field-hcp",
        title: "Field HCP",
        description: "On-demand healthcare professional platform for North American market",
        longDescription: "On-demand healthcare professional connection platform for North America. Developed advanced search and filtering system, document management using AWS S3, and real-time notification system for job matching.",
        techStack: ["Flutter", "Node.js", "PostgreSQL", "AWS S3", "Real-time Notifications"],
        featured: false,
        category: "Mobile",
        links: {
            ios: "https://apps.apple.com/us/app/care-hub-app/id6444679914",
            android: "https://play.google.com/store/apps/details?id=com.fieldhcp",
        },
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
    },
];

// Skills Data - Comprehensive Full-Stack Skills
export const skillsData: SkillCategory[] = [
    {
        category: "Mobile Development",
        skills: [
            { name: "Flutter", proficiency: 95, yearsOfExperience: 4 },
            { name: "Dart", proficiency: 95, yearsOfExperience: 4 },
            { name: "Android (Kotlin)", proficiency: 85, yearsOfExperience: 3 },
            { name: "Android (Java)", proficiency: 85, yearsOfExperience: 3 },
            { name: "PWA", proficiency: 80, yearsOfExperience: 2 },
        ],
    },
    {
        category: "Frontend Development",
        skills: [
            { name: "React.js", proficiency: 90, yearsOfExperience: 3 },
            { name: "Next.js", proficiency: 88, yearsOfExperience: 3 },
            { name: "TypeScript", proficiency: 88, yearsOfExperience: 3 },
            { name: "JavaScript (ES6+)", proficiency: 90, yearsOfExperience: 4 },
            { name: "HTML5/CSS3", proficiency: 92, yearsOfExperience: 4 },
            { name: "Tailwind CSS", proficiency: 90, yearsOfExperience: 3 },
            { name: "Material-UI", proficiency: 85, yearsOfExperience: 2 },
            { name: "Shadcn/ui", proficiency: 85, yearsOfExperience: 2 },
        ],
    },
    {
        category: "State Management",
        skills: [
            { name: "Redux", proficiency: 88, yearsOfExperience: 3 },
            { name: "Redux Toolkit", proficiency: 88, yearsOfExperience: 2 },
            { name: "Context API", proficiency: 90, yearsOfExperience: 3 },
            { name: "Provider", proficiency: 92, yearsOfExperience: 4 },
            { name: "Bloc", proficiency: 90, yearsOfExperience: 3 },
            { name: "Riverpod", proficiency: 88, yearsOfExperience: 2 },
            { name: "GetX", proficiency: 85, yearsOfExperience: 3 },
        ],
    },
    {
        category: "Backend Development",
        skills: [
            { name: "Node.js", proficiency: 90, yearsOfExperience: 3 },
            { name: "Express.js", proficiency: 90, yearsOfExperience: 3 },
            { name: "Nest.js", proficiency: 80, yearsOfExperience: 2 },
            { name: "Firebase Functions", proficiency: 88, yearsOfExperience: 3 },
            { name: "REST APIs", proficiency: 95, yearsOfExperience: 4 },
            { name: "GraphQL", proficiency: 85, yearsOfExperience: 2 },
            { name: "WebSockets", proficiency: 85, yearsOfExperience: 2 },
            { name: "Socket.io", proficiency: 85, yearsOfExperience: 2 },
        ],
    },
    {
        category: "Database & Storage",
        skills: [
            { name: "PostgreSQL", proficiency: 85, yearsOfExperience: 3 },
            { name: "MongoDB", proficiency: 88, yearsOfExperience: 3 },
            { name: "Firebase Firestore", proficiency: 92, yearsOfExperience: 4 },
            { name: "MySQL", proficiency: 82, yearsOfExperience: 2 },
            { name: "Redis", proficiency: 80, yearsOfExperience: 2 },
            { name: "Prisma", proficiency: 85, yearsOfExperience: 2 },
            { name: "SQLite", proficiency: 85, yearsOfExperience: 3 },
        ],
    },
    {
        category: "DevOps & Cloud",
        skills: [
            { name: "Git/GitHub", proficiency: 95, yearsOfExperience: 4 },
            { name: "GitHub Actions", proficiency: 88, yearsOfExperience: 3 },
            { name: "Docker", proficiency: 80, yearsOfExperience: 2 },
            { name: "Firebase", proficiency: 92, yearsOfExperience: 4 },
            { name: "AWS", proficiency: 78, yearsOfExperience: 2 },
            { name: "Google Cloud", proficiency: 80, yearsOfExperience: 2 },
            { name: "Vercel", proficiency: 88, yearsOfExperience: 2 },
        ],
    },
    {
        category: "Authentication & Security",
        skills: [
            { name: "JWT", proficiency: 90, yearsOfExperience: 3 },
            { name: "OAuth 2.0", proficiency: 88, yearsOfExperience: 3 },
            { name: "Firebase Auth", proficiency: 92, yearsOfExperience: 4 },
            { name: "NextAuth.js", proficiency: 85, yearsOfExperience: 2 },
            { name: "Passport.js", proficiency: 80, yearsOfExperience: 2 },
        ],
    },
    {
        category: "Payment & Services",
        skills: [
            { name: "Stripe", proficiency: 88, yearsOfExperience: 3 },
            { name: "PayPal", proficiency: 85, yearsOfExperience: 2 },
            { name: "FCM", proficiency: 90, yearsOfExperience: 4 },
            { name: "SendGrid", proficiency: 82, yearsOfExperience: 2 },
            { name: "Google Analytics", proficiency: 85, yearsOfExperience: 3 },
        ],
    },
];

// Open Source Packages
export const openSourcePackages: OpenSourcePackage[] = [
    {
        name: "custom_bottom_navigation_bar",
        description: "Enum-based navigation package with flexible state management for Flutter applications. Simplifies bottom navigation implementation with clean, type-safe APIs.",
        link: "https://pub.dev/packages/custom_bottom_navigation_bar",
    },
    {
        name: "media_picker_builder",
        description: "Comprehensive media selection and viewing package for Flutter. Provides an intuitive interface for picking images and videos with built-in preview capabilities.",
        link: "https://pub.dev/packages/media_picker_builder",
    },
];

// Social Links
export const socialLinks: SocialLink[] = [
    {
        platform: "GitHub",
        url: "https://github.com/hs-dev1?tab=repositories",
        icon: "github",
    },
    {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/muhammad-hussnain-4a2948187/",
        icon: "linkedin",
    },
    {
        platform: "Email",
        url: "mailto:dev.hussnain1@gmail.com",
        icon: "email",
    },
];
