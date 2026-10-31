import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Send, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-dark-surface/50 text-slate-600 dark:text-slate-400 py-10 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Abdushekur Aman
            </h3>
            <p className="text-xs text-slate-500">
              Full-Stack Developer · Information Science Student at Haramaya University
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href="mailto:abdushakuraman7@gmail.com"
              className="flex items-center gap-1.5 hover:text-brand-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-500" />
              abdushakuraman7@gmail.com
            </a>

            <a
              href="https://t.me/TheBrianic20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-500 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-brand-500" />
              @TheBrianic20
            </a>

            <a
              href="https://github.com/amanshakile-star"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-500 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              amanshakile-star
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            Harar, Ethiopia
          </span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-brand-500">About</Link>
            <Link to="/projects" className="hover:text-brand-500">Projects</Link>
            <Link to="/resume" className="hover:text-brand-500">Resume</Link>
            <Link to="/contact" className="hover:text-brand-500">Contact</Link>
          </div>
          <span>© {currentYear} Abdushekur Aman</span>
        </div>
      </div>
    </footer>
  );
};
