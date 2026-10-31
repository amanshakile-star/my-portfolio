import { prisma, checkDatabaseConnection } from '../config/db';
import { ContactMessageInput } from '../types';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ipAddress?: string | null;
  isRead: boolean;
  createdAt: Date;
}

let fallbackMessages: StoredMessage[] = [];

export async function saveContactMessage(
  data: ContactMessageInput,
  ipAddress?: string
): Promise<StoredMessage> {
  // Honeypot spam protection: bots often fill in hidden fields
  if (data.honeypot && data.honeypot.trim().length > 0) {
    throw new Error('Spam submission detected');
  }

  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      const msg = await prisma.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          ipAddress: ipAddress || 'unknown',
        },
      });
      return msg;
    } catch (e) {
      console.warn('[Database contact message creation failed, using resilient fallback]:', (e as Error).message);
    }
  }

  const fallbackMsg: StoredMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    ipAddress: ipAddress || 'unknown',
    isRead: false,
    createdAt: new Date(),
  };

  fallbackMessages.unshift(fallbackMsg);
  return fallbackMsg;
}

export async function getAllContactMessages() {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.warn('[Database get messages failed]:', (e as Error).message);
    }
  }

  return fallbackMessages;
}

export async function markMessageRead(id: string, isRead: boolean = true) {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      return await prisma.contactMessage.update({
        where: { id },
        data: { isRead },
      });
    } catch (e) {
      console.warn('[Database mark message read failed]:', (e as Error).message);
    }
  }

  const target = fallbackMessages.find((m) => m.id === id);
  if (target) {
    target.isRead = isRead;
    return target;
  }
  return null;
}

export async function deleteContactMessage(id: string) {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      await prisma.contactMessage.delete({ where: { id } });
      return true;
    } catch (e) {
      console.warn('[Database delete message failed]:', (e as Error).message);
    }
  }

  const beforeLen = fallbackMessages.length;
  fallbackMessages = fallbackMessages.filter((m) => m.id !== id);
  return fallbackMessages.length < beforeLen;
}
