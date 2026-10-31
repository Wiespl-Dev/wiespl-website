import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { company, navLinks } from '../../data/site';
import { useScrollLock } from '../../context/SmoothScroll';
import Button from '../ui/Button';
import './Navbar.css';
import { img } from '../../utils/img';

const ease = [0.16, 1, 0.3, 1];

// Floating glass navbar. Hides while scrolling down, returns when scrolling up.
export default function Navbar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  useScrollLock(menuOpen);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev + 2 && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <Link to="/" className="nav-logo" aria-label="WIESPL home">
          <img src={img('logo.png')} alt="WIESPL" />
        </Link>

        <nav className="nav-links" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="nav-link" onMouseEnter={() => setHovered(link.to)}>
              {({ isActive }) => (
                <>
                  {(hovered ?? (isActive ? link.to : null)) === link.to && (
                    <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  <span className="nav-link-text">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          <Button to="/contact">Let&apos;s Talk</Button>
        </div>

        <button className={`menu-btn ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
          >
            <div className="mobile-links">
              {[{ to: '/', label: 'Home' }, ...navLinks].map((link, i) => (
                <div key={link.to} className="mobile-link-mask">
                  <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }} transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease }}>
                    <NavLink to={link.to} className="mobile-link" end>
                      <span className="mobile-num">0{i + 1}</span>
                      {link.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </div>
            <motion.div className="mobile-foot" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }} exit={{ opacity: 0 }}>
              <a href={`mailto:${company.salesEmail}`}>{company.salesEmail}</a>
              <a href={company.phoneHref}>{company.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
