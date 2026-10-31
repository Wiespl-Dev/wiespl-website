import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import PageTransition from '../components/motion/PageTransition';
import Reveal from '../components/motion/Reveal';
import TiltCard from '../components/motion/TiltCard';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import PageHero from '../components/ui/PageHero';
import Icon from '../components/ui/Icon';
import { company } from '../data/site';
import './Contact.css';

const subjects = [
  { value: 'Digital OR', label: 'Digital OR System' },
  { value: 'Modular OT', label: 'Modular OT' },
  { value: 'Modular ICU', label: 'Modular ICU' },
  { value: 'Modular NICU', label: 'Modular NICU' },
  { value: 'IVF Lab', label: 'IVF Lab' },
  { value: 'Partnership', label: 'Partnership Inquiry' },
  { value: 'Other', label: 'Other' },
];

// Set VITE_CONTACT_ENDPOINT in .env (e.g. a Formspree URL) to receive messages directly.
// Without it, the form opens the visitor's email app with the message filled in.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export default function Contact() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        title={["Let's talk about", { text: 'your OR.' }]}
        desc="Planning a new hospital or upgrading an operating theatre? Our team replies within one business day."
      />

      <section className="sec contact-sec">
        <div className="contact-wrap">
          <Reveal className="contact-form-card glass">
            <h2 className="contact-title">Send a message</h2>
            <p className="contact-sub">Tell us about your project and we&apos;ll get back to you.</p>
            <ContactForm />
          </Reveal>

          <div className="contact-side">
            <Reveal delay={0.1}>
              <TiltCard className="info-card" max={6}>
                <span className="eyebrow">Headquarters</span>
                <h3>Pune, India</h3>
                <address className="full-address">
                  {company.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <div className="detail-row">
                  <Icon name="phone" size={16} />
                  <a href={company.phoneHref}>{company.phone}</a>
                </div>
                <div className="detail-row">
                  <Icon name="mail" size={16} />
                  <a href={`mailto:${company.salesEmail}`}>{company.salesEmail}</a>
                </div>
                <div className="detail-row">
                  <Icon name="clock" size={16} />
                  <span>{company.hours}</span>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.2} className="map">
              <iframe src={company.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="WIESPL Headquarters Map" allowFullScreen />
            </Reveal>
          </div>
        </div>

        <Stagger className="contact-cards" gap={0.12}>
          <StaggerItem>
            <TiltCard className="contact-card" max={6}>
              <span className="tag">Sales & Commercial</span>
              <h3>Commercial Team</h3>
              <p>Proposals, pricing and partnerships. We respond within one business day.</p>
              <a className="cc-link" href={`mailto:${company.salesEmail}`}>
                {company.salesEmail} <Icon name="arrowRight" size={14} strokeWidth={2} />
              </a>
            </TiltCard>
          </StaggerItem>
          <StaggerItem>
            <TiltCard className="contact-card" max={6}>
              <span className="tag">Technical Support</span>
              <h3>Service & Support</h3>
              <p>Existing installations, technical queries and service requests during business hours.</p>
              <a className="cc-link" href={`mailto:${company.supportEmail}`}>
                {company.supportEmail} <Icon name="arrowRight" size={14} strokeWidth={2} />
              </a>
            </TiltCard>
          </StaggerItem>
        </Stagger>
      </section>
    </PageTransition>
  );
}

function ContactForm() {
  const [params] = useSearchParams();
  const presetSubject = subjects.some((s) => s.value === params.get('subject')) ? params.get('subject') : '';
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!ENDPOINT) {
      const body = `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\n\n${data.message}`;
      window.location.href = `mailto:${company.salesEmail}?subject=${encodeURIComponent(`Website enquiry: ${data.subject}`)}&body=${encodeURIComponent(body)}`;
      setStatus({ state: 'success', message: 'Your email app should now open with your message filled in — just press send.' });
      return;
    }

    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus({ state: 'success', message: 'Thank you! Your message has been sent. We will get back to you within one business day.' });
    } catch {
      setStatus({ state: 'error', message: `Something went wrong. Please try again or email us at ${company.salesEmail}.` });
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" required autoComplete="family-name" />
      </div>
      <div className="form-row">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field">
        <select id="subject" name="subject" required defaultValue={presetSubject}>
          <option value="" disabled>
            Select a subject
          </option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <label htmlFor="subject" className="field-label static">
          Subject
        </label>
      </div>
      <div className="field">
        <textarea id="message" name="message" required placeholder=" " />
        <label htmlFor="message" className="field-label">
          Tell us about your project
        </label>
      </div>

      <motion.button type="submit" className="btn-primary form-submit" disabled={status.state === 'sending'} whileTap={{ scale: 0.97 }}>
        {status.state === 'sending' ? 'Sending…' : 'Send Message'}
        <span className="btn-icon">
          <Icon name="arrowRight" size={13} strokeWidth={2.2} />
        </span>
      </motion.button>

      <AnimatePresence>
        {status.message && (
          <motion.div
            key={status.message}
            className={`form-message ${status.state}`}
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// Input with a label that floats up when focused or filled.
function Field({ label, name, type = 'text', ...rest }) {
  return (
    <div className="field">
      <input id={name} name={name} type={type} placeholder=" " {...rest} />
      <label htmlFor={name} className="field-label">
        {label}
      </label>
    </div>
  );
}
