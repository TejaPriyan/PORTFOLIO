'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Java',       level: 95, color: '#f89820' },
      { name: 'JavaScript', level: 90, color: '#f7df1e' },
      { name: 'Python',     level: 80, color: '#3776ab' },
      { name: 'TypeScript', level: 75, color: '#3178c6' },
      { name: 'SQL',        level: 85, color: '#00758f' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React',         level: 90, color: '#61dafb' },
      { name: 'Next.js',       level: 85, color: '#ffffff' },
      { name: 'Tailwind CSS',  level: 90, color: '#06b6d4' },
      { name: 'Three.js',      level: 70, color: '#9ca3af' },
      { name: 'Framer Motion', level: 75, color: '#bb4b96' },
    ],
  },
  {
    name: 'Backend & DevOps',
    skills: [
      { name: 'Spring Boot', level: 90, color: '#6db33f' },
      { name: 'Node.js',     level: 85, color: '#339933' },
      { name: 'Express',     level: 85, color: '#9ca3af' },
      { name: 'Docker',      level: 75, color: '#2496ed' },
      { name: 'AWS',         level: 70, color: '#ff9900' },
    ],
  },
  {
    name: 'AI & Data',
    skills: [
      { name: 'TensorFlow', level: 70, color: '#ff6f00' },
      { name: 'OpenAI API', level: 80, color: '#8b5cf6' },
      { name: 'MongoDB',    level: 80, color: '#47a248' },
      { name: 'PostgreSQL', level: 85, color: '#336791' },
      { name: 'Redis',      level: 75, color: '#dc382d' },
    ],
  },
];

function SkillBar({ skill, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-default"
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <motion.span
          className="text-xs font-mono text-gray-500 group-hover:text-blue-400 transition-colors"
          animate={hovered ? { scale: 1.1 } : { scale: 1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
        {/* Base bar */}
        <motion.div
          className="skill-bar-inner h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
            boxShadow: hovered ? `0 0 12px ${skill.color}60` : 'none',
            transition: 'box-shadow 0.3s',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 section-vignette-teal">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 tracking-wider uppercase">Skills</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Technical
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A diverse toolkit refined through real-world projects and continuous learning.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass border border-white/5"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={catIdx * 0.1 + skillIdx * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}