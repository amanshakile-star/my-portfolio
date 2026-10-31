import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, ArrowRight } from 'lucide-react';

export const AboutPreviewSection: React.FC = () => {
  return (
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card p-6 md:p-8 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400">
          About Me
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Background & Education
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          I am an Information Science student at Haramaya University, living in Harar, Ethiopia. I build websites and mobile applications while studying software fundamentals. I focus on writing straightforward code, understanding application workflows, and building practical digital solutions.
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-brand-500" />
            Haramaya University — Information Science
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-500" />
            Harar, Ethiopia
          </span>
        </div>

        <div className="pt-2">
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Read more about me <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
