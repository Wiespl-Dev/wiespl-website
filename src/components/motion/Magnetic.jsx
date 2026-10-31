import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Makes its child drift toward the mouse pointer while hovered (used on buttons).
export default function Magnetic({ strength = 0.3, children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span ref={ref} className={className} style={{ x: sx, y: sy, display: 'inline-block' }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.span>
  );
}
