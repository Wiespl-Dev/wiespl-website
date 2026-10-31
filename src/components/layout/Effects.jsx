import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useSpring } from 'motion/react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useIntroReady } from '../../context/IntroContext';
import { useLenis } from '../../context/SmoothScroll';
import Icon from '../ui/Icon';
import './Effects.css';
import { img } from '../../utils/img';

// Thin gradient bar at the top showing how far down the page you are.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}

// Round button that appears after scrolling down and glides back to the top.
export function BackToTop() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on('change', (y) => setShow(y > 600)), [scrollY]);

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="btt"
          aria-label="Back to top"
          onClick={toTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon name="arrowUp" size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// A glowing ring that trails the mouse and grows over links, plus a soft
// spotlight lighting up the page around the pointer. Only on devices with a real mouse.
export function Cursor() {
  const hasMouse = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const glowX = useSpring(x, { stiffness: 60, damping: 20 });
  const glowY = useSpring(y, { stiffness: 60, damping: 20 });
  const [mode, setMode] = useState('');

  useEffect(() => {
    if (!hasMouse || reduced) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest?.('a, button, [data-cursor]');
      setMode(t ? (t.dataset.cursor === 'drag' ? 'drag' : 'hover') : '');
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [hasMouse, reduced, x, y]);

  if (!hasMouse || reduced) return null;
  return (
    <>
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
      <motion.div className={`cursor-ring ${mode}`} style={{ x: ringX, y: ringY }} aria-hidden="true">
        {mode === 'drag' && <span>Drag</span>}
      </motion.div>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
    </>
  );
}

// Full-screen intro shown once when the site first opens: a 0 → 100 counter,
// then the panel lifts away like a curtain.
export function Preloader() {
  const ready = useIntroReady();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, { duration: 1.8, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setCount(Math.round(v)) });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div className="preloader" exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1, ease: [0.77, 0, 0.18, 1] } }}>
          <motion.div className="preloader-inner" exit={{ y: -60, opacity: 0, transition: { duration: 0.5 } }}>
            <motion.img
              src={img('logo-mark.png')}
              alt=""
              className="preloader-logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="preloader-bar">
              <motion.span style={{ width: `${count}%` }} />
            </div>
            <div className="preloader-meta">
              <span>Engineering the OR of tomorrow</span>
              <span className="preloader-count">{String(count).padStart(3, '0')}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
