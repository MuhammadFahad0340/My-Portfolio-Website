'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

// Generates a soft circular glow texture at runtime
function createCircleTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }
  return new THREE.CanvasTexture(canvas);
}

const palette = [
  new THREE.Color('#06b6d4'), // Cyan
  new THREE.Color('#3b82f6'), // Blue
  new THREE.Color('#8b5cf6'), // Purple
  new THREE.Color('#ec4899'), // Pink
];

function buildParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return { positions, colors };
}

// Static full-quality particle data (built once, reused if high-end)
const FULL_COUNT = 350;
const LOW_COUNT  = 80;
const { positions: staticPositionsFull, colors: staticColorsFull } = buildParticles(FULL_COUNT);
const { positions: staticPositionsLow,  colors: staticColorsLow  } = buildParticles(LOW_COUNT);

interface BackgroundSceneProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  isLowEnd: boolean;
}

function BackgroundScene({ mouse, isLowEnd }: BackgroundSceneProps) {
  const COUNT = isLowEnd ? LOW_COUNT : FULL_COUNT;
  const staticPositions = isLowEnd ? staticPositionsLow : staticPositionsFull;

  const pointsRef  = useRef<THREE.Points>(null);
  const shapesRef  = useRef<THREE.Group>(null);
  const texture    = useMemo(() => createCircleTexture(), []);

  // Mutable copies for runtime updates
  const positions  = useMemo(() => new Float32Array(staticPositions), [staticPositions]);
  const colors     = useMemo(
    () => new Float32Array(isLowEnd ? staticColorsLow : staticColorsFull),
    [isLowEnd]
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.01;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;

      // Only run per-particle physics on high-end devices
      if (!isLowEnd) {
        const positionsAttr = pointsRef.current.geometry.attributes.position;
        const posArray      = positionsAttr.array as Float32Array;
        const viewport      = state.viewport;
        const mx = (mouse.current.x * viewport.width)  / 2;
        const my = (mouse.current.y * viewport.height) / 2;

        const repulsionRadius   = 5.0;
        const repulsionStrength = 4.0;
        const returnSpeed       = 0.045;

        for (let i = 0; i < COUNT; i++) {
          const idx = i * 3;
          let x = posArray[idx];
          let y = posArray[idx + 1];
          let z = posArray[idx + 2];
          const ox = staticPositions[idx];
          const oy = staticPositions[idx + 1];
          const oz = staticPositions[idx + 2];

          const dx     = x - mx;
          const dy     = y - my;
          const dz     = z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist   = Math.sqrt(distSq);

          if (dist < repulsionRadius && dist > 0.01) {
            const force     = (repulsionRadius - dist) / repulsionRadius;
            const pushRatio = force * repulsionStrength;
            x += (dx / dist) * pushRatio;
            y += (dy / dist) * pushRatio;
            z += (dz / dist) * pushRatio;
          }

          posArray[idx]     = THREE.MathUtils.lerp(x, ox, returnSpeed);
          posArray[idx + 1] = THREE.MathUtils.lerp(y, oy, returnSpeed);
          posArray[idx + 2] = THREE.MathUtils.lerp(z, oz, returnSpeed);
        }
        positionsAttr.needsUpdate = true;
      }
    }

    // Spin and float the wireframe shapes
    if (shapesRef.current) {
      shapesRef.current.children.forEach((child, i) => {
        child.rotation.x = time * 0.08 + i * 0.2;
        child.rotation.y = time * 0.12 + i * 0.3;
        child.position.y += Math.sin(time * 0.4 + i) * 0.002;
      });
    }

    // Scroll + mouse parallax camera (dampened on low-end)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetY = -scrollY * 0.012;
    const lerpSpeed = isLowEnd ? 0.03 : 0.05;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 2.0, lerpSpeed);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouse.current.y * 1.2, lerpSpeed);
    state.camera.lookAt(state.camera.position.x * 0.8, state.camera.position.y, -30);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]}   intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, -20, -10]} intensity={1.5} color="#8b5cf6" />

      {/* Particle Field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={texture || undefined}
          transparent
          vertexColors
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating 3D Wireframes — skip on very low-end to save draw calls */}
      {!isLowEnd && (
        <group ref={shapesRef}>
          <mesh position={[-6, 4, -10]}>
            <torusGeometry args={[2.0, 0.5, 8, 36]} />
            <meshStandardMaterial wireframe color="#06b6d4" transparent opacity={0.08} roughness={0.5} />
          </mesh>
          <mesh position={[7, -6, -14]}>
            <icosahedronGeometry args={[1.8]} />
            <meshStandardMaterial wireframe color="#8b5cf6" transparent opacity={0.10} roughness={0.5} />
          </mesh>
          <mesh position={[-7, -18, -12]}>
            <dodecahedronGeometry args={[1.6]} />
            <meshStandardMaterial wireframe color="#3b82f6" transparent opacity={0.08} roughness={0.5} />
          </mesh>
          <mesh position={[6, -30, -12]}>
            <octahedronGeometry args={[2.0]} />
            <meshStandardMaterial wireframe color="#ec4899" transparent opacity={0.08} roughness={0.5} />
          </mesh>
          <mesh position={[-3, -42, -14]}>
            <torusKnotGeometry args={[1.2, 0.3, 48, 6]} />
            <meshStandardMaterial wireframe color="#06b6d4" transparent opacity={0.07} roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* Simplified shapes for low-end — fewer vertices, no torus knot */}
      {isLowEnd && (
        <group ref={shapesRef}>
          <mesh position={[-6, 4, -10]}>
            <octahedronGeometry args={[2.0]} />
            <meshStandardMaterial wireframe color="#06b6d4" transparent opacity={0.07} roughness={0.5} />
          </mesh>
          <mesh position={[7, -6, -14]}>
            <icosahedronGeometry args={[1.8]} />
            <meshStandardMaterial wireframe color="#8b5cf6" transparent opacity={0.09} roughness={0.5} />
          </mesh>
        </group>
      )}
    </>
  );
}

export default function InteractiveBackground() {
  const mouse   = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const { isLowEnd, isSmallScreen } = useDeviceCapability();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  // On very small screens, replace Three.js with a pure-CSS gradient — much lighter
  if (isSmallScreen) {
    return (
      <div
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139,92,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(6,182,212,0.15) 0%, transparent 70%), #0b031b',
        }}
      />
    );
  }

  // Cap device pixel ratio on low-end to halve GPU fill rate
  const dpr: [number, number] = isLowEnd ? [1, 1] : [1, Math.min(window.devicePixelRatio, 2)];

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[#0b031b] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: !isLowEnd,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={dpr}
        style={{ width: '100vw', height: '100vh', pointerEvents: 'none' }}
      >
        <BackgroundScene mouse={mouse} isLowEnd={isLowEnd} />
      </Canvas>
    </div>
  );
}
