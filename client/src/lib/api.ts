import { Project, PortfolioSettings, ContactMessage, AdminUser } from '../types';
import { INITIAL_PROJECTS, INITIAL_SETTINGS } from '../data/initialData';

const API_BASE = '/api';

export async function fetchProjects(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
}): Promise<Project[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.featured) query.append('featured', 'true');

    const res = await fetch(`${API_BASE}/projects?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
  } catch (err) {
    // Graceful fallback to rich local dataset
    console.info('Using local project dataset fallback:', (err as Error).message);
  }

  // Filter local dataset
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
        p.description.toLowerCase().includes(s) ||
        p.technologies.some((t) => t.toLowerCase().includes(s))
    );
  }
  return result;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch (err) {
    console.info('Using local project slug fallback:', (err as Error).message);
  }

  return INITIAL_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function fetchPortfolioSettings(): Promise<PortfolioSettings> {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return { ...INITIAL_SETTINGS, ...data.data };
      }
    }
  } catch (err) {
    console.info('Using local settings fallback:', (err as Error).message);
  }
  return INITIAL_SETTINGS;
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Failed to send message. Please check the fields and try again.',
      };
    }

    return {
      success: true,
      message: data.message || 'Message sent successfully!',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Network error. Please verify your connection or contact directly via GitHub.',
    };
  }
}

// Admin API
export async function adminLogin(credentials: {
  email: string;
  password: string;
}): Promise<{ token: string; admin: AdminUser }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data.data;
}

export async function fetchAdminMessages(token: string): Promise<ContactMessage[]> {
  const res = await fetch(`${API_BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to load contact messages');
  const data = await res.json();
  return data.data;
}

export async function toggleMessageReadStatus(
  id: string,
  isRead: boolean,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/messages/${id}/read`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isRead }),
  });
  if (!res.ok) throw new Error('Failed to update message status');
}

export async function deleteMessage(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/messages/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete message');
}

export async function createProjectApi(
  projectData: any,
  token: string
): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create project');
  return data.data;
}

export async function updateProjectApi(
  id: string,
  projectData: any,
  token: string
): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update project');
  return data.data;
}

export async function deleteProjectApi(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete project');
}
