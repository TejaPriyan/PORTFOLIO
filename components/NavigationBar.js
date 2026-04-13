'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'ai-vision', label: 'AI Vision' },
  { id: 'contact', label: 'Contact' },
];

export default function NavigationBar({ activeSection, onNavigate, soundEnabled, onToggleSound }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500
                           flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xs font-bold text-white">TP</span>
            </div>
            <span className="text-sm font-semibold text-white hidden sm:block">
              Teja Priyan
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full glass">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300
                  ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSound}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center
                        text-gray-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-lg glass flex items-center justify-center
                        text-gray-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`fixed top-16 left-4 right-4 z-40 p-4 rounded-2xl glass-dark md:hidden
                   ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors
                ${activeSection === item.id
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}