import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Abdushekur Aman Portfolio...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@abdushekur.dev';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePass2026!';
  const adminName = process.env.ADMIN_NAME || 'Abdushekur Aman';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  // 1. Seed Admin
  const admin = await prisma.adminAccount.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      passwordHash,
      name: adminName,
    },
    create: {
      email: adminEmail.toLowerCase(),
      passwordHash,
      name: adminName,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin account configured: ${admin.email}`);

  // 2. Seed Portfolio Settings
  const settings = [
    { key: 'ownerName', value: 'Abdushekur Aman' },
    { key: 'professionalTitle', value: 'Full-Stack Developer' },
    { key: 'location', value: 'Harar, Ethiopia' },
    { key: 'university', value: 'Haramaya University' },
    { key: 'educationField', value: 'Information Science' },
    { key: 'githubUrl', value: 'https://github.com/amanshakile-star' },
    { key: 'vercelUrl', value: 'https://vercel.com/shake-abdella' },
    { key: 'cvUrl', value: '/resume.pdf' },
    {
      key: 'bio',
      value:
        'I am Abdushekur Aman, a Full-Stack Developer and Information Science student at Haramaya University. I enjoy designing and developing modern digital solutions, including web applications, backend systems, and mobile applications. My focus is on building practical software that solves real-world problems through thoughtful design, reliable architecture, and effective technologies.',
    },
    {
      key: 'tagline',
      value: 'Building digital experiences, intelligent systems, and practical software solutions.',
    },
  ];

  for (const s of settings) {
    await prisma.portfolioSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log('✅ Portfolio settings seeded.');

  // 3. Seed Categories
  const categories = [
    { name: 'Web Development / Hospitality', slug: 'web-development' },
    { name: 'Web Application / Productivity', slug: 'web-applications' },
    { name: 'Full-Stack Application / Logistics', slug: 'full-stack' },
    { name: 'Android Application / Education', slug: 'mobile-development' },
    { name: 'Web & Desktop Application / AI', slug: 'ai-desktop' },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.projectCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
    categoryMap[cat.slug] = created.id;
  }
  console.log('✅ Categories seeded.');

  // 4. Seed Technologies
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Programming' },
    { name: 'Vite', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Shadcn UI', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma ORM', category: 'Database' },
    { name: 'Firebase', category: 'Backend' },
    { name: 'Cloud Firestore', category: 'Database' },
    { name: 'Firebase Storage', category: 'Database' },
    { name: 'Google Generative AI', category: 'AI' },
    { name: 'Kotlin', category: 'Mobile' },
    { name: 'Jetpack Compose', category: 'Mobile' },
    { name: 'Room Database', category: 'Mobile' },
    { name: 'Chess.js', category: 'Frontend' },
    { name: 'Electron', category: 'Desktop' },
    { name: 'Lucide React', category: 'Frontend' },
  ];

  const techMap: Record<string, string> = {};
  for (const t of technologies) {
    const tech = await prisma.technology.upsert({
      where: { name: t.name },
      update: { category: t.category },
      create: { name: t.name, category: t.category },
    });
    techMap[t.name] = tech.id;
  }
  console.log('✅ Technologies seeded.');

  // 5. Seed Projects
  const projects = [
    {
      slug: 'harmony-hotel',
      title: 'Harmony Hotel',
      summary:
        'A premium digital hospitality web platform presenting hotel suites, luxury accommodations, dining options, and guest services.',
      description:
        'Harmony Hotel is a modern, responsive web application engineered for a luxury hospitality brand. It delivers an immersive digital experience for hotel guests, presenting high-resolution suite galleries, amenity breakdowns, dining options, and direct inquiry booking flows.',
      problem:
        'Hospitality businesses struggle to communicate premium service offerings and room tiers through outdated web interfaces, leading to poor customer engagement and low direct conversion rates.',
      solution:
        'Designed and built an ultra-clean, component-driven web application with fast page loads, curated visual hierarchy, interactive suite views, and streamlined guest inquiry forms.',
      targetUsers: 'Hotel guests, leisure travelers, event planners, and hospitality administrators.',
      status: 'COMPLETED',
      featured: true,
      published: true,
      order: 1,
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      categoryId: categoryMap['web-development'],
      architecture:
        'Single Page Application (SPA) built with React 18, Vite, TypeScript, and Tailwind CSS. Utilizes atomic component architecture for modularity and high performance.',
      architectureDiagram: 'User Browser -> React 18 / TypeScript SPA -> Shadcn UI & Tailwind CSS -> Responsive Viewports',
      frontendDetails:
        'Engineered with React 18 and Vite. Features customized Shadcn UI primitives, responsive hero sections, interactive room carousels, and modern theme transitions.',
      backendDetails:
        'Frontend-first hospitality showcase with client-side form validation and inquiry handling. Configured for integration with hospitality reservation REST APIs.',
      databaseDetails: 'Static content and configuration structures optimized for fast CDN edge delivery and SEO caching.',
      challenges: 'Balancing high-resolution hotel imagery with mobile network performance. Solved by implementing modern lazy-loading and responsive image sizing.',
      myContributions: 'Architected the frontend application, designed responsive UI components, established design tokens, and configured continuous deployment on Vercel.',
      techNames: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Shadcn UI', 'Lucide React'],
      links: [
        { label: 'Live Demo', url: 'https://harmonyhotelhub.vercel.app/', type: 'DEMO' },
        { label: 'Vercel Deployment', url: 'https://vercel.com/shake-abdella', type: 'EXTERNAL' },
        { label: 'Source Code', url: 'Private Repository (Request Access)', type: 'DOCS' },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', caption: 'Luxury Suite Showcase', order: 1 },
        { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', caption: 'Deluxe Room Presentation', order: 2 },
      ],
    },
    {
      slug: 'note-taking-application',
      title: 'Note Taking Application (Memory Intelligence PWA)',
      summary:
        'A Progressive Web App for intelligent note-taking featuring AI memory resurfacing, quote extraction, study mode, and offline retention.',
      description:
        'Memory Intelligence is an advanced Progressive Web App designed to combat the "forgetting curve" through algorithmic note resurfacing and AI assistance. It provides a distraction-free rich text editor, quote extraction, text-to-speech study mode, and offline synchronization.',
      problem:
        'Users frequently record notes and study materials but never review them, causing critical information to be forgotten over time.',
      solution:
        'Engineered an intelligent resurfacing engine that automatically surfaces notes older than 7 days, integrates Google Gemini AI for contextual quote extraction and summaries, and supports study audio playback.',
      targetUsers: 'Students, researchers, knowledge workers, and lifelong learners.',
      status: 'COMPLETED',
      featured: true,
      published: true,
      order: 2,
      coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
      categoryId: categoryMap['web-applications'],
      architecture:
        'Progressive Web App (PWA) client with Service Worker offline caching, integrated with Firebase Authentication, Cloud Firestore real-time NoSQL, and Google Generative AI (Gemini SDK).',
      architectureDiagram: 'User Device -> PWA (React + Service Worker) -> Firebase Auth & Firestore DB <-> Google Gemini AI API',
      frontendDetails:
        'Built with React 18, Vite, Tailwind CSS, Lucide icons, React-Quill for rich-text editing, and PDF.js for document inspection.',
      backendDetails:
        'Firebase BaaS architecture utilizing Cloud Firestore rules, Firebase Authentication (Email/Password & Google), and Cloud Messaging for reminders.',
      databaseDetails: 'Cloud Firestore document collections for notes, tags, resurfacing logs, and user profile metadata with security rules.',
      challenges: 'Enabling seamless offline note editing with subsequent cloud sync. Implemented Service Worker caching and Firestore offline persistence.',
      myContributions: 'Architected and built the entire application, integrated Gemini AI API, created the memory resurfacing algorithm, and published the PWA on Vercel.',
      techNames: ['React', 'TypeScript', 'Vite', 'Firebase', 'Google Generative AI', 'Tailwind CSS'],
      links: [
        { label: 'Live Demo', url: 'https://notetakingapp-iota.vercel.app/', type: 'DEMO' },
        { label: 'GitHub Repository', url: 'https://github.com/amanshakile-star/NOTE-TAKING-APP', type: 'GITHUB' },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80', caption: 'Editor and Note Workspace', order: 1 },
      ],
    },
    {
      slug: 'aqua-link',
      title: 'Aqua Link — Water Delivery & Infrastructure Management',
      summary:
        'A multi-role platform connecting customers with water suppliers while providing infrastructure leak reporting and municipal management dashboards.',
      description:
        'Aqua Link is an operational platform engineered to resolve water supply coordination bottlenecks and urban water infrastructure reporting. It integrates a customer ordering portal, water shop order management, and public reporting of damaged or leaking water mains.',
      problem:
        'Urban communities face difficulties ordering clean water deliveries reliably, while leaking public water pipes often go unreported for days due to lack of a centralized reporting system.',
      solution:
        'Built a unified role-based dashboard for customers, water shop vendors, and municipal/government administrators with order lifecycle management and infrastructure fault logging.',
      targetUsers: 'Urban residents, local water shop owners, and municipal water authority personnel.',
      status: 'COMPLETED',
      featured: true,
      published: true,
      order: 3,
      coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80',
      categoryId: categoryMap['full-stack'],
      architecture:
        'Role-Based Dashboard Application built with React, TypeScript, and Firebase. Implements Firestore security rules for strict data isolation between vendors, customers, and municipal admins.',
      architectureDiagram: 'Customer / Shop Owner / Admin -> React & TypeScript Dashboard -> Firebase Auth & RBAC -> Cloud Firestore & Firebase Storage',
      frontendDetails:
        'Dashboard UI engineered with React, Vite, TypeScript, and Tailwind CSS. Features tabular order statuses, delivery fee calculators, and image upload for infrastructure reports.',
      backendDetails: 'Firebase BaaS with Firestore security rules, image storage in Firebase Storage, and role-based claim checks.',
      databaseDetails: 'Structured NoSQL collections for water orders, pricing settings, delivery zones, infrastructure incident reports, and user profiles.',
      challenges: 'Designing distinct permissions for municipal monitors vs. commercial water sellers. Solved using role claims in Firestore security rules.',
      myContributions: 'Architected the multi-role dashboard, designed the water order workflow and leak reporting module, and deployed the application to Vercel.',
      techNames: ['React', 'TypeScript', 'Vite', 'Firebase', 'Cloud Firestore', 'Firebase Storage', 'Tailwind CSS'],
      links: [
        { label: 'Live Demo', url: 'https://aqualink-theta.vercel.app/', type: 'DEMO' },
        { label: 'GitHub Repository', url: 'https://github.com/amanshakile-star/AquaLink', type: 'GITHUB' },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80', caption: 'Water Delivery Coordination', order: 1 },
      ],
    },
    {
      slug: 'hafzi-center',
      title: 'Hafzi Center — Quran Memorization Management System',
      summary:
        'An Android application engineered for students and teachers to organize Quran memorization, track Sabaq/Sabqi/Manzil milestones, and manage recitation reviews.',
      description:
        'Hafzi Center is a dedicated mobile application for Quranic memorization centers. It structures the traditional curriculum of Sabaq (new daily memorization), Sabqi (recent revision), and Manzil (cumulative retention), enabling teachers to review recitations and students to monitor their progress.',
      problem:
        'Traditional memorization centers rely on manual paper logbooks to track student recitations, making retention analytics difficult and hindering communication between teachers and parents.',
      solution:
        'Developing a modern Android application utilizing Jetpack Compose and an offline-first Room database, allowing uninterrupted logging in areas with unstable internet connectivity.',
      targetUsers: 'Quran memorization students, instructors, and center administrators.',
      status: 'IN_DEVELOPMENT',
      featured: true,
      published: true,
      order: 4,
      coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
      categoryId: categoryMap['mobile-development'],
      architecture:
        'Clean Architecture (MVVM) for Android utilizing Kotlin, Jetpack Compose declarative UI, Room local SQLite database, and Firebase Authentication.',
      architectureDiagram: 'Android Device (Compose UI) -> ViewModel & StateFlow -> Repository Layer -> Room Local DB (Offline First) <-> Cloud Sync (Planned)',
      frontendDetails:
        'Declarative mobile interface built in Jetpack Compose, featuring Material 3 theming, Quran page views, and audio playback controls.',
      backendDetails:
        'Local SQLite via Room ORM with DAOs for students, assignments, and revisions. Firebase Authentication for user accounts.',
      databaseDetails: 'Room relational tables for Student, Teacher, Assignment, SabaqEntry, and ReviewLog with indexes on student IDs and dates.',
      challenges: 'Providing robust offline reliability so students can practice anywhere without data connectivity. Solved by implementing an offline-first Room cache.',
      myContributions: 'Architected the Android MVVM project structure, designed the Room schema, implemented Compose UI screens, and structured the memorization tracking logic.',
      techNames: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Firebase'],
      links: [
        { label: 'Development Status', url: '#', type: 'DOCS' },
        { label: 'Source Code', url: 'Private Repository (Active Development)', type: 'GITHUB' },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80', caption: 'Memorization Tracking Architecture', order: 1 },
      ],
    },
    {
      slug: 'chessmate-ai',
      title: 'Chessmate AI — Interactive Chess Analysis Platform',
      summary:
        'An interactive chess application featuring engine analysis, game notation, customizable boards, and desktop Electron packaging.',
      description:
        'Chessmate AI is an interactive chess platform developed with modern web and desktop technologies. It integrates game state validation via Chess.js, customizable themes, game replay tools, and desktop compilation via Electron.',
      problem:
        'Chess players need accessible, lightweight analysis boards that can run both in browser environments and as standalone desktop apps.',
      solution:
        'Built a TypeScript-based application using React, Vite, Chess.js, Radix UI, and Electron for cross-platform play and move evaluation.',
      targetUsers: 'Chess enthusiasts, competitive players, and students.',
      status: 'COMPLETED',
      featured: false,
      published: true,
      order: 5,
      coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80',
      categoryId: categoryMap['ai-desktop'],
      architecture:
        'Modular React & TypeScript application packaged for both web deployment and Electron desktop runtime.',
      architectureDiagram: 'User Interface (Radix + Tailwind) -> Chess Game State (Chess.js) -> Move Engine -> Game History',
      frontendDetails:
        'Built with React 18, Vite, TypeScript, Radix UI primitives, Recharts for statistics, and Tailwind CSS.',
      backendDetails:
        'Client-side engine evaluation and Electron main process IPC bridge for desktop operations.',
      databaseDetails: 'Local game notation storage (PGN format) and user preferences.',
      challenges: 'Synchronizing real-time piece movements with valid chess rules and fen notation. Handled cleanly using Chess.js engine state hooks.',
      myContributions: 'Implemented chess board UI, integrated chess.js engine, designed piece animation triggers, and configured Electron integration.',
      techNames: ['React', 'TypeScript', 'Vite', 'Chess.js', 'Electron', 'Tailwind CSS'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/amanshakile-star/chessmate-ai-d322b253', type: 'GITHUB' },
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80', caption: 'Interactive Chess Analysis', order: 1 },
      ],
    },
  ];

  for (const p of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: p.slug } });
    let projectId: string;

    if (existing) {
      projectId = existing.id;
      await prisma.project.update({
        where: { id: existing.id },
        data: {
          title: p.title,
          summary: p.summary,
          description: p.description,
          problem: p.problem,
          solution: p.solution,
          targetUsers: p.targetUsers,
          status: p.status,
          featured: p.featured,
          published: p.published,
          order: p.order,
          coverImage: p.coverImage,
          categoryId: p.categoryId,
          architecture: p.architecture,
          architectureDiagram: p.architectureDiagram,
          frontendDetails: p.frontendDetails,
          backendDetails: p.backendDetails,
          databaseDetails: p.databaseDetails,
          challenges: p.challenges,
          myContributions: p.myContributions,
        },
      });
      // Clear old links and images for a clean re-seed
      await prisma.projectLink.deleteMany({ where: { projectId } });
      await prisma.projectImage.deleteMany({ where: { projectId } });
      await prisma.projectTechnology.deleteMany({ where: { projectId } });
    } else {
      const created = await prisma.project.create({
        data: {
          slug: p.slug,
          title: p.title,
          summary: p.summary,
          description: p.description,
          problem: p.problem,
          solution: p.solution,
          targetUsers: p.targetUsers,
          status: p.status,
          featured: p.featured,
          published: p.published,
          order: p.order,
          coverImage: p.coverImage,
          categoryId: p.categoryId,
          architecture: p.architecture,
          architectureDiagram: p.architectureDiagram,
          frontendDetails: p.frontendDetails,
          backendDetails: p.backendDetails,
          databaseDetails: p.databaseDetails,
          challenges: p.challenges,
          myContributions: p.myContributions,
        },
      });
      projectId = created.id;
    }

    // Links
    for (const link of p.links) {
      await prisma.projectLink.create({
        data: {
          projectId,
          label: link.label,
          url: link.url,
          type: link.type,
        },
      });
    }

    // Images
    for (const img of p.images) {
      await prisma.projectImage.create({
        data: {
          projectId,
          url: img.url,
          caption: img.caption,
          order: img.order,
        },
      });
    }

    // Technologies
    for (const techName of p.techNames) {
      const techId = techMap[techName];
      if (techId) {
        await prisma.projectTechnology.create({
          data: {
            projectId,
            technologyId: techId,
          },
        });
      }
    }
  }

  console.log('✅ Projects, links, images, and technologies seeded successfully.');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
