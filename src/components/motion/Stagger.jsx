import { motion } from 'motion/react';
import { ease } from './Reveal';

// A grid/list whose children animate in one after another.
// Wrap each child in <StaggerItem>.
export function Stagger({ as = 'div', gap = 0.1, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function StaggerItem({ as = 'div', className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={itemVariants} {...rest}>
      {children}
    </Tag>
  );
}
