import { Project, PortfolioSettings } from '../types';
import { INITIAL_PROJECTS, INITIAL_SETTINGS } from '../data/initialData';

export async function fetchProjects(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
}): Promise<Project[]> {
  let result = [...INITIAL_PROJECTS];
  if (params?.featured) {
    result = result.filter((p) => p.featured);
  }
  if (params?.category && params.category !== 'all') {
    result = result.filter((p) =>
      p.categoryName.toLowerCase().includes(params.category!.toLowerCase())
    );
  }
  if (params?.search) {
    const s = params.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.summary.toLowerCase().includes(s) ||
        p.technologies.some((t) => t.toLowerCase().includes(s))
    );
  }
  return result;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  return INITIAL_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function fetchPortfolioSettings(): Promise<PortfolioSettings> {
  return INITIAL_SETTINGS;
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  // Direct mailto generation to trigger user's default email client
  const recipient = 'abdushakuraman7@gmail.com';
  const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  );

  try {
    window.location.href = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
  } catch (err) {
    console.error('Mailto error:', err);
  }

  return {
    success: true,
    message: 'Thank you! Your default email client has been opened with your message addressed to abdushakuraman7@gmail.com.',
  };
}
