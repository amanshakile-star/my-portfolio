import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { TECHNICAL_SKILLS } from '../../data/initialData';

export const SkillsOverviewSection: React.FC = () => {
  return (
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Technologies"
        title="Technical Skills"
        subtitle="Selected tools and languages I work with and can reasonably discuss."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TECHNICAL_SKILLS.map((cat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card shadow-sm space-y-3"
          >
            <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-white/5 pb-2">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
