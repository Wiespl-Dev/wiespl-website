# WIESPL Website (React)

The WIESPL company website: a dark, premium design with real-time 3D, built with
**React + Vite**, **three.js** (via React Three Fiber), **Motion** animations and **Lenis** smooth scrolling.
The old HTML version is still in the parent folder, untouched.

## Run it

```bash
npm install      # first time only
npm run dev      # open http://localhost:5173
npm run build    # production files go to dist/
npm run preview  # preview the production build
```

## What's on each page

- **Home** — 3D glass medical cross with orbiting rings and particles (reacts to mouse and scroll),
  scrolling capability strip, statement that lights up word-by-word, 3D-tilt stat cards,
  services rail that moves sideways as you scroll, 3D tablet showing the real app screens, bento "Why WIESPL" cards.
- **About / Digital OR / Services / Contact** — big animated headers over a morphing 3D orb,
  tilt cards, parallax photos, the service detail popup, before/after slider, and a self-drawing process timeline.
- **Everywhere** — preloader with counter, page-transition curtain, floating glass navbar,
  cursor light, film grain, and a footer with a closing call-to-action.

## Folder structure

```
public/images/        All photos and the logo (resized for the web)
src/
  main.jsx            Entry point (router, motion settings, smooth scroll)
  App.jsx             Page routes + page-transition wrapper
  data/               ← Edit text, images and contact details here
    site.js           Company info, nav links, footer, stats
    pages.js          Content for Home, About, Digital OR, before/after, process
    services.js       The six services and their popup details
  pages/              One file per page (+ its CSS)
  components/
    three/            3D scenes (HeroScene, DeviceScene, AmbientScene) — loaded on demand
    layout/           Navbar, Footer, preloader, cursor, scroll bar
    motion/           Reusable animations (Reveal, Stagger, SplitText, TiltCard, ScrollText, Magnetic, Counter, PageTransition)
    ui/               Shared pieces (Button, PageHero, SectionHeader, Icon, CheckList, ImageReveal, Marquee)
    services/         Service popup + before/after slider
  context/            Preloader "ready" state, smooth scrolling
  styles/global.css   Colours, fonts, buttons, glass surfaces, section layout
```

Most content changes only need a file in `src/data/`, not the page code.
Colours live at the top of `src/styles/global.css` (`--accent`, `--accent-2`, `--bg`).

## Performance

- The 3D code (~250 kB compressed) loads only when a 3D scene is on screen, and each scene pauses when scrolled away.
- Visitors with "reduce motion" turned on in their OS get calmer animations and no smooth-scroll.
- If a device can't run WebGL, the 3D scenes are simply skipped and the page still works.

## Contact form

By default the form opens the visitor's email app with the message filled in.
To receive messages directly, create a free form at a service such as [Formspree](https://formspree.io),
copy `.env.example` to `.env` and set:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

## Hosting note

The site uses clean URLs (`/about`, `/services`, …). On static hosting, make every path serve `index.html`:

- **Netlify:** add a `public/_redirects` file containing `/* /index.html 200`
- **Vercel:** works automatically for Vite projects
- **Apache / cPanel:** add an `.htaccess` rewrite to `index.html`

## Still to do

- The Modular ICU and IVF Lab before/after tabs reuse the Modular OT photos. Replace them in `src/data/pages.js` when real photos are available.
- The readings on the 3D tablet's floating chips (HEPA pressure, temperature, timer) are demo values, not live data.
