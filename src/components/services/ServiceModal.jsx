import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useScrollLock } from '../../context/SmoothScroll';
import RichText from '../ui/RichText';
import Icon from '../ui/Icon';
import './ServiceModal.css';

// Popup with the full details of one service. The card image morphs into the header image
// (shared `layoutId`), then the content blocks stagger in below it.
export default function ServiceModal({ service, onClose }) {
  const closeRef = useRef(null);
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div className="svc-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="svc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="svc-modal-title"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button ref={closeRef} className="svc-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} strokeWidth={2} />
        </button>
        <motion.img layoutId={`svc-img-${service.id}`} className="svc-modal-img" src={service.image} alt={service.title} />

        <motion.div
          className="svc-modal-body"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } } }}
        >
          <Item>
            <span className="tag">{service.tag}</span>
          </Item>
          <Item as="h3" id="svc-modal-title" className="svc-modal-title">
            {service.title}
          </Item>
          {service.blocks.map((block, i) => (
            <Item key={i}>
              <Block block={block} />
            </Item>
          ))}
          <Item>
            <Link className="btn-primary svc-cta" to="/contact" onClick={onClose}>
              Request a Quote
              <span className="btn-icon">
                <Icon name="arrowRight" size={13} strokeWidth={2.2} />
              </span>
            </Link>
          </Item>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Item({ as = 'div', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} {...rest}>
      {children}
    </Tag>
  );
}

function Card({ item, className = 'b-card' }) {
  return (
    <div className={className}>
      <div className="b-card-title">
        {item.icon && <span className="b-icon">{item.icon}</span>}
        <RichText text={item.title} />
      </div>
      {item.desc && (
        <p className="b-card-desc">
          <RichText text={item.desc} />
        </p>
      )}
      {item.points && (
        <ul className="b-ticks">
          {item.points.map((p) => (
            <li key={p}>
              <RichText text={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Draws one content block. See the list of block types at the top of src/data/services.js.
function Block({ block }) {
  switch (block.type) {
    case 'subtitle':
      return <div className="b-subtitle">{block.text}</div>;
    case 'heading':
      return <h4 className="b-heading">{block.text}</h4>;
    case 'text':
      return (
        <p className="b-text">
          <RichText text={block.text} />
        </p>
      );
    case 'bullets':
      return (
        <ul className="b-bullets">
          {block.items.map((t) => (
            <li key={t}>
              <RichText text={t} />
            </li>
          ))}
        </ul>
      );
    case 'cards':
      return (
        <div className="b-cards">
          {block.items.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      );
    case 'grid':
      return (
        <div className={`b-grid cols-${block.cols}`}>
          {block.items.map((item) => (
            <Card key={item.title} item={item} className="b-grid-card" />
          ))}
        </div>
      );
    case 'threats':
      return (
        <div className="b-threats">
          <div className="b-threats-title">⚠ {block.title}</div>
          <p>{block.sub}</p>
          <ul>
            {block.items.map((t) => (
              <li key={t}>
                <RichText text={t} />
              </li>
            ))}
          </ul>
        </div>
      );
    case 'flow':
      return (
        <div className="b-flow">
          {block.items.map((step, i) => (
            <div key={step.label} className="b-flow-step">
              <div className={`b-flow-block ${step.type}`}>
                {step.label}
                {step.sub && <small>{step.sub}</small>}
              </div>
              {i < block.items.length - 1 && (
                <span className="b-flow-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      );
    case 'process':
      return (
        <ol className="b-process">
          {block.items.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      );
    case 'highlight':
      return (
        <div className="b-highlight">
          <span className="b-highlight-icon">{block.icon}</span>
          <RichText text={block.text} />
        </div>
      );
    case 'savings':
      return (
        <div className="b-savings">
          <div className="b-savings-icon">💰</div>
          <div className="b-savings-title">{block.title}</div>
          <p>
            <RichText text={block.text} />
          </p>
          {block.points && (
            <ul>
              {block.points.map((p) => (
                <li key={p}>
                  <RichText text={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case 'triangle':
      return (
        <div className="b-triangle">
          {block.items.map((it) => (
            <div key={it.label} className="b-triangle-item">
              <span>{it.icon}</span>
              {it.label}
            </div>
          ))}
          <div className="b-triangle-center">{block.center}</div>
        </div>
      );
    default:
      return null;
  }
}
