import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, checkDatabaseConnection } from '../config/db';
import { ENV } from '../config/env';
import { AdminLoginInput } from '../types';

export async function loginAdmin(credentials: AdminLoginInput) {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      const admin = await prisma.adminAccount.findUnique({
        where: { email: credentials.email.toLowerCase() },
      });

      if (admin) {
        const isMatch = await bcrypt.compare(credentials.password, admin.passwordHash);
        if (isMatch) {
          const token = jwt.sign(
            { id: admin.id, email: admin.email, role: admin.role, name: admin.name },
            ENV.JWT_SECRET,
            { expiresIn: '7d' }
          );
          return {
            token,
            admin: {
              id: admin.id,
              email: admin.email,
              name: admin.name,
              role: admin.role,
            },
          };
        }
      }
    } catch (e) {
      console.warn('[Database admin lookup failed, checking fallback]:', (e as Error).message);
    }
  }

  // Fallback admin authentication against ENV credentials
  if (
    credentials.email.toLowerCase() === ENV.ADMIN_EMAIL.toLowerCase() &&
    credentials.password === ENV.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { id: 'admin-env-master', email: ENV.ADMIN_EMAIL, role: 'ADMIN', name: ENV.ADMIN_NAME },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return {
      token,
      admin: {
        id: 'admin-env-master',
        email: ENV.ADMIN_EMAIL,
        name: ENV.ADMIN_NAME,
        role: 'ADMIN',
      },
    };
  }

  return null;
}
