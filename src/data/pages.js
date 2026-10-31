import { img } from '../utils/img';

// Text and image content for the Home, About, Digital OR and Services pages.

export const whyWiespl = [
  {
    icon: 'shield',
    title: 'Proprietary Technology',
    body: '2 WIESPL Patents. Proprietary Digital OR software engineered entirely in-house — not licensed or white-labelled. Complete ownership of our technology stack means greater flexibility, faster innovation, seamless customization and long-term reliability.',
    stat: '2',
    statLabel: 'Patents · 100% In-House',
  },
  {
    icon: 'award',
    title: '24 Years Experience',
    body: 'Over two decades building surgical environments. 411 turnkey projects completed across India.',
    stat: '411',
    statLabel: 'Projects Delivered',
  },
  {
    icon: 'network',
    title: 'End-to-End Delivery',
    body: 'Design, manufacturing, installation, commissioning, and support — all from WIESPL. No handoffs.',
    stat: '1',
    statLabel: 'Accountable Partner',
  },
  {
    icon: 'hands',
    title: 'Surgeon-Led Design',
    body: 'Every interface shaped by direct surgeon input. We design for the person holding the scalpel.',
    stat: '400+',
    statLabel: 'Hospitals Trust Us',
  },
];

export const capabilities = [
  'Digital OR',
  'Modular OT',
  'Modular ICU',
  'Modular NICU',
  'Sterile IVF Lab',
  '4K Surgical Video',
  'DICOM Imaging',
  'Laminar Airflow',
  'HEPA Filtration',
  'CSSD Analytics',
];

export const aboutPillars = [
  {
    tag: 'Our Mission',
    title: 'Surgeon-First Design',
    body: 'We treat surgeon comfort as a clinical necessity. Every product we build reduces fatigue, increases precision, and extends surgical career longevity.',
  },
  {
    tag: 'Our Scale',
    title: '411 Projects & Counting',
    body: 'Over 411 turnkey OR projects completed. 2 registered patents. 24 years of innovation with 400+ satisfied hospital clients across India.',
  },
  {
    tag: 'Our Technology',
    title: 'Built Entirely In-House',
    body: 'Proprietary Digital OR software and 2 registered patents — engineered, manufactured and supported by WIESPL, never licensed or white-labelled.',
  },
];

export const coreValues = [
  { tag: '✦ Innovate', title: 'Innovation', body: 'Proprietary technology and in-house R&D drive our digital OR solutions.' },
  { tag: '◈ Certified', title: 'Quality', body: 'ISO-compliant manufacturing with rigorous testing for every component.' },
  { tag: '⛨ Accountable', title: 'Integrity', body: 'End-to-end accountability from design to commissioning. No handoffs.' },
  { tag: '✚ Surgeon First', title: 'Surgeon-Centric', body: 'Every interface is shaped by direct surgeon feedback and clinical workflows.' },
];

export const eventPhotos = [
  { src: img('expo-mumbai-1.jpg'), alt: 'Digital OR discussion', caption: 'Discussing the Digital OR ecosystem with delegates on the expo floor.' },
  { src: img('expo-mumbai-2.jpg'), alt: 'Team engaging visitors', caption: 'Our team walking visiting partners through the platform live.' },
  { src: img('expo-mumbai-3.jpg'), alt: 'WIESPL booth', caption: 'The WIESPL Digital OR booth at the Mumbai expo.', wide: true },
];

export const director = {
  name: 'Sudhir Dnyaneshwar Pimpale',
  role: 'Director',
  photo: img('director.jpg'),
  bio: "Founder and Managing Director of WIESPL, inventor of the BGM air purifier — a President's Award-winning technology that neutralizes airborne bacteria and viruses in real time. Under his leadership, WIESPL has become synonymous with infection control.",
  points: [
    {
      title: 'HAI expert with 24 yrs of expertise',
      sub: 'Expertise in preventing Hospital-Acquired Infections (HAIs) through advanced technologies, intelligent environmental controls, and evidence-based infection prevention practices.',
    },
    {
      title: 'Designing Critical Spaces for Hospitals',
      sub: 'OT Complex, ICUs, patient flow, air flow and prevention of airborne contamination by design.',
    },
  ],
};

export const digitalOrPillars = [
  {
    img: img('surgeon-entrance.jpg'),
    title: 'Ergonomic Design Excellence',
    body: 'Surgical layouts, lighting controls, and interfaces engineered to reduce cognitive load and physical fatigue.',
  },
  {
    img: img('esp-control-panel.jpg'),
    title: 'Environmental Control',
    body: 'ESP32 sensor arrays with real-time monitoring of pressure, temperature, humidity, and HEPA faults.',
  },
  {
    img: img('digital-integration.jpg'),
    title: 'Seamless Digital Integration',
    body: '4K surgical video, DICOM imaging, patient info, inventory, and sterile compliance — unified in one touch interface.',
  },
];

