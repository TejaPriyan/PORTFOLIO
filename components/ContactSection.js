'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Twitter, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const socials = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/tejapriyan',   color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/tejapriyan', color: 'hover:text-blue-400' },
  { icon: Twitter,  label: 'Twitter',  href: 'https://twitter.com/tejapriyan',  color: 'hover:text-cyan-400' },
  { icon: Mail,     label: 'Email',    href: 'mailto:teja@example.com',          color: 'hover:text-purple-400' },
];

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 section-vignette-warm">
      <div className="relative z-10 max-w-4xl mx-auto w-full">

        {/* Cinematic CTA headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="text-xs font-mono text-amber-400/70 tracking-[0.4em] uppercase mb-4">
            The Final Scene
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="block bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Let&apos;s Build Something
            </span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Together.
            </span>
          </h2>
        </motion.div>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Have a project in mind? Want to collaborate on something amazing?
            I&apos;d love to hear from you.
          </p>
          {/* Decorative line */}
          <div className="mx-auto mt-6 w-24 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl glass border border-white/5 space-y-4"
          >
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10
                           text-white placeholder-gray-600 focus:border-amber-500/40
                           focus:outline-none focus:ring-1 focus:ring-amber-500/20
                           transition-all duration-300 text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-mono mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10
                           text-white placeholder-gray-600 focus:border-amber-500/40
                           focus:outline-none focus:ring-1 focus:ring-amber-500/20
                           transition-all duration-300 text-sm"
                placeholder="your@email.com"
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
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10
                           text-white placeholder-gray-600 focus:border-amber-500/40
                           focus:outline-none focus:ring-1 focus:ring-amber-500/20
                           transition-all duration-300 text-sm resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500
                         text-white font-medium flex items-center justify-center gap-2
                         hover:from-amber-400 hover:to-orange-400
                         disabled:opacity-50 transition-all duration-300
                         shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
            >
              {sending ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Message sent successfully!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                Failed to send. Try again.
              </motion.div>
            )}
          </motion.form>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            {/* Info cards */}
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl glass border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Email</p>
                  <p className="text-sm text-gray-300">teja@example.com</p>
                </div>
              </div>

              <div className="p-4 rounded-xl glass border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Location</p>
                  <p className="text-sm text-gray-300">India 🇮🇳</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-4 rounded-xl glass border border-white/5">
              <p className="text-xs text-gray-500 font-mono uppercase mb-4 tracking-wider">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center
                               text-gray-400 ${s.color} transition-all duration-300
                               hover:bg-white/10 hover:scale-110`}
                    title={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 text-center md:text-left"
            >
              <p className="text-xs text-gray-600">
                Designed &amp; built by{' '}
                <span className="text-amber-400">Teja Priyan</span>{' '}
                with Next.js, Three.js &amp; ☕
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}