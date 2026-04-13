'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket, Coffee, Server, Palette } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Backend Architect',
    desc: 'Building scalable backend systems with Java, Spring Boot, and Node.js. I engineer APIs that serve millions of requests with reliability.',
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'AI Explorer',
    desc: 'Exploring the frontiers of artificial intelligence — from image generation to natural language processing. The future is intelligent.',
    color: 'purple',
  },
  {
    icon: Rocket,
    title: 'Full-Stack Creator',
    desc: 'Crafting immersive frontend experiences with React, Next.js, and Tailwind CSS. Every pixel is intentional, every interaction smooth.',
    color: 'cyan',
  },
  {
    icon: Server,
    title: 'System Designer',
    desc: "Designing distributed systems, microservices, and database architectures that handle scale. Performance is not optional — it's fundamental.",
    color: 'green',
  },
  {
    icon: Palette,
    title: 'Creative Technologist',
    desc: 'Merging art and code. From 3D web experiences to generative design — technology should evoke emotion and wonder.',
    color: 'pink',
  },
  {
    icon: Coffee,
    title: 'Lifelong Learner',
    desc: "Every day is an opportunity to learn something new. Whether it's a new framework, a design pattern, or an AI technique — curiosity drives everything.",
    color: 'amber',
  },
];

const colorMap = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   text: 'text-blue-400',   glow: 'shadow-blue-500/10'   },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', glow: 'shadow-purple-500/10' },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   text: 'text-cyan-400',   glow: 'shadow-cyan-500/10'   },
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500/20',  text: 'text-green-400',  glow: 'shadow-green-500/10'  },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   text: 'text-pink-400',   glow: 'shadow-pink-500/10'   },
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  text: 'text-amber-400',  glow: 'shadow-amber-500/10'  },
};

function HighlightCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const colors = colorMap[item.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className={`group p-6 rounded-2xl glass hover:${colors.bg} transition-all duration-500
                  border border-white/5 hover:${colors.border} hover:shadow-lg ${colors.glow}
                  cursor-default perspective-card`}
    >
      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4
                       group-hover:scale-110 transition-transform duration-300`}>
        <item.icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 section-vignette-indigo">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-blue-400 tracking-wider uppercase">About Me</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              The Story Behind
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              the Code
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I&apos;m Teja Priyan — a developer who believes technology should be both powerful and beautiful.
            From architecting Java backend systems to exploring AI&apos;s creative potential,
            I build solutions that make a difference.
          </p>
        </motion.div>

        {/* Highlight cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Journey timeline teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass">
            <span className="text-sm text-gray-400">
              &quot;The best code is the one that makes you forget it&apos;s code.&quot;
            </span>
            <span className="text-blue-400 font-mono text-xs">— Teja</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}