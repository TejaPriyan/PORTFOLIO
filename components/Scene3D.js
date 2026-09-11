'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Constants ─── */
const SECTION_DEPTH = 15;
const TOTAL_SECTIONS = 6;
const MAX_Z = -(SECTION_DEPTH * (TOTAL_SECTIONS - 1)); // -75

const SECTION_FOG_COLORS = [
  new THREE.Color('#080b24'), // Hero: Deep Cosmic Blue
  new THREE.Color('#10082e'), // About: Indigo Nebula
  new THREE.Color('#07142b'), // Projects: Electric Cyan-Violet
  new THREE.Color('#051d24'), // Skills: Cyber Teal
  new THREE.Color('#220726'), // AI Vision: Neon Magenta
  new THREE.Color('#1a1008'), // Contact: Warm Solar Gold
];

function lerpColor(a, b, t) {
  return new THREE.Color(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t,
  );
}

/* ─── 1. Hero Scene: Floating Quantum AI Core ─── */
function HeroScene({ z }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.25;
      coreRef.current.rotation.y = t * 0.35;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * -0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.25;
  });

  // Floating ambient light motes
  const motes = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
        z + (Math.random() - 0.5) * 14,
      ],
      size: 0.03 + Math.random() * 0.04,
      color: i % 2 === 0 ? '#22d3ee' : '#a855f7',
    }));
  }, [z]);

  return (
    <group position={[0, 0, z]}>
      {/* Central Quantum Hologram Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 0, -2]}>
          {/* Wireframe outer icosahedron */}
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[1.8, 1]} />
            <meshStandardMaterial
              color="#22d3ee"
              wireframe
              emissive="#0891b2"
              emissiveIntensity={0.8}
              transparent
              opacity={0.65}
            />
          </mesh>

          {/* Inner pulsating energy sphere */}
          <mesh>
            <sphereGeometry args={[0.9, 24, 24]} />
            <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.4} />
          </mesh>

          {/* Inner core glow point */}
          <pointLight color="#22d3ee" intensity={3} distance={8} />
          <pointLight color="#a855f7" intensity={2} distance={6} />
        </group>
      </Float>

      {/* Orbiting Quantum Rings */}
      <group position={[0, 0, -2]}>
        <mesh ref={ring1Ref} rotation={[0.6, 0.2, 0]}>
          <torusGeometry args={[3.2, 0.008, 12, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[-0.5, 0.5, 0]}>
          <torusGeometry args={[4.2, 0.008, 12, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0.2, -0.7, 0]}>
          <torusGeometry args={[5.2, 0.008, 12, 100]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Ambient glowing motes */}
      {motes.map((m, i) => (
        <mesh key={i} position={m.pos}>
          <sphereGeometry args={[m.size, 6, 6]} />
          <meshBasicMaterial color={m.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── 2. About Scene: Floating Holographic Portals ─── */
function AboutScene({ z }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  const cards = useMemo(() => [
    { pos: [-4, 1.2, z - 3], rot: [0, 0.4, 0], color: '#38bdf8' },
    { pos: [4, 0.8, z - 4], rot: [0, -0.4, 0], color: '#c084fc' },
    { pos: [-2.5, -1.8, z - 6], rot: [0.15, 0.2, 0], color: '#2dd4bf' },
    { pos: [2.8, -1.6, z - 5], rot: [-0.1, -0.25, 0], color: '#f472b6' },
  ], [z]);

  return (
    <group ref={groupRef}>
      {cards.map((c, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.8}>
          <mesh position={c.pos} rotation={c.rot}>
            <boxGeometry args={[2.2, 1.4, 0.05]} />
            <meshStandardMaterial
              color={c.color}
              wireframe
              transparent
              opacity={0.35}
              emissive={c.color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
      <pointLight position={[0, 1, z - 4]} color="#818cf8" intensity={1.5} distance={12} />
    </group>
  );
}

/* ─── 3. Projects Scene: Floating Crystal Data Prisms ─── */
function ProjectsScene({ z }) {
  const prismsRef = useRef([]);

  const prisms = useMemo(() => [
    { pos: [-5, 2, z - 2], size: 0.9, color: '#06b6d4', speed: 0.4 },
    { pos: [5, 1.5, z - 3], size: 1.1, color: '#a855f7', speed: -0.3 },
    { pos: [-4.5, -2, z - 4], size: 0.8, color: '#3b82f6', speed: 0.5 },
    { pos: [4.8, -1.8, z - 5], size: 1.0, color: '#ec4899', speed: -0.4 },
    { pos: [0, 3.2, z - 6], size: 1.2, color: '#10b981', speed: 0.3 },
  ], [z]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    prismsRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = t * prisms[i].speed;
        mesh.rotation.y = t * (prisms[i].speed * 1.3);
      }
    });
  });

  return (
    <group>
      {prisms.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={0.4} floatIntensity={1}>
          <mesh
            ref={(el) => (prismsRef.current[i] = el)}
            position={p.pos}
          >
            <octahedronGeometry args={[p.size, 0]} />
            <meshStandardMaterial
              color={p.color}
              wireframe
              emissive={p.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
      <pointLight position={[0, 0, z - 4]} color="#a855f7" intensity={2} distance={14} />
    </group>
  );
}

/* ─── 4. Skills Scene: Cyberpunk Grid Plane & Neon Rings ─── */
function SkillsScene({ z }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      {/* Horizon Grid Floor */}
      <mesh position={[0, -4, z - 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40, 24, 24]} />
        <meshBasicMaterial color="#0891b2" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Floating Center Data Ring */}
      <mesh ref={ringRef} position={[0, 0, z - 6]}>
        <torusGeometry args={[4.5, 0.02, 16, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </mesh>
      <pointLight position={[0, 0, z - 5]} color="#06b6d4" intensity={2} distance={12} />
    </group>
  );
}

/* ─── 5. AI Vision Scene: Neural Synapse Network & Data Streams ─── */
function AIVisionScene({ z }) {
  const nodes = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        z - 4 + (Math.random() - 0.5) * 6,
      ],
      color: i % 3 === 0 ? '#ff007f' : i % 3 === 1 ? '#00f0ff' : '#a855f7',
      size: 0.05 + Math.random() * 0.05,
    }));
  }, [z]);

  const streams = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      x: ((i % 10) - 4.5) * 1.4,
      zPos: z - 3 + (i % 3) * 0.8,
      speed: 0.5 + (i % 4) * 0.3,
      color: i % 2 === 0 ? '#ff007f' : '#00f0ff',
    }));
  }, [z]);

  return (
    <group>
      {/* Synapse Nodes */}
      {nodes.map((n, i) => (
        <Float key={i} speed={2.5} rotationIntensity={0.6} floatIntensity={1}>
          <mesh position={n.pos}>
            <sphereGeometry args={[n.size, 8, 8]} />
            <meshBasicMaterial color={n.color} transparent opacity={0.85} />
          </mesh>
        </Float>
      ))}

      {/* Vertical neural data streams */}
      {streams.map((s, i) => (
        <StreamParticle key={i} x={s.x} z={s.zPos} speed={s.speed} color={s.color} />
      ))}

      <pointLight position={[0, 0, z - 4]} color="#ec4899" intensity={2.5} distance={14} />
    </group>
  );
}

