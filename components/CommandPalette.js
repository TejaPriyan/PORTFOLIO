'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  FileText,
  Mail,
  Github,
  Bot,
  ExternalLink,
  Code,
  Cpu,
  Layers,
  Sparkles,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onNavigate,
  onOpenPriya,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items = useMemo(() => [
    // Theme & Audio Actions
    {
      id: 'toggle-theme',
      title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: `Currently in ${theme} mode`,
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      badge: 'Theme',
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'toggle-sound',
      title: soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX',
      subtitle: soundEnabled ? 'Sound is currently enabled' : 'Sound is currently muted',
      category: 'Preferences',
      icon: soundEnabled ? VolumeX : Volume2,
      badge: 'Audio',
      action: () => {
        onToggleSound();
        onClose();
      },
    },

    // Navigation
    {
      id: 'nav-hero',
      title: 'Go to Hero / Overview',
      subtitle: 'Introduction, 3D universe & summary',
      category: 'Navigation',
      icon: Sparkles,
      badge: 'Section',
      action: () => {
        onNavigate('hero');
        onClose();
      },
    },
    {
      id: 'nav-about',
      title: 'Go to About Me & Journey',
      subtitle: 'Background, education, metrics & milestones',
      category: 'Navigation',
      icon: Code,
      badge: 'Section',
      action: () => {
        onNavigate('about');
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Go to Featured Projects',
      subtitle: 'LLMs, Text-to-SQL, Computer Vision & 3D apps',
      category: 'Navigation',
      icon: Layers,
      badge: 'Section',
      action: () => {
        onNavigate('projects');
        onClose();
      },
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills & Neural Radar',
      subtitle: 'AI/ML, Full Stack, Computer Vision & DevOps tools',
      category: 'Navigation',
      icon: Cpu,
      badge: 'Section',
      action: () => {
        onNavigate('skills');
        onClose();
      },
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact & Inquiries',
      subtitle: 'Send a message, schedule a call, hire',
      category: 'Navigation',
      icon: Mail,
      badge: 'Section',
      action: () => {
        onNavigate('contact');
        onClose();
      },
    },

    // AI Projects & Models
    {
      id: 'model-tejapriyan',
      title: 'Tejapriyan-8B Fine-Tuned LLM',
      subtitle: 'Custom QLoRA instruction-tuned Llama on Hugging Face',
      category: 'Projects',
      icon: Cpu,
      badge: 'Hugging Face',
      action: () => {
        window.open('https://huggingface.co/teja161615', '_blank');
        onClose();
      },
    },
    {
      id: 'project-text2sql',
      title: 'Autonomous Text-to-SQL Engine',
      subtitle: 'Natural language to multi-dialect SQL compiler with LangChain',
      category: 'Projects',
      icon: Code,
      badge: 'GitHub',
      action: () => {
        window.open('https://github.com/TejaPriyan', '_blank');
        onClose();
      },
    },

    // External Resources & Contact
    {
      id: 'copy-email',
      title: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
      subtitle: 'tejadheena16@gmail.com',
      category: 'Contact',
      icon: copiedEmail ? Check : Mail,
      badge: 'Clipboard',
      action: () => {
        navigator.clipboard?.writeText('tejadheena16@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 800);
      },
    },
    {
      id: 'download-resume',
      title: 'Download Full Resume',
      subtitle: 'View and save latest AI Engineer CV (PDF)',
      category: 'Contact',
      icon: FileText,
      badge: 'Resume',
      action: () => {
        window.open('/resume.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'open-github',
      title: 'Open GitHub Profile',
      subtitle: 'Explore 30+ open-source repositories and code',
      category: 'External',
      icon: Github,
      badge: '@TejaPriyan',
      action: () => {
        window.open('https://github.com/TejaPriyan', '_blank');
        onClose();
      },
    },
    {
      id: 'talk-priya',
      title: 'Chat with Priya AI Assistant',
      subtitle: 'Ask questions about Teja Priyan in natural language',
      category: 'AI Copilot',
      icon: Bot,
      badge: 'Interactive',
      action: () => {
        onOpenPriya?.();
        onClose();
      },
    },
  ], [theme, soundEnabled, copiedEmail, onToggleTheme, onToggleSound, onNavigate, onOpenPriya, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl glass-dark border border-white/20 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, section, project, or search..."
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-400 outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-400">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-cyan-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-gray-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                          {item.badge}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>esc Close</span>
              </div>
              <span className="text-cyan-400">Teja Priyan Spotlight</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
