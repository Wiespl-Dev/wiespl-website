import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App';
import { IntroProvider } from './context/IntroContext';
import { SmoothScrollProvider } from './context/SmoothScroll';
import './styles/global.css';

// Always open at the top of the page; the preloader and hero animations assume it.
history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Respect the visitor's "reduce motion" OS setting for every animation. */}
      <MotionConfig reducedMotion="user">
        <SmoothScrollProvider>
          <IntroProvider>
            <App />
          </IntroProvider>
        </SmoothScrollProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
