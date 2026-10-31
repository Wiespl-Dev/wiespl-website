import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A slowly turning shell of glowing dots.
export default function Particles({ count = 1800, inner = 3, outer = 8, size = 0.03 }) {
  const ref = useRef(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color('#4f8fff');
    const teal = new THREE.Color('#2ee6d6');
    const white = new THREE.Color('#ffffff');
    for (let i = 0; i < count; i++) {
      const r = inner + Math.random() * (outer - inner);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)], i * 3);
      const c = Math.random() < 0.15 ? white : blue.clone().lerp(teal, Math.random());
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count, inner, outer]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} vertexColors transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}
