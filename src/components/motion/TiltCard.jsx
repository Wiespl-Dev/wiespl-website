import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';

// A card that tilts in 3D toward the mouse, with a soft light that follows the pointer
// and a glowing border where the light falls.
export default function TiltCard({ as = 'div', max = 10, className = '', children, ...rest }) {
  const Tag = motion[as];
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const lx = useTransform(px, (v) => `${v * 100}%`);
  const ly = useTransform(py, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(420px circle at ${lx} ${ly}, rgba(79,143,255,0.18), transparent 60%)`;
  const edge = useMotionTemplate`radial-gradient(300px circle at ${lx} ${ly}, rgba(127,176,255,0.9), transparent 55%)`;

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <motion.span className="tilt-light" style={{ background: light }} aria-hidden="true" />
      <motion.span className="tilt-edge" style={{ background: edge }} aria-hidden="true" />
      <div className="tilt-inner">{children}</div>
    </Tag>
  );
}
