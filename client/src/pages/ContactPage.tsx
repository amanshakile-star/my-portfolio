import React, { useState } from 'react';
import { Mail, Send, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { submitContactForm } from '../lib/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [statusResult, setStatusResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusResult(null);

    if (!validate()) return;

    setSubmitting(true);
    const result = await submitContactForm(formData);
    setSubmitting(false);

    setStatusResult(result);

    if (result.success) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
      setErrors({});
    }
  };

  return (
    <>
      <SeoHead
        title="Contact Abdushekur Aman"
        description="Direct contact details for Abdushekur Aman: Email, Telegram, GitHub, and contact form."
      />

      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="Contact"
          title="Contact Me"
          subtitle="Reach out directly through email, Telegram, GitHub, or send a message using the form below."
        />

        {/* 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="mailto:abdushakuraman7@gmail.com"
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card hover:border-brand-500/50 shadow-sm transition-colors text-center space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">
              Email
            </div>
            <div className="text-xs text-brand-600 dark:text-brand-400 font-mono break-all">
              abdushakuraman7@gmail.com
            </div>
          </a>

          <a
            href="https://t.me/TheBrianic20"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card hover:border-brand-500/50 shadow-sm transition-colors text-center space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">
              Telegram
            </div>
            <div className="text-xs text-brand-600 dark:text-brand-400 font-mono">
              @TheBrianic20
            </div>
          </a>

          <a
            href="https://github.com/amanshakile-star"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card hover:border-brand-500/50 shadow-sm transition-colors text-center space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
              <Github className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">
              GitHub
            </div>
            <div className="text-xs text-brand-600 dark:text-brand-400 font-mono">
              amanshakile-star
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Send a Message
          </h3>

          {statusResult && (
            <div
              className={`p-3.5 rounded-xl flex items-start gap-2.5 text-xs ${
                statusResult.success
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {statusResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              )}
              <span>{statusResult.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot anti-spam trap */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) setErrors({ ...errors, subject: '' });
                }}
                placeholder="Topic or project"
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
              />
              {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Write your message here..."
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 resize-y"
              />
              {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium text-xs transition-colors"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
