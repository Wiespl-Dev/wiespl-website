import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import './BeforeAfter.css';

// Drag the handle (or click / use arrow keys) to compare a space before and after WIESPL.
// Numbered markers on the "after" side explain the equipment.
export default function BeforeAfter({ spaces }) {
  const [activeId, setActiveId] = useState(spaces[0].id);
  const space = spaces.find((s) => s.id === activeId);

  return (
    <div className="ba">
      <AnimatePresence mode="wait">
        <motion.div
          key={space.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
        >
          <Slider space={space} />
        </motion.div>
      </AnimatePresence>

      <div className="ba-tabs" role="tablist">
        {spaces.map((s) => (
          <button key={s.id} role="tab" aria-selected={s.id === activeId} className={`ba-tab ${s.id === activeId ? 'active' : ''}`} onClick={() => setActiveId(s.id)}>
            {s.id === activeId && <motion.span layoutId="ba-tab-bg" className="ba-tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="ba-tab-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ space }) {
  const ref = useRef(null);
  const pos = useMotionValue(50); // % from the left
  const [value, setValue] = useState(50);
  const [openSpot, setOpenSpot] = useState(null);
  const dragging = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const beforeClip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const spotsClip = useTransform(pos, (p) => `inset(0 0 0 ${p}%)`);
  const handleLeft = useTransform(pos, (p) => `${p}%`);
  useMotionValueEvent(pos, 'change', (p) => setValue(Math.round(p)));

  // A little "peek" sweep the first time it comes into view, hinting that it can be dragged.
  useEffect(() => {
    if (!inView) return;
    const controls = animate(pos, [50, 25, 72, 50], { duration: 2.2, ease: 'easeInOut', delay: 0.3 });
    return () => controls.stop();
  }, [inView, pos]);

  function moveTo(clientX) {
    const r = ref.current.getBoundingClientRect();
    pos.set(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
  }

  function onPointerDown(e) {
    if (e.target.closest('.ba-spot')) return;
    dragging.current = true;
    ref.current.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  }

  function onKeyDown(e) {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') pos.set(Math.max(3, pos.get() - step));
    else if (e.key === 'ArrowRight') pos.set(Math.min(97, pos.get() + step));
    else return;
    e.preventDefault();
  }

  return (
    <div
      ref={ref}
      className="ba-frame"
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      data-cursor="drag"
    >
      <img src={space.after} alt={`${space.label} after WIESPL`} draggable="false" />
      <motion.img src={space.before} alt={`${space.label} before`} draggable="false" style={{ clipPath: beforeClip }} />

      <motion.div className="ba-spots" style={{ clipPath: spotsClip }}>
        {space.hotspots.map((spot, i) => (
          <button
            key={spot.title}
            className={`ba-spot ${openSpot === i ? 'active' : ''}`}
            style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
            onClick={() => setOpenSpot(openSpot === i ? null : i)}
            aria-label={`${spot.title}: ${spot.text}`}
          >
            {i + 1}
            <AnimatePresence>
              {openSpot === i && (
                <motion.span className="ba-tip" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <strong>{spot.title}</strong>
                  {spot.text}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.div>

      <motion.div
        className="ba-handle"
        style={{ left: handleLeft }}
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onKeyDown={onKeyDown}
      >
        <span className="ba-knob">↔</span>
      </motion.div>

      <div className="ba-labels">
        <span>Before</span>
        <span>After — WIESPL</span>
      </div>
    </div>
  );
}
