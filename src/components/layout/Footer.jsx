import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { company, footerColumns } from '../../data/site';
import SplitText from '../motion/SplitText';
import Button from '../ui/Button';
import './Footer.css';
import { img } from '../../utils/img';

// Closing call-to-action + links. The giant WIESPL wordmark rises into place as you reach the bottom.
export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const markY = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
  const markOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-cta">
        <span className="eyebrow">Start a project</span>
        <SplitText as="h2" lines={["Let's build the", { text: 'operating theatre' }, 'of tomorrow.']} />
        <div className="footer-cta-actions">
          <Button to="/contact">Book a Consultation</Button>
          <Button href={`mailto:${company.salesEmail}`} variant="ghost" icon={false}>
            {company.salesEmail}
          </Button>
        </div>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand"><img src={img('logo-mark.png')} alt="" className="brand-mark" /><span className="brand-word">WIESPL</span></span>
          <p>{company.tagline}</p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <div className="footer-links">
              {col.links.map((link) => (
                <Link key={link.label} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className="footer-col-title">Contact</div>
          <div className="footer-links">
            <a href={`mailto:${company.salesEmail}`}>{company.salesEmail}</a>
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={company.website} target="_blank" rel="noreferrer">
              wiespl.com
            </a>
          </div>
        </div>
      </div>

      <div className="footer-mark-wrap" aria-hidden="true">
        <motion.div className="footer-mark" style={{ y: markY, opacity: markOpacity }}>
          WIESPL
        </motion.div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {company.legalName}</span>
        <span>Pune, India</span>
      </div>
    </footer>
  );
}
