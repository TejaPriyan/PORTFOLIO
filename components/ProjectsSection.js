'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  ExternalLink, Github, Gamepad2, Bot, Globe, Database, ArrowRight,
  ShieldCheck, TrafficCone, Sparkles, Copy, Check, Terminal, Layers,
  Radio, Network, Activity, Volume2
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Projects', count: 12 },
  { id: 'web', label: 'Web Applications', count: 8 },
  { id: 'ai', label: 'AI & LLMs', count: 2 },
  { id: 'cv', label: 'Computer Vision', count: 2 },
];

const projects = [
  {
    id: 1,
    title: 'Trace',
    category: 'web',
    subtitle: 'Website Architecture & Intelligence Engine',
    description:
      'Recursive website intelligence platform dissecting full-site structure, security posture, DNS headers, tech stacks, and internal networks in real time.',
    tech: ['Next.js', 'TypeScript', 'Cheerio', 'Tailwind CSS', 'API'],
    icon: Network,
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: '#22d3ee',
    borderColor: 'border-cyan-500/30',
    link: 'https://tracewebsite.vercel.app/',
    github: 'https://github.com/TejaPriyan/Trace',
    featured: true,
  },
  {
    id: 2,
    title: 'Hopkey',
    category: 'web',
    subtitle: 'Encrypted P2P File & Clipboard Bridge',
    description:
      'Zero-install cross-device AirDrop alternative connecting phones and PCs via WebRTC data channels, animated QR signaling, and end-to-end encryption.',
    tech: ['React', 'WebRTC', 'Vite', 'PWA', 'Tailwind CSS'],
    icon: Radio,
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#a855f7',
    borderColor: 'border-purple-500/30',
    link: 'https://hopkey.vercel.app/',
    github: 'https://github.com/TejaPriyan/Hopkey',
    featured: true,
  },
  {
    id: 3,
    title: 'Teja Priyan AI Platform',
    category: 'ai',
    subtitle: 'Multimodal AI Workspace & Reasoning',
    description:
      'Production multimodal AI workspace featuring real-time streaming, interactive code execution sandbox, document intelligence, and vision reasoning.',
    tech: ['Next.js', 'PyTorch', 'LLMs', 'FastAPI', 'Tailwind CSS', 'WebSockets'],
    icon: Bot,
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: '#22d3ee',
    borderColor: 'border-cyan-500/30',
    link: 'https://tejapriyan-ai.vercel.app/',
    github: 'https://github.com/TejaPriyan',
    featured: true,
  },
  {
    id: 4,
    title: 'Tejapriyan-8B Model & Playground',
    category: 'ai',
    subtitle: 'Fine-Tuned 8B LLM & SQL Engine',
    description:
      'Fine-tuned 8-billion parameter language model optimized for verifiable Text-to-SQL reasoning and schema understanding via web playground and Ollama.',
    cliCommand: 'ollama run teja161615/tejapriyan-8b',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'GGUF', 'Ollama', 'Next.js', 'SQL'],
    icon: Database,
    color: 'purple',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    accentColor: '#a855f7',
    borderColor: 'border-purple-500/30',
    link: 'https://tejapriyan-ai-model.vercel.app/',
    github: 'https://huggingface.co/teja161615/Tejapriyan-8B-GGUF',
    featured: true,
  },
  {
    id: 5,
    title: 'MotionLab',
    category: 'web',
    subtitle: 'Kinetic Typography & Physics Studio',
    description:
      'Interactive canvas laboratory powered by Matter.js rigid-body collision dynamics, procedural audio synthesis, and interactive kinetic text effects.',
    tech: ['JavaScript', 'Matter.js', 'Web Audio API', 'HTML5 Canvas'],
    icon: Activity,
    color: 'blue',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    accentColor: '#60a5fa',
    borderColor: 'border-blue-500/30',
    link: 'https://motionlab1.vercel.app/',
    github: 'https://github.com/TejaPriyan/MotionLab',
    featured: false,
  },
  {
    id: 6,
    title: 'REACT',
    category: 'web',
    subtitle: 'Audio-Reactive DAW & Synthesizer',
    description:
      'Browser DAW converting microphone audio and music tracks into real-time reactive canvas visualizations and customizable frequency spectrums.',
    tech: ['React', 'Web Audio API', 'HTML5 Canvas', 'Tailwind CSS'],
    icon: Volume2,
    color: 'pink',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentColor: '#ec4899',
    borderColor: 'border-pink-500/30',
    link: 'https://reactsound.vercel.app/',
    github: 'https://github.com/TejaPriyan/REACT',
    featured: false,
  },
  {
    id: 7,
    title: 'Popsel',
    category: 'web',
    subtitle: 'Pixel Reveal Studio & Video Generator',
    description:
      'In-browser pixel reveal studio transforming images into dynamic particle animations and high-framerate reveal videos directly on client device.',
    tech: ['JavaScript', 'HTML5 Canvas', 'Video Export', 'CSS3'],
    icon: Sparkles,
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: '#f59e0b',
    borderColor: 'border-amber-500/30',
    link: 'https://popsel.vercel.app/',
    github: 'https://github.com/TejaPriyan/Popsel',
    featured: false,
  },
  {
    id: 8,
    title: 'GlitchRoom',
    category: 'web',
    subtitle: 'Interactive Mystery & Escape Experience',
    description:
      'Atmospheric browser puzzle game where the web interface falls apart into 8 hidden glitch chambers with terminal riddles and 7 unique endings.',
    tech: ['JavaScript', 'HTML5', 'Web Audio API', 'CSS Glitch'],
    icon: Gamepad2,
    color: 'green',
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentColor: '#4ade80',
    borderColor: 'border-green-500/30',
    link: 'https://glitchroom.vercel.app/',
    github: 'https://github.com/TejaPriyan/GlitchRoom',
    featured: false,
  },
  {
    id: 9,
    title: 'Helmet Detection System',
    category: 'cv',
    subtitle: 'AI & Computer Vision Compliance',
    description:
      'Real-time computer vision system using convolutional deep learning models to identify motorcycle riders without helmets with 95%+ accuracy.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision', 'Deep Learning'],
    icon: ShieldCheck,
    color: 'blue',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#60a5fa',
    borderColor: 'border-blue-500/30',
    link: null,
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
  {
    id: 10,
    title: 'Smart Traffic Monitoring',
    category: 'cv',
    subtitle: 'IoT & AI Smart City Platform',
    description:
      'Real-time traffic density analysis, congestion forecasting, and violation detection combining YOLO object detection with IoT infrastructure.',
    tech: ['Python', 'IoT', 'YOLO', 'OpenCV', 'Real-time Processing'],
    icon: TrafficCone,
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#c084fc',
    borderColor: 'border-purple-500/30',
    link: null,
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
  {
    id: 11,
    title: '3D Scroll Portfolio Experience',
    category: 'web',
    subtitle: 'Immersive Spatial Web App',
    description:
      'Scroll-driven 3D web experience built with Three.js, React Three Fiber, Next.js, and Framer Motion with real-time particle and lighting physics.',
    tech: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'WebGL'],
    icon: Globe,
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: '#f59e0b',
    borderColor: 'border-amber-500/30',
    link: 'https://portfoliotejapriyan.vercel.app/',
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
  {
    id: 12,
    title: 'Gaming Hub Platform',
    category: 'web',
    subtitle: 'Interactive Web Arcade',
    description:
      'Curated arcade of browser-based mini-games highlighting dynamic physics, keyboard mechanics, and responsive HTML5 Canvas rendering.',
    tech: ['JavaScript', 'HTML/CSS', 'HTML5 Canvas', 'Game Design'],
    icon: Gamepad2,
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    accentColor: '#22d3ee',
    borderColor: 'border-cyan-500/30',
    link: 'https://tejagamehub.netlify.app/',
    github: 'https://github.com/TejaPriyan',
    featured: false,
  },
];

