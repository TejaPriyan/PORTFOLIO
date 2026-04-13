'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Constants ─── */
const SECTION_DEPTH = 15; // z-units per section
const TOTAL_SECTIONS = 6;
const MAX_Z = -(SECTION_DEPTH * (TOTAL_SECTIONS - 1)); // -75

const SECTION_COLORS = [
  new THREE.Color('#050520'), // Hero - deep space navy
  new THREE.Color('#0a0525'), // About - indigo night
  new THREE.Color('#060318'), // Projects - deep violet
  new THREE.Color('#031520'), // Skills - deep teal
  new THREE.Color('#120510'), // AI Vision - deep magenta
  new THREE.Color('#0a0810'), // Contact - warm dark
];

const SECTION_FOG_COLORS = [
  new THREE.Color('#0a0a30'),
  new THREE.Color('#120a30'),
  new THREE.Color('#0d0620'),
  new THREE.Color('#062030'),
  new THREE.Color('#200a20'),
  new THREE.Color('#18120a'),
];

/* ─── Helpers ─── */
function lerpColor(a, b, t) {
  return new THREE.Color(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t,
  );
}

/* ─── Chapter 1: Hero — Deep Space ─── */
function HeroScene({ z }) {
  const groupRef = useRef();

  // Slowly pulsing nebula rings
  const rings = useMemo(() => [
    { radius: 4, speed: 0.05, color: '#1a3a7a', opacity: 0.12, tilt: 0.3 },
    { radius: 6, speed: -0.03, color: '#2a1a5a', opacity: 0.08, tilt: 0.5 },
    { radius: 8, speed: 0.02, color: '#0a2a4a', opacity: 0.06, tilt: 0.1 },
  ], []);

  // Floating light motes
  const motes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        z + (Math.random() - 0.5) * 12,
      ],
      size: 0.02 + Math.random() * 0.04,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#4a9eff' : '#a78bfa',
    }));
  }, [z]);

  useFrame((state) => {
    rings.forEach((r, i) => {
      const mesh = groupRef.current?.children[i];
      if (mesh) mesh.rotation.z = state.clock.elapsedTime * r.speed;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[r.tilt, 0, 0]}>
          <torusGeometry args={[r.radius, 0.006, 12, 80]} />
          <meshBasicMaterial color={r.color} transparent opacity={r.opacity} />
        </mesh>
      ))}
      {motes.map((m, i) => (
        <Sphere key={i} args={[m.size, 4, 4]} position={m.pos}>
          <meshBasicMaterial color={m.color} transparent opacity={0.7} />
        </Sphere>
      ))}
      {/* Central glow point */}
      <pointLight position={[0, 0, 0]} color="#3060ff" intensity={2} distance={15} />
    </group>
  );
}

/* ─── Chapter 2: About — The Study ─── */
function AboutScene({ z }) {
  const screens = useMemo(() => [
    { pos: [-3.5, 0.5, z - 2], rot: [0, 0.3, 0], w: 2, h: 1.4, color: '#1a4a8a' },
    { pos: [0, 1.2, z - 5], rot: [0, 0, 0], w: 2.4, h: 1.6, color: '#2a1a6a' },
    { pos: [3.5, 0.2, z - 3], rot: [0, -0.3, 0], w: 1.8, h: 1.2, color: '#0a3a5a' },
    { pos: [-1.5, -1, z - 7], rot: [0.1, 0.15, 0], w: 1.4, h: 0.9, color: '#1a3a4a' },
  ], [z]);

  // Floating code lines
  const codeLines = useMemo(() => (
    Array.from({ length: 20 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        z + (Math.random() - 0.5) * 10,
      ],
      width: 0.5 + Math.random() * 1.2,
      color: Math.random() > 0.6 ? '#60a5fa' : Math.random() > 0.5 ? '#a78bfa' : '#34d399',
      opacity: 0.15 + Math.random() * 0.25,
    }))
  ), [z]);

  return (
    <group>
      {/* Monitor screens */}
      {screens.map((s, i) => (
        <group key={i} position={s.pos} rotation={s.rot}>
          {/* Screen bezel */}
          <mesh>
            <boxGeometry args={[s.w + 0.1, s.h + 0.1, 0.05]} />
            <meshStandardMaterial color="#111" roughness={0.5} />
          </mesh>
          {/* Screen glow */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[s.w, s.h]} />
            <meshBasicMaterial color={s.color} transparent opacity={0.6} />
          </mesh>
          {/* Scan lines */}
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[s.w, s.h]} />
            <meshBasicMaterial color="#000" transparent opacity={0.08} />
          </mesh>
          <pointLight position={[0, 0, 0.5]} color={s.color} intensity={0.8} distance={3} />
        </group>
      ))}
      {/* Floating code lines */}
      {codeLines.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={[0, 0, (Math.random() - 0.5) * 0.1]}>
          <planeGeometry args={[c.width, 0.03]} />
          <meshBasicMaterial color={c.color} transparent opacity={c.opacity} />
        </mesh>
      ))}
      {/* Warm desk lamp glow */}
      <pointLight position={[0, 3, z - 2]} color="#ffd080" intensity={0.4} distance={10} />
      <pointLight position={[0, -2, z - 5]} color="#2040a0" intensity={0.6} distance={8} />
    </group>
  );
}

