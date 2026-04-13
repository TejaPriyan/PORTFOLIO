import './globals.css';

export const metadata = {
  title: 'Teja Priyan | Java Developer • Tech Enthusiast • AI Developer',
  description: 'Professional 3D portfolio of Teja Priyan — Java Developer, Tech Enthusiast, and AI Developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}