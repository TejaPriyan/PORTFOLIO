'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Search, Sun, Moon } from 'lucide-react';

export default function FloatingQuickActions({
  scrollProgress,
  onScrollToTop,
  onOpenCommand,
  theme,
  onToggleTheme,
}) {
  const visible = scrollProgress > 0.12;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-20 z-40 flex items-center gap-1.5 p-1.5 rounded-full glass border border-white/20 shadow-xl"
        >
          {/* Quick Search */}
          <button
            onClick={onOpenCommand}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          {/* Quick Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>

          {/* Back to Top */}
          <button
            onClick={onScrollToTop}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
