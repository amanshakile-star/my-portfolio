import { Router } from 'express';
import {
  listProjects,
  getProject,
  createNewProject,
  updateExistingProject,
  removeProject,
} from '../controllers/projects.controller';
import {
  submitContact,
  listMessages,
  updateMessageStatus,
  removeMessage,
} from '../controllers/messages.controller';
import { login, getProfile } from '../controllers/auth.controller';
import { fetchSettings, saveSettings } from '../controllers/settings.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { contactRateLimiter, authRateLimiter } from '../middleware/rateLimit.middleware';
import {
  contactMessageSchema,
  adminLoginSchema,
  projectSchema,
  settingsSchema,
} from '../validations';
import { checkDatabaseConnection } from '../config/db';

const router = Router();

// Health Check
router.get('/health', async (_req, res) => {
  const dbConnected = await checkDatabaseConnection();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'resilient-fallback',
  });
});

// Settings (Public & Protected)
router.get('/settings', fetchSettings);
router.put('/settings', requireAdmin, validateBody(settingsSchema), saveSettings);

// Projects (Public)
router.get('/projects', listProjects);
router.get('/projects/:slug', getProject);

// Projects (Protected Admin)
router.post('/projects', requireAdmin, validateBody(projectSchema), createNewProject);
router.put('/projects/:id', requireAdmin, updateExistingProject);
router.delete('/projects/:id', requireAdmin, removeProject);

// Contact (Public with Rate Limiting and Validation)
router.post('/contact', contactRateLimiter, validateBody(contactMessageSchema), submitContact);

// Messages (Protected Admin)
router.get('/messages', requireAdmin, listMessages);
router.patch('/messages/:id/read', requireAdmin, updateMessageStatus);
router.delete('/messages/:id', requireAdmin, removeMessage);

// Authentication
router.post('/auth/login', authRateLimiter, validateBody(adminLoginSchema), login);
router.get('/auth/me', requireAdmin, getProfile);

export default router;
