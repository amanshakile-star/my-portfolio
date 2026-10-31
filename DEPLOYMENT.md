# Deployment Guide — Abdushekur Aman Portfolio

This guide details how to deploy the portfolio frontend to **Vercel**, the backend to **Render** (or any Node.js hosting platform), and PostgreSQL to **Supabase**, **Neon**, or **Render Managed PostgreSQL**.

---

## Architecture Overview

```
Visitor Browser
      │
      ▼
┌────────────────────────┐
│  Frontend on Vercel    │ ───► Static Assets, Fast Edge CDN, React 18 SPA
└────────────────────────┘
      │ API calls
      ▼
┌────────────────────────┐
│  Backend on Render     │ ───► Express REST API, Zod Validation, JWT Auth, Rate Limiter
└────────────────────────┘
      │ Prisma Queries
      ▼
┌────────────────────────┐
│  PostgreSQL Database   │ ───► Supabase / Neon / Render PostgreSQL
└────────────────────────┘
```

---

## Step 1: Provisioning the PostgreSQL Database

You can use **Supabase**, **Neon.tech**, or **Render PostgreSQL**:

### Option A: Neon.tech (Recommended, Free Tier)
1. Go to [https://neon.tech](https://neon.tech) and create an account.
2. Create a project named `abdushekur-portfolio`.
3. Copy the pooled connection string, for example:
   ```
   postgresql://abdushekur:yourpassword@ep-cool-lake-123456.us-east-2.aws.neon.tech/portfolio_db?sslmode=require
   ```

### Option B: Supabase
1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. In Project Settings > Database, copy the connection URI (port 5432 / 6543 pooler).

---

## Step 2: Deploying the Backend API to Render

1. Push your repository to GitHub under `amanshakile-star/my-portfolio`.
2. Go to [https://dashboard.render.com](https://dashboard.render.com) and select **New Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `abdushekur-portfolio-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build && npm run prisma:deploy && npm run seed`
   - **Start Command**: `npm start`
5. Configure Environment Variables in Render:
   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` (Render default) |
   | `DATABASE_URL` | Your Neon / Supabase PostgreSQL connection string |
   | `JWT_SECRET` | Generate a 32+ character random secret string |
   | `CORS_ORIGIN` | Your frontend Vercel URL (e.g. `https://abdushekur-aman.vercel.app`) |
   | `ADMIN_EMAIL` | `admin@abdushekur.dev` |
   | `ADMIN_PASSWORD` | Strong administrative password |
   | `ADMIN_NAME` | `Abdushekur Aman` |
6. Deploy the service. Once deployed, note your backend URL:
   `https://abdushekur-portfolio-api.onrender.com`

---

## Step 3: Deploying the Frontend to Vercel

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Click **Add New Project** and import the `my-portfolio` repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Rewrites in `client/vercel.json` if proxying API requests directly:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://abdushekur-portfolio-api.onrender.com/api/$1"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
5. Click **Deploy**. Vercel will build and publish your portfolio at `https://[your-project].vercel.app`.

---

## Step 4: Verification & Smoke Testing Checklist

1. **Homepage**: Visit the Vercel URL; verify Dark Premium theme renders by default with no flash of unstyled content.
2. **Navigation & Routes**: Navigate between Home, About, Skills, Projects, Telegram Apps, Resume, and Contact.
3. **Project Detail Pages**: Click into `/projects/harmony-hotel` and verify that the interactive Architecture Flow Diagram, Problem/Solution cards, and verified links render.
4. **Contact Form**: Submit a test message on `/contact`. Verify that the message returns 201 Created and displays the green confirmation badge.
5. **Admin Login**:
   - Navigate to `/admin/login`.
   - Sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   - Verify that you are redirected to `/admin`.
   - Verify that the submitted contact message appears in the **Contact Inquiries** tab.
   - Verify that you can mark it as read or delete it.
6. **CV / Resume**: Visit `/resume`, test the **Print / Save as PDF** and **Download PDF** buttons.
