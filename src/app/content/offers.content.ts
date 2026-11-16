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
    description: 'A thoughtfully planned bridal experience covering your wedding-day look and the care that comes before it.',
    includes: ['Bridal makeup', 'Bridal hairstyle', 'Pre-bridal facial & skin care', 'Look consultation'],
    serviceId: 'bridal-makeup',
    active: true,
  },
  {
    id: 'festive-glow',
    badge: 'Seasonal Offer',
    title: 'Festive Season Glow',
    description: 'Get celebration-ready for the festive season with a refreshing glow treatment and a polished look.',
    includes: ['Glow facial', 'Party makeup', 'Hair styling'],
    serviceId: 'facial',
    active: true,
  },
  {
    id: 'party-ready',
    badge: 'Special Package',
    title: 'Party Ready Package',
    description: 'Makeup and hair styled together for engagements, receptions, birthdays and every special night out.',
    includes: ['Party makeup', 'Hair styling', 'Quick skin prep'],
    serviceId: 'party-makeup',
    active: true,
  },
  {
    id: 'hair-care',
    badge: 'Self-Care',
    title: 'Hair Spa & Care Ritual',
    description: 'Give your hair a nourishing break with a relaxing hair spa paired with a treatment suited to your hair.',
    includes: ['Hair spa', 'Hair treatment consultation', 'Blow-dry finish'],
    serviceId: 'hair-spa',
    active: true,
  },
];

export const ACTIVE_OFFERS = OFFERS.filter((o) => o.active);
