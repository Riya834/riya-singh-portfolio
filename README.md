# Dynamic Personal Portfolio Website - Riya Singh

An Awwwards-inspired, editorial dynamic personal portfolio and content management system (CMS) built for **Riya Singh** (*Full-Stack Developer | Software Developer | UI/UX Developer*).

Featuring a high-contrast black/white/electric-blue visual design system inspired by modern design references, powered by a React (Vite) + Tailwind CSS + Framer Motion frontend and a Node.js + Express + MongoDB REST API backend.

---

## 🚀 Key Features

- **Editorial Design System**: Stacked oversized typography, blueprint grid background with coordinate annotations, electric blue accents (`#0052FF`), handwritten script font overlay (`"Creative Engineer"`), and floating technical badges.
- **Dynamic Content Management (SaaS Admin CMS)**: Complete admin dashboard (`/admin/login`, `/admin`) allowing real-time CRUD management of Profile, Skills, Experience, Projects, Education, Certifications, Leadership, Contact Messages, and Site Settings.
- **Authentic Resume Integration**: Grounded in Riya Singh's authentic background (B.Tech CSE at SVIET Punjab, Zepp Media, Godigitify, Task Manager Web Application, TEDxSVIET, Techlearns Academy, DAV Public School, ISB Internship, Azure Ideathon).
- **In-Memory MongoDB Fallback**: Built-in `mongodb-memory-server` fallback so the backend works out-of-the-box in development without requiring a local MongoDB daemon.
- **Security & Performance**: JWT authentication, bcrypt password hashing, rate limiting, Helmet HTTP security headers, CORS protection, lazy loading, and smooth desktop custom ring cursor.

---

## 📁 Project Architecture

```
riya-singh-portfolio/
├── frontend/                  # React.js + Vite + Tailwind CSS + Framer Motion
│   ├── public/                # Static assets (riya-profile.jpg, resume.pdf, favicon.svg)
│   ├── src/
│   │   ├── components/        # Hero, About, Skills, Experience, Projects, Leadership, etc.
│   │   ├── context/           # AuthContext (JWT) & PortfolioContext (Data sync)
│   │   ├── pages/             # HomePage, ProjectDetailPage, AdminLoginPage, AdminDashboardPage
│   │   ├── services/          # Axios API layer
│   │   ├── styles/            # Tailwind directives & blueprint grid styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── backend/                   # Node.js + Express + MongoDB REST API
    ├── src/
    │   ├── config/            # DB configuration with MongoMemoryServer fallback
    │   ├── controllers/       # Auth, Profile, Skills, Experience, Projects, Contact, Settings
    │   ├── middleware/        # JWT auth protection & error handler
    │   ├── models/            # Mongoose schemas (Admin, Profile, Skill, Experience, Project, etc.)
    │   ├── routes/            # REST API endpoints
    │   ├── scripts/           # seed.js script preloaded with resume data
    │   └── server.js          # Express app entrypoint with security & auto-seeding
    ├── .env
    └── .env.example
```

---

## 🛠️ Local Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step 1: Clone or Navigate to Project Directory
```bash
cd C:\Users\DELL\.gemini\antigravity\scratch\riya-singh-portfolio
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create or verify `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/riya_singh_portfolio
JWT_SECRET=riya_singh_portfolio_super_secret_jwt_key_2026
ADMIN_EMAIL=riyarssingh22@gmail.com
ADMIN_PASSWORD=AdminRiya2026!
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Step 3: Run Database Seed (Optional - Server auto-seeds on first startup)
```bash
npm run seed
```

### Step 4: Start Backend Development Server
```bash
node src/server.js
# Backend running on http://localhost:5000
```

### Step 5: Frontend Setup & Start
In a new terminal window:
```bash
cd C:\Users\DELL\.gemini\antigravity\scratch\riya-singh-portfolio\frontend
npm install
npm run dev
# Frontend running on http://localhost:5173
```

---

## 🔐 Admin Dashboard Access

- **Login Route**: `http://localhost:5173/admin/login`
- **Dashboard Route**: `http://localhost:5173/admin`
- **Default Credentials**:
  - **Email**: `riyarssingh22@gmail.com`
  - **Password**: `AdminRiya2026!`

---

## 🌐 Production Deployment

### Frontend (Vercel)
1. Push `frontend` to your GitHub repository.
2. Import project into Vercel dashboard.
3. Set Framework Preset to **Vite**.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-domain.com/api`
5. Deploy!

### Backend (Render / Railway / Vercel)
1. Push `backend` to GitHub.
2. Provision a free MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. Connect repository on Render or Railway.
4. Set Environment Variables:
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster.mongodb.net/riya_portfolio`
   - `JWT_SECRET`: `<your-production-secret-key>`
   - `ADMIN_EMAIL`: `riyarssingh22@gmail.com`
   - `ADMIN_PASSWORD`: `<your-secure-admin-password>`
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
   - `NODE_ENV`: `production`
5. Build Command: `npm install`
6. Start Command: `node src/server.js`

---

## 📜 License & Credits

Designed & engineered with curiosity for **Riya Singh**.
© 2026 Riya Singh. All rights reserved.
