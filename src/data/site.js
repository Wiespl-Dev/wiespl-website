// Company-wide info used by the navbar, footer and contact page.
// Change it here once and every page updates.

export const company = {
  name: 'WIESPL',
  legalName: 'Western India Electromedical Systems Pvt. Ltd.',
  tagline:
    'Western India Electromedical Systems Pvt. Ltd. — advancing surgical excellence through innovative technology and surgeon-centric design.',
  salesEmail: 'sales@wiespl.com',
  supportEmail: 'support@wiespl.com',
  phone: '+91 84848 21469',
  phoneHref: 'tel:+918484821469',
  website: 'https://wiespl.com',
  hours: 'Mon–Sat · 09:30–17:30 IST',
  address: [
    'Western India Electromedical Systems Pvt. Ltd.',
    'Sct. No. 4, Plot No. 14, Narasimha Colony,',
    'Tathawade, Near Balaji Law College,',
    'Aundh-Rawet BRTS Road, Chinchwad,',
    'Pune, Maharashtra — 411033',
  ],
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5605897654321!2d73.7412345!3d18.5934567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM1JzM2LjQiTiA3M8KwNDQnMjguNCJF!5e0!3m2!1sen!2sin!4v1697000000000!5m2!1sen!2sin',
};

export const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/digital-or', label: 'Digital OR' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export const footerColumns = [
  {
    title: 'Products',
    links: [
      { to: '/digital-or', label: 'Digital OR' },
      { to: '/services', label: 'Modular OT' },
      { to: '/services', label: 'Modular ICU' },
      { to: '/services', label: 'Modular NICU' },
      { to: '/services', label: 'IVF Lab' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/services', label: 'Services' },
      { to: '/digital-or', label: 'Digital OR' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

export const stats = [
  { value: 411, label: 'Turnkey Projects' },
  { value: 400, suffix: '+', label: 'Happy Clients' },
  { value: 2, label: 'Patents' },
  { value: 24, label: 'Years' },
];