/* ─── Chapter 3: Projects — The Workshop ─── */
function ProjectsScene({ z }) {
  const panelsRef = useRef([]);

  const panels = useMemo(() => [
    { pos: [-4, 1.5, z - 2], color: '#1a4a9a', accent: '#60a5fa', label: 'Gaming Hub' },
    { pos: [3.8, 0.5, z - 4], color: '#3a1a6a', accent: '#c084fc', label: 'AI Generator' },
    { pos: [-2.5, -1.5, z - 7], color: '#0a3a5a', accent: '#22d3ee', label: '3D Portfolio' },
    { pos: [2, 2.5, z - 8], color: '#1a4a2a', accent: '#4ade80', label: 'Microservices' },
  ], [z]);

  useFrame((state) => {
    panelsRef.current.forEach((p, i) => {
      if (p) {
        p.position.y = panels[i].pos[1] + Math.sin(state.clock.elapsedTime * 0.5 + i * 1.5) * 0.15;
        p.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.08;
      }
    });
  });

  return (
    <group>
      {panels.map((panel, i) => (
        <group
          key={i}
          ref={(el) => (panelsRef.current[i] = el)}
          position={panel.pos}
        >
          {/* Panel back */}
          <mesh>
            <boxGeometry args={[2.2, 1.4, 0.04]} />
            <meshStandardMaterial
              color={panel.color}
              roughness={0.3}
              metalness={0.6}
              emissive={panel.color}
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Glowing border */}
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[2.28, 1.48]} />
            <meshBasicMaterial color={panel.accent} transparent opacity={0.08} />
          </mesh>
          {/* Corner accent */}
          <mesh position={[-1.05, 0.65, 0.03]}>
            <boxGeometry args={[0.1, 0.1, 0.01]} />
            <meshBasicMaterial color={panel.accent} transparent opacity={0.9} />
          </mesh>
          <mesh position={[1.05, -0.65, 0.03]}>
            <boxGeometry args={[0.1, 0.1, 0.01]} />
            <meshBasicMaterial color={panel.accent} transparent opacity={0.9} />
          </mesh>
          {/* Panel glow */}
          <pointLight position={[0, 0, 0.5]} color={panel.accent} intensity={0.5} distance={2.5} />
        </group>
      ))}
      {/* Ambient workshop light */}
      <pointLight position={[0, 4, z - 5]} color="#4060ff" intensity={0.5} distance={15} />
    </group>
  );
}

/* ─── Chapter 4: Skills — The Constellation ─── */
function SkillsScene({ z }) {
  const nodesRef = useRef([]);
  const lineRef = useRef();

  const nodes = useMemo(() => {
    const items = [
      { color: '#f89820', size: 0.18 }, // Java
      { color: '#f7df1e', size: 0.16 }, // JS
      { color: '#3776ab', size: 0.14 }, // Python
      { color: '#61dafb', size: 0.16 }, // React
      { color: '#06b6d4', size: 0.15 }, // Tailwind
      { color: '#6db33f', size: 0.17 }, // Spring
      { color: '#339933', size: 0.14 }, // Node
      { color: '#ff6f00', size: 0.13 }, // TF
      { color: '#412991', size: 0.14 }, // OpenAI
      { color: '#2496ed', size: 0.13 }, // Docker
      { color: '#ff9900', size: 0.12 }, // AWS
      { color: '#dc382d', size: 0.12 }, // Redis
    ];
    return items.map((item, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      const radius = 2.5 + (i % 3) * 0.8;
      return {
        ...item,
        baseAngle: angle,
        radius,
        y: (Math.random() - 0.5) * 2,
        speed: 0.12 + (i % 4) * 0.05,
      };
    });
  }, []);

  // Connection lines geometry
  const lineGeometry = useMemo(() => {
    const points = [];
    const count = nodes.length;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (Math.random() > 0.55) {
          const a = nodes[i];
          const b = nodes[j];
          const ax = Math.cos(a.baseAngle) * a.radius;
          const az = z - 5 + Math.sin(a.baseAngle) * a.radius * 0.3;
          const bx = Math.cos(b.baseAngle) * b.radius;
          const bz = z - 5 + Math.sin(b.baseAngle) * b.radius * 0.3;
          points.push(new THREE.Vector3(ax, a.y, az));
          points.push(new THREE.Vector3(bx, b.y, bz));
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [nodes, z]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    nodes.forEach((node, i) => {
      const mesh = nodesRef.current[i];
      if (mesh) {
        const angle = node.baseAngle + t * node.speed;
        mesh.position.x = Math.cos(angle) * node.radius;
        mesh.position.y = node.y + Math.sin(t * 0.5 + i) * 0.15;
        mesh.position.z = z - 5 + Math.sin(angle) * node.radius * 0.3;
        mesh.rotation.y = t * 0.5;
        mesh.rotation.x = t * 0.3;
      }
    });
  });

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#1a3a5a" transparent opacity={0.3} />
      </lineSegments>
      {/* Skill nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => (nodesRef.current[i] = el)}
        >
          <icosahedronGeometry args={[node.size, 1]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}
      {/* Constellation center glow */}
      <pointLight position={[0, 0, z - 5]} color="#60c0ff" intensity={1.5} distance={12} />
      <Sphere args={[0.3, 16, 16]} position={[0, 0, z - 5]}>
        <meshBasicMaterial color="#60c0ff" transparent opacity={0.6} />
      </Sphere>
    </group>
  );
}

