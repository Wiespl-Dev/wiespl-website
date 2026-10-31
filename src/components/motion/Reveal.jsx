import { motion } from 'motion/react';

export const ease = [0.16, 1, 0.3, 1];

const offsets = {
  up: { y: 50 },
  down: { y: -50 },
  left: { x: -60 },
  right: { x: 60 },
  scale: { scale: 0.88 },
  none: {},
};

// Fades + slides its children in the first time they scroll into view.
export default function Reveal({ as = 'div', from = 'up', delay = 0, duration = 0.9, amount = 0.15, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
