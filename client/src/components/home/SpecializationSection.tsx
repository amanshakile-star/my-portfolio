import React from 'react';
import { Globe, Smartphone, Server } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { WHAT_I_DO } from '../../data/initialData';

export const SpecializationSection: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Globe className="w-5 h-5 text-brand-500" />;
      case 1:
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      default:
        return <Server className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section className="py-14 bg-slate-100/60 dark:bg-dark-surface/40 border-y border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Focus Areas"
          title="What I Do"
          subtitle="Simple, direct development work focused on modern web apps, mobile apps, and backend services."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHAT_I_DO.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card p-6 shadow-sm hover:border-brand-500/40 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 w-fit mb-4">
                {getIcon(index)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
