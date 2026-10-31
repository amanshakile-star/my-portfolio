import React from 'react';
import { Download, Printer, MapPin, Github, Mail, Send } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { INITIAL_PROJECTS, TECHNICAL_SKILLS } from '../data/initialData';

export const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SeoHead
        title="Curriculum Vitae (CV) & Resume"
        description="Curriculum Vitae of Abdushekur Aman — Full-Stack Developer and Information Science student at Haramaya University, Harar, Ethiopia."
      />

      <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Curriculum Vitae
            </h1>
            <p className="text-xs text-slate-500">
              Abdushekur Aman — Full-Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>

            <a
              href="/resume.pdf"
              download="Abdushekur_Aman_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF CV
            </a>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card p-6 sm:p-10 shadow-sm space-y-8 print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Abdushekur Aman
              </h2>
              <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                Full-Stack Developer
              </p>
              <p className="text-xs text-slate-500 max-w-md pt-1 leading-relaxed">
                Information Science student at Haramaya University building web and mobile applications with practical architecture.
              </p>
            </div>

            <div className="space-y-1 text-xs text-slate-500 font-mono sm:text-right shrink-0">
              <div className="flex sm:justify-end items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                Harar, Ethiopia
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-500" />
                abdushakuraman7@gmail.com
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-brand-500" />
                Telegram: @TheBrianic20
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-brand-500" />
                github.com/amanshakile-star
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/10 pb-1">
              Education
            </h3>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-white">
                Haramaya University
              </span>
              <span className="text-slate-500">Ethiopia</span>
            </div>
            <p className="text-xs text-brand-600 dark:text-brand-400">
              Information Science Student
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Coursework covering information systems, database design, software engineering fundamentals, and computer programming.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/10 pb-1">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {TECHNICAL_SKILLS.map((c, i) => (
                <div key={i}>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {c.category}:
                  </span>{' '}
                  <span className="text-slate-500 font-mono">
                    {c.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/10 pb-1">
              Projects
            </h3>

            {INITIAL_PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {proj.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {proj.summary}
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  Tech: {proj.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
