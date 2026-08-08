require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Models for seed check
const Profile = require('./models/Profile');
const Admin = require('./models/Admin');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Education = require('./models/Education');
const Certification = require('./models/Certification');
const Leadership = require('./models/Leadership');
const SiteSettings = require('./models/SiteSettings');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Allowed for cross-origin assets during dev
}));

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Permissive CORS for dev portfolio preview
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiters for authentication and contact endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many contact messages sent, please wait a few minutes.' },
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', portfolioRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'Riya Singh Portfolio REST API',
  });
});

// Root API Endpoint
app.get('/', (req, res) => {
  res.send('Riya Singh Portfolio Backend API is Running.');
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB & auto-seed if empty
connectDB().then(async () => {
  try {
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      console.log('[Server] Database is empty. Running initial auto-seed...');
      const adminEmail = process.env.ADMIN_EMAIL || 'riyarssingh22@gmail.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'AdminRiya2026!';
      
      await Admin.create({ name: 'Riya Singh', email: adminEmail, password: adminPassword });
      
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

      await Skill.insertMany([
        { category: 'Programming', name: 'Python', icon: 'Code', description: 'Data structures, backend scripts, and data manipulation.', order: 1 },
        { category: 'Programming', name: 'SQL', icon: 'Database', description: 'Relational data query design and optimization.', order: 2 },
        { category: 'Programming', name: 'Java', icon: 'Cpu', description: 'Object-oriented programming and core algorithms.', order: 3 },
        { category: 'Programming', name: 'JavaScript', icon: 'FileCode', description: 'ES6+, async/await, DOM manipulation, functional JS.', order: 4 },
        { category: 'Programming', name: 'C++', icon: 'Terminal', description: 'System level programming and memory logic.', order: 5 },
        { category: 'Data Analysis', name: 'Pandas', icon: 'BarChart2', description: 'Data transformation, grouping, and aggregation.', order: 6 },
        { category: 'Data Analysis', name: 'NumPy', icon: 'Binary', description: 'Numerical computations and matrix operations.', order: 7 },
        { category: 'Data Analysis', name: 'Data Cleaning', icon: 'Filter', description: 'Preprocessing datasets, handling nulls & outliers.', order: 8 },
        { category: 'Data Analysis', name: 'Data Visualization', icon: 'PieChart', description: 'Chart plotting and exploratory data analysis.', order: 9 },
        { category: 'Databases', name: 'MySQL', icon: 'Database', description: 'Relational tables, joins, indexes, and transactions.', order: 10 },
        { category: 'Databases', name: 'MongoDB', icon: 'Server', description: 'NoSQL document schemas, Mongoose aggregation pipelines.', order: 11 },
        { category: 'Databases', name: 'Firebase', icon: 'Flame', description: 'Real-time database, auth, and cloud hosting.', order: 12 },
        { category: 'Databases', name: 'NoSQL', icon: 'HardDrive', description: 'Key-value and document data architecture.', order: 13 },
        { category: 'Core Concepts', name: 'OOPs', icon: 'Box', description: 'Encapsulation, inheritance, polymorphism, abstraction.', order: 14 },
        { category: 'Core Concepts', name: 'DBMS', icon: 'Layers', description: 'Database management systems, ACID properties, normalization.', order: 15 },
        { category: 'Core Concepts', name: 'Data Structures', icon: 'GitGraph', description: 'Arrays, Trees, Graphs, Stacks, Queues, Sorting.', order: 16 },
        { category: 'Core Concepts', name: 'Operating Systems', icon: 'Cpu', description: 'Process scheduling, concurrency, memory management.', order: 17 },
        { category: 'Frameworks', name: 'React.js', icon: 'Globe', description: 'Component hooks, state management, SPA architecture, Framer Motion.', order: 18 },
        { category: 'Frameworks', name: 'Node.js', icon: 'Server', description: 'Async server-side JavaScript runtime and event loop.', order: 19 },
        { category: 'Frameworks', name: 'Express.js', icon: 'Zap', description: 'RESTful API routing, middleware, JWT authorization.', order: 20 },
        { category: 'Tools', name: 'Git', icon: 'GitBranch', description: 'Version control system, branching, and rebasing.', order: 21 },
        { category: 'Tools', name: 'GitHub', icon: 'Github', description: 'Repository management, pull requests, collaboration.', order: 22 },
        { category: 'Tools', name: 'VS Code', icon: 'Layout', description: 'Integrated development workspace, extensions & debugging.', order: 23 },
        { category: 'Tools', name: 'Postman', icon: 'Send', description: 'API testing, documentation, and endpoint verification.', order: 24 }
      ]);

      await Experience.insertMany([
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
          order: 1
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
          order: 2
        }
      ]);

      await Project.insertMany([
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
      ]);

      await Education.insertMany([
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
      ]);

      await Certification.insertMany([
        {
          title: 'Microsoft Azure Community Day Ideathon',
          organization: 'Microsoft Azure Community',
          year: '2024',
          description: 'Recognized for innovative Cloud-based project idea and system architecture design during Azure Community Day.',
          order: 1
        },
        {
          title: '3rd Position – Project Display',
          organization: 'CGC Jhanjheri',
          year: '2023',
          description: 'Secured 3rd position in inter-college Project Display competition showcasing full-stack application development.',
          order: 2
        },
        {
          title: 'Internship at ISB',
          organization: 'Indian School of Business (ISB)',
          year: '2022',
          description: 'Completed academic internship program focusing on technology management and digital innovation.',
          order: 3
        }
      ]);

      await Leadership.insertMany([
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
      ]);

      await SiteSettings.create({
        siteTitle: 'Riya Singh | Full-Stack Developer & UI/UX Developer',
        metaDescription: 'Riya Singh is a Full-Stack Developer and UI/UX Developer building scalable web applications, data-driven products and intuitive digital experiences.',
        accentColor: '#0052FF',
        heroSubtitle: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.',
        footerText: 'Designed & engineered with curiosity.'
      });

      console.log('[Server] Auto-seed complete!');
    }
  } catch (err) {
    console.error('[Server Seed Error]', err);
  }

  app.listen(PORT, () => {
    console.log(`[Server] Backend API running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
});
