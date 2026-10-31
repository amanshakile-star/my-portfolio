import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { SectionHeading } from '../common/SectionHeading';

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  const completedProjects = projects.filter((p) => p.status === 'COMPLETED');
  const inProgressProjects = projects.filter((p) => p.status === 'IN_DEVELOPMENT');

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
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Software Projects"
        title="Projects"
        subtitle="Completed projects and work currently in development."
      />

      {/* Completed Projects Group */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Completed Projects ({completedProjects.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedProjects.map(renderCard)}
        </div>
      </div>

      {/* Projects In Progress Group */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Projects in Progress ({inProgressProjects.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inProgressProjects.map(renderCard)}
        </div>
      </div>
    </section>
  );
};
