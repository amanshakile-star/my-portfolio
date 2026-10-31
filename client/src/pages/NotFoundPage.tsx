import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="404 — Page Not Found"
        description="The page you are looking for does not exist on Abdushekur Aman's portfolio."
      />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              404
            </h1>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
              Page Not Found
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              The endpoint or route you navigated to could not be found. Please check the URL or return to the home overview.
            </p>
          </div>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs shadow-glow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
