import { createContext, useContext, useEffect, useState } from 'react';

// `ready` flips to true once the first-visit preloader has lifted,
// so hero animations can wait for it instead of playing hidden underneath.
const IntroContext = createContext(true);

const MIN_MS = 2100; // let the 0 → 100 counter finish
const MAX_MS = 3500; // never keep visitors waiting longer on a slow connection

export function IntroProvider({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let timer;
    const finish = () => {
      timer = setTimeout(() => setReady(true), Math.max(0, MIN_MS - (performance.now() - start)));
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const cap = setTimeout(() => setReady(true), MAX_MS);
    return () => {
      clearTimeout(timer);
      clearTimeout(cap);
      window.removeEventListener('load', finish);
    };
  }, []);

  return <IntroContext.Provider value={ready}>{children}</IntroContext.Provider>;
}

export const useIntroReady = () => useContext(IntroContext);
