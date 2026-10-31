import React from 'react';
import { ArrowRight, ArrowDown, Database, Smartphone, Globe, Server, Cloud, Cpu, ShieldCheck } from 'lucide-react';

interface ArchitectureNode {
  title: string;
  role: string;
  tech: string;
  icon?: string;
  color?: string;
}

interface ArchitectureDiagramProps {
  slug: string;
  title: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ slug, title }) => {
  // Tailored architecture nodes for each project based on verified implementations
  let nodes: ArchitectureNode[] = [];
  let protocolLabels: string[] = [];

  if (slug === 'harmony-hotel') {
    nodes = [
      { title: 'Guest Client', role: 'Viewport / Browser', tech: 'Desktop & Mobile Browsers', icon: 'globe', color: 'indigo' },
      { title: 'Frontend SPA', role: 'UI Presentation Layer', tech: 'React 18 + Vite + Shadcn UI', icon: 'globe', color: 'indigo' },
      { title: 'Edge Delivery', role: 'Global Static Hosting', tech: 'Vercel Edge Network / CDN', icon: 'cloud', color: 'violet' },
      { title: 'Inquiry Integration', role: 'Client-side Validation', tech: 'Async Form Dispatching', icon: 'server', color: 'emerald' },
    ];
    protocolLabels = ['HTTPS Request', 'Edge Routing', 'Direct Payload'];
  } else if (slug === 'note-taking-application') {
    nodes = [
      { title: 'Client Application', role: 'Progressive Web App', tech: 'React 18 + PWA Service Worker', icon: 'smartphone', color: 'indigo' },
      { title: 'Intelligence Engine', role: 'AI Analysis & Extraction', tech: 'Google Gemini SDK (Generative AI)', icon: 'cpu', color: 'amber' },
      { title: 'BaaS Platform', role: 'Authentication & Cloud Sync', tech: 'Firebase Auth & Cloud Messaging', icon: 'cloud', color: 'violet' },
      { title: 'Persistence Tier', role: 'Real-time NoSQL Storage', tech: 'Cloud Firestore & Offline Cache', icon: 'database', color: 'cyan' },
    ];
    protocolLabels = ['Client Invocation', 'REST AI Query', 'TLS WebSocket / Sync'];
  } else if (slug === 'aqua-link') {
    nodes = [
      { title: 'Multi-Role Portal', role: 'Customers / Shops / Admin', tech: 'React + TypeScript Web App', icon: 'globe', color: 'indigo' },
      { title: 'Access Control', role: 'Role-Based Authorization', tech: 'Firebase Security Rules & RBAC', icon: 'shield', color: 'violet' },
      { title: 'Media Storage', role: 'Infrastructure Leak Evidence', tech: 'Firebase Cloud Storage', icon: 'cloud', color: 'amber' },
      { title: 'Data Engine', role: 'Orders & Issue Tracker', tech: 'Cloud Firestore Documents', icon: 'database', color: 'cyan' },
    ];
    protocolLabels = ['Auth Token Payload', 'Direct Storage Stream', 'Real-time Document Listeners'];
  } else if (slug === 'hafzi-center') {
    nodes = [
      { title: 'Student & Teacher Device', role: 'Android Native UI', tech: 'Kotlin + Jetpack Compose', icon: 'smartphone', color: 'indigo' },
      { title: 'State Layer', role: 'MVVM Architecture', tech: 'ViewModel & StateFlow Coroutines', icon: 'cpu', color: 'violet' },
      { title: 'Data Access Object', role: 'Repository Pattern', tech: 'Room DAOs (Sabaq / Sabqi / Manzil)', icon: 'server', color: 'amber' },
      { title: 'Offline-First Storage', role: 'Local Relational SQLite', tech: 'Android Room SQLite Database', icon: 'database', color: 'cyan' },
    ];
    protocolLabels = ['Compose State Event', 'Repository Interface', 'SQLite Transaction'];
  } else {
    nodes = [
      { title: 'Client Interface', role: 'Presentation Tier', tech: 'React 18 + Radix UI + Vite', icon: 'globe', color: 'indigo' },
      { title: 'Game State Engine', role: 'Move Evaluation & FEN', tech: 'Chess.js Logic Controller', icon: 'cpu', color: 'violet' },
      { title: 'Packaging Runtime', role: 'Cross-Platform Bridge', tech: 'Electron Desktop Wrapper', icon: 'server', color: 'amber' },
      { title: 'Session Storage', role: 'PGN Notation & Preferences', tech: 'Local State / Storage', icon: 'database', color: 'cyan' },
    ];
    protocolLabels = ['User Action', 'IPC Dispatch', 'Notation Serialization'];
  }

  const renderIcon = (type?: string) => {
    switch (type) {
      case 'smartphone': return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'database': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-purple-400" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'shield': return <ShieldCheck className="w-5 h-5 text-rose-400" />;
      default: return <Globe className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-dark-surface/60 p-6 md:p-8 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <span className="text-xs uppercase tracking-wider text-brand-500 font-semibold">Verified Technical Architecture</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            System Data Flow: {title}
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-mono">
          Interactive Diagram
        </span>
      </div>

      {/* Responsive Diagram Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {nodes.map((node, index) => (
          <React.Fragment key={index}>
            <div className="relative group bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 hover:border-brand-500/50 rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-glow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  {renderIcon(node.icon)}
                </div>
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  Tier {index + 1}
                </span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                {node.title}
              </h4>
              <p className="text-xs text-brand-600 dark:text-brand-400 mt-0.5 font-medium">
                {node.role}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                {node.tech}
              </div>
            </div>

            {index < nodes.length - 1 && (
              <div className="hidden md:flex flex-col items-center justify-center -mx-2">
                <span className="text-[10px] text-slate-600 dark:text-slate-300 font-mono mb-1 text-center truncate max-w-[80px]">
                  {protocolLabels[index] || 'Data Flow'}
                </span>
                <div className="flex items-center text-brand-500 animate-pulse">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            )}

            {index < nodes.length - 1 && (
              <div className="flex md:hidden items-center justify-center py-2 text-brand-500">
                <ArrowDown className="w-5 h-5" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
