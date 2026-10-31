import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Mail, Send, MapPin } from 'lucide-react';
import { INITIAL_PROJECTS } from '../../data/initialData';

export const HeroSection: React.FC = () => {
  // Verified statistics
  const completedCount = INITIAL_PROJECTS.filter((p) => p.status === 'COMPLETED').length;
  const inProgressCount = INITIAL_PROJECTS.filter((p) => p.status === 'IN_DEVELOPMENT').length;

  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Text & Details Column */}
          <div className="md:col-span-8 space-y-5 text-center md:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Information Science Student & Developer
            </div>

            {/* Heading */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Abdushekur Aman
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400">
                Full-Stack Developer
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              I am Abdushekur Aman, a Full-Stack Developer and Information Science student at Haramaya University, based in Harar, Ethiopia. I enjoy building clean websites, mobile applications, and backend integrations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs shadow-sm transition-colors"
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-medium text-xs border border-slate-300 dark:border-white/10 transition-colors"
              >
                Contact Me
              </Link>

              <a
                href="/resume.pdf"
                download="Abdushekur_Aman_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-500 font-medium text-xs border border-slate-300 dark:border-white/10 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>

            {/* Contact Quick-Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                Harar, Ethiopia
              </span>

              <a
                href="mailto:abdushakuraman7@gmail.com"
                className="flex items-center gap-1 hover:text-brand-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand-500" />
                abdushakuraman7@gmail.com
              </a>

              <a
                href="https://t.me/TheBrianic20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-brand-500 transition-colors font-mono"
              >
                <Send className="w-3.5 h-3.5 text-brand-500" />
                @TheBrianic20
              </a>

              <a
                href="https://github.com/amanshakile-star"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-brand-500 transition-colors font-mono"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>

            {/* Project Statistics (TWO statistics only, numbers only, no project names or cards) */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="grid grid-cols-2 max-w-xs gap-3 mx-auto md:mx-0">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card shadow-sm text-center md:text-left">
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {completedCount}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Completed Projects
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card shadow-sm text-center md:text-left">
                  <div className="text-2xl font-extrabold text-amber-500 dark:text-amber-400">
                    {inProgressCount}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Projects in Progress
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photograph */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group max-w-[240px] sm:max-w-[260px] md:max-w-full">
              {/* Soft accent glow behind portrait */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-600/30 to-brand-accent/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 -z-10"></div>
              
              {/* Photo Container */}
              <div className="aspect-square rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white/15 bg-slate-900 shadow-premium">
                <img
                  src="/profile.png"
                  alt="Abdushekur Aman"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
