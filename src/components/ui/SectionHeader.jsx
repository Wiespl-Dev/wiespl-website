import Reveal from '../motion/Reveal';
import SplitText from '../motion/SplitText';

// Section intro: small pill label + big heading on the left, description on the right.
// `title` is an array of lines; use { text } for the gradient italic accent line.
export default function SectionHeader({ index, title, desc, className = '' }) {
  return (
    <div className={`sec-header ${className}`}>
      <div>
        <Reveal>
          <span className="eyebrow">{index}</span>
        </Reveal>
        <SplitText lines={title} />
      </div>
      {desc && (
        <Reveal delay={0.15}>
          <p className="sec-desc">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
