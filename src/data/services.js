// Each service shows as a card on the Services page. Clicking it opens a popup
// built from `blocks` — a list of content pieces drawn by ServiceModal.jsx.
// Text supports **bold** and *italic*.
//
// Block types:
//   subtitle | text | heading          { text }
//   bullets                            { items: [text] }
//   cards      (stacked, left border)  { items: [{ icon?, title, desc?, points? }] }
//   grid       (2 or 3 columns)        { cols, items: [{ icon?, title, desc?, points? }] }
//   threats    (red alert box)         { title, sub, items: [text] }
//   flow       (arrow diagram)         { items: [{ label, sub?, type: 'danger'|'safe'|'pure' }] }
//   process    (numbered steps)        { items: [text] }
//   highlight  (callout)               { icon, text }
//   savings    (big number card)       { title, text, points? }
//   triangle                           { items: [{ icon, label }], center }

export const services = [
  {
    id: 'digital-or',
    num: '01',
    title: 'Digital OR',
    tag: 'Flagship',
    image: '/images/service-digital-or.jpeg',
    summary: 'Fully integrated operating room with AI environmental control, 4K video, DICOM imaging.',
    blocks: [
      { type: 'subtitle', text: "The Surgeon's Challenge" },
      {
        type: 'text',
        text: 'Surgeons spend approximately one-quarter of their active professional lives in the operating room. The physical and psychological environment profoundly impacts surgical performance, decision-making, patient outcomes, and most importantly, surgeon well-being and career longevity.',
      },
      {
        type: 'text',
        text: "WIESPL has invested in extensive research on surgeon comfort during surgery, recognizing that an optimally designed operating environment isn't just a luxury — it's a clinical necessity. Our Digital Operating Room represents the convergence of three critical innovations: ergonomic design excellence, AI-powered environmental control, and seamless digital integration.",
      },
      { type: 'heading', text: 'Three Pillars of Surgical Excellence' },
      {
        type: 'cards',
        items: [
          {
            icon: '🎯',
            title: 'Surgeon Comfort & Ergonomics',
            desc: 'Based on comprehensive research, every design element prioritizes the physical and cognitive comfort of the surgical team, enabling longer surgeries with better focus.',
            points: ['Ergonomic positioning for optimal posture', 'Reduced physical fatigue and strain', 'Enhanced surgical precision and safety', 'Extended professional career longevity'],
          },
          {
            icon: '❄️',
            title: 'AI-Powered Environmental Control',
            desc: 'Advanced laminar air flow (LAF) system with intelligent climate management creates the ideal surgical environment automatically.',
            points: ['AI-based integrated air conditioning', 'Advanced air flow optimization', 'Low humidity (minimizes bacterial growth)', 'Consistent temperature & air pressure'],
          },
          {
            icon: '🖥️',
            title: 'Digital Integration & Connectivity',
            desc: 'Seamless digital ecosystem enabling real-time video management, collaboration, and instrument integration for modern surgical practice.',
            points: ['Multi-stream 4K video capture & display', 'Live surgical conferencing', 'Integrated medical instruments', 'Online & offline recording capabilities'],
          },
        ],
      },
    ],
  },
  {
    id: 'modular-ot',
    num: '02',
    title: 'Modular OT',
    tag: 'ISO Compliant',
    image: '/images/service-modular-ot.jpeg',
    summary: 'ISO-compliant prefabricated operating theatres with laminar airflow and rapid deployment.',
    blocks: [
      { type: 'subtitle', text: 'Modular Design for Uncompromising Sterility' },
      {
        type: 'text',
        text: 'WIESPL Modular Operation Theatres are engineered to create the cleanest, most controlled surgical environments possible. Our pre-fabricated modular construction eliminates dust, cracks, and joints typical of conventional construction, achieving the zero-tolerance surfaces required for **ISO Class 5/6** sterility.',
      },
      {
        type: 'text',
        text: 'As a **turnkey project executor**, WIESPL manages the entire process — from initial design and in-house manufacturing to flawless installation and final commissioning — providing a truly **holistic angle** to your facility upgrade.',
      },
      { type: 'heading', text: 'The Modular Advantage' },
      {
        type: 'bullets',
        items: ['Non-porous, anti-bacterial surfaces', 'Seamless integration of walls, ceiling, and doors', 'Rapid installation and minimal site disruption', 'Guaranteed compliance with NABH/JCI standards'],
      },
      { type: 'heading', text: 'Three Distinctive Material Choices' },
      {
        type: 'cards',
        items: [
          { icon: '✨', title: '1. Glass Panels', desc: 'The premium choice for aesthetics and superior cleanability.', points: ['Superior Aesthetics & Reflectivity', 'Exceptional Chemical Resistance', 'Completely Seamless Finish'] },
          { icon: '🛡️', title: '2. Stainless Steel (SS 304) Panels', desc: 'The gold standard for longevity and robustness.', points: ['Maximum Durability & Longevity', 'Excellent Fire Resistance', 'Industry-Proven for Sterility'] },
          { icon: '💰', title: '3. PPGL Panels', desc: 'An economical yet compliant option.', points: ['Cost-Effective Solution', 'Good Durability and Anti-Microbial Coating', 'Wide Range of Color Options'] },
        ],
      },
      { type: 'heading', text: 'Robust Hermetically Sealed Doors' },
      { type: 'text', text: 'The entrance is the most critical point for pressure and sterility.' },
      {
        type: 'bullets',
        items: [
          '**Seamless Sealing:** Creates an airtight barrier.',
          '**Touchless Operation:** Automatic sliding mechanism.',
          '**Integrated Lead Lining:** Optional for Radiology/Hybrid OTs.',
          '**Interlock System:** Prevents simultaneous opening.',
        ],
      },
      { type: 'heading', text: 'Other Essential Accessories' },
      {
        type: 'grid',
        cols: 2,
        items: [
          { title: 'Surgeon Control Panel', desc: 'Centralized HVAC and lighting interface.' },
          { title: 'Scrub Stations', desc: 'Integrated, non-splash surgical sinks.' },
          { title: 'View Panels', desc: 'Flush-mounted observation windows.' },
          { title: 'Pass Boxes', desc: 'Sterile zone transfer systems.' },
          { title: 'Storage Cabinets', desc: 'Flush-mounted instrument storage.' },
        ],
      },
      { type: 'heading', text: 'The WIESPL Turnkey Process' },
      { type: 'text', text: "WIESPL's full project ownership approach simplifies execution — we manage the entire lifecycle." },
      { type: 'process', items: ['Design', 'Manufacture', 'Install', 'Commission', 'Handover'] },
      { type: 'heading', text: 'Benefits of a Holistic Turnkey Solution' },
      {
        type: 'bullets',
        items: [
          '**Single Point of Accountability:** Eliminates conflicts between teams.',
          '**Guaranteed Interface:** Perfect fitment between panels and HVAC.',
          '**Cost Optimization:** Reduced overhead through streamlined workflow.',
          '**Faster Time to Go-Live:** Quicker commissioning than multi-vendor.',
        ],
      },
    ],
  },
  {
    id: 'modular-icu',
    num: '03',
    title: 'Modular ICU',
    tag: 'Critical Care',
    image: '/images/service-modular-icu.jpeg',
    summary: 'Critical care environments engineered for maximum clinical efficiency and infection control.',
    blocks: [
      { type: 'subtitle', text: 'Redefining Critical Care Environments' },
      { type: 'text', text: 'The ICU is the frontline of patient recovery. WIESPL Modular MICUs deliver a pre-engineered, highly controlled environment minimizing cross-contamination.' },
      { type: 'text', text: 'Our modular construction and sterile HVAC systems work in synergy, leading to lower infection rates and **significantly improved patient recovery times**.' },
      { type: 'heading', text: 'Synergy: Modular Walls + Sterile Air = Faster Recovery' },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            title: '1. The Modular Wall Barrier',
            desc: 'Eliminates porous, jointed surfaces with **non-shedding, non-porous, anti-microbial** panels.',
            points: ['**Zero Joints:** Prevents dust and bacteria accumulation.', '**Easy to Disinfect:** Resistant to aggressive cleaning.', '**Flush Integration:** All components flush-mounted.'],
          },
          {
            title: '2. The Sterile HVAC Shield',
            desc: 'HEPA-filtered air with **positive pressure** repels contaminated air.',
            points: ['**HEPA Filtration:** 99.97% particle removal.', '**Pressure Cascade:** Clean air flows outward.', '**Reduced Cross-Infection:** Improved clinical outcomes.'],
          },
        ],
      },
      { type: 'highlight', icon: '⭐', text: '**Result:** Minimized HAI risk means **significantly shortened length of stay**.' },
      { type: 'heading', text: 'Patented Energy Efficiency: Saving Millions' },
      { type: 'text', text: "WIESPL's Sterile HVAC integrates **patented energy-saving technology** (ISHRAE recognized), targeting **humidity control** and saving **millions of Rupees**." },
      {
        type: 'savings',
        title: 'Long-Term Financial Advantage',
        text: 'Lower operating expenses mean quicker ROI.',
        points: ['**Up to 60%** HVAC Energy Reduction', 'Optimized for Tropical Climates', 'Reduced Maintenance Costs'],
      },
      { type: 'heading', text: 'Modular MICU Key Features' },
      {
        type: 'cards',
        items: [
          { icon: '💻', title: 'Integrated Bed Head Unit (BHU)', desc: 'Factory-assembled units for power, gas, nurse call, and data.' },
          { icon: '🚪', title: 'Observation Access', desc: 'Flush-mounted glass partitions with automatic privacy blinds.' },
          { icon: '💡', title: 'Ambient Lighting Control', desc: 'Dimmable, glare-free LED lighting for patient comfort.' },
          { icon: '🚨', title: 'Nurse Call & Communication', desc: 'Integrated systems for instant response.' },
        ],
      },
    ],
  },
  {
    id: 'modular-nicu',
    num: '04',
    title: 'Modular NICU',
    tag: 'Neonatal',
    image: '/images/service-modular-nicu.jpeg',
    summary: 'Precision-controlled neonatal units with optimised thermal and acoustic environments.',
    blocks: [
      { type: 'subtitle', text: 'WIESPL Modular Neonatal Intensive Care Units (NICU)' },
      { type: 'text', text: '*Engineered Protection and Precision Climate Control for the Most Vulnerable Patients*' },
      { type: 'heading', text: 'The Imperative for Sterility in Neonatal Care' },
      { type: 'text', text: 'Neonates have severely underdeveloped immune systems. **The Modular NICU environment is not a luxury, but a necessity** for ensuring survival.' },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '🦠', title: 'Infection Vulnerability', desc: 'Joint-less construction eliminates 99% of bacteria-proliferation surfaces.' },
          { icon: '⏳', title: 'Accelerated Recovery', desc: 'Reducing cross-infection risk measurably **improves recovery time**.' },
          { icon: '📈', title: 'Global Compliance', desc: 'Meets ASHRAE 170, NABH, JCI guidelines for temperature, humidity, and air quality.' },
        ],
      },
      { type: 'heading', text: 'Synergy: Modular Walls & Sterile HVAC' },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            title: 'Modular Walls: The Ultimate Barrier',
            desc: 'Sealed, non-porous panels (Glass, SS 304, PPGL) with flush-mounted components.',
            points: ['**Seamless Surfaces:** Stops microbial growth.', '**Acoustic Insulation:** Protects developing nervous systems.', '**Visual Access:** Flush glass partitions.'],
          },
          {
            title: 'Sterile HVAC: The Breathing Shield',
            desc: 'Constant **positive pressure cascade** repels contaminated air.',
            points: ['**HEPA Filtration:** 99.97% particle removal.', '**Precise Climate Control:** Strict temperature/humidity.', '**Ultra-Low Velocity:** Gentle air over incubators.'],
          },
        ],
      },
      { type: 'heading', text: 'The WIESPL NICU Compliance Triangle' },
      {
        type: 'triangle',
        items: [
          { icon: '❄️', label: 'Airborne Sterility' },
          { icon: '🧼', label: 'Surface Control' },
          { icon: '🌻', label: 'Healing Environment' },
        ],
        center: 'WIESPL Integrated NICU Solution',
      },
      { type: 'heading', text: 'Designed for Neonatal Comfort & Safety' },
      { type: 'text', text: 'Our Modular NICU includes fully integrated, baby-safe accessories:' },
      {
        type: 'bullets',
        items: [
          '**Zero-Noise Bed Head Units:** Quiet, integrated power and gas outlets.',
          '**Dimmable Lighting:** Circadian rhythm-friendly for neuro-development.',
          '**Integrated Scrub Stations:** Ensuring staff hand hygiene compliance.',
          '**Acoustic Absorption:** Reduced ambient noise for infant comfort.',
        ],
      },
      { type: 'heading', text: 'Millions in Electrical Savings: The Patented Advantage' },
      { type: 'text', text: "Critical care environments are energy intensive, but WIESPL's technology changes that. Our Sterile HVAC features **ISHRAE-patented energy-saving technology** focused on humidity control optimization." },
      { type: 'savings', title: 'Millions Saved Over Time', text: 'Projected to **save the hospital in millions over the years** in electrical consumption.' },
      { type: 'text', text: '*Protecting babies and your bottom line.*' },
    ],
  },
  {
    id: 'ivf-lab',
    num: '05',
    title: 'Sterile IVF Lab',
    tag: 'ISO Class 5',
    image: '/images/service-ivf-lab.jpeg',
    summary: 'ISO Class 5 classified IVF laboratory with HEPA filtration and contamination control.',
    blocks: [
      { type: 'subtitle', text: 'The IVF Environment: Where Precision is Life' },
      {
        type: 'text',
        text: 'The IVF lab is arguably the most sensitive environment in a hospital. Embryos and gametes are extremely fragile, and their viability is directly dependent on air quality, temperature, and surface cleanliness. A single airborne contaminant can compromise a cycle.',
      },
      {
        type: 'text',
        text: 'A non-sterile environment is catastrophic. Contamination from particulates or **Volatile Organic Compounds (VOCs)** can drastically reduce IVF success rates, turning hope into disappointment.',
      },
      {
        type: 'threats',
        title: 'The Critical Threat to Success',
        sub: 'Contaminants that lower success rates:',
        items: [
          'Airborne Particulates (Dust, Skin Flakes)',
          '**Volatile Organic Compounds (VOCs)** from construction materials, cleaning agents.',
          'Fungal/Bacterial Spores',
          'Unstable Temperature/Humidity',
        ],
      },
      { type: 'heading', text: 'Integrated Design for Maximum Viability' },
      {
        type: 'cards',
        items: [
          {
            title: 'Modular Construction: Sterile Surfaces',
            desc: 'WIESPL modular walls are built from materials selected for their **ultra-low VOC emission profiles**. This eliminates the primary source of chemical toxicity that can inhibit embryonic development.',
            points: [
              'Modular panels (SS/Glass) ensure a non-porous, chemically inert surface.',
              'Flush-mounted equipment prevents dust traps and is easy to clean without strong chemicals.',
              'Non-shedding materials prevent particle contamination from the structure itself.',
            ],
          },
          {
            title: 'Sterile HVAC: Air Purity Beyond Standards',
            desc: 'Our Sterile HVAC system does more than filter; it actively purifies the air to Class I / ISO 7 standards, ensuring a stable, safe environment for incubators and workstations.',
            points: [
              '**HEPA & Chemical Filtration:** Combined HEPA and Carbon filters remove both particulates and critical VOCs.',
              '**Positive Pressure:** Maintains a constant outflow of air, repelling external contaminants.',
              '**Precision Temperature/RH:** Guarantees micro-stability critical for media and embryo culture.',
            ],
          },
        ],
      },
      { type: 'heading', text: "WIESPL's Environmental Control: The Key to Increased Efficiency" },
      {
        type: 'text',
        text: 'By eliminating known threats and stabilizing climate parameters, WIESPL directly contributes to higher embryo survival and implantation rates, making the entire IVF process more successful and cost-effective.',
      },
      { type: 'heading', text: 'Air Purification Flow' },
      {
        type: 'flow',
        items: [
          { label: 'Ambient Air', sub: 'VOCs, Particles', type: 'danger' },
          { label: 'WIESPL Sterile IVF Lab', type: 'safe' },
          { label: 'HEPA/Carbon Purified Air', type: 'pure' },
          { label: 'Contaminants Repelled', sub: 'by Positive Pressure', type: 'safe' },
        ],
      },
      { type: 'heading', text: 'Sustainable Success: Millions in Energy Savings' },
      {
        type: 'text',
        text: "Maintaining the ultra-precise climate required for IVF is energy-intensive. WIESPL's Sterile HVAC system, featuring its **patented energy-saving technology**, delivers this critical control with optimized consumption — intelligently managing humidity and cooling cycles to **save your facility millions of Rupees** over its operational lifespan.",
      },
      { type: 'savings', title: 'Millions Saved Over Time', text: 'Intelligent humidity and cooling management for long-term operational efficiency.' },
      { type: 'text', text: '*Lower operating costs means more resources dedicated to patient care and research.*' },
    ],
  },
  {
    id: 'design-consulting',
    num: '06',
    title: 'Design & Consulting',
    tag: 'Turnkey',
    image: '/images/service-design-consulting.jpeg',
    summary: 'End-to-end hospital infrastructure consulting from layout planning to staff training.',
    blocks: [
      { type: 'text', text: 'End-to-end hospital infrastructure consulting from layout planning to staff training.' },
      {
        type: 'bullets',
        items: [
          'Site assessment and detailed project specification',
          'Room topology and HMS-system-aligned engineering',
          'Manufacturing, installation & network configuration',
          'Full functional testing before handover',
          'Staff training and complete project documentation',
        ],
      },
    ],
  },
];
