'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing 3D neural systems...');

  useEffect(() => {
    const messages = [
      'Initializing 3D neural systems...',
      'Mapping cosmos & star coordinates...',
      'Loading AI model weights...',
      'Synchronizing portfolio environment...',
      'Ready for launch.',
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const p = Math.min((step / 10) * 100, 100);
      setProgress(p);
      const msgIdx = Math.min(Math.floor(step / 2.5), messages.length - 1);
      setStatusText(messages[msgIdx]);

      if (step >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish?.();
        }, 300);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-8 px-4 max-w-sm text-center">
        {/* Orbital rings */}
        <div className="relative w-28 h-28">
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-cyan-400/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 border-2 border-transparent border-t-purple-400 border-l-purple-400/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 border-2 border-transparent border-t-pink-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              TP
            </motion.span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-lg shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              {statusText}
            </span>
            <span className="text-xs text-cyan-300 font-mono font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-white font-mono">
            Teja Priyan
          </p>
          <p className="text-[11px] text-gray-500 font-mono">
            AI Engineer &amp; Full Stack Developer
          </p>
        </div>

        {/* Quick skip button */}
        <button
          onClick={() => onFinish?.()}
          className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
