import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, Line } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import Particles from './Particles';

// Home hero: a glass medical cross (from the WIESPL mark) floating inside
// orbiting "surgical light" rings, with a heartbeat trace and a particle field.
// `progress` is a motion value (0 → 1) of how far the hero has been scrolled.
export default function HeroScene({ progress, className }) {
  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 10.5], fov: 38 }}>
      <Scene progress={progress} />
    </SceneCanvas>
  );
}

function Scene({ progress }) {
  const group = useRef(null);
  // Shrink on narrow screens so the cross + rings stay in frame.
  const width = useThree((s) => s.viewport.width);
  const fit = Math.min(1, width / 7.5);

  useFrame((state, delta) => {
    const p = progress?.get() ?? 0;
    const g = group.current;
    // Follow the pointer gently, and sink/turn as the page scrolls.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.35 + p * 1.2, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.25 + p * 0.3, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, -p * 2.2, 4, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, fit * (1 - p * 0.25), 4, delta));
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#4f8fff" />
      <pointLight position={[4, 2, 2]} intensity={25} color="#2ee6d6" />

      <group ref={group}>
        <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}>
          <GlassCross />
        </Float>
        <Rings />
        <Heartbeat />
      </group>
      <Particles />

      {/* Studio lighting built from light panels — no image downloads needed. */}
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <Lightformer intensity={4} color="#4f8fff" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 0.6, 1]} />
        <Lightformer intensity={4} color="#2ee6d6" position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[20, 0.6, 1]} />
        <Lightformer form="ring" intensity={3} position={[0, 0, 6]} scale={3} />
      </Environment>
    </>
  );
}

function GlassCross() {
  const ref = useRef(null);

  const geometry = useMemo(() => {
    const a = 0.42; // arm half-width
    const b = 1.25; // arm length
    const pts = [
      [-a, b], [a, b], [a, a], [b, a], [b, -a], [a, -a],
      [a, -b], [-a, -b], [-a, -a], [-b, -a], [-b, a], [-a, a],
    ];
    const shape = new THREE.Shape();
    pts.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.16,
      bevelSize: 0.13,
      bevelSegments: 10,
      curveSegments: 12,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.25;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={1}
        roughness={0.04}
        thickness={0.9}
        ior={1.45}
        clearcoat={1}
        clearcoatRoughness={0.03}
        attenuationColor="#8fb8ff"
        attenuationDistance={5}
        envMapIntensity={1.8}
        iridescence={0.6}
        iridescenceIOR={1.3}
      />
    </mesh>
  );
}

function Rings() {
  const refs = [useRef(null), useRef(null), useRef(null)];
  const rings = [
    { r: 2.3, color: '#4f8fff', tilt: [1.2, 0.2, 0], speed: 0.25 },
    { r: 2.75, color: '#2ee6d6', tilt: [1.4, -0.5, 0.3], speed: -0.18 },
    { r: 3.25, color: '#9cc0ff', tilt: [0.9, 0.8, -0.2], speed: 0.12 },
  ];

  useFrame((_, delta) => {
    refs.forEach((ref, i) => {
      ref.current.rotation.z += delta * rings[i].speed;
    });
  });

  return rings.map((ring, i) => (
    <group key={i} rotation={ring.tilt}>
      <mesh ref={refs[i]}>
        <torusGeometry args={[ring.r, 0.009, 16, 200]} />
        <meshBasicMaterial color={ring.color} toneMapped={false} transparent opacity={0.8} />
        {/* A bright bead travelling around each ring */}
        <mesh position={[ring.r, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </mesh>
    </group>
  ));
}

function Heartbeat() {
  const ref = useRef(null);
  const points = useMemo(() => {
    const beat = [
      [0, 0], [0.35, 0], [0.5, 0.35], [0.65, -0.9], [0.85, 1.25], [1.05, -0.4], [1.2, 0], [1.9, 0],
    ];
    const out = [];
    for (let x = -6; x < 6; x += 1.9) beat.forEach(([dx, y]) => out.push([x + dx, y * 0.55, -1.2]));
    return out;
  }, []);

  useFrame((_, delta) => {
    ref.current.material.dashOffset -= delta * 1.4;
  });

  return <Line ref={ref} points={points} color="#2ee6d6" lineWidth={1.6} dashed dashSize={3} gapSize={2.5} transparent opacity={0.75} toneMapped={false} />;
}
