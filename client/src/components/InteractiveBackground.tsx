'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

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

// Generate static random floating particles outside the render tree (pure function compliant)
const COUNT = 350;
const { staticPositions, staticColors } = (() => {
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  
  const palette = [
    new THREE.Color('#06b6d4'), // Cyan (matching portfolio accent)
    new THREE.Color('#3b82f6'), // Blue
    new THREE.Color('#8b5cf6'), // Purple
    new THREE.Color('#ec4899'), // Pink
  ];

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 40; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 90; // Y (spread wide for vertical scrolling)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10; // Z

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return { staticPositions: positions, staticColors: colors };
})();

function BackgroundScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const shapesRef = useRef<THREE.Group>(null);
  
  // Cache the circle texture
  const texture = useMemo(() => createCircleTexture(), []);
  // Create mutable local copies of the static particle data so we can modify them dynamically
  const positions = useMemo(() => new Float32Array(staticPositions), []);
  const colors = useMemo(() => new Float32Array(staticColors), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gently rotate the dust cloud and apply cursor repulsion
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.01;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;

      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const posArray = positionsAttr.array as Float32Array;
      
      const viewport = state.viewport;
      // Project mouse screen coordinates to world space coordinates
      const mx = (mouse.current.x * viewport.width) / 2;
      const my = (mouse.current.y * viewport.height) / 2;
      
      const repulsionRadius = 5.0; // Distance within which particles start to disperse
      const repulsionStrength = 4.0; // Push force speed
      const returnSpeed = 0.045; // Elastic return speed to home position

      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3;
        
        let x = posArray[idx];
        let y = posArray[idx + 1];
        let z = posArray[idx + 2];
        
        const ox = staticPositions[idx];
        const oy = staticPositions[idx + 1];
        const oz = staticPositions[idx + 2];

        // 3D displacement vector from cursor to particle
        const dx = x - mx;
        const dy = y - my;
        const dz = z - 0; // Cursor is projected onto Z = 0 plane
        
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < repulsionRadius && dist > 0.01) {
          // Calculate push force (stronger the closer the mouse is)
          const force = (repulsionRadius - dist) / repulsionRadius;
          const pushRatio = force * repulsionStrength;
          
          x += (dx / dist) * pushRatio;
          y += (dy / dist) * pushRatio;
          z += (dz / dist) * pushRatio;
        }

        // Return to baseline home coordinates elastically
        x = THREE.MathUtils.lerp(x, ox, returnSpeed);
        y = THREE.MathUtils.lerp(y, oy, returnSpeed);
        z = THREE.MathUtils.lerp(z, oz, returnSpeed);

        posArray[idx] = x;
        posArray[idx + 1] = y;
        posArray[idx + 2] = z;
      }
      
      positionsAttr.needsUpdate = true;
    }

    // Spin and float the wireframe shapes
    if (shapesRef.current) {
      shapesRef.current.children.forEach((child, i) => {
        child.rotation.x = time * 0.08 + i * 0.2;
        child.rotation.y = time * 0.12 + i * 0.3;
        child.position.y += Math.sin(time * 0.4 + i) * 0.002;
      });
    }

    // Scroll mapping (dampened Y offset)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetY = -scrollY * 0.012;

    // Smoothly interpolate camera position based on scroll & mouse parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 2.0, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouse.current.y * 1.2, 0.05);

    // Look slightly towards the center of the deep scene
    state.camera.lookAt(state.camera.position.x * 0.8, state.camera.position.y, -30);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, -20, -10]} intensity={1.5} color="#8b5cf6" />

      {/* Particle Field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
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

      {/* Floating 3D Wireframes */}
      <group ref={shapesRef}>
        {/* Near Hero (Top-Left) */}
        <mesh position={[-6, 4, -10]}>
          <torusGeometry args={[2.0, 0.5, 8, 36]} />
          <meshStandardMaterial wireframe color="#06b6d4" transparent opacity={0.08} roughness={0.5} />
        </mesh>
        
        {/* Near About Section (Right) */}
        <mesh position={[7, -6, -14]}>
          <icosahedronGeometry args={[1.8]} />
          <meshStandardMaterial wireframe color="#8b5cf6" transparent opacity={0.10} roughness={0.5} />
        </mesh>

        {/* Near Experience (Left) */}
        <mesh position={[-7, -18, -12]}>
          <dodecahedronGeometry args={[1.6]} />
          <meshStandardMaterial wireframe color="#3b82f6" transparent opacity={0.08} roughness={0.5} />
        </mesh>

        {/* Near Projects (Right) */}
        <mesh position={[6, -30, -12]}>
          <octahedronGeometry args={[2.0]} />
          <meshStandardMaterial wireframe color="#ec4899" transparent opacity={0.08} roughness={0.5} />
        </mesh>

        {/* Near CTA Section (Center-Left) */}
        <mesh position={[-3, -42, -14]}>
          <torusKnotGeometry args={[1.2, 0.3, 48, 6]} />
          <meshStandardMaterial wireframe color="#06b6d4" transparent opacity={0.07} roughness={0.5} />
        </mesh>
      </group>
    </>
  );
}

export default function InteractiveBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid setState synchronous warning inside effect body by wrapping in animation frame
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

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[#0b031b] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100vw', height: '100vh', pointerEvents: 'none' }}
      >
        <BackgroundScene mouse={mouse} />
      </Canvas>
    </div>
  );
}