/* ─── Chapter 5: AI Vision — The Future ─── */
function AIVisionScene({ z }) {
  const ringsRef = useRef([]);
  const gridRef = useRef();

  const rings = useMemo(() => [
    { radius: 2, tube: 0.008, speed: 0.4, color: '#ff40ff', tiltX: 0.2, tiltY: 0 },
    { radius: 3.2, tube: 0.005, speed: -0.25, color: '#40ffff', tiltX: 1.2, tiltY: 0.3 },
    { radius: 4.5, tube: 0.004, speed: 0.15, color: '#8040ff', tiltX: 0.5, tiltY: 1.1 },
    { radius: 5.5, tube: 0.003, speed: -0.1, color: '#ff40aa', tiltX: 0.8, tiltY: 0.6 },
  ], []);

  // Holographic grid
  const gridGeometry = useMemo(() => {
    const points = [];
    const size = 10, step = 1;
    for (let x = -size; x <= size; x += step) {
      points.push(new THREE.Vector3(x, 0, z - 8 - size));
      points.push(new THREE.Vector3(x, 0, z - 8 + size));
    }
    for (let zz = -size; zz <= size; zz += step) {
      points.push(new THREE.Vector3(-size, 0, z - 8 + zz));
      points.push(new THREE.Vector3(size, 0, z - 8 + zz));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [z]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = t * rings[i].speed;
        ring.rotation.x = rings[i].tiltX + Math.sin(t * 0.2) * 0.05;
      }
    });
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.06 + Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group>
      {/* Holographic grid */}
      <lineSegments ref={gridRef} geometry={gridGeometry} position={[0, -3, 0]}>
        <lineBasicMaterial color="#ff40ff" transparent opacity={0.07} />
      </lineSegments>
      {/* Neon rings */}
      {rings.map((r, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          position={[0, 0, z - 5]}
          rotation={[r.tiltX, r.tiltY, 0]}
        >
          <torusGeometry args={[r.radius, r.tube, 12, 100]} />
          <meshBasicMaterial color={r.color} transparent opacity={0.85} />
        </mesh>
      ))}
      {/* Data stream particles */}
      {Array.from({ length: 30 }, (_, i) => (
        <DataParticle key={i} z={z} index={i} />
      ))}
      {/* Futuristic light */}
      <pointLight position={[0, 0, z - 5]} color="#c040ff" intensity={2} distance={15} />
      <pointLight position={[3, 2, z - 3]} color="#40ffff" intensity={0.8} distance={8} />
    </group>
  );
}

function DataParticle({ z, index }) {
  const ref = useRef();
  const speed = 0.4 + (index % 5) * 0.2;
  const lane = (index % 7) - 3;
  const phase = (index / 30) * Math.PI * 2;

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * speed + phase) % 1;
      ref.current.position.y = -4 + t * 8;
      ref.current.position.z = z - 3 + lane * 0.5;
      ref.current.material.opacity = Math.sin(t * Math.PI) * 0.9;
    }
  });

  return (
    <mesh ref={ref} position={[lane * 0.8, 0, z - 3]}>
      <sphereGeometry args={[0.015, 4, 4]} />
      <meshBasicMaterial color={index % 2 === 0 ? '#ff40ff' : '#40ffff'} transparent opacity={0.8} />
    </mesh>
  );
}

