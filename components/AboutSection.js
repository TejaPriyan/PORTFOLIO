'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket, Coffee, Server, Palette, GraduationCap, Briefcase, Eye, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: Brain,
    title: 'AI Engineer & LLM Specialist',
    desc: 'Fine-tuning open-weight LLMs (Tejapriyan-8B) with LoRA/QLoRA for verifiable SQL reasoning, and building scalable multimodal AI platforms with streaming & vision intelligence.',
    color: 'purple',
  },
  {
    icon: Eye,
    title: 'Computer Vision Specialist',
    desc: 'Engineered deep learning systems including real-time helmet detection (95%+ accuracy), license plate recognition, and smart traffic monitoring using OpenCV, TensorFlow, and YOLO.',
    color: 'blue',
  },
  {
    icon: Code2,
    title: 'Full Stack Architect',
    desc: 'Building scalable full-stack web applications using Java Spring Boot, REST APIs, Next.js, and React. From enterprise backend microservices to responsive modern UIs.',
    color: 'cyan',
  },
  {
    icon: Server,
    title: 'Systems & API Designer',
    desc: 'Designing robust microservices, RESTful APIs, and database architectures with Spring Boot, Spring Security, MySQL, PostgreSQL, and MongoDB.',
    color: 'green',
  },
  {
    icon: Palette,
    title: 'Creative Technologist',
    desc: 'Merging 3D web graphics and clean design. From interactive WebGL scenes with Three.js to glassmorphism interfaces — engineering experiences that inspire.',
    color: 'pink',
  },
  {
    icon: Coffee,
    title: 'Lifelong Learner',
    desc: 'Computer Science graduate with deep passion for AI research and modern software engineering. Quick to master emerging paradigms and frameworks.',
    color: 'amber',
  },
];

const timeline = [
  {
    icon: Brain,
    title: 'AI Engineering & LLM Systems',
    subtitle: 'Independent AI & LLM Systems · 2024 — Present',
    desc: 'Fine-tuned Tejapriyan-8B model, created Teja Priyan AI multimodal workspace, and published quantized model weights to Hugging Face with Ollama and NPX integration.',
    color: 'purple',
  },
  {
    icon: GraduationCap,
    title: 'Bachelor of Computer Science',
    subtitle: 'University Graduation · Completed May 2025',
    desc: 'Strong foundation in algorithms, data structures, software engineering, and computer architecture. GPA: 8.5/10.',
    color: 'blue',
  },
  {
    icon: Eye,
    title: 'Computer Vision & Deep Learning',
    subtitle: 'Academic & Personal AI Systems · 2023 — 2025',
    desc: 'Built helmet detection, number plate recognition, and traffic monitoring systems using Python, OpenCV, TensorFlow, and YOLO with 95%+ accuracy.',
    color: 'cyan',
  },
  {
    icon: Briefcase,
    title: 'Java Full Stack Developer Training',
    subtitle: 'Professional Training Institute · Sep 2025 — Mar 2026',
    desc: 'Mastered enterprise Java, Spring Boot, Spring Security, RESTful APIs, microservices, database design, and agile development methodologies.',
    color: 'green',
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
            I&apos;m Teja Priyan — an AI Engineer &amp; Full Stack Developer with hands-on experience
            building cutting-edge Large Language Model systems, multimodal AI workspaces, real-time computer vision applications,
            and scalable enterprise web platforms.
          </p>
        </motion.div>

        {/* Highlight cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Education & Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-center text-lg font-semibold text-white mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education &amp; Journey
            </span>
          </h3>
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-cyan-500/40 hidden md:block" />
            {timeline.map((item, i) => {
              const colors = colorMap[item.color] || colorMap.blue;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative flex gap-4 mb-6 md:pl-16 pl-0"
                >
                  <div className={`hidden md:flex absolute left-3 w-7 h-7 rounded-full ${colors.bg} border ${colors.border}
                                   items-center justify-center z-10`}>
                    <item.icon className={`w-3.5 h-3.5 ${colors.text}`} />
                  </div>
                  <div className={`flex-1 p-5 rounded-xl glass border border-white/5 hover:${colors.bg}
                                   transition-all duration-300 group`}>
                    <h4 className="text-base font-semibold text-white">{item.title}</h4>
                    <p className={`text-xs ${colors.text} font-mono mt-1`}>{item.subtitle}</p>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