const techColors = {
  'Next.js': 'bg-white/10 text-white',
  React: 'bg-cyan-500/20 text-cyan-300',
  'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300',
  'Three.js': 'bg-white/10 text-white',
  'Framer Motion': 'bg-pink-500/20 text-pink-300',
  WebGL: 'bg-red-500/20 text-red-300',
  PyTorch: 'bg-orange-500/20 text-orange-300',
  LLMs: 'bg-purple-500/20 text-purple-300',
  'Hugging Face': 'bg-yellow-500/20 text-yellow-300',
  GGUF: 'bg-emerald-500/20 text-emerald-300',
  Ollama: 'bg-blue-500/20 text-blue-300',
  FastAPI: 'bg-teal-500/20 text-teal-300',
  WebSockets: 'bg-violet-500/20 text-violet-300',
  Python: 'bg-yellow-500/20 text-yellow-300',
  Java: 'bg-orange-500/20 text-orange-300',
  'Spring Boot': 'bg-green-500/20 text-green-300',
  OpenCV: 'bg-blue-500/20 text-blue-300',
  TensorFlow: 'bg-orange-500/20 text-orange-300',
  YOLO: 'bg-red-500/20 text-red-300',
  'Computer Vision': 'bg-purple-500/20 text-purple-300',
  'Deep Learning': 'bg-pink-500/20 text-pink-300',
  IoT: 'bg-teal-500/20 text-teal-300',
  'Real-time Processing': 'bg-amber-500/20 text-amber-300',
  'HTML/CSS': 'bg-orange-500/20 text-orange-300',
  SQL: 'bg-blue-500/20 text-blue-300',
  'REST APIs': 'bg-green-500/20 text-green-300',
  'Interactive UI': 'bg-purple-500/20 text-purple-300',
  'Game Design': 'bg-pink-500/20 text-pink-300',
  Glassmorphism: 'bg-cyan-500/20 text-cyan-300',
  Interactive: 'bg-violet-500/20 text-violet-300',
  JavaScript: 'bg-yellow-500/20 text-yellow-300',
  WebRTC: 'bg-emerald-500/20 text-emerald-300',
  Vite: 'bg-purple-500/20 text-purple-300',
  PWA: 'bg-pink-500/20 text-pink-300',
  TypeScript: 'bg-blue-500/20 text-blue-300',
  Cheerio: 'bg-amber-500/20 text-amber-300',
  API: 'bg-teal-500/20 text-teal-300',
  'Matter.js': 'bg-red-500/20 text-red-300',
  'Web Audio API': 'bg-violet-500/20 text-violet-300',
  'HTML5 Canvas': 'bg-yellow-500/20 text-yellow-300',
  'Video Export': 'bg-rose-500/20 text-rose-300',
  CSS3: 'bg-blue-500/20 text-blue-300',
  'CSS Glitch': 'bg-green-500/20 text-green-300',
  HTML5: 'bg-orange-500/20 text-orange-300',
};

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleCopyCli = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.cliCommand) {
      navigator.clipboard?.writeText(project.cliCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.01 : 1})`,
        transition: 'transform 0.2s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl glass overflow-hidden flex flex-col justify-between
                  border border-white/10 hover:${project.borderColor}
                  transition-colors duration-500 ${project.featured ? 'md:col-span-2' : ''}`}
    >
      {/* Gradient glow background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0
                       group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Top accent glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      />

      <div className="relative p-6 sm:p-8 flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient}
                              border border-white/10 flex items-center justify-center`}>
                <project.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{project.subtitle}</p>
              </div>
            </div>

            {/* Action Links (top right) */}
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/20 transition-all text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Source on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/20 transition-all text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Launch Live App"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed mb-5">{project.description}</p>

          {/* Interactive CLI Badge for LLM */}
          {project.cliCommand && (
            <div className="mb-5 flex items-center justify-between gap-2 px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300 overflow-x-auto no-scrollbar">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-gray-400 select-none">$</span>
                <span className="truncate">{project.cliCommand}</span>
              </div>
              <button
                onClick={handleCopyCli}
                className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 shrink-0 transition-all"
                title="Copy terminal command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-gray-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`px-2.5 py-1 rounded-md text-xs font-mono ${techColors[t] || 'bg-gray-500/20 text-gray-300'}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Launch Live</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
          ) : (
            <span className="text-xs text-gray-400 font-mono">System Research</span>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white font-mono transition-colors px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-mono text-purple-400 tracking-wider uppercase flex items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            Featured Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What I&apos;ve
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Built
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            From multimodal AI platforms and fine-tuned 8B LLMs to computer vision and 3D web systems — real-world challenges solved with clean architecture.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-mono transition-all duration-300
                  ${isActive ? 'text-white shadow-lg shadow-cyan-500/25' : 'text-gray-400 hover:text-gray-200 glass border-white/5 hover:border-white/10'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-category"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
                <span className={`ml-1.5 text-xs px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