export const digitalOrModules = [
  {
    tag: 'Module A',
    img: img('surgeon-entrance.jpg'),
    title: 'Surgeon Control Panel',
    body: 'Direct touch interface for real-time OT management with live ESP32 sensor data and automated HEPA fault alerting.',
    pills: ['ESP32', 'Real-time', 'Touch UI'],
  },
  {
    tag: 'Module B',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    title: '4K Live Surgical Visuals',
    body: 'Monitors up to 4 simultaneous surgical video inputs with 4K recording and instant screenshot capture.',
    pills: ['4K', '4 Feeds', 'HMS Linked'],
  },
  {
    tag: 'Module C',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
    title: 'DICOM Medical Imaging',
    body: 'Full-featured DICOM viewer with quad-viewport MPR, 3D volume rendering, and pinch-to-zoom up to 8×.',
    pills: ['CT/MRI/XA', '3D MPR', '8× Zoom'],
  },
  {
    tag: 'Module D',
    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80',
    title: 'Patient Information System',
    body: 'Complete patient profiles at point of care with unified medical report viewer and downloadable files.',
    pills: ['MRD Profiles', 'Reports', 'HMS Sync'],
  },
  {
    tag: 'Module E',
    img: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&q=80',
    title: 'Sterile Cleanliness Protocol',
    body: '11-step digital audit checklist with camera integration for tamper-evident compliance documentation.',
    pills: ['11-Step', 'Photo Evidence', 'Compliance'],
  },
  {
    tag: 'Module F',
    img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    title: 'Store & CSSD Analytics',
    body: 'Live OT inventory dashboard with one-tap ordering and CSSD analytics suite with Scatter, Radar, and Line charts.',
    pills: ['Live Inventory', 'One-Tap Order', 'Analytics'],
  },
];

export const videoConferencing = [
  { title: 'Secure Peer-to-Peer Video', sub: 'WebRTC-based signaling with STUN/TURN fallback for reliable connections on hospital networks.' },
  { title: 'Tablet & Console Access', sub: 'Join a call from the surgeon control panel or a handheld tablet without leaving the sterile field.' },
  { title: 'Remote Consultation Ready', sub: 'Bring in specialists for second opinions or training observation in real time, from anywhere.' },
];

export const beforeAfterSpaces = [
  {
    id: 'ot',
    label: 'Modular OT',
    before: img('ba-before-ot.jpg'),
    after: img('service-modular-ot.jpeg'),
    hotspots: [
      { top: 25, left: 60, title: 'Control Panel', text: 'ESP32-based touch panel' },
      { top: 18, left: 35, title: 'Surgical Lighting', text: 'LED shadowless OT light' },
      { top: 55, left: 75, title: 'Laminar Airflow Diffuser', text: 'HEPA-filtered ceiling unit' },
      { top: 65, left: 20, title: 'Modular Wall Panels', text: 'Antimicrobial cleanroom system' },
    ],
  },
  {
    id: 'icu',
    label: 'Modular ICU',
    // TODO: the old site reused the OT photos here — swap in real ICU before/after photos.
    before: img('ba-before-ot.jpg'),
    after: img('service-modular-ot.jpeg'),
    hotspots: [
      { top: 30, left: 55, title: 'Patient Monitor', text: 'Multi-parameter vitals tracking' },
      { top: 48, left: 25, title: 'Bedhead Trolley', text: 'Gas outlets & nurse call' },
      { top: 70, left: 68, title: 'HEPA Filtration Unit', text: 'Airflow management' },
    ],
  },
  {
    id: 'ivf',
    label: 'Sterile IVF Lab',
    // TODO: the old site reused the OT photos here — swap in real IVF lab before/after photos.
    before: img('ba-before-ot.jpg'),
    after: img('service-modular-ot.jpeg'),
    hotspots: [
      { top: 22, left: 50, title: 'Laminar Flow Workstation', text: 'ISO Class 5 embryo handling' },
      { top: 50, left: 30, title: 'Incubator Bank', text: 'Tri-gas culture incubators' },
      { top: 62, left: 78, title: 'VOC/Particle Sensor', text: 'Air quality monitoring' },
    ],
  },
];

export const processSteps = [
  { phase: 'Phase 1', title: 'Site Assessment & Consultation', body: 'Engineering team visits your facility for comprehensive site assessment and detailed project specification.' },
  { phase: 'Phase 2', title: 'Design & Engineering', body: 'Modular OT panels, sensor arrays, and software configured to your HMS system and room topology.' },
  { phase: 'Phase 3', title: 'Manufacturing & Build', body: 'WIESPL fabricates modular panels, assembles ESP32 units, and integrates PLC relay systems.' },
  { phase: 'Phase 4', title: 'Installation & Deployment', body: 'On-site installation, sensor binding, network configuration, and full software deployment.' },
  { phase: 'Phase 5', title: 'Commissioning & Training', body: 'Full functional testing and staff training. Handover with complete documentation.' },
];
