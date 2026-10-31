export type ProjectStatus = 'COMPLETED' | 'IN_DEVELOPMENT' | 'ARCHIVED';

export interface ProjectLink {
  id?: string;
  label: string;
  url: string;
  type: 'DEMO' | 'GITHUB' | 'DOCS' | 'EXTERNAL';
}

export interface ProjectImage {
  id?: string;
  url: string;
  caption?: string;
  order?: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  problem?: string;
  solution?: string;
  targetUsers?: string;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  order: number;
  coverImage?: string;
  categoryName: string;
  architecture?: string;
  architectureDiagram?: string;
  frontendDetails?: string;
  backendDetails?: string;
  databaseDetails?: string;
  challenges?: string;
  myContributions?: string;
  technologies: string[];
  links: ProjectLink[];
  images?: ProjectImage[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ipAddress?: string;
  isRead: boolean;
  createdAt: string | Date;
}

export interface PortfolioSettings {
  ownerName: string;
  professionalTitle: string;
  location: string;
  university: string;
  educationField: string;
  githubUrl: string;
  vercelUrl: string;
  cvUrl: string;
  bio: string;
  tagline: string;
  [key: string]: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface SkillItem {
  name: string;
  category: string;
  icon?: string;
  description?: string;
  verified: boolean;
}
