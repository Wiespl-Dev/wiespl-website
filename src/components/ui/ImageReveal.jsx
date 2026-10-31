import { motion } from 'motion/react';

const wipe = [0.77, 0, 0.18, 1];

// An image uncovered by a dark panel sliding away, while the photo settles from a slight zoom.
export default function ImageReveal({ src, alt, className = '', delay = 0, children }) {
  return (
    <motion.div className={`img-reveal ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        variants={{ hidden: { scale: 1.2 }, show: { scale: 1, transition: { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] } } }}
      />
      <motion.div
        className="img-reveal-cover"
        variants={{ hidden: { scaleX: 1 }, show: { scaleX: 0, transition: { duration: 0.9, delay, ease: wipe } } }}
      />
      {children}
    </motion.div>
  );
}
