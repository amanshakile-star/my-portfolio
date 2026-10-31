import { Request, Response, NextFunction } from 'express';
import { loginAdmin } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await loginAdmin(req.body);

    if (!result) {
      res.status(401).json({
        success: false,
        message: 'Invalid administrative email or password.',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Authentication successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  res.json({
    success: true,
    data: req.user,
  });
}
