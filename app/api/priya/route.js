import { NextResponse } from 'next/server';

const knowledge = {
  name: 'Teja Priyan',
  title: 'AI Engineer & Full Stack Developer',
  location: 'India',
  email: 'teja1616150@gmail.com',
  github: 'https://github.com/TejaPriyan',
  linkedin: 'https://linkedin.com/in/tejapriyan',
  huggingface: 'https://huggingface.co/teja161615',
  skills: {
    ai_llms: ['LLM Fine-Tuning (LoRA/QLoRA)', 'PyTorch', 'Hugging Face', 'GGUF', 'Ollama', 'Multimodal AI'],
    computer_vision: ['OpenCV', 'YOLO', 'TensorFlow', 'Deep Learning', 'Real-time Video Processing'],
    languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    backend: ['Spring Boot', 'FastAPI', 'Docker', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  projects: [
    { name: 'Teja Priyan AI Platform', desc: 'Multimodal AI platform with live code sandbox, streaming, and vision reasoning (https://tejapriyan-ai.vercel.app)' },
    { name: 'Tejapriyan-8B Model', desc: 'Fine-tuned 8B LLM for verifiable Text-to-SQL reasoning (https://tejapriyan-ai-model.vercel.app | Weights: huggingface.co/teja161615/Tejapriyan-8B-GGUF)' },
    { name: 'Helmet Detection System', desc: '95%+ accurate real-time safety enforcement system with OpenCV & CNN' },
    { name: 'Smart Traffic Monitoring', desc: 'IoT + YOLO powered traffic flow and violation detection' },
    { name: '3D Scroll Portfolio', desc: 'Cinematic Three.js and React Three Fiber portfolio experience' },
  ],
  about: 'AI Engineer and Full Stack Developer specializing in Large Language Models, multimodal systems, computer vision, and high-performance web applications.',
};

export async function GET() {
  return NextResponse.json({
    assistant: 'Priya',
    role: "Teja Priyan's Digital Portfolio Guide",
    data: knowledge,
  });
}

export async function POST(request) {
  try {
    const { query } = await request.json();

    const lower = (query || '').toLowerCase();
    let response = '';

    if (lower.includes('skill') || lower.includes('tech')) {
      response = `Teja's key skills: ${Object.values(knowledge.skills).flat().join(', ')}`;
    } else if (lower.includes('project')) {
      response = knowledge.projects.map((p) => `• ${p.name}: ${p.desc}`).join('\n');
    } else if (lower.includes('contact') || lower.includes('email')) {
      response = `Reach Teja at ${knowledge.email}, on LinkedIn: ${knowledge.linkedin}, or GitHub: ${knowledge.github}`;
    } else {
      response = knowledge.about;
    }

    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
  }
}
