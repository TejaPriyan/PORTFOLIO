'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Chapter Fog & Ambient Palettes ─── */
const SECTION_DEPTH = 16;
const TOTAL_SECTIONS = 6;
const MAX_Z = -(SECTION_DEPTH * (TOTAL_SECTIONS - 1)); // -80

const CHAPTER_COLORS = [
  { fog: new THREE.Color('#060818'), accent: '#00f0ff', secondary: '#8b5cf6' }, // Hero: Deep Cosmic Sapphire
  { fog: new THREE.Color('#0d0824'), accent: '#a855f7', secondary: '#3b82f6' }, // About: Indigo Nebula
  { fog: new THREE.Color('#041527'), accent: '#06b6d4', secondary: '#ec4899' }, // Projects: Electric Cyan & Magenta
  { fog: new THREE.Color('#041c1c'), accent: '#10b981', secondary: '#06b6d4' }, // Skills: Cyber Teal / Emerald
  { fog: new THREE.Color('#1c0624'), accent: '#ec4899', secondary: '#8b5cf6' }, // AI Vision: Neon Fuchsia & Violet
  { fog: new THREE.Color('#191206'), accent: '#f59e0b', secondary: '#6366f1' }, // Contact: Radiant Solar Gold
];

function lerpColor(a, b, t) {
  return new THREE.Color(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t
  );
}

/* ─── 1. Flowing Neural Wave Field (Organic 3D Ocean of Light) ─── */
function NeuralWaveField({ scrollProgress, mousePos }) {
  const pointsRef = useRef();

  // Grid dimensions
  const cols = 55;
  const rows = 90;
  const count = cols * rows;

  const { positions, baseCoords, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const coords = new Float32Array(count * 2);
    const colsArr = new Float32Array(count * 3);

    const xSpan = 38;
    const zSpan = 110;

    const c1 = new THREE.Color('#00f0ff');
    const c2 = new THREE.Color('#8b5cf6');
    const c3 = new THREE.Color('#ec4899');
    const tempColor = new THREE.Color();

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const u = (i / (cols - 1)) - 0.5; // -0.5 to 0.5
        const v = j / (rows - 1);         // 0 to 1

        const x = u * xSpan;
        const z = -v * zSpan + 10;
        const y = -3.2;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        coords[idx * 2] = u;
        coords[idx * 2 + 1] = v;

        // Color blend based on depth and width
        const blend = (u + 0.5) * 0.5 + v * 0.5;
        if (blend < 0.5) {
          tempColor.copy(c1).lerp(c2, blend * 2);
        } else {
          tempColor.copy(c2).lerp(c3, (blend - 0.5) * 2);
        }

        colsArr[idx * 3] = tempColor.r;
        colsArr[idx * 3 + 1] = tempColor.g;
        colsArr[idx * 3 + 2] = tempColor.b;

        idx++;
      }
    }
    return { positions: pos, baseCoords: coords, colors: colsArr };
  }, [count, cols, rows]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const t = state.clock.elapsedTime * 0.7;

    const mx = (mousePos?.x || 0) * 1.5;
    const my = (mousePos?.y || 0) * 1.2;

    for (let i = 0; i < count; i++) {
      const u = baseCoords[i * 2];
      const v = baseCoords[i * 2 + 1];
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];

      // Multi-frequency harmonic wave motion
      const wave1 = Math.sin(x * 0.22 + t * 1.2) * Math.cos(z * 0.12 + t * 0.9) * 1.4;
      const wave2 = Math.sin((x + z) * 0.14 - t * 0.7) * 0.8;
      const wave3 = Math.cos(x * 0.4 - t * 0.5) * 0.35;

      // Subtle mouse interaction ripple
      const mouseDist = Math.hypot(x - mx * 8, z - (-scrollProgress * 60));
      const ripple = Math.sin(mouseDist * 0.4 - t * 2) * Math.exp(-mouseDist * 0.08) * 0.6;

      posAttr.array[i * 3 + 1] = -3.2 + wave1 + wave2 + wave3 + ripple + (my * 0.5);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── 2. Floating Luminous Stardust & Energy Motes ─── */
