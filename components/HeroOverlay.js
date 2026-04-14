'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const titles = [
  'Full Stack Developer',
  'Computer Vision Developer',
  'AI Enthusiast',
  'Java Developer',
  'Problem Solver',
  'Digital Creator',
];

export default function HeroOverlay({ scrollProgress }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (isTyping) {
      let charIndex = 0;
      timeout = setInterval(() => {
        charIndex++;
        setDisplayText(currentTitle.substring(0, charIndex));
        if (charIndex >= currentTitle.length) {
          clearInterval(timeout);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 80);
    } else {
      let charIndex = currentTitle.length;
      timeout = setInterval(() => {
        charIndex--;
        setDisplayText(currentTitle.substring(0, charIndex));
        if (charIndex <= 0) {
          clearInterval(timeout);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setIsTyping(true);
        }
      }, 40);
    }

    return () => clearInterval(timeout);
  }, [titleIndex, isTyping]);

  const opacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      style={{ opacity }}
    >
      {/* Cinematic tagline — appears first */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: 1, letterSpacing: '0.2em' }}
        transition={{ delay: 0.2, duration: 1.8, ease: 'easeOut' }}
        className="text-xs font-light text-gray-500 tracking-[0.3em] uppercase mb-6 italic"
      >
        Every journey starts with curiosity
      </motion.p>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-400 tracking-wider uppercase font-mono">
          Available for opportunities
        </span>
      </motion.div>

      {/* Main name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-6"
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-glow font-mono">
            Teja Priyan
          </span>
        </h1>
      </motion.div>

      {/* Typing titles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="flex items-center gap-3 mb-8"
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
        <div className="h-8 flex items-center">
          <span className="text-lg sm:text-xl md:text-2xl font-mono text-blue-300">
            {displayText}
          </span>
          <span className="ml-1 text-blue-400 animate-pulse">|</span>
        </div>
        <Sparkles className="w-4 h-4 text-purple-400" />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="text-sm sm:text-base text-gray-400 max-w-md text-center leading-relaxed mb-12"
      >
        Computer Science graduate and Full Stack Developer specializing in building
        intelligent systems, modern web applications, and AI-driven solutions.
        Passionate about solving real-world problems through clean code and innovative design.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <a
          href="#projects"
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium
                     hover:from-blue-400 hover:to-purple-400 transition-all duration-300
                     shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
        >
          View My Work
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-lg glass text-blue-300 font-medium
                     hover:bg-white/10 transition-all duration-300 hover:scale-105"
        >
          Download Resume
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-[0.2em] uppercase">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-blue-400/60" />
        </motion.div>
        <div className="w-px h-12 bg-gradient-to-b from-blue-400/40 to-transparent" />
      </motion.div>
    </div>
  );
}