import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Mail, Send, Github, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { SectionHeading } from '../components/common/SectionHeading';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="About Abdushekur Aman"
        description="About Abdushekur Aman — Full-Stack Developer and Information Science student at Haramaya University, Harar, Ethiopia."
      />

      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="About Me"
          title="About Me"
          subtitle="A brief introduction to my background, studies, and development interests."
        />

        {/* Narrative Box with Photo */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Small portrait */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/10 shrink-0 shadow-sm">
              <img
                src="/profile.png"
                alt="Abdushekur Aman"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-center sm:text-left">
              <p>
                I am <strong className="text-slate-900 dark:text-white">Abdushekur Aman</strong>, a Full-Stack Developer and an Information Science student at Haramaya University, living in Harar, Ethiopia.
              </p>
              <p>
                I enjoy building websites, web applications, and mobile apps. My work focuses on learning and applying practical technologies to solve day-to-day problems through clean interface design and reliable backend connections.
              </p>
              <p>
                While developing my projects, I use modern developer tools and AI coding assistants to help explore solutions and write code efficiently. I aim to write straightforward, readable software and continuously improve my programming foundation.
              </p>
            </div>
          </div>

          {/* Education Box */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] space-y-2">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-brand-500" />
              Education
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Haramaya University</span> — Department of Information Science
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Studying core information systems, database management, and software foundations.
            </p>
          </div>

          {/* Verified Contact Details Box */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <a
                href="mailto:abdushakuraman7@gmail.com"
                className="p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:border-brand-500 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span className="truncate">abdushakuraman7@gmail.com</span>
              </a>

              <a
                href="https://t.me/TheBrianic20"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:border-brand-500 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>@TheBrianic20</span>
              </a>

              <a
                href="https://github.com/amanshakile-star"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-slate-200 dark:border-white/10 hover:border-brand-500 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>amanshakile-star</span>
              </a>
            </div>
          </div>
        </div>

        {/* Next link */}
        <div className="flex items-center justify-between text-xs pt-2">
          <Link to="/" className="text-slate-500 hover:text-brand-500">
            ← Back to Home
          </Link>
          <Link to="/projects" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1">
            Browse Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
};
