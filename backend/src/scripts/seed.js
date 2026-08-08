require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Project = require('../models/Project');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const Leadership = require('../models/Leadership');
const SiteSettings = require('../models/SiteSettings');
const UiUxDesign = require('../models/UiUxDesign');

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing database collections...');
    await Admin.deleteMany({});
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});
    await Certification.deleteMany({});
    await Leadership.deleteMany({});
    await SiteSettings.deleteMany({});
    await UiUxDesign.deleteMany({});

    console.log('[Seed] Seeding Admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'riyarssingh22@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminRiya2026!';
    await Admin.create({
      name: 'Riya Singh',
      email: adminEmail,
      password: adminPassword,
    });
    console.log(`[Seed] Admin created: ${adminEmail}`);

    console.log('[Seed] Seeding Profile data...');
    await Profile.create({
      name: 'Riya Singh',
      title: 'Full-Stack Developer | Software Developer | UI/UX Developer',
      eyebrow: 'FULL-STACK DEVELOPER × UI/UX',
      headline: 'BUILDING DIGITAL EXPERIENCES.',
      scriptAccent: 'Creative Engineer',
      aboutTitle: 'ENGINEER. DESIGNER. PROBLEM SOLVER.',
      tagline: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.',
      bio: 'Final-year B.Tech Computer Science student with strong skills in software development, full-stack web development, and problem-solving. Proficient in Java, Python, SQL, JavaScript, React.js, Node.js, Express.js, and MongoDB, with hands-on experience building scalable and efficient web applications.',
      email: 'riyarssingh22@gmail.com',
      phone: '+91 8340154678',
      location: 'Punjab / Jharkhand, India',
      resumeUrl: '/resume.pdf',
      profileImage: '/riya-profile.jpg',
      availableForWork: true,
      stats: [
        { label: 'CGPA', value: '8.8 / 10', subtitle: 'Academic Excellence' },
        { label: 'WORKSHOPS', value: '30+', subtitle: 'Conducted & Led' },
        { label: 'STUDENTS REACHED', value: '500+', subtitle: 'Community Impact' },
        { label: 'STACK', value: 'MERN + PYTHON', subtitle: 'Full-Stack & APIs' }
      ],
      socialLinks: {
        github: 'https://github.com/Riya834',
        linkedin: 'https://www.linkedin.com/in/riya-singh-5b71b7248/?skipRedirect=true',
        email: 'mailto:riyarssingh22@gmail.com'
      }
    });

    console.log('[Seed] Seeding Skills data...');
    const skills = [
      // Programming
      { category: 'Programming', name: 'Python', icon: 'Code', description: 'Data structures, backend scripts, and data manipulation.', proficiency: 'Advanced', order: 1 },
      { category: 'Programming', name: 'SQL', icon: 'Database', description: 'Relational data query design and optimization.', proficiency: 'Advanced', order: 2 },
      { category: 'Programming', name: 'Java', icon: 'Cpu', description: 'Object-oriented programming and core algorithms.', proficiency: 'Advanced', order: 3 },
      { category: 'Programming', name: 'JavaScript', icon: 'FileCode', description: 'ES6+, async/await, DOM manipulation, functional JS.', proficiency: 'Expert', order: 4 },
      { category: 'Programming', name: 'C++', icon: 'Terminal', description: 'System level programming and memory logic.', proficiency: 'Intermediate', order: 5 },

      // Data Analysis
      { category: 'Data Analysis', name: 'Pandas', icon: 'BarChart2', description: 'Data transformation, grouping, and aggregation.', proficiency: 'Advanced', order: 6 },
      { category: 'Data Analysis', name: 'NumPy', icon: 'Binary', description: 'Numerical computations and matrix operations.', proficiency: 'Advanced', order: 7 },
      { category: 'Data Analysis', name: 'Data Cleaning', icon: 'Filter', description: 'Preprocessing datasets, handling nulls & outliers.', proficiency: 'Advanced', order: 8 },
      { category: 'Data Analysis', name: 'Data Visualization', icon: 'PieChart', description: 'Chart plotting and exploratory data analysis.', proficiency: 'Advanced', order: 9 },

      // Databases
      { category: 'Databases', name: 'MySQL', icon: 'Database', description: 'Relational tables, joins, indexes, and transactions.', proficiency: 'Advanced', order: 10 },
      { category: 'Databases', name: 'MongoDB', icon: 'Server', description: 'NoSQL document schemas, Mongoose aggregation pipelines.', proficiency: 'Advanced', order: 11 },
      { category: 'Databases', name: 'Firebase', icon: 'Flame', description: 'Real-time database, auth, and cloud hosting.', proficiency: 'Intermediate', order: 12 },
      { category: 'Databases', name: 'NoSQL', icon: 'HardDrive', description: 'Key-value and document data architecture.', proficiency: 'Advanced', order: 13 },

      // Core Concepts
      { category: 'Core Concepts', name: 'OOPs', icon: 'Box', description: 'Encapsulation, inheritance, polymorphism, abstraction.', proficiency: 'Expert', order: 14 },
      { category: 'Core Concepts', name: 'DBMS', icon: 'Layers', description: 'Database management systems, ACID properties, normalization.', proficiency: 'Expert', order: 15 },
      { category: 'Core Concepts', name: 'Data Structures', icon: 'GitGraph', description: 'Arrays, Trees, Graphs, Stacks, Queues, Sorting.', proficiency: 'Expert', order: 16 },
      { category: 'Core Concepts', name: 'Operating Systems', icon: 'Cpu', description: 'Process scheduling, concurrency, memory management.', proficiency: 'Advanced', order: 17 },

      // Frameworks
      { category: 'Frameworks', name: 'React.js', icon: 'Globe', description: 'Component hooks, state management, SPA architecture, Framer Motion.', proficiency: 'Expert', order: 18 },
      { category: 'Frameworks', name: 'Node.js', icon: 'Server', description: 'Async server-side JavaScript runtime and event loop.', proficiency: 'Expert', order: 19 },
      { category: 'Frameworks', name: 'Express.js', icon: 'Zap', description: 'RESTful API routing, middleware, JWT authorization.', proficiency: 'Expert', order: 20 },

      // Tools
      { category: 'Tools', name: 'Git', icon: 'GitBranch', description: 'Version control system, branching, and rebasing.', proficiency: 'Expert', order: 21 },
      { category: 'Tools', name: 'GitHub', icon: 'Github', description: 'Repository management, pull requests, collaboration.', proficiency: 'Expert', order: 22 },
      { category: 'Tools', name: 'VS Code', icon: 'Layout', description: 'Integrated development workspace, extensions & debugging.', proficiency: 'Expert', order: 23 },
      { category: 'Tools', name: 'Postman', icon: 'Send', description: 'API testing, documentation, and endpoint verification.', proficiency: 'Expert', order: 24 }
    ];
    await Skill.insertMany(skills);

    console.log('[Seed] Seeding Experience data...');
    const experiences = [
      {
        company: 'GDGC on Campus SVIET',
        position: 'UI/UX Designer',
        location: 'SVIET, Punjab',
        startDate: 'Oct 2023',
        endDate: 'Present',
        description: [
          'Led UI/UX design initiatives for GDGC on Campus SVIET, creating high-fidelity wireframes, interactive mobile/web prototypes, and design systems.',
          'Designed community event dashboards, tech summit visual identities, and interactive developer interfaces.',
          'Collaborated with cross-functional developer teams to convert user research into intuitive UI components and accessible digital products.'
        ],
        technologies: ['UI/UX Design', 'Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Adobe XD'],
        order: 1
      },
      {
        company: 'Godigitify',
        position: 'Full Stack Developer | UI/UX Developer',
        location: 'Chandigarh, India',
        startDate: 'May 2024',
        endDate: 'Aug 2025',
        description: [
          'Developed data-driven applications using React.js, Node.js, Express.js, and MongoDB.',
          'Managed and organized application data through backend databases and APIs.',
          'Integrated REST APIs and improved system performance and reliability.'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'UI/UX Design'],
        order: 2
      },
      {
        company: 'Zepp Media',
        position: 'Frontend Developer',
        location: '',
        startDate: 'Nov 2023',
        endDate: 'Mar 2024',
        description: [
          'Worked with APIs and structured datasets for dynamic web applications.',
          'Improved frontend performance and optimized data rendering.',
          'Collaborated with backend teams for smooth data integration.'
        ],
        technologies: ['React.js', 'JavaScript', 'REST APIs', 'Data Rendering', 'CSS3'],
        order: 3
      }
    ];
    await Experience.insertMany(experiences);

    console.log('[Seed] Seeding UI/UX Design Showcase data...');
    const uiUxDesigns = [
      {
        title: 'BharatTech 2.0 Perience Hackathon Poster',
        category: 'Event Poster & Branding',
        client: 'GDGC on Campus SVIET',
        description: 'Official event poster and community partner branding for BharatTech 2.0 Perience Hackathon with ₹1,00,000 prize pool, featuring sponsor integrations for Kwikpic, Devfolio, ETHIndia, and Polygon.',
        image: '/designs/bharattech-hackathon.jpg',
        tags: ['Figma', 'Event Poster', 'Branding', 'GDGC SVIET', 'Sponsor Identity'],
        driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
        featured: true,
        order: 1
      },
      {
        title: 'Google IDEATE Ideathon 2024 Poster',
        category: 'Brand Promotion & Graphics',
        client: 'The Uniques & GDGC SVIET',
        description: 'Promotional graphic design for Google IDEATE Ideathon 2024 campus visit to CGC Jhanjheri, showcasing event roadmap and Google brand color palette.',
        image: '/designs/google-ideathon.jpg',
        tags: ['Brand Identity', 'Google Colors', 'Ideathon Poster', 'Graphics'],
        driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
        featured: true,
        order: 2
      },
      {
        title: 'Tapping into Web using Angular Banner',
        category: 'Tech Workshop Graphics',
        client: 'GDGC on Campus SVIET',
        description: 'Event presentation design and social media announcement collateral for Tech Winter Break Angular workshop reaching over 115 total attendees.',
        image: '/designs/angular-workshop.jpg',
        tags: ['Angular Workshop', 'Social Media Design', 'GDGC SVIET', '115+ Attendees'],
        driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
        featured: true,
        order: 3
      },
      {
        title: 'Academic Test Conducted Banner',
        category: 'Campus Media & Graphic Design',
        client: 'The Uniques SVIET',
        description: 'Custom hexagonal photo cutout graphic poster designed for Academic Test announcement across Uniques 1.0 and Uniques 2.0 student batches.',
        image: '/designs/academic-test.jpg',
        tags: ['Hexagonal Layout', 'Photoshop/Figma', 'Uniques SVIET', 'Academic Graphic'],
        driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
        featured: false,
        order: 4
      },
      {
        title: 'Unlocking Opportunities at SVGOI Brochure',
        category: 'Marketing & Visual Design',
        client: 'Swami Vivekanand Group of Institutes',
        description: 'Institutional brochure layout and informational visual design highlighting SVGOI academic excellence, modern infrastructure, and student growth opportunities.',
        image: '/designs/svgoi-brochure.jpg',
        tags: ['Brochure Design', 'Print & Web Layout', 'Institutional Branding'],
        driveUrl: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link',
        featured: false,
        order: 5
      }
    ];
    await UiUxDesign.insertMany(uiUxDesigns);

    console.log('[Seed] Seeding Projects data...');
    const projects = [
      {
        title: 'Task Manager Web Application',
        slug: 'task-manager-web-application',
        subtitle: 'Workflow & Productivity Tracking Platform',
        description: 'A comprehensive workflow and productivity tracking platform built with React.js, Node.js, Express.js, and MongoDB. Features task management, workflow tracking, project progress metrics, and team productivity tools.',
        longDescription: 'Developed a workflow and productivity tracking platform designed to streamline task delegation and team tracking. Managed task-related data using databases and APIs, ensuring real-time state updates, status filtering, and role-based views. Built tracking features to monitor project progress and team productivity with quantitative reporting.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Tailwind CSS', 'Framer Motion'],
        image: '/project-taskmanager.png',
        liveUrl: 'https://planiques.theuniques.in',
        githubUrl: 'https://github.com/riyarssingh/task-manager-app',
        startDate: 'Feb 2025',
        endDate: 'May 2025',
        featured: true,
        highlights: [
          'Developed a workflow and productivity tracking platform',
          'Managed task-related data using databases and APIs',
          'Built tracking features to monitor project progress and team productivity'
        ],
        order: 1
      }
    ];
    await Project.insertMany(projects);

    console.log('[Seed] Seeding Education data...');
    const education = [
      {
        institution: 'Swami Vivekanand Institute of Engineering & Technology',
        degree: 'B.Tech in Computer Science and Engineering',
        year: '2026',
        score: 'CGPA: 8.8 / 10',
        location: 'Punjab',
        description: 'Final-year Computer Science engineering student focusing on software development, full-stack web architecture, database design, and algorithmic problem solving.',
        order: 1
      },
      {
        institution: 'D.A.V Public School',
        degree: 'Class XII (Senior Secondary)',
        year: '2022',
        score: '93.2%',
        location: 'Jharkhand',
        description: 'Completed higher secondary education in Science stream with distinction in Mathematics and Computer Science.',
        order: 2
      },
      {
        institution: 'D.A.V Public School',
        degree: 'Class X (Secondary)',
        year: '2020',
        score: '95%',
        location: 'Jharkhand',
        description: 'Graduated with high distinction across all core academic subjects.',
        order: 3
      }
    ];
    await Education.insertMany(education);

    console.log('[Seed] Seeding Certifications & Achievements...');
    const certifications = [
      {
        title: 'Microsoft Azure Community Day Ideathon',
        organization: 'Microsoft Azure Community',
        year: '2024',
        description: 'Recognized for innovative Cloud-based project idea and system architecture design during Azure Community Day.',
        credentialUrl: '',
        order: 1
      },
      {
        title: '3rd Position – Project Display',
        organization: 'CGC Jhanjheri',
        year: '2023',
        description: 'Secured 3rd position in inter-college Project Display competition showcasing full-stack application development.',
        credentialUrl: '',
        order: 2
      },
      {
        title: 'Internship at ISB',
        organization: 'Indian School of Business (ISB)',
        year: '2022',
        description: 'Completed academic internship program focusing on technology management and digital innovation.',
        credentialUrl: '',
        order: 3
      }
    ];
    await Certification.insertMany(certifications);

    console.log('[Seed] Seeding Leadership & Activities...');
    const leadership = [
      {
        role: 'Communication and Marketing Head',
        organization: 'TEDxSVIET',
        year: '2023 – Present',
        description: 'Managed promotions, engagement strategies, and sponsor coordination for university-wide TEDx event.',
        highlights: [
          'Managed promotions and digital campaign strategy',
          'Coordinated speaker outreach and sponsor partnerships',
          'Led cross-functional marketing team of 15+ student volunteers'
        ],
        order: 1
      },
      {
        role: 'Workshops and Seminars Lead',
        organization: 'Techlearns Academy',
        year: '2023 – 2024',
        description: 'Conducted 30+ workshops reaching 500+ students in rural areas, introducing coding fundamentals and digital literacy.',
        highlights: [
          'Conducted 30+ hands-on technical workshops',
          'Impacted 500+ students across rural institutions',
          'Curated learning materials for beginner programming'
        ],
        order: 2
      },
      {
        role: 'Core Member',
        organization: 'BharatTech Xperience Hackathon',
        year: '2024',
        description: 'Assisted in national hackathon event coordination and technical documentation.',
        highlights: [
          'Assisted in event coordination for 200+ hackathon participants',
          'Authored technical guidelines and documentation',
          'Managed judge scoring rubrics and submission verification'
        ],
        order: 3
      }
    ];
    await Leadership.insertMany(leadership);

    console.log('[Seed] Seeding Site Settings...');
    await SiteSettings.create({
      siteTitle: 'Riya Singh | Full-Stack Developer & UI/UX Developer',
      metaDescription: 'Riya Singh is a Full-Stack Developer and UI/UX Developer building scalable web applications, data-driven products and intuitive digital experiences.',
      accentColor: '#0052FF',
      heroSubtitle: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.',
      footerText: 'Designed & engineered with curiosity.'
    });

    console.log('[Seed] Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedData();
