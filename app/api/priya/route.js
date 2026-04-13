import { NextResponse } from 'next/server';

const knowledge = {
  name: 'Teja Priyan',
  title: 'Java Developer | Tech Enthusiast | AI Developer',
  location: 'India',
  email: 'teja@example.com',
  github: 'https://github.com/tejapriyan',
  linkedin: 'https://linkedin.com/in/tejapriyan',
  skills: {
    languages: ['Java', 'JavaScript', 'Python', 'TypeScript', 'SQL'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    backend: ['Spring Boot', 'Node.js', 'Express', 'Docker', 'AWS'],
    ai: ['TensorFlow', 'OpenAI API', 'Machine Learning', 'NLP'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  projects: [
    { name: 'Teja Gaming Hub', desc: 'Full-stack gaming platform with real-time multiplayer' },
    { name: 'AI Image Generator', desc: 'Deep learning-powered creative image generation tool' },
    { name: '3D Portfolio', desc: 'Immersive Three.js portfolio experience' },
    { name: 'Microservices Gateway', desc: 'Scalable API gateway handling 10K+ requests/sec' },
  ],
  about: 'Passionate developer specializing in Java backend systems, full-stack web development, and AI. Believes technology should be both powerful and beautiful.',
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

    // Simple keyword matching for demo
    const lower = (query || '').toLowerCase();
    let response = '';

    if (lower.includes('skill') || lower.includes('tech')) {
      response = `Teja's key skills: ${Object.values(knowledge.skills).flat().join(', ')}`;
    } else if (lower.includes('project')) {
      response = knowledge.projects.map((p) => `• ${p.name}: ${p.desc}`).join('\n');
    } else if (lower.includes('contact') || lower.includes('email')) {
      response = `Reach Teja at ${knowledge.email} or connect on LinkedIn: ${knowledge.linkedin}`;
    } else {
      response = knowledge.about;
    }

    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
  }
}