function StardustField({ count = 220 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#38bdf8'), // light blue
      new THREE.Color('#c084fc'), // violet
      new THREE.Color('#f472b6'), // rose pink
      new THREE.Color('#34d399'), // emerald
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = 5 - Math.random() * 95;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.08;
    pointsRef.current.rotation.y = t * 0.15;
    pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── 3. Ethereal Cosmic Halo Rings in Deep Horizon ─── */
function CosmicHorizonRings({ z = -65 }) {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) ring1.current.rotation.z = t * 0.04;
    if (ring2.current) ring2.current.rotation.z = -t * 0.03;
  });

  return (
    <group position={[0, 4, z]}>
      {/* Outer celestial orbital ring */}
      <mesh ref={ring1} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[16, 0.025, 16, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Inner delicate halo */}
      <mesh ref={ring2} rotation={[-0.3, 0.4, 0]}>
        <torusGeometry args={[12, 0.02, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Deep horizon soft ambient glow point */}
      <pointLight color="#818cf8" intensity={2.2} distance={35} />
    </group>
  );
}

/* ─── 4. Chapter Accent Lighting ─── */
function ChapterAmbientLights({ scrollProgress }) {
  const lightRef1 = useRef();
  const lightRef2 = useRef();

  useFrame(() => {
    const sectionF = Math.min(scrollProgress * (TOTAL_SECTIONS - 1), TOTAL_SECTIONS - 1);
    const sIdx = Math.floor(sectionF);
    const sFrac = sectionF - sIdx;
    const nextIdx = Math.min(sIdx + 1, TOTAL_SECTIONS - 1);

    const c1 = lerpColor(CHAPTER_COLORS[sIdx].fog, CHAPTER_COLORS[nextIdx].fog, sFrac);
    if (lightRef1.current) lightRef1.current.color.copy(c1);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef1} position={[0, 6, -10]} intensity={2.5} distance={30} />
      <pointLight ref={lightRef2} position={[0, -4, -30]} color="#38bdf8" intensity={1.8} distance={25} />
    </>
  );
}

/* ─── 5. Cinematic Camera Controller with Smooth Damping ─── */
function CinematicCamera({ scrollProgress, mousePos }) {
  const { camera, scene } = useThree();
  const targetZ = useRef(0);
  const currentFogColor = useRef(CHAPTER_COLORS[0].fog.clone());

  useFrame(() => {
    // Smooth camera Z glide along the scroll path
    targetZ.current = scrollProgress * MAX_Z;
    camera.position.z += (targetZ.current - camera.position.z) * 0.055;

    // Fluid mouse parallax
    const mx = (mousePos?.x || 0) * 0.8;
    const my = (mousePos?.y || 0) * 0.45;
    camera.position.x += (mx - camera.position.x) * 0.04;
    camera.position.y += (my - camera.position.y) * 0.04;

    // Look toward mid-depth center
    camera.lookAt(camera.position.x * 0.2, camera.position.y * 0.2 - 0.5, camera.position.z - 12);

    // Dynamic Fog & Background color interpolation
    const sectionF = Math.min(scrollProgress * (TOTAL_SECTIONS - 1), TOTAL_SECTIONS - 1);
    const sIdx = Math.floor(sectionF);
    const sFrac = sectionF - sIdx;
    const nextIdx = Math.min(sIdx + 1, TOTAL_SECTIONS - 1);

    const targetFog = lerpColor(CHAPTER_COLORS[sIdx].fog, CHAPTER_COLORS[nextIdx].fog, sFrac);
    currentFogColor.current.lerp(targetFog, 0.045);

    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }
    scene.background = currentFogColor.current.clone().multiplyScalar(0.4);
  });

  return null;
}

/* ─── Main Export ─── */
export default function Scene3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 62, near: 0.1, far: 200 }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(CHAPTER_COLORS[0].fog, 0.028);
        scene.background = CHAPTER_COLORS[0].fog.clone().multiplyScalar(0.4);
      }}
    >
      {/* Chapter Ambient Lighting */}
      <ChapterAmbientLights scrollProgress={scrollProgress} />

      {/* Deep Galactic Starlight */}
      <Stars
        radius={95}
        depth={65}
        count={isMobile ? 1200 : 3200}
        factor={2.8}
        saturation={0.1}
        fade
        speed={0.35}
      />

      {/* Floating Luminous Stardust */}
      <StardustField count={isMobile ? 90 : 220} />

      {/* Flowing Organic 3D Neural Ocean */}
      <NeuralWaveField scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* Ethereal Deep Space Horizon Rings */}
      <CosmicHorizonRings z={-70} />

      {/* Smooth Cinematic Camera Rig */}
      <CinematicCamera scrollProgress={scrollProgress} mousePos={mousePos} />
    </Canvas>
  );
}
