export type ProjectStatus = 'COMPLETED' | 'IN_DEVELOPMENT' | 'ARCHIVED';

export interface ProjectLinkInput {
  label: string;
  url: string;
  type: 'DEMO' | 'GITHUB' | 'DOCS' | 'EXTERNAL';
}

export interface ProjectImageInput {
  url: string;
  caption?: string;
  order?: number;
}

export interface CreateProjectInput {
  title: string;
  slug: string;
  summary: string;
  description: string;
  problem?: string;
  solution?: string;
  targetUsers?: string;
  status?: ProjectStatus;
  featured?: boolean;
  published?: boolean;
  order?: number;
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
  links: ProjectLinkInput[];
  images?: ProjectImageInput[];
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Bot trap
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface PortfolioSettingsInput {
  [key: string]: string;
}
