import { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SplitText from '../motion/SplitText';
import Reveal from '../motion/Reveal';
import { AmbientScene } from '../three';
import './PageHero.css';

// Header for inner pages: big animated title over a live 3D background.
export default function PageHero({ eyebrow, title, desc, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="page-hero" ref={ref}>
      <motion.div className="page-hero-scene" style={{ opacity }}>
        <Suspense fallback={null}>
          <AmbientScene className="scene-fill" />
        </Suspense>
      </motion.div>
      <motion.div className="page-hero-content" style={{ y, opacity }}>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <SplitText as="h1" lines={title} delay={0.15} />
        {desc && (
          <Reveal as="p" delay={0.5} className="page-hero-desc">
            {desc}
          </Reveal>
        )}
        {children}
      </motion.div>
      <div className="page-hero-fade" aria-hidden="true" />
    </section>
  );
}
