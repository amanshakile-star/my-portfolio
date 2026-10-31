import { prisma, checkDatabaseConnection } from '../config/db';
import { CreateProjectInput } from '../types';

const initialSeedProjects = [
  {
    id: 'proj-1',
    title: 'Harmony Hotel',
    slug: 'harmony-hotel',
    summary: 'A responsive hotel website presenting accommodation suites, amenities, and hotel services.',
    description: 'Harmony Hotel is a clean web application built for a hospitality presentation. It showcases hotel rooms, dining options, and guest services with responsive layouts across desktop and mobile devices.',
    problem: 'Presenting hotel information and room options online in a clear, easy-to-browse structure.',
    solution: 'Built a responsive web application with fast navigation, suite showcases, and guest inquiry sections.',
    targetUsers: 'Hotel guests and visitors browsing hotel accommodations.',
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 1,
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    categoryName: 'Web Development',
    frontendDetails: 'React components styled with Tailwind CSS and Shadcn UI primitives.',
    backendDetails: 'Client-side application configured for static deployment and web inquiries.',
    databaseDetails: 'Structured content delivery via Vercel edge deployment.',
    myContributions: 'Designed the UI components, structured the pages, and deployed the site on Vercel.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    links: [
      { id: 'link-1-1', label: 'Live Demo', url: 'https://harmonyhotelhub.vercel.app/', type: 'DEMO' },
      { id: 'link-1-2', label: 'Vercel Deployment', url: 'https://vercel.com/shake-abdella', type: 'EXTERNAL' },
    ],
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: 'proj-2',
    title: 'Note Taking Application (Memory Intelligence)',
    slug: 'note-taking-application',
    summary: 'A note-taking web application with rich-text editing, tag organization, and note resurfacing.',
    description: 'A practical web application for taking and organizing notes. Includes a rich-text editor, tagging system, reminders, and offline support through service workers.',
    problem: 'Organizing personal notes and keeping track of important thoughts over time.',
    solution: 'Built an interface with rich text editing, Firebase database synchronization, and note resurfacing features.',
    targetUsers: 'Students and individuals looking to organize notes online.',
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 2,
    coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
    categoryName: 'Web Development',
    frontendDetails: 'React, Tailwind CSS, Lucide icons, and React-Quill for text formatting.',
    backendDetails: 'Firebase Authentication for user sign-in and Cloud Firestore for note storage.',
    databaseDetails: 'Cloud Firestore collections for user notes and tags.',
    myContributions: 'Built the note-taking interface, connected Firebase services, and deployed to Vercel.',
    technologies: ['React', 'JavaScript', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    links: [
      { id: 'link-2-1', label: 'Live Demo', url: 'https://notetakingapp-iota.vercel.app/', type: 'DEMO' },
      { id: 'link-2-2', label: 'GitHub Repository', url: 'https://github.com/amanshakile-star/NOTE-TAKING-APP', type: 'GITHUB' },
    ],
    createdAt: new Date('2026-03-02'),
    updatedAt: new Date('2026-04-11'),
  },
  {
    id: 'proj-3',
    title: 'Aqua Link',
    slug: 'aqua-link',
    summary: 'A web dashboard for water delivery management and reporting water pipe leaks.',
    description: 'Aqua Link is a web platform designed to facilitate water delivery orders and allow users to report damaged or leaking water pipes to improve local coordination.',
    problem: 'Connecting customers with water vendors and reporting water infrastructure problems.',
    solution: 'Created role-based dashboards for order tracking and infrastructure issue reporting.',
    targetUsers: 'Customers, water shop operators, and local management.',
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 3,
    coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80',
    categoryName: 'Web Development',
    frontendDetails: 'Dashboard interface with order tables and incident reporting views.',
    backendDetails: 'Firebase BaaS with Firestore security rules and authentication.',
    databaseDetails: 'Firestore collections for orders, water shops, and issue reports.',
    myContributions: 'Developed the dashboard interface, integrated Firebase data workflows, and deployed to Vercel.',
    technologies: ['React', 'TypeScript', 'Vite', 'Firebase', 'Tailwind CSS'],
    links: [
      { id: 'link-3-1', label: 'Live Demo', url: 'https://aqualink-theta.vercel.app/', type: 'DEMO' },
      { id: 'link-3-2', label: 'GitHub Repository', url: 'https://github.com/amanshakile-star/AquaLink', type: 'GITHUB' },
    ],
    createdAt: new Date('2026-04-18'),
    updatedAt: new Date('2026-04-18'),
  },
  {
    id: 'proj-4',
    title: 'Chessmate AI',
    slug: 'chessmate-ai',
    summary: 'An interactive chess application with board notation and move evaluation.',
    description: 'A chess web and desktop application built with React, Chess.js, and Radix UI primitives for practicing chess games and tracking move history.',
    problem: 'A clean, accessible web board for playing and inspecting chess games.',
    solution: 'Built an interactive chessboard integrated with Chess.js rule logic and move notation.',
    targetUsers: 'Chess players and learners.',
    status: 'COMPLETED',
    featured: false,
    published: true,
    order: 4,
    coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80',
    categoryName: 'Web Development',
    frontendDetails: 'Interactive board UI with Radix UI primitives and Tailwind CSS.',
    backendDetails: 'Client-side rule evaluation using Chess.js engine.',
    databaseDetails: 'Local state and browser storage for game history.',
    myContributions: 'Implemented the board interface and connected the game validation logic.',
    technologies: ['React', 'TypeScript', 'Chess.js', 'Tailwind CSS'],
    links: [
      { id: 'link-4-1', label: 'GitHub Repository', url: 'https://github.com/amanshakile-star/chessmate-ai-d322b253', type: 'GITHUB' },
    ],
    createdAt: new Date('2026-01-21'),
    updatedAt: new Date('2026-01-23'),
  },
  {
    id: 'proj-5',
    title: 'Hafzi Center',
    slug: 'hafzi-center',
    summary: 'An Android app for organizing Quran memorization, currently in active development.',
    description: 'Hafzi Center is an Android application currently in development. It is designed to assist Quran students and teachers in tracking memorization progress (Sabaq, Sabqi, and Manzil) with offline data support.',
    problem: 'Tracking Quran memorization assignments and progress without relying solely on paper logs.',
    solution: 'Developing an Android app with Jetpack Compose and local Room database storage for offline use.',
    targetUsers: 'Quran memorization students and teachers.',
    status: 'IN_DEVELOPMENT',
    featured: true,
    published: true,
    order: 5,
    coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
    categoryName: 'App Development',
    frontendDetails: 'Declarative mobile UI created with Jetpack Compose.',
    backendDetails: 'Local SQLite database via Room ORM; cloud synchronization planned.',
    databaseDetails: 'Room tables for student records, assignments, and review logs.',
    myContributions: 'Architecting the Compose UI screens and Room database schema.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Android SDK'],
    links: [
      { id: 'link-5-1', label: 'Status: In Development', url: '#', type: 'DOCS' },
      { id: 'link-5-2', label: 'Private Repository', url: 'https://github.com/amanshakile-star', type: 'GITHUB' },
    ],
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-01'),
  },
];

