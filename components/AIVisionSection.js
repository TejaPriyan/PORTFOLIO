'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Zap, Eye, Cpu, Network, Lightbulb } from 'lucide-react';

const visionPoints = [
  {
    icon: Sparkles,
    title: 'Generative AI is Rewriting Creativity',
    text: 'The line between human and machine creativity is blurring. AI models can now compose music, write poetry, and generate photorealistic images. I believe the developers who embrace this will shape the next decade.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'AI + Java = Enterprise Intelligence',
    text: 'Java remains the backbone of enterprise systems. Integrating AI into these systems — from predictive analytics to intelligent automation — is where the real impact lives.',
    color: 'blue',
  },
  {
    icon: Eye,
    title: 'Computer Vision Will Be Everywhere',
    text: 'From autonomous vehicles to medical imaging, computer vision is transforming industries. Building systems that can "see" and understand the world is one of the most exciting challenges in tech.',
    color: 'cyan',
  },
  {
    icon: Cpu,
    title: 'Edge AI Changes the Game',
    text: "Running AI models on edge devices — phones, IoT sensors, drones — means intelligence without latency. The future isn't just cloud AI; it's AI everywhere.",
    color: 'green',
  },
  {
    icon: Network,
    title: 'AI-First Architecture',
    text: "Tomorrow's applications will be designed with AI at the core, not bolted on as an afterthought. Microservices that think, APIs that learn, and databases that predict.",
    color: 'pink',
  },
  {
    icon: Lightbulb,
    title: "The Future I'm Building Toward",
    text: "I envision a world where AI amplifies human potential — where a developer in any corner of the world can build something extraordinary with intelligent tools. That's the future I code for.",
    color: 'amber',
  },
];

const colorClasses = {
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: '#a855f7' },
  blue:   { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/30',   glow: '#3b82f6' },
  cyan:   { bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   border: 'border-cyan-500/30',   glow: '#06b6d4' },
  green:  { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/30',  glow: '#22c55e' },
  pink:   { bg: 'bg-pink-500/10',   text: 'text-pink-400',   border: 'border-pink-500/30',   glow: '#ec4899' },
  amber:  { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/30',  glow: '#f59e0b' },
};

export default function AIVisionSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 section-vignette-purple">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-purple-400 tracking-wider uppercase">
            AI &amp; The Future
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My Vision for
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-glow-purple">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            AI isn&apos;t just a buzzword to me — it&apos;s the most transformative technology of our lifetime.
            Here&apos;s how I see the future unfolding, and where I fit in.
          </p>
        </motion.div>

        {/* Vision cards — neon hologram borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionPoints.map((point, i) => {
            const colors = colorClasses[point.color];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: '-30px' }}
                className={`relative p-6 rounded-2xl glass border transition-all duration-500 group
                           animate-neon-border perspective-card`}
                style={{ borderColor: `${colors.glow}20` }}
              >
                {/* Corner glow accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: `radial-gradient(circle at top right, ${colors.glow}, transparent 70%)` }}
                />

                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-4
                               group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{point.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-2xl glass border border-purple-500/10 max-w-2xl">
            <p className="text-lg text-gray-300 italic leading-relaxed">
              &quot;Artificial Intelligence is the new electricity. Just as electricity transformed every
              major industry 100 years ago, AI will now transform every major industry.&quot;
            </p>
            <p className="text-sm text-purple-400 font-mono mt-4">— Andrew Ng</p>
            <p className="text-xs text-gray-500 mt-2">
              And I intend to be at the forefront of that transformation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}