import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters').trim(),
  email: z.string().email('Please provide a valid email address').max(150, 'Email cannot exceed 150 characters').trim().toLowerCase(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject cannot exceed 200 characters').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message cannot exceed 5000 characters').trim(),
  honeypot: z.string().optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const projectLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url('Invalid URL format'),
  type: z.enum(['DEMO', 'GITHUB', 'DOCS', 'EXTERNAL']),
});

export const projectImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  caption: z.string().optional(),
  order: z.number().int().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required').max(150),
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase alphanumeric characters and hyphens'),
  summary: z.string().min(10, 'Summary is required').max(300),
  description: z.string().min(20, 'Detailed description is required'),
  problem: z.string().optional(),
  solution: z.string().optional(),
  targetUsers: z.string().optional(),
  status: z.enum(['COMPLETED', 'IN_DEVELOPMENT', 'ARCHIVED']).default('COMPLETED'),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
  coverImage: z.string().optional(),
  categoryName: z.string().min(2, 'Category name is required'),
  architecture: z.string().optional(),
  architectureDiagram: z.string().optional(),
  frontendDetails: z.string().optional(),
  backendDetails: z.string().optional(),
  databaseDetails: z.string().optional(),
  challenges: z.string().optional(),
  myContributions: z.string().optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology must be specified'),
  links: z.array(projectLinkSchema).default([]),
  images: z.array(projectImageSchema).optional(),
});

export const settingsSchema = z.record(z.string());
