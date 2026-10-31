import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// A big paragraph whose words light up one by one as you scroll through it.
// Wrap words in *asterisks* to give them the gradient accent.
export default function ScrollText({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={`scroll-text ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const accent = word.startsWith('*');
        const clean = word.replace(/\*/g, '');
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} accent={accent}>
            {clean}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ progress, range, accent, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span className={accent ? 'st-word accent' : 'st-word'} style={{ opacity, y }}>
      {children}{' '}
    </motion.span>
  );
}
