import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Html, Lightformer, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

const screens = ['/images/app-tab-1.jpg', '/images/app-tab-2.jpg', '/images/app-tab-3.jpg'];

// A 3D tablet showing the real Digital OR app screens. It turns as the section scrolls
// (`progress` motion value 0 → 1) and leans toward the mouse, with floating live-data chips.
export default function DeviceScene({ progress, className }) {
  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 7.5], fov: 35 }}>
      <Scene progress={progress} />
    </SceneCanvas>
  );
}

function Scene({ progress }) {
  const group = useRef(null);
  // Shrink to fit narrow canvases (tablet + chips span roughly 7.4 units wide).
  const width = useThree((s) => s.viewport.width);
  const fit = Math.min(1, width / 7.4);

  useFrame((state, delta) => {
    const p = progress?.get() ?? 0.5;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, THREE.MathUtils.lerp(-0.75, 0.55, p) + state.pointer.x * 0.2, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, THREE.MathUtils.lerp(0.35, -0.12, p) - state.pointer.y * 0.12, 3, delta);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 6]} intensity={1.5} />
      <pointLight position={[-4, 0, 3]} intensity={25} color="#4f8fff" />

      <group ref={group} scale={fit}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <Tablet />
          <DataChip position={[2.55, 1.25, 0.6]} label="HEPA Filter" value="+12.5 Pa" tone="green" />
          <DataChip position={[-2.6, -0.9, 0.8]} label="OR Temp" value="22.1°C" />
          <DataChip position={[2.2, -1.5, 1]} label="Surgical Timer" value="02:34:17" tone="warn" />
        </Float>
      </group>

      {/* Rendered once (frames={1}) — a soft floor shadow without a per-frame cost. */}
      <ContactShadows position={[0, -2.3, 0]} opacity={0.5} scale={10} blur={2.6} far={4} color="#000814" frames={1} />

      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 4, -6]} scale={[10, 5, 1]} />
        <Lightformer intensity={3} color="#4f8fff" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} />
        <Lightformer intensity={2} color="#2ee6d6" position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[8, 1, 1]} />
      </Environment>
    </>
  );
}

function Tablet() {
  const textures = useTexture(screens);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % screens.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <group>
      <RoundedBox args={[4.4, 3.1, 0.2]} radius={0.16} smoothness={6}>
        <meshPhysicalMaterial color="#0b0f18" metalness={0.8} roughness={0.25} clearcoat={1} envMapIntensity={1.2} />
      </RoundedBox>
      <mesh position={[0, 0, 0.101]}>
        <planeGeometry args={[4.12, 2.82]} />
        <meshBasicMaterial map={textures[index]} toneMapped={false} />
      </mesh>
      {/* Glass reflection sweep over the screen */}
      <mesh position={[0, 0, 0.105]}>
        <planeGeometry args={[4.12, 2.82]} />
        <meshPhysicalMaterial transparent opacity={0.08} roughness={0} metalness={0} clearcoat={1} color="#ffffff" />
      </mesh>
    </group>
  );
}

function DataChip({ position, label, value, tone }) {
  return (
    <Html position={position} transform distanceFactor={3.2} zIndexRange={[5, 0]}>
      <div className={`data-chip ${tone ?? ''}`}>
        <span className="data-chip-dot" />
        <div>
          <small>{label}</small>
          <strong>{value}</strong>
        </div>
      </div>
    </Html>
  );
}
