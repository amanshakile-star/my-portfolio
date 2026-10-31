import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, AlertCircle } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { StatusBadge } from '../components/common/StatusBadge';
import { Project } from '../types';
import { fetchProjectBySlug } from '../lib/api';
import { INITIAL_PROJECTS } from '../data/initialData';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    fetchProjectBySlug(slug).then((data) => {
      if (data) {
        setProject(data);
      } else {
        const found = INITIAL_PROJECTS.find((p) => p.slug === slug);
        setProject(found || null);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project Not Found</h2>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
      </div>
    );
  }

  const liveLink = project.links.find((l) => l.type === 'DEMO')?.url;
  const githubLink = project.links.find((l) => l.type === 'GITHUB')?.url;

  return (
    <>
      <SeoHead
        title={`${project.title} — Project Details`}
        description={project.summary}
      />

      <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link & Status */}
        <div className="flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Projects
          </Link>
          <StatusBadge status={project.status} />
        </div>

        {/* Title & Overview */}
        <div className="space-y-3">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
            {project.categoryName}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {githubLink && !githubLink.includes('Private') && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-medium border border-slate-200 dark:border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub Repository
              </a>
            )}
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 aspect-video w-full bg-slate-900 shadow-sm">
          <img
            src={project.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Problem and Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Problem Addressed
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem || 'Standard problem definition.'}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Solution Implemented
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.solution || 'Practical application structure.'}
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
