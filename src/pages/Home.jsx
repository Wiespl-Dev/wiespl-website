import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import PageTransition from '../components/motion/PageTransition';
import SplitText from '../components/motion/SplitText';
import Counter from '../components/motion/Counter';
import Reveal, { ease } from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import ScrollText from '../components/motion/ScrollText';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import SectionHeader from '../components/ui/SectionHeader';
import Marquee from '../components/ui/Marquee';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { DeviceScene, HeroScene } from '../components/three';
import { useIntroReady } from '../context/IntroContext';
import useMediaQuery from '../hooks/useMediaQuery';
import { stats } from '../data/site';
import { capabilities, digitalOrModules, whyWiespl } from '../data/pages';
import { services } from '../data/services';
import './Home.css';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee items={capabilities} />
      <Statement />
      <ServicesRail />
      <DigitalOrShowcase />
      <WhyWiespl />
    </PageTransition>
  );
}

/* ─────────── HERO: 3D glass cross ─────────── */
function Hero() {
  const ready = useIntroReady();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const show = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section className="hero" ref={ref}>
      <div className="hero-aurora" aria-hidden="true" />
      <motion.div
        className="hero-scene"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.8, ease }}
      >
        <Suspense fallback={null}>
          <HeroScene progress={scrollYProgress} className="scene-fill" />
        </Suspense>
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity: fade }}>
        <motion.span className="eyebrow" {...show(0.1)}>
          Western India Electromedical Systems · Since 2002
        </motion.span>
        <SplitText as="h1" play={ready} delay={0.2} lines={['Engineering the', { text: 'Operating Theatre' }, 'of Tomorrow']} />
        <div className="hero-bottom">
          <motion.p className="hero-lead" {...show(0.8)}>
            Digital operating rooms, modular OTs and critical-care spaces — designed, manufactured and supported entirely by WIESPL.
          </motion.p>
          <motion.div className="hero-actions" {...show(0.95)}>
            <Button to="/digital-or">Explore Digital OR</Button>
            <Button to="/services" variant="ghost" icon={false}>
              Our Solutions
            </Button>
          </motion.div>
        </div>

        <motion.div className="hero-stats" {...show(1.1)}>
          {stats.map((s) => (
            <div key={s.label} className="hstat">
              <div className="hstat-n">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="hstat-l">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="scroll-cue" style={{ opacity: fade }} aria-hidden="true">
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  );
}

/* ─────────── STATEMENT: words light up on scroll ─────────── */
function Statement() {
  return (
    <section className="sec statement">
      <Reveal>
        <span className="eyebrow">Who we are</span>
      </Reveal>
      <ScrollText text="For 24 years WIESPL has designed, built and supported the *spaces* where *surgery* happens — treating surgeon comfort not as a luxury, but as a *clinical* necessity." />
      <Stagger className="bento-stats" gap={0.1}>
        {[
          { n: 411, l: 'Turnkey OR projects delivered across India', big: true },
          { n: 400, s: '+', l: 'Hospitals trust WIESPL' },
          { n: 24, l: 'Years of surgical infrastructure' },
          { n: 2, l: 'Registered patents' },
        ].map((item) => (
          <StaggerItem key={item.l} className={item.big ? 'bento-big' : ''}>
            <TiltCard className="bento-card" max={8}>
              <div className="bento-n">
                <Counter to={item.n} suffix={item.s} />
              </div>
              <p>{item.l}</p>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ─────────── SERVICES: horizontal rail driven by vertical scroll ─────────── */
function ServicesRail() {
  const wide = useMediaQuery('(min-width: 900px)');
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ['0%', '100%']);

  useLayoutEffect(() => {
    if (!wide) return;
    const measure = () => setDistance(trackRef.current.scrollWidth - window.innerWidth);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [wide]);

  const cards = services.map((s) => (
    <Link key={s.id} to="/services" className="rail-card" data-cursor="drag">
      <div className="rail-img">
        <img src={s.image} alt={s.title} loading="lazy" />
      </div>
      <div className="rail-body">
        <span className="rail-num">{s.num}</span>
        <div>
          <span className="tag">{s.tag}</span>
          <h3>{s.title}</h3>
          <p>{s.summary}</p>
        </div>
        <span className="rail-arrow">
          <Icon name="arrowRight" size={18} strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  ));

  const intro = (
    <div className="rail-intro">
      <span className="eyebrow">Solutions</span>
      <SplitText lines={['Every critical', { text: 'space,' }, 'engineered.']} />
      <p className="sec-desc">Six turnkey solutions — from the flagship Digital OR to sterile IVF labs — each designed, built and supported by one team.</p>
      <Button to="/services" variant="ghost">
        All Solutions
      </Button>
    </div>
  );

  if (!wide) {
    return (
      <section className="sec rail-mobile" ref={ref}>
        {intro}
        <div className="rail-scroller">{cards}</div>
      </section>
    );
  }

  return (
    <section className="rail" ref={ref} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="rail-sticky">
        <motion.div className="rail-track" ref={trackRef} style={{ x }}>
          {intro}
          {cards}
        </motion.div>
        <div className="rail-progress">
          <motion.span style={{ width: bar }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────── DIGITAL OR: 3D tablet turns while modules scroll past ─────────── */
function DigitalOrShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section className="sec showcase" ref={ref}>
      <div className="showcase-glow" aria-hidden="true" />
      <SectionHeader
        index="Flagship · Digital OR"
        title={['One touch.', { text: 'Every system.' }]}
        desc="4K surgical video, DICOM imaging, patient records, environment control and inventory — unified in a single interface built in-house by WIESPL."
      />
      <div className="showcase-grid">
        <div className="showcase-stage">
          <div className="showcase-sticky">
            <Suspense fallback={null}>
              <DeviceScene progress={scrollYProgress} className="scene-fill" />
            </Suspense>
          </div>
        </div>
        <div className="showcase-list">
          {digitalOrModules.map((m, i) => (
            <Reveal key={m.tag} className="showcase-item" amount={0.5}>
              <span className="showcase-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <div className="showcase-pills">
                  {m.pills.map((p) => (
                    <span key={p} className="pill">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <Button to="/digital-or">Discover Digital OR</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────── WHY WIESPL: tilt bento ─────────── */
function WhyWiespl() {
  return (
    <section className="sec why">
      <SectionHeader
        index="Why WIESPL"
        title={['Not a distributor.', { text: 'The engineers.' }]}
        desc="Every system is designed, engineered and supported by WIESPL — a single accountable partner from concept to commissioning."
      />
      <Stagger className="why-grid" gap={0.12}>
        {whyWiespl.map((item, i) => (
          <StaggerItem key={item.title} className={`why-cell why-cell-${i}`}>
            <TiltCard className="why-card">
              <div className="why-top">
                <div className="why-icon">
                  <Icon name={item.icon} size={24} strokeWidth={1.4} />
                </div>
                <span className="why-live" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="why-stat">
                <b>{item.stat}</b>
                <span>{item.statLabel}</span>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
