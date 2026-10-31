import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import PageTransition from '../components/motion/PageTransition';
import Reveal from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import Icon from '../components/ui/Icon';
import ServiceModal from '../components/services/ServiceModal';
import BeforeAfter from '../components/services/BeforeAfter';
import { services } from '../data/services';
import { beforeAfterSpaces, processSteps } from '../data/pages';
import './Services.css';

export default function Services() {
  const [openId, setOpenId] = useState(null);
  const open = services.find((s) => s.id === openId);
  const close = useCallback(() => setOpenId(null), []);

  return (
    <PageTransition>
      <PageHero
        eyebrow="Solutions Portfolio"
        title={['Complete hospital', { text: 'infrastructure.' }]}
        desc="From digital operating theatres to modular clean rooms — turnkey environments built to the highest international clinical standards. Select a solution to explore it."
      />

      <section className="sec svc-sec">
        <Stagger className="svc-grid" gap={0.08}>
          {services.map((s, i) => (
            <StaggerItem key={s.id} className={i === 0 ? 'svc-featured' : ''}>
              <TiltCard as="button" className="svc" max={6} onClick={() => setOpenId(s.id)} aria-label={`${s.title} — view details`}>
                <div className="svc-image">
                  <motion.img layoutId={`svc-img-${s.id}`} src={s.image} alt="" loading="lazy" />
                </div>
                <div className="svc-content">
                  <div className="svc-head">
                    <span className="svc-n">{s.num}</span>
                    <span className="tag">{s.tag}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="svc-more">
                    View details
                    <span className="svc-more-icon">
                      <Icon name="arrowRight" size={14} strokeWidth={2} />
                    </span>
                  </span>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <AnimatePresence>{open && <ServiceModal key={open.id} service={open} onClose={close} />}</AnimatePresence>

      <section className="sec sec-alt">
        <SectionHeader
          index="Transformations"
          title={['Before & after', { text: 'WIESPL.' }]}
          desc="Drag the slider to see how WIESPL transforms a space, then pick another below. Tap the numbered markers to learn about key equipment."
        />
        <Reveal from="scale">
          <BeforeAfter spaces={beforeAfterSpaces} />
        </Reveal>
      </section>

      <section className="sec">
        <SectionHeader
          index="Process"
          title={['From concept', { text: 'to commission.' }]}
          desc="Every project follows a structured delivery process — from site assessment through staff training and handover."
        />
        <Timeline />
      </section>
    </PageTransition>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <div className="timeline" ref={ref}>
      <div className="tl-track" aria-hidden="true">
        <motion.div className="tl-fill" style={{ scaleY: lineScale }} />
      </div>
      {processSteps.map((step) => (
        <Reveal key={step.phase} className="tl-item" amount={0.6}>
          <div className="tl-dot-wrap">
            <motion.div
              className="tl-dot"
              initial={{ scale: 0.4, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 1, margin: '0px 0px -30% 0px' }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="tl-card">
            <div className="tl-phase">{step.phase}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
