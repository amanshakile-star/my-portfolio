# Vercel Deployment Guide — Abdushekur Aman Portfolio

This guide explains how to deploy the portfolio to **Vercel** in under 2 minutes.

---

## ⚡ Quick Deployment Steps

### Method 1: Deploy Directly from Vercel Dashboard (Recommended)

1. **Sign in to Vercel**
   - Go to [https://vercel.com/dashboard](https://vercel.com/dashboard).

2. **Import Git Repository**
   - Click **Add New...** > **Project**.
   - Select your GitHub repository: `amanshakile-star/my-portfolio`.

3. **Configure Project Settings**
   The repository already includes root-level and client-level configurations (`vercel.json`), so defaults will work out-of-the-box:

   - **Framework Preset**: `Vite`
   - **Root Directory**: Leave as `./` (or select `client`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist` (or `dist` if Root Directory is `client`)
   - **Install Command**: `npm --prefix client install` (or automatic)

4. **Deploy**
   - Click **Deploy**.
   - Vercel will build the project and output your live deployment URL: `https://my-portfolio-*.vercel.app`.

---

## 🛠️ SPA Routing & 404 Prevention

This project uses React Router. To prevent 404 errors when reloading subpages (such as `/projects`, `/about`, `/contact`, `/resume`), the repository includes `vercel.json` rewrites:

```json
{
  "buildCommand": "npm --prefix client run build",
  "outputDirectory": "client/dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This guarantees that all route requests are served by the Vite application index and handled smoothly by client-side routing.

---

## ✅ Post-Deployment Verification Checklist

Once the deployment completes:

1. **Home Page**: Check the intro, verified project stats (4 completed, 1 in progress), and profile image.
2. **Theme Switch**: Click the Sun/Moon toggle to ensure dark/light mode switches smoothly.
3. **Projects Page**: Verify that all 5 projects (Harmony Hotel, Note Taking App, Aqua Link, Chessmate AI, Hafzi Center) render with their actual links.
4. **Project Detail Pages**: Click into any project to verify the project overview, key features, and source/live links.
5. **Resume Page**: Check that the CV view, Print/Save PDF, and Download PDF buttons function.
6. **Contact Page**: Test the contact form and confirm it opens the prefilled email addressed to `abdushakuraman7@gmail.com`.
7. **Direct URL Reloads**: Refresh on `/projects` and `/about` to confirm Vercel rewrites prevent 404 errors.
