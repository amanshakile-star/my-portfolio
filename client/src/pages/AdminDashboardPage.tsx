import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Layers,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Github,
  GitBranch,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { useAuth } from '../context/AuthContext';
import {
  fetchProjects,
  fetchAdminMessages,
  toggleMessageReadStatus,
  deleteMessage,
  createProjectApi,
  deleteProjectApi,
  fetchPortfolioSettings,
} from '../lib/api';
import { Project, ContactMessage, PortfolioSettings } from '../types';
import { DISCOVERED_REPOSITORIES } from '../data/initialData';

export const AdminDashboardPage: React.FC = () => {
  const { isAuthenticated, logout, admin, token } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'settings' | 'repos'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // New Project Form State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    problem: '',
    solution: '',
    targetUsers: '',
    status: 'COMPLETED' as const,
    categoryName: 'Web Development',
    coverImage: '',
    featured: false,
    published: true,
    technologies: 'React, TypeScript, Tailwind CSS',
    demoUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, [isAuthenticated, navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const p = await fetchProjects();
      setProjects(p);

      if (token) {
        const m = await fetchAdminMessages(token);
        setMessages(m);
      }

      const s = await fetchPortfolioSettings();
      setSettings(s);
    } catch (e) {
      console.warn('Dashboard load note:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    if (!token) return;
    try {
      await toggleMessageReadStatus(id, !currentRead, token);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m))
      );
    } catch (e) {
      alert('Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token || !window.confirm('Delete this contact inquiry permanently?')) return;
    try {
      await deleteMessage(id, token);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      alert('Failed to delete message');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !window.confirm('Delete this project from database?')) return;
    try {
      await deleteProjectApi(id, token);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert('Failed to delete project');
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const techArray = newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean);
      const links = [];
      if (newProject.demoUrl) {
        links.push({ label: 'Live Demo', url: newProject.demoUrl, type: 'DEMO' as const });
      }
      if (newProject.githubUrl) {
        links.push({ label: 'GitHub Repository', url: newProject.githubUrl, type: 'GITHUB' as const });
      }

      const payload = {
        title: newProject.title,
        slug: newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary: newProject.summary,
        description: newProject.description,
        problem: newProject.problem,
        solution: newProject.solution,
        targetUsers: newProject.targetUsers,
        status: newProject.status,
        featured: newProject.featured,
        published: newProject.published,
        categoryName: newProject.categoryName,
        coverImage: newProject.coverImage,
        technologies: techArray,
        links,
      };

      const created = await createProjectApi(payload, token);
      setProjects([created, ...projects]);
      setShowNewProjectModal(false);
      // Reset form
      setNewProject({
        title: '',
        slug: '',
        summary: '',
        description: '',
        problem: '',
        solution: '',
        targetUsers: '',
        status: 'COMPLETED',
        categoryName: 'Web Development',
        coverImage: '',
        featured: false,
        published: true,
        technologies: 'React, TypeScript, Tailwind CSS',
        demoUrl: '',
        githubUrl: '',
      });
    } catch (err: any) {
      alert(err.message || 'Error creating project');
    }
  };

  return (
    <>
      <SeoHead
        title="Admin Control Center"
        description="Administrative management dashboard for Abdushekur Aman portfolio."
      />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Admin Control Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Logged in as <span className="font-mono text-brand-500">{admin?.email || 'Administrator'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-white/10 space-x-6 text-sm">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors border-b-2 -mb-px ${
              activeTab === 'projects'
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors border-b-2 -mb-px ${
              activeTab === 'messages'
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Inquiries ({messages.length})
            {messages.some((m) => !m.isRead) && (
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('repos')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors border-b-2 -mb-px ${
              activeTab === 'repos'
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            Discovered Repos ({DISCOVERED_REPOSITORIES.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors border-b-2 -mb-px ${
              activeTab === 'settings'
                ? 'border-brand-500 text-brand-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            Portfolio Settings
          </button>
        </div>

        {/* Tab 1: Projects Manager */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Live Portfolio Projects
                </h3>
                <p className="text-xs text-slate-500">
                  Manage showcases, update statuses, or register new projects into PostgreSQL.
                </p>
              </div>

              <button
                onClick={() => setShowNewProjectModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-400 font-mono">
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Published</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {proj.title}
                        <div className="text-[11px] text-slate-400 font-mono font-normal">
                          slug: {proj.slug}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {proj.categoryName}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {proj.featured ? (
                          <span className="text-amber-400 font-mono">★ Yes</span>
                        ) : (
                          <span className="text-slate-400 font-mono">No</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {proj.published ? (
                          <span className="text-emerald-400 font-mono">Live</span>
                        ) : (
                          <span className="text-slate-400 font-mono">Draft</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <a
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 inline-block text-slate-400 hover:text-brand-500"
                          title="View Detail Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Contact Messages Center */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Received Contact Messages
              </h3>
              <p className="text-xs text-slate-500">
                Inquiries submitted through the contact page form.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-slate-200 dark:border-white/10 text-slate-500 text-xs">
                No contact inquiries recorded in database yet.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      msg.isRead
                        ? 'border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card opacity-80'
                        : 'border-brand-500/40 bg-brand-500/5 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {msg.name}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          &lt;{msg.email}&gt;
                        </span>
                        {!msg.isRead && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-500 text-white">
                            NEW
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 text-[11px] font-mono">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleToggleRead(msg.id, msg.isRead)}
                          className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-brand-500 text-[11px]"
                        >
                          {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Discovered GitHub Repos Reviewer */}
        {activeTab === 'repos' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Discovered GitHub Repositories Audit
              </h3>
              <p className="text-xs text-slate-500">
                Audited from GitHub profile <code className="font-mono text-brand-500">amanshakile-star</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DISCOVERED_REPOSITORIES.map((repo, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                      {repo.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-brand-500">
                      {repo.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {repo.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
                    <span className="font-mono text-slate-500">{repo.language}</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-500 hover:underline flex items-center gap-1 font-mono text-xs"
                    >
                      Inspect Source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Settings */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Portfolio Configuration
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  readOnly
                  value="Abdushekur Aman"
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  University & Department
                </label>
                <input
                  type="text"
                  readOnly
                  value="Haramaya University — Information Science"
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Verified GitHub URL
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://github.com/amanshakile-star"
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Vercel Profile
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://vercel.com/shake-abdella"
                  className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create Project */}
        {showNewProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-xl bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-white/10 p-6 md:p-8 space-y-4 shadow-2xl my-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Add New Showcase Project
              </h3>

              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Real-Time Chat System"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Slug (URL identifier)</label>
                  <input
                    type="text"
                    value={newProject.slug}
                    onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                    placeholder="real-time-chat-system"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Short Summary *</label>
                  <input
                    type="text"
                    required
                    value={newProject.summary}
                    onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                    placeholder="One-line summary for cards"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Detailed Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Deep architectural overview..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Category</label>
                    <input
                      type="text"
                      value={newProject.categoryName}
                      onChange={(e) => setNewProject({ ...newProject, categoryName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    >
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="IN_DEVELOPMENT">IN_DEVELOPMENT</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    placeholder="React, TypeScript, Express, PostgreSQL"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    />
                    <span>Feature on homepage</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProject.published}
                      onChange={(e) => setNewProject({ ...newProject, published: e.target.checked })}
                    />
                    <span>Publish live</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-sm"
                  >
                    Save & Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
