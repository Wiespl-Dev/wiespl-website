import { Suspense, useRef } from 'react';
import { useScroll } from 'motion/react';
import PageTransition from '../components/motion/PageTransition';
import Reveal from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import CheckList from '../components/ui/CheckList';
import ImageReveal from '../components/ui/ImageReveal';
import { DeviceScene } from '../components/three';
import { digitalOrModules, digitalOrPillars, videoConferencing } from '../data/pages';
import './DigitalOR.css';

export default function DigitalOR() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Flagship Product"
        title={['The Digital', { text: 'Operating Room.' }]}
        desc="An advanced OR platform that unifies surgical devices, imaging systems and patient information into a single, intelligent ecosystem — for safer, more connected, patient-focused surgery."
      />

      <DeviceStage />

      <section className="sec">
        <SectionHeader index="Three Pillars" title={['Designed around', { text: 'the surgeon.' }]} />
        <div className="dor-pillars">
          {digitalOrPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="dor-pillar">
              <ImageReveal src={p.img} alt={p.title} delay={0.15 + i * 0.12} className="dor-pillar-img" />
              <span className="dor-pillar-num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec sec-alt">
        <SectionHeader
          index="System Modules"
          title={['A complete', { text: 'ecosystem.' }]}
          desc="Six integrated modules working together to create the most advanced surgical environment available today."
        />
        <Stagger className="modules" gap={0.08}>
          {digitalOrModules.map((m) => (
            <StaggerItem key={m.tag}>
              <TiltCard className="mod" max={7}>
                <div className="mod-image">
                  <img src={m.img} alt={m.title} loading="lazy" />
                  <span className="tag">{m.tag}</span>
                </div>
                <div className="mod-body">
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                  <div className="mod-pills">
                    {m.pills.map((pill) => (
                      <span key={pill} className="pill">
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="sec">
        <div className="feature-split">
          <div className="feat-copy">
            <Reveal>
              <span className="eyebrow">Module G · Live OR Connectivity</span>
            </Reveal>
            <Reveal as="h3" delay={0.1}>
              Real-time surgical <em className="grad-text serif">video conferencing.</em>
            </Reveal>
            <Reveal as="p" delay={0.2}>
              Bring remote specialists, consulting surgeons and second opinions directly into the OR without breaking sterile workflow — over a secure, low-latency video link on the surgeon console, a wall display or a handheld tablet.
            </Reveal>
            <CheckList items={videoConferencing} />
          </div>
          <ImageReveal src="/images/video-conference.jpg" alt="Surgeon using WIESPL Digital OR video conferencing on a tablet" className="feat-media">
            <div className="feat-media-caption glass">
              <small>Module G</small>
              <strong>Live Video Conferencing</strong>
            </div>
          </ImageReveal>
        </div>
      </section>
    </PageTransition>
  );
}

// Tall section where the 3D tablet stays pinned and turns as you scroll.
function DeviceStage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return (
    <section className="device-stage" ref={ref}>
      <div className="device-sticky">
        <Suspense fallback={null}>
          <DeviceScene progress={scrollYProgress} className="scene-fill" />
        </Suspense>
        <Reveal className="device-caption">
          <span className="eyebrow">Built in-house · Deployed in partner hospitals</span>
        </Reveal>
      </div>
    </section>
  );
}
