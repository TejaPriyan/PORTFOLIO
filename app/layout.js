import './globals.css';

export const metadata = {
  title: 'Teja Priyan (Tejapriyan) | AI Engineer & Full Stack Developer Portfolio',
  description:
    'Official portfolio of Teja Priyan (myself teja priyan / Tejapriyan) — AI Engineer & Full Stack Developer. Explore Teja Priyan AI, Tejapriyan-8B fine-tuned model, computer vision systems, and 3D web applications.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  keywords: [
    'Tejapriyan',
    'myself teja priyan',
    'teja priyan website',
    'teja priyan portfolio',
    'Teja Priyan',
    'Teja Priyan Sivaraj',
    'tejapriyan ai',
    'teja priyan ai',
    'teja priyan model',
    'tejapriyan-8b',
    'tejapriyan model',
    'myself tejapriyan',
    'teja priyan developer',
    'AI Engineer Portfolio',
    'Full Stack Developer Portfolio',
    '3D Portfolio',
    'Three.js Portfolio',
    'Computer Vision Developer',
    'LLM Fine-Tuning',
    'Hugging Face teja161615',
    'text-to-sql',
    'ollama tejapriyan',
  ],
  authors: [{ name: 'Teja Priyan Sivaraj', url: 'https://portfoliotejapriyan.vercel.app' }],
  creator: 'Teja Priyan Sivaraj',
  publisher: 'Teja Priyan',
  metadataBase: new URL('https://portfoliotejapriyan.vercel.app'),
  alternates: {
    canonical: 'https://portfoliotejapriyan.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: ['87bb3bc53ec346d2', 'google87bb3bc53ec346d2', '2af4e1ed3191321d'],
    other: {
      'msvalidate.01': ['168BA69A11F6F945137330FDC4083389'],
    },
  },
  openGraph: {
    title: 'Teja Priyan (Tejapriyan) | AI Engineer & Full Stack Developer',
    description:
      'Official portfolio of Teja Priyan (myself teja priyan). Explore Teja Priyan AI, fine-tuned 8B models, computer vision systems, and 3D web engineering.',
    url: 'https://portfoliotejapriyan.vercel.app/',
    siteName: 'Teja Priyan Portfolio',
    images: [
      {
        url: 'https://portfoliotejapriyan.vercel.app/assets/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Teja Priyan Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teja Priyan (Tejapriyan) | AI Engineer & Full Stack Developer',
    description:
      'Official portfolio of Teja Priyan. Explore Teja Priyan AI, fine-tuned 8B models, computer vision, and 3D web engineering.',
    images: ['https://portfoliotejapriyan.vercel.app/assets/banner.jpg'],
    creator: '@TejaPriyan',
  },
  other: {
    'ai-content-declaration': 'official-ai-engineer-portfolio',
    subject: 'Teja Priyan Portfolio, Tejapriyan, myself teja priyan, teja priyan website, teja priyan ai',
    topic: 'Artificial Intelligence, LLM Fine-Tuning, Computer Vision, Full Stack Development, 3D Web',
    classification: 'Artificial Intelligence, Software Engineering, Developer Portfolio',
    'geo.region': 'IN',
    'geo.placename': 'India',
    'geo.position': '13.0827;80.2707',
    ICBM: '13.0827, 80.2707',
    'DC.title': 'Teja Priyan Portfolio — AI Engineer & Full Stack Developer',
    'DC.creator': 'Teja Priyan Sivaraj',
    'DC.subject': 'Tejapriyan, myself teja priyan, teja priyan website, teja priyan portfolio, teja priyan ai',
    'DC.description':
      'Official developer portfolio of Teja Priyan (Tejapriyan). Showcasing Teja Priyan AI, fine-tuned 8B models, computer vision systems, and full-stack engineering.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://portfoliotejapriyan.vercel.app/#website',
      url: 'https://portfoliotejapriyan.vercel.app/',
      name: 'Teja Priyan Portfolio',
      alternateName: ['Tejapriyan', 'myself teja priyan', 'teja priyan website', 'Teja Priyan AI'],
      description: 'Official developer portfolio website of Teja Priyan (Tejapriyan) — AI Engineer & Full Stack Developer.',
      publisher: {
        '@id': 'https://portfoliotejapriyan.vercel.app/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://portfoliotejapriyan.vercel.app/#person',
      name: 'Teja Priyan',
      alternateName: ['Tejapriyan', 'myself teja priyan', 'Teja Priyan Sivaraj', 'Teja'],
      jobTitle: 'AI Engineer & Full Stack Developer',
      image: 'https://portfoliotejapriyan.vercel.app/logo.png',
      description:
        'AI Engineer and Full Stack Developer. Creator of Teja Priyan AI multimodal workspace and fine-tuned Tejapriyan-8B model for SQL reasoning.',
      url: 'https://portfoliotejapriyan.vercel.app/',
      sameAs: [
        'https://github.com/TejaPriyan',
        'https://www.linkedin.com/in/tejapriyan',
        'https://huggingface.co/teja161615',
        'https://tejapriyan-ai.vercel.app/',
        'https://tejapriyan-ai-model.vercel.app/',
        'https://myself-tejapriyan.onrender.com/',
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Large Language Models',
        'LLM Fine-Tuning',
        'Text-to-SQL',
        'Computer Vision',
        'Deep Learning',
        'React',
        'Next.js',
        'Three.js',
        'Java Spring Boot',
        'Python',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://portfoliotejapriyan.vercel.app/#webpage',
      url: 'https://portfoliotejapriyan.vercel.app/',
      name: 'Teja Priyan (Tejapriyan) | AI Engineer & Full Stack Developer Portfolio',
      mainEntity: {
        '@id': 'https://portfoliotejapriyan.vercel.app/#person',
      },
      about: {
        '@id': 'https://portfoliotejapriyan.vercel.app/#person',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Teja Priyan AI Platform',
      url: 'https://tejapriyan-ai.vercel.app/',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      author: {
        '@id': 'https://portfoliotejapriyan.vercel.app/#person',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Tejapriyan-8B Model & Playground',
      url: 'https://tejapriyan-ai-model.vercel.app/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web, Ollama, CLI',
      author: {
        '@id': 'https://portfoliotejapriyan.vercel.app/#person',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
