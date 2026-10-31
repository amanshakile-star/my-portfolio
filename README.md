# Abdushekur Aman — Full-Stack Developer Portfolio

A production-ready, dark-premium personal brand and software engineering portfolio engineered for **Abdushekur Aman**, Full-Stack Developer and Information Science student at Haramaya University, Harar, Ethiopia.

---

## 🌟 Overview & Architecture

This application is built with a decoupled full-stack architecture:
- **Frontend (`client/`)**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Shadcn UI patterns.
- **Backend (`server/`)**: Node.js, Express.js, TypeScript, REST API, Zod validation, JWT authentication, bcrypt password hashing, rate limiting, and Helmet.
- **Database (`server/prisma/`)**: PostgreSQL with Prisma ORM (8 relational models: Projects, Technologies, Links, Images, Categories, Contact Messages, Admin Accounts, Settings). Includes dual-mode resilient fallback for rapid offline review.

---

## 👨‍💻 Verified Profile Information

- **Full Name**: Abdushekur Aman
- **Professional Title**: Full-Stack Developer
- **Location**: Harar, Ethiopia
- **University**: Haramaya University
- **Field of Study**: Information Science
- **GitHub Profile**: [amanshakile-star](https://github.com/amanshakile-star)
- **Vercel Dashboard**: [shake-abdella](https://vercel.com/shake-abdella)

---

## 🚀 Verified Featured Projects

1. **Harmony Hotel**
   - **Live URL**: [https://harmonyhotelhub.vercel.app/](https://harmonyhotelhub.vercel.app/)
   - **Stack**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI.
   - **Description**: Luxury digital hospitality platform showcasing suites, dining, and guest services.
2. **Note Taking Application (Memory Intelligence PWA)**
   - **Live URL**: [https://notetakingapp-iota.vercel.app/](https://notetakingapp-iota.vercel.app/)
   - **Source Code**: [amanshakile-star/NOTE-TAKING-APP](https://github.com/amanshakile-star/NOTE-TAKING-APP)
   - **Stack**: React, JavaScript/TypeScript, Firebase Auth & Firestore, Google Generative AI (Gemini SDK), React-Quill, PDF.js, Tailwind CSS.
   - **Description**: Progressive Web App with algorithmic 7+ day note resurfacing, text-to-speech study mode, and offline service worker support.
3. **Aqua Link**
   - **Live URL**: [https://aqualink-theta.vercel.app/](https://aqualink-theta.vercel.app/)
   - **Source Code**: [amanshakile-star/AquaLink](https://github.com/amanshakile-star/AquaLink)
   - **Stack**: React, TypeScript, Vite, Firebase Auth, Cloud Firestore, Firebase Storage, Tailwind CSS.
   - **Description**: Multi-role water delivery coordination dashboard and public infrastructure pipe damage reporting system.
4. **Hafzi Center**
   - **Status**: *In Development — Not Yet Deployed*
   - **Stack**: Kotlin, Jetpack Compose, Android SDK, Room Database (offline-first SQLite), Firebase Auth.
   - **Description**: Quran memorization management system for students and teachers to track Sabaq, Sabqi, and Manzil progression.
5. **Chessmate AI (Discovered Repository)**
   - **Source Code**: [amanshakile-star/chessmate-ai-d322b253](https://github.com/amanshakile-star/chessmate-ai-d322b253)
   - **Stack**: React, TypeScript, Vite, Chess.js, Radix UI, Electron, TanStack Query, Tailwind CSS.

---

## 🛠️ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v24 LTS tested)
- **npm**: v9.0.0 or later
- **PostgreSQL** (optional for local testing; server runs with automatic resilient in-memory fallback if local Postgres is inactive)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/amanshakile-star/my-portfolio.git
cd my-portfolio

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
cd ..
```

### 3. Environment Configuration
Create `server/.env` based on `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db?schema=public"
JWT_SECRET="your_secure_random_jwt_secret"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
ADMIN_EMAIL="admin@abdushekur.dev"
ADMIN_PASSWORD="AdminSecurePass2026!"
ADMIN_NAME="Abdushekur Aman"
```

### 4. Database Setup & Seeding (PostgreSQL)
```bash
cd server
# Generate Prisma Client
npm run prisma:generate

# Run migrations (when connected to PostgreSQL)
npm run prisma:migrate

# Seed database with verified projects, admin user, and settings
npm run seed
```

### 5. Running the Application
```bash
# Run both client (port 5173) and server (port 5000) concurrently from root
npm run dev

# Or run separately:
npm run dev:server  # In one terminal
npm run dev:client  # In another terminal
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Administrator Portal

The portfolio includes a protected administrator dashboard accessible at `/admin`:
- **Default Login**: `admin@abdushekur.dev`
- **Default Password**: Configured in `server/.env` (`ADMIN_PASSWORD`)
- **Capabilities**:
  - Add, edit, delete, publish/unpublish, and feature projects.
  - View real contact inquiries submitted through the contact form, mark as read/unread, and delete.
  - Review discovered GitHub public repositories.
  - Edit portfolio settings.

---

## 📦 Production Builds

```bash
# Build both server and client for production
npm run build
```

The compiled frontend is generated in `client/dist/` and the compiled backend is generated in `server/dist/`.

---

## 📄 License
MIT License © 2026 Abdushekur Aman.