let fallbackProjects = [...initialSeedProjects];

export async function getAllProjects(options?: { publishedOnly?: boolean; featuredOnly?: boolean; category?: string; search?: string }) {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      const where: any = {};
      if (options?.publishedOnly !== false) where.published = true;
      if (options?.featuredOnly) where.featured = true;
      if (options?.category) where.category = { slug: options.category };
      if (options?.search) {
        where.OR = [
          { title: { contains: options.search, mode: 'insensitive' } },
          { summary: { contains: options.search, mode: 'insensitive' } },
        ];
      }

      const projects = await prisma.project.findMany({
        where,
        include: {
          category: true,
          technologies: { include: { technology: true } },
          links: true,
        },
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      });

      return projects.map((p) => ({
        ...p,
        categoryName: p.category.name,
        technologies: p.technologies.map((t) => t.technology.name),
      }));
    } catch (e) {
      console.warn('[Database query note]:', (e as Error).message);
    }
  }

  let result = [...fallbackProjects];
  if (options?.publishedOnly !== false) result = result.filter((p) => p.published);
  if (options?.featuredOnly) result = result.filter((p) => p.featured);
  if (options?.category && options.category !== 'all') {
    result = result.filter((p) => p.categoryName.toLowerCase().includes(options.category!.toLowerCase()));
  }
  if (options?.search) {
    const s = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.summary.toLowerCase().includes(s) ||
        p.technologies.some((t) => t.toLowerCase().includes(s))
    );
  }
  return result;
}

export async function getProjectBySlug(slug: string) {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      const project = await prisma.project.findUnique({
        where: { slug },
        include: {
          category: true,
          technologies: { include: { technology: true } },
          links: true,
        },
      });

      if (project) {
        return {
          ...project,
          categoryName: project.category.name,
          technologies: project.technologies.map((t) => t.technology.name),
        };
      }
    } catch (e) {
      console.warn('[Database slug query note]:', (e as Error).message);
    }
  }

  return fallbackProjects.find((p) => p.slug === slug) || null;
}

export async function createProject(data: CreateProjectInput) {
  const id = `proj-${Date.now()}`;
  const newFallbackItem = {
    ...data,
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: data.status || 'COMPLETED',
    featured: data.featured ?? false,
    published: data.published ?? true,
    order: data.order ?? 0,
    links: data.links.map((l, i) => ({ ...l, id: `link-${id}-${i}` })),
  };
  fallbackProjects.push(newFallbackItem as any);
  return newFallbackItem;
}

export async function updateProject(id: string, data: Partial<CreateProjectInput>) {
  const idx = fallbackProjects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    fallbackProjects[idx] = { ...fallbackProjects[idx], ...data, updatedAt: new Date() } as any;
    return fallbackProjects[idx];
  }
  return null;
}

export async function deleteProject(id: string) {
  const initialLen = fallbackProjects.length;
  fallbackProjects = fallbackProjects.filter((p) => p.id !== id);
  return fallbackProjects.length < initialLen;
}
