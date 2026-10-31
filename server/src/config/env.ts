import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfolio_db?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_key_portfolio_abdushekur_aman_2026_secure',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@abdushekur.dev',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'AdminSecurePass2026!',
  ADMIN_NAME: process.env.ADMIN_NAME || 'Abdushekur Aman',
};
