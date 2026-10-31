import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import DigitalOR from './pages/DigitalOR';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { scrollToTop, useLenis } from './context/SmoothScroll';

export default function App() {
  const location = useLocation();
  const lenis = useLenis();

  return (
    <Layout>
      {/* Scroll to top once the old page has animated out, so the exit isn't a jump. */}
      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop(lenis)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/digital-or" element={<DigitalOR />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
