import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatusBadge } from '../components/common/StatusBadge';
import { Project } from '../types';
import { INITIAL_PROJECTS } from '../data/initialData';

export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'IN_DEVELOPMENT'>('ALL');

  const completed = INITIAL_PROJECTS.filter((p) => p.status === 'COMPLETED');
  const inProgress = INITIAL_PROJECTS.filter((p) => p.status === 'IN_DEVELOPMENT');

  const renderCard = (project: Project) => {
    const liveLink = project.links.find((l) => l.type === 'DEMO')?.url;
    const githubLink = project.links.find((l) => l.type === 'GITHUB')?.url;

    return (
      <div
        key={project.id}
        className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card overflow-hidden shadow-sm flex flex-col justify-between hover:border-brand-500/40 transition-colors"
      >
        <div>
          {/* Cover image */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-dark-surface">
            <img
              src={project.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-md">
                {project.categoryName}
              </span>
              <StatusBadge status={project.status} />
            </div>
          </div>

          {/* Details */}
          <div className="p-5 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {project.technologies.map((t, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-white/5 mt-3 pt-3">
          <div className="flex items-center gap-3">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </a>
            )}
            {githubLink && !githubLink.includes('Private') && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
            )}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="text-xs font-medium text-slate-500 hover:text-brand-500"
          >
            Details →
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <SeoHead
        title="Projects"
        description="Completed projects and projects in progress by Abdushekur Aman."
      />

      <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="Portfolio"
          title="Projects"
          subtitle="A clear list of completed applications and projects currently in development."
        />

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'ALL'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            All Projects ({INITIAL_PROJECTS.length})
          </button>
          <button
            onClick={() => setFilter('COMPLETED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'COMPLETED'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            Completed ({completed.length})
          </button>
          <button
            onClick={() => setFilter('IN_DEVELOPMENT')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === 'IN_DEVELOPMENT'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            In Progress ({inProgress.length})
          </button>
        </div>

        {/* Completed Section */}
        {(filter === 'ALL' || filter === 'COMPLETED') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Completed Projects ({completed.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completed.map(renderCard)}
            </div>
          </div>
        )}

        {/* In Progress Section */}
        {(filter === 'ALL' || filter === 'IN_DEVELOPMENT') && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Projects in Progress ({inProgress.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgress.map(renderCard)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
