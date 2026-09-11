'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing quantum neural core...');

  useEffect(() => {
    const messages = [
      'Initializing quantum neural core...',
      'Mapping cosmic 3D particle terrain...',
      'Loading fine-tuned AI models & weights...',
      'Synthesizing interactive environment...',
      'Systems calibrated. Welcome to Teja Priyan Universe.',
    ];

    let step = 0;
    const totalSteps = 45;
    const interval = setInterval(() => {
      step++;
      const p = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(p);

      const msgIdx = Math.min(Math.floor((step / totalSteps) * messages.length), messages.length - 1);
      setStatusText(messages[msgIdx]);

      if (step >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish?.();
        }, 350);
      }
    }, 52); // ~2.4 seconds total loading experience

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl">
      <div className="flex flex-col items-center gap-8 px-4 max-w-sm text-center">
        {/* Orbital rings & Logo Badge */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />

          {/* Outer Orbital Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-cyan-400/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Middle Orbital Ring */}
          <motion.div
            className="absolute inset-2 border-2 border-transparent border-t-purple-400 border-l-purple-400/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-4 border border-transparent border-b-pink-400 border-r-pink-400/60 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center Logo Emblem */}
          <motion.div
            className="relative z-10 w-16 h-16 rounded-full p-1 bg-black/80 border border-white/20 shadow-xl shadow-cyan-500/25 flex items-center justify-center overflow-hidden"
            animate={{ scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-192.png"
              alt="Teja Priyan Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </motion.div>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full max-w-xs space-y-2.5">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-lg shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-gray-400 flex items-center gap-1.5 truncate pr-2">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
              <span className="truncate">{statusText}</span>
            </span>
            <span className="text-cyan-300 font-semibold shrink-0">{progress}%</span>
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
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
