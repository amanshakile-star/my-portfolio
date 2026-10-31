import { prisma, checkDatabaseConnection } from '../config/db';

const defaultSettings: Record<string, string> = {
  ownerName: 'Abdushekur Aman',
  professionalTitle: 'Full-Stack Developer',
  location: 'Harar, Ethiopia',
  university: 'Haramaya University',
  educationField: 'Information Science',
  githubUrl: 'https://github.com/amanshakile-star',
  telegramUrl: 'https://t.me/TheBrianic20',
  telegramHandle: '@TheBrianic20',
  email: 'abdushakuraman7@gmail.com',
  vercelUrl: 'https://vercel.com/shake-abdella',
  cvUrl: '/resume.pdf',
  bio: 'I am Abdushekur Aman, a Full-Stack Developer and Information Science student at Haramaya University in Harar, Ethiopia. I build websites, mobile applications, and backend integrations with clean and practical architecture.',
  tagline: 'Full-Stack Developer & Information Science Student',
};

let fallbackSettings = { ...defaultSettings };

export async function getPortfolioSettings(): Promise<Record<string, string>> {
  const isDbAvailable = await checkDatabaseConnection();

  if (isDbAvailable) {
    try {
      const records = await prisma.portfolioSetting.findMany();
      if (records.length > 0) {
        const result: Record<string, string> = { ...defaultSettings };
        for (const item of records) {
          result[item.key] = item.value;
        }
        return result;
      }
    } catch (e) {
      console.warn('[Database settings query note]:', (e as Error).message);
    }
  }

  return fallbackSettings;
}

export async function updatePortfolioSettings(newSettings: Record<string, string>) {
  fallbackSettings = { ...fallbackSettings, ...newSettings };
  return fallbackSettings;
}