/* ─── Chapter 6: Contact — Calm Shore ─── */
function ContactScene({ z }) {
  const particlesRef = useRef();
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = z + (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [z, count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      // Slowly converge
      const scale = 0.97 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#ffd080" transparent opacity={0.55} sizeAttenuation />
      </points>
      {/* Warm ambient glow */}
      <pointLight position={[0, 2, z - 3]} color="#ff9040" intensity={0.6} distance={12} />
      <pointLight position={[0, -2, z - 6]} color="#4060ff" intensity={0.4} distance={10} />
      {/* Single calm ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.5, z - 5]}>
        <torusGeometry args={[5, 0.006, 8, 80]} />
        <meshBasicMaterial color="#ffd080" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ─── Background Stars ─── */
function CinematicStars() {
  return (
    <Stars
      radius={80}
      depth={60}
      count={4000}
      factor={3}
      saturation={0}
      fade
      speed={0.5}
    />
  );
}

/* ─── Camera Rig ─── */
function CinematicCamera({ scrollProgress, mousePos }) {
  const { camera, scene } = useThree();
  const targetZ = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentFogColor = useRef(SECTION_FOG_COLORS[0].clone());

  useFrame(() => {
    // Camera Z travel: 0 → MAX_Z
    const rawZ = scrollProgress * MAX_Z;
    targetZ.current = rawZ;
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;

    // Mouse parallax
    const mx = (mousePos?.x || 0) * 0.8;
    const my = (mousePos?.y || 0) * 0.4;
    targetX.current = mx;
    targetY.current = my;
    camera.position.x += (targetX.current - camera.position.x) * 0.03;
    camera.position.y += (targetY.current - camera.position.y) * 0.03;

    // Camera looks slightly ahead
    camera.lookAt(
      camera.position.x * 0.3,
      camera.position.y * 0.3,
      camera.position.z - 5,
    );

    // Fog color shift based on section
    const sectionF = Math.min(scrollProgress * (TOTAL_SECTIONS - 1), TOTAL_SECTIONS - 1);
    const sIdx = Math.floor(sectionF);
    const sFrac = sectionF - sIdx;
    const nextIdx = Math.min(sIdx + 1, TOTAL_SECTIONS - 1);
    const targetFog = lerpColor(SECTION_FOG_COLORS[sIdx], SECTION_FOG_COLORS[nextIdx], sFrac);
    currentFogColor.current.lerp(targetFog, 0.04);

    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }
    scene.background = currentFogColor.current.clone().multiplyScalar(0.4);
  });

  return null;
}

/* ─── Scene Lighting ─── */
function DynamicLighting({ scrollProgress }) {
  const light1Ref = useRef();
  const light2Ref = useRef();

  useFrame(() => {
    const sectionF = scrollProgress * (TOTAL_SECTIONS - 1);
    const sIdx = Math.floor(sectionF);

    const lightColors = [
      ['#ffffff', '#4a9eff'],
      ['#ffd080', '#4040ff'],
      ['#80a0ff', '#c080ff'],
      ['#40ffaa', '#4080ff'],
      ['#ff40ff', '#40ffff'],
      ['#ffd080', '#4080ff'],
    ];

    const [c1, c2] = lightColors[Math.min(sIdx, lightColors.length - 1)];
    if (light1Ref.current) light1Ref.current.color.lerp(new THREE.Color(c1), 0.02);
    if (light2Ref.current) light2Ref.current.color.lerp(new THREE.Color(c2), 0.02);
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight ref={light1Ref} position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
      <pointLight ref={light2Ref} position={[-5, -3, -5]} intensity={0.5} color="#4a9eff" />
    </>
  );
}

/* ─── Main Scene Content ─── */
function SceneWorld() {
  return (
    <>
      {/* All 6 chapter scenes placed at their Z positions */}
      <HeroScene z={0} />
      <AboutScene z={-SECTION_DEPTH} />
      <ProjectsScene z={-SECTION_DEPTH * 2} />
      <SkillsScene z={-SECTION_DEPTH * 3} />
      <AIVisionScene z={-SECTION_DEPTH * 4} />
      <ContactScene z={-SECTION_DEPTH * 5} />
    </>
  );
}

/* ─── Main Export ─── */
export default function Scene3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
      dpr={[1, 1.5]}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(SECTION_FOG_COLORS[0], 0.035);
        scene.background = new THREE.Color('#0a0a30').multiplyScalar(0.4);
      }}
    >
      <DynamicLighting scrollProgress={scrollProgress} />
      <CinematicStars />
      <SceneWorld />
      <CinematicCamera scrollProgress={scrollProgress} mousePos={mousePos} />
    </Canvas>
  );
}