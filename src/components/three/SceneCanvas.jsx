import { Component, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'motion/react';

// Shared WebGL canvas: pauses rendering when scrolled off-screen (saves battery)
// and quietly renders nothing if the browser can't do WebGL.
export default function SceneCanvas({ children, className, camera = { position: [0, 0, 7], fov: 40 } }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '150px' });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <SceneErrorBoundary>
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={[1, 1.5]}
          camera={camera}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {children}
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

class SceneErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
