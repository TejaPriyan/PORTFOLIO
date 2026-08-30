# PORTFOLIO

This is a personal portfolio built with Next.js, React and Three.js. It uses TailwindCSS for styling and contains interactive 3D components (react-three-fiber) and animated UI sections.

Quick facts
- Repo: TejaPriyan/PORTFOLIO
- Framework: Next.js 14 (app router)
- Styling: Tailwind CSS (utilities + a small globals.css)
- Notable libraries: three, @react-three/fiber, @react-three/drei, framer-motion, lucide-react

Local development

1. Install dependencies

   npm install

2. Run development server

   npm run dev

   The site runs on http://localhost:3000 by default.

Build & production

1. Build

   npm run build

2. Start

   npm run start

Linting

- Run: npm run lint

Performance notes & suggestions

- This repository is JavaScript-heavy because it includes many React components and a client-side 3D scene (three.js). To improve first-load performance consider:
  - Lazy-loading heavy components like the 3D scene using dynamic imports (SSR disabled for three.js).
  - Code-splitting large components and using React Suspense/fallbacks for better perceived performance.
  - Auditing the production bundle with a bundle analyzer and removing unused dependencies.
  - Optimizing images and static assets in the `public/` folder.

Example: lazy-loading the 3D scene

```js
// components/DynamicScene.js
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('../components/Scene3D'), { ssr: false });

export default function DynamicSceneWrapper(props) {
  return <Scene3D {...props} />;
}
```

How to analyze bundle size (recommended)

1. Install analyzer:

   npm install --save-dev @next/bundle-analyzer

2. Wrap your next.config.js (example):

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
module.exports = withBundleAnalyzer({ /* existing config */ });
```

3. Add script to package.json:

```json
"scripts": {
  "analyze": "ANALYZE=true next build"
}
```

Then run:

   npm run analyze

This will produce a visual breakdown of client and server bundles.

CI suggestions

- Add a GitHub Action that runs `npm ci`, `npm run build`, and `npm run lint` on pushes/PRs. A basic workflow is added in `.github/workflows/ci.yml`.

Contributing

- Open an issue or a pull request. For code changes, please keep commits small and include a short description of the change.

License

- No license file is included in the repo. If you want a license, consider adding an open-source license (MIT, Apache-2.0, etc.).
