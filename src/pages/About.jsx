import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import PageTransition from '../components/motion/PageTransition';
import Reveal from '../components/motion/Reveal';
import SplitText from '../components/motion/SplitText';
import TiltCard from '../components/motion/TiltCard';
import ScrollText from '../components/motion/ScrollText';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import CheckList from '../components/ui/CheckList';
import ImageReveal from '../components/ui/ImageReveal';
import { aboutPillars, coreValues, director, eventPhotos } from '../data/pages';
import './About.css';

export default function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About WIESPL"
        title={['24 years of', { text: 'surgical' }, 'excellence.']}
        desc="A premier manufacturer and turnkey solution provider for modular operating theatres, ICUs and cleanroom environments — based in Pune, trusted across India."
      />

      <section className="sec">
        <ScrollText text="We treat surgeon comfort as a *clinical* necessity — reducing fatigue, increasing precision and extending *career* longevity." />
        <Stagger className="pillars" gap={0.12}>
          {aboutPillars.map((p, i) => (
            <StaggerItem key={p.tag}>
              <TiltCard className="pillar">
                <span className="pillar-num">0{i + 1}</span>
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="sec sec-alt">
        <SectionHeader
          index="Core Values"
          title={['Built on trust,', { text: 'engineered for life.' }]}
          desc="Our commitment to quality, innovation and partnership is reflected in every project we deliver."
        />
        <div className="values">
          {coreValues.map((v, i) => (
            <ValueRow key={v.title} value={v} index={i} />
          ))}
        </div>
      </section>

      <section className="sec">
        <SectionHeader
          index="Event Highlights"
          title={['On the', { text: 'show floor.' }]}
          desc="A glimpse from our showcase at the Mumbai expo, where we presented our Digital OR ecosystem to hospital leadership and industry partners."
        />
        <div className="gallery">
          {eventPhotos.map((photo, i) => (
            <ParallaxPhoto key={photo.src} photo={photo} index={i} />
          ))}
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="feature-split">
          <div className="feat-copy">
            <Reveal>
              <span className="eyebrow">Leadership</span>
            </Reveal>
            <Reveal as="h3" delay={0.1}>
              {director.name}
            </Reveal>
            <Reveal as="p" delay={0.2}>
              {director.bio}
            </Reveal>
            <CheckList items={director.points} />
          </div>
          <ImageReveal src={director.photo} alt={`${director.name} — Director, WIESPL`} className="feat-media director-photo">
            <div className="feat-media-caption glass">
              <small>Founder & Managing Director</small>
              <strong>{director.name}</strong>
            </div>
          </ImageReveal>
        </div>
      </section>

      <section className="quote-band">
        <div className="quote-orb" aria-hidden="true" />
        <Reveal className="quote-mark">“</Reveal>
        <SplitText
          as="blockquote"
          className="quote-text"
          lines={['Surgeons spend one-quarter of their professional lives in the operating room. The environment determines not just career longevity, but surgical performance and patient outcomes.']}
        />
        <Reveal delay={0.6} className="quote-attr">
          WIESPL Design Philosophy
        </Reveal>
      </section>
    </PageTransition>
  );
}

function ValueRow({ value, index }) {
  return (
    <Reveal className="value-row" amount={0.6}>
      <span className="value-num">0{index + 1}</span>
      <h3>{value.title}</h3>
      <p>{value.body}</p>
      <span className="value-tag">{value.tag}</span>
    </Reveal>
  );
}

function ParallaxPhoto({ photo, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <Reveal className={`gallery-item ${photo.wide ? 'wide' : ''}`} delay={index * 0.1}>
      <div className="gallery-frame" ref={ref}>
        <motion.img src={photo.src} alt={photo.alt} loading="lazy" style={{ y }} />
      </div>
      <p className="gallery-caption">{photo.caption}</p>
    </Reveal>
  );
}
