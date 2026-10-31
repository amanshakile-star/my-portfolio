import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Github, ArrowRight } from 'lucide-react';

export const ContactCtaSection: React.FC = () => {
  return (
    <section className="py-14 bg-slate-100/50 dark:bg-dark-surface/30 border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Feel free to reach out via email, Telegram, or through the contact form.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="mailto:abdushakuraman7@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium shadow-sm transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            abdushakuraman7@gmail.com
          </a>

          <a
            href="https://t.me/TheBrianic20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-900 dark:text-white text-xs font-medium border border-slate-300 dark:border-white/10 transition-colors font-mono"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram @TheBrianic20
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-500 text-xs font-medium border border-slate-300 dark:border-white/10 transition-colors"
          >
            Contact Form <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
