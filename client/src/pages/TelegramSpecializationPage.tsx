import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Bot,
  Send,
  Layers,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Code2,
  Terminal,
  Server,
  Database,
  Lock,
} from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { SectionHeading } from '../components/common/SectionHeading';

export const TelegramSpecializationPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Telegram Mini Apps & Bots Specialization"
        description="Explore Abdushekur Aman's specialized focus in building Telegram Mini Apps, Telegram Bot automation, and backend webhook architectures."
      />

      <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Platform Specialization"
          title="Telegram Mini Apps & Bot Architectures"
          subtitle="Engineering responsive web applications embedded directly within Telegram's 900M+ user ecosystem, combined with asynchronous bot automation."
        />

        {/* Hero Concept Card */}
        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-dark-card/90 to-dark-surface p-8 md:p-12 shadow-premium relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              Specialization Domain & Active Focus
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Telegram Mini Apps (TMA)?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              Telegram Mini Apps transform traditional messaging threads into full-fledged, interactive application environments. By embedding modern React/TypeScript single page applications inside Telegram webviews, users can execute tasks, manage accounts, and order services without installing external native apps or leaving the messenger.
            </p>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-4 shadow-sm hover:border-brand-500/30 transition-all">
            <div className="p-3 rounded-xl bg-brand-500/10 text-brand-500 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Telegram Web Apps (TWA)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered using React, Vite, and Tailwind CSS optimized for lightweight mobile viewports. Utilizes the official Telegram WebApp SDK for native theme synchronizing, haptic feedback, and viewport expansion.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">@twa-dev/sdk</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">MainButton</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">HapticFeedback</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-4 shadow-sm hover:border-brand-500/30 transition-all">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 w-fit">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Telegram Bot Backends
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Developing asynchronous bot services with Node.js and Express. Handling webhook routing, conversational keyboards, callback queries, and dispatching actionable push notifications.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">Telegram Bot API</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">Webhooks</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">Inline Queries</span>
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card space-y-4 shadow-sm hover:border-brand-500/30 transition-all">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Cryptographic Auth Verification
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Implementing HMAC-SHA256 signature verification of Telegram <code className="font-mono text-xs">initData</code> strings on the Node.js backend to validate user identity safely without third-party passwords.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">HMAC-SHA256</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">initData</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">Zero-Password Auth</span>
            </div>
          </div>
        </div>

        {/* Telegram Architecture Flow */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card p-8 md:p-10 shadow-sm space-y-8">
          <div className="border-b border-slate-100 dark:border-white/5 pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-500 font-semibold">
              Implementation Topology
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              End-to-End Telegram Mini App Architecture
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              How user interactions flow from Telegram clients to verified backend services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-brand-500 font-bold block mb-1">1. Telegram Client</span>
              <span className="text-slate-500 text-[11px]">User opens Mini App / Bot thread in iOS, Android, or Desktop</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-indigo-400 font-bold block mb-1">2. Embedded Webview</span>
              <span className="text-slate-500 text-[11px]">React + TypeScript SPA rendered with Telegram theme variables</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-emerald-400 font-bold block mb-1">3. Backend Webhook / API</span>
              <span className="text-slate-500 text-[11px]">Node.js Express validates initData signature & processes actions</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
              <span className="text-cyan-400 font-bold block mb-1">4. Database & Worker</span>
              <span className="text-slate-500 text-[11px]">PostgreSQL stores state; Bot sends instant response message</span>
            </div>
          </div>
        </div>

        {/* Future Telegram Project Roadmap Notice */}
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-brand-500 font-semibold">
              Upcoming Project Roadmap
            </span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Interested in Deploying a Custom Telegram Mini App?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              I am actively designing Telegram Mini App prototypes. If your business or community requires an interactive bot or in-app payment/booking workflow, let's connect.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs shadow-glow-sm transition-colors shrink-0"
          >
            Discuss a Telegram Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};
