'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Mail, MapPin, CheckCircle, AlertCircle, Globe, ExternalLink } from 'lucide-react';

const socials = [
  { icon: Github,   label: 'GitHub',       href: 'https://github.com/TejaPriyan',            color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn',     href: 'https://www.linkedin.com/in/tejapriyan',    color: 'hover:text-blue-400' },
  { icon: Globe,    label: 'Hugging Face', href: 'https://huggingface.co/teja161615',         color: 'hover:text-amber-400' },
  { icon: Mail,     label: 'Email',        href: 'mailto:teja1616150@gmail.com',              color: 'hover:text-purple-400' },
];

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Message sent successfully! Teja will get back to you soon.');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to send message. Please try again or email directly.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Network error. Please try emailing teja1616150@gmail.com directly.');
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 7000);
    }
  };

  const mailtoLink = `mailto:teja1616150@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formState.name || 'Visitor')}&body=${encodeURIComponent(formState.message || '')}`;

  return (
    <div className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 section-vignette-warm">
      <div className="relative z-10 max-w-4xl mx-auto w-full">

        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono text-amber-400/80 tracking-[0.35em] uppercase mb-3">
            Initiate Contact
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Let&apos;s Build Something
            </span>{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-sm sm:text-base">
            Have a question about my AI models, or want to collaborate on engineering intelligent systems?
            Drop a note below or reach out directly.
          </p>
          <div className="mx-auto mt-6 w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Interactive Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 sm:p-7 rounded-2xl glass border border-white/10 space-y-4"
          >
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1.5 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10
                           text-white placeholder-gray-500 focus:border-amber-400/60
                           focus:outline-none focus:ring-1 focus:ring-amber-400/30
                           transition-all duration-300 text-sm"
                placeholder="Alex Morgan"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10
                           text-white placeholder-gray-500 focus:border-amber-400/60
                           focus:outline-none focus:ring-1 focus:ring-amber-400/30
                           transition-all duration-300 text-sm"
                placeholder="alex@company.com"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1.5 uppercase tracking-wider">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10
                           text-white placeholder-gray-500 focus:border-amber-400/60
                           focus:outline-none focus:ring-1 focus:ring-amber-400/30
                           transition-all duration-300 text-sm resize-none"
                placeholder="Hi Teja, I came across your Tejapriyan-8B model and would love to chat about..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600
                         text-white font-medium flex items-center justify-center gap-2
                         hover:from-amber-400 hover:to-orange-400
                         disabled:opacity-50 transition-all duration-300
                         shadow-lg shadow-amber-500/20 hover:scale-[1.01]"
            >
              {sending ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-green-500/15 border border-green-500/30 text-green-300 text-xs flex items-start gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>{feedbackMessage}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{feedbackMessage}</span>
              </motion.div>
            )}
          </motion.form>

          {/* Info & Direct Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Direct Mail Card */}
              <div className="p-5 rounded-2xl glass border border-white/10 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Direct Inbox</p>
                    <a
                      href="mailto:teja1616150@gmail.com"
                      className="text-sm text-gray-200 hover:text-cyan-300 font-mono transition-colors"
                    >
                      teja1616150@gmail.com
                    </a>
                  </div>
                </div>
                <a
                  href={mailtoLink}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
                  title="Open in your default email client"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl glass border border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">Location</p>
                  <p className="text-sm text-gray-200 font-mono">India 🇮🇳 (Available Worldwide)</p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-5 rounded-2xl glass border border-white/10">
              <p className="text-xs text-gray-400 font-mono uppercase mb-4 tracking-wider">
                Connect on Professional Channels
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-white/5 ${s.color} hover:bg-white/10
                               transition-all duration-200 border border-white/5 hover:border-white/20`}
                    title={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                    <span className="text-[10px] font-mono text-gray-400">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
