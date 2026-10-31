import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env';
import apiRouter from './routes/api.routes';
import { errorHandler } from './middleware/error.middleware';
import { generalApiLimiter } from './middleware/rateLimit.middleware';
import { checkDatabaseConnection } from './config/db';

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Cross-Origin Resource Sharing
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    
    // In dev, allow localhost
    if (ENV.NODE_ENV !== 'production' || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // In production, allow configured domain or Vercel preview domains
    if (origin === ENV.CORS_ORIGIN || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(null, true); // Permissive for initial deployment tests
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General Rate Limiter
app.use('/api', generalApiLimiter);

// API Routes
app.use('/api', apiRouter);

// Root route info
app.get('/', (_req, res) => {
  res.json({
    name: 'Abdushekur Aman Portfolio API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Server startup
const PORT = ENV.PORT;
app.listen(PORT, async () => {
  console.log(`===============================================`);
  console.log(`🚀 Portfolio API running on port ${PORT}`);
  console.log(`🌍 Environment: ${ENV.NODE_ENV}`);
  const dbConnected = await checkDatabaseConnection();
  if (dbConnected) {
    console.log(`📦 Database: Connected to PostgreSQL`);
  } else {
    console.log(`📦 Database: Running with resilient in-memory fallback`);
  }
  console.log(`===============================================`);
});

export default app;
