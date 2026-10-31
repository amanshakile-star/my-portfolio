import { Request, Response, NextFunction } from 'express';
import {
  saveContactMessage,
  getAllContactMessages,
  markMessageRead,
  deleteContactMessage,
} from '../services/messages.service';

export async function submitContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString();
    const message = await saveContactMessage(req.body, ip);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! Abdushekur will review your message and respond promptly.',
      data: {
        id: message.id,
        createdAt: message.createdAt,
      },
    });
  } catch (error: any) {
    if (error.message === 'Spam submission detected') {
      res.status(400).json({
        success: false,
        message: 'Submission rejected.',
      });
      return;
    }
    next(error);
  }
}

export async function listMessages(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const messages = await getAllContactMessages();
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMessageStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    const updated = await markMessageRead(id, isRead ?? true);

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Message not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Message status updated',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await deleteContactMessage(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Message not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