function StreamParticle({ x, z, speed, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * speed) % 1;
      ref.current.position.y = -4 + t * 8;
      ref.current.material.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <mesh ref={ref} position={[x, 0, z]}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

/* ─── 6. Contact Scene: Warm Solar Constellation ─── */
function ContactScene({ z }) {
  const pointsRef = useRef();
  const count = 100;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = z + (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [z]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#fbbf24" transparent opacity={0.65} sizeAttenuation />
      </points>

      {/* Warm horizon light */}
      <pointLight position={[0, 2, z - 4]} color="#f59e0b" intensity={2} distance={14} />
      <pointLight position={[0, -2, z - 6]} color="#6366f1" intensity={1} distance={10} />
    </group>
  );
}

/* ─── Camera Rig with Smooth Damping & Fog Transitions ─── */
function CinematicCamera({ scrollProgress, mousePos }) {
  const { camera, scene } = useThree();
  const targetZ = useRef(0);
  const currentFogColor = useRef(SECTION_FOG_COLORS[0].clone());

  useFrame(() => {
    // Camera Z translation
    targetZ.current = scrollProgress * MAX_Z;
    camera.position.z += (targetZ.current - camera.position.z) * 0.06;

    // Mouse & Gyro Parallax
    const mx = (mousePos?.x || 0) * 0.9;
    const my = (mousePos?.y || 0) * 0.5;
    camera.position.x += (mx - camera.position.x) * 0.04;
    camera.position.y += (my - camera.position.y) * 0.04;

    camera.lookAt(camera.position.x * 0.25, camera.position.y * 0.25, camera.position.z - 5);

    // Dynamic Fog interpolation across chapters
    const sectionF = Math.min(scrollProgress * (TOTAL_SECTIONS - 1), TOTAL_SECTIONS - 1);
    const sIdx = Math.floor(sectionF);
    const sFrac = sectionF - sIdx;
    const nextIdx = Math.min(sIdx + 1, TOTAL_SECTIONS - 1);
    const targetFog = lerpColor(SECTION_FOG_COLORS[sIdx], SECTION_FOG_COLORS[nextIdx], sFrac);
    currentFogColor.current.lerp(targetFog, 0.04);

    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }
    scene.background = currentFogColor.current.clone().multiplyScalar(0.35);
  });

  return null;
}

/* ─── Main 3D Canvas Export ─── */
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
      camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 220 }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(SECTION_FOG_COLORS[0], 0.032);
        scene.background = new THREE.Color('#080b24').multiplyScalar(0.35);
      }}
    >
      <ambientLight intensity={0.15} />

      {/* Dynamic Cosmic Stars */}
      <Stars
        radius={90}
        depth={70}
        count={isMobile ? 1200 : 3500}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />

      {/* Chapter Scenes */}
      <HeroScene z={0} />
      <AboutScene z={-SECTION_DEPTH} />
      <ProjectsScene z={-SECTION_DEPTH * 2} />
      <SkillsScene z={-SECTION_DEPTH * 3} />
      <AIVisionScene z={-SECTION_DEPTH * 4} />
      <ContactScene z={-SECTION_DEPTH * 5} />

      {/* Camera Controller */}
      <CinematicCamera scrollProgress={scrollProgress} mousePos={mousePos} />
    </Canvas>
  );
}
