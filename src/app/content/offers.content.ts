import { Offer } from '../models/content.model';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SPECIAL OFFERS & PACKAGES
 *  No discounts or prices are shown until you add them. To publish a real
 *  offer, fill in `highlight` (e.g. '20% OFF' or '₹2,999'), optionally
 *  `validity` and `terms`. Set `active: false` to hide an offer.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const OFFERS: Offer[] = [
  {
    id: 'bridal-package',
    badge: 'Bridal Package',
    title: 'Complete Bridal Beauty',
    description: 'Everything for your big day — from pre-bridal skin care to your wedding-day look and mehandi.',
    includes: ['Bridal makeup & hairstyling', 'Bridal mehandi', 'Pre-bridal skin treatment', 'Nail art'],
    serviceId: 'all-makeups',
    active: true,
  },
  {
    id: 'festive-glow',
    badge: 'Seasonal Offer',
    title: 'Festive Skin Glow',
    description: 'Get celebration-ready with a glow-focused skin treatment and a polished party look.',
    includes: ['Glow skin treatment', 'Party makeup', 'Festive mehandi'],
    serviceId: 'skin-treatments',
    active: true,
  },
  {
    id: 'brows-nails',
    badge: 'Special Package',
    title: 'Brows & Nails Makeover',
    description: 'Defined brows and beautiful nails — low-maintenance polish that lasts.',
    includes: ['Microblading consultation', 'Manicure & nail art', 'Brow shaping'],
    serviceId: 'microblading',
    active: true,
  },
  {
    id: 'laser-skin',
    badge: 'Consultation',
    title: 'Laser & Skin Consultation',
    description: 'Not sure which treatment is right for you? Start with a personal consultation and a tailored plan.',
    includes: ['Skin & hair assessment', 'Laser suitability check', 'Personalised treatment plan'],
    serviceId: 'laser-treatment',
    active: true,
  },
];

export const ACTIVE_OFFERS = OFFERS.filter((o) => o.active);
