import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

// Background for inner-page headers: a slowly morphing wireframe orb in a particle field.
export default function AmbientScene({ className }) {
  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 7], fov: 45 }}>
      <Orb />
      <Particles count={1100} inner={3.5} outer={9} size={0.028} />
    </SceneCanvas>
  );
}

function Orb() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    const g = ref.current;
    g.rotation.y += delta * 0.12;
    g.position.x = THREE.MathUtils.damp(g.position.x, 2.2 + state.pointer.x * 0.5, 2, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, state.pointer.y * 0.4, 2, delta);
  });

  return (
    <group ref={ref} position={[2.2, 0, 0]}>
      <Float speed={1.2} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.9, 12]} />
          <MeshDistortMaterial color="#4f8fff" wireframe distort={0.35} speed={1.4} transparent opacity={0.35} />
        </mesh>
        <mesh scale={0.62}>
          <icosahedronGeometry args={[1.9, 6]} />
          <MeshDistortMaterial color="#2ee6d6" distort={0.45} speed={2} emissive="#0b3b7a" emissiveIntensity={0.6} roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>
      <pointLight position={[2, 2, 3]} intensity={20} color="#ffffff" />
      <ambientLight intensity={0.3} />
    </group>
  );
}
