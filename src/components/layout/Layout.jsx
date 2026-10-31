import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { BackToTop, Cursor, Preloader, ScrollProgress } from './Effects';

const titles = {
  '/': 'WIESPL | Digital OR System',
  '/about': 'About — WIESPL',
  '/digital-or': 'Digital OR — WIESPL',
  '/services': 'Services — WIESPL',
  '/contact': 'Contact — WIESPL',
};

// Frame shared by every page: nav on top, footer at the bottom, effects layered around.
export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? 'Page not found — WIESPL';
  }, [pathname]);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
