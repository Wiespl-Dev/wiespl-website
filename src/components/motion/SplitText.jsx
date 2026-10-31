import { motion } from 'motion/react';
import { ease } from './Reveal';

// Reveals a heading word by word, each word rising out of a clipped line.
// `lines` is an array of lines; a line is a string or { text, em: true } for the italic accent.
// By default it plays when scrolled into view; pass `play` (true/false) to control it yourself.
export default function SplitText({ as = 'h2', lines, delay = 0, className, play }) {
  const Tag = motion[as];
  let wordIndex = 0;

  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } }
      : { initial: 'hidden', animate: play ? 'show' : 'hidden' };

  return (
    <Tag className={className} {...trigger} aria-label={lines.map((l) => (typeof l === 'string' ? l : l.text)).join(' ')}>
      {lines.map((line, li) => {
        const text = typeof line === 'string' ? line : line.text;
        const Wrap = typeof line === 'string' ? 'span' : 'em';
        return (
          <span key={li} className="split-line" aria-hidden="true">
            <Wrap>
              {text.split(' ').map((word) => {
                const i = wordIndex++;
                return (
                  <span key={i} className="split-word-mask">
                    <motion.span
                      className="split-word"
                      variants={{
                        hidden: { y: '110%' },
                        show: { y: '0%', transition: { duration: 0.9, ease, delay: delay + i * 0.06 } },
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </Wrap>
          </span>
        );
      })}
    </Tag>
  );
}
