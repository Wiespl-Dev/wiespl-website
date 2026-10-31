import { motion } from 'motion/react';

const curtainEase = [0.77, 0, 0.18, 1];

// Wraps every page. On navigation a navy curtain sweeps up over the old page,
// then lifts off the new one.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.main>
      <motion.div
        className="page-curtain"
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: curtainEase } }}
        exit={{ scaleY: 1, originY: 1, transition: { duration: 0.5, ease: curtainEase } }}
        aria-hidden="true"
      />
    </>
  );
}
