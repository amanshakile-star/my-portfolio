import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { TECHNICAL_SKILLS } from '../data/initialData';

export const SkillsPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Technical Skills"
        description="Relevant programming languages, web technologies, mobile tools, and backend services used by Abdushekur Aman."
      />

      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading
          badge="Applied Tools"
          title="Technical Skills"
          subtitle="Selected technologies I have worked with and can discuss reasonably."
        />

        {/* 4 Simple Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TECHNICAL_SKILLS.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card shadow-sm space-y-3"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-white/5 pb-2">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clarifying Note */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-300">Note:</strong> These technologies reflect tools I have used across my web, app, and backend projects. Some were integrated with the help of AI coding agents, and I do not claim expert mastery over all of them.
        </div>
      </div>
    </>
  );
};
