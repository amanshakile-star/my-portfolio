import { Request, Response, NextFunction } from 'express';
import { getPortfolioSettings, updatePortfolioSettings } from '../services/settings.service';

export async function fetchSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const settings = await getPortfolioSettings();
    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
}

export async function saveSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await updatePortfolioSettings(req.body);
    res.json({
      success: true,
      message: 'Portfolio settings updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}
