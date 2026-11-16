import { SalonService } from '../models/content.model';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES
 *  Add, remove or reorder services here. To show a price, set `price`
 *  (e.g. price: 'From ₹1,500'). Without a price the card shows "Price on enquiry".
 *  Images live in src/assets/images/services/ — replace a file with the same
 *  name, or change the `image` path below.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const SERVICES: SalonService[] = [
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    summary: 'A radiant, long-lasting bridal look designed around you, your outfit and your celebration.',
    description:
      'Your wedding look should feel like you — only more luminous. We plan your bridal makeup around your skin, your attire, your jewellery and the timings of each ceremony, so you look and feel beautiful from the first ritual to the last photograph.',
    highlights: ['Personal look consultation', 'Makeup for wedding & reception', 'Hairstyling & draping support', 'Pre-bridal care on request'],
    image: 'assets/images/services/bridal-makeup.webp',
    imageAlt: 'Bride’s hands decorated with mehndi and colourful bridal bangles',
    featured: true,
  },
  {
    id: 'party-makeup',
    name: 'Party Makeup',
    summary: 'Polished, camera-ready makeup for engagements, receptions, parties and special occasions.',
    description:
      'From soft and natural to bold and glamorous, our party makeup is tailored to the occasion, the lighting and your personal style — so you walk in feeling confident.',
    highlights: ['Engagement & reception looks', 'Festive & party glam', 'Soft natural or bold styles', 'Matching hairstyle on request'],
    image: 'assets/images/services/party-makeup.webp',
    imageAlt: 'Woman with elegant party makeup and styled hair',
    featured: true,
  },
  {
    id: 'facial',
    name: 'Facial',
    summary: 'Relaxing facials that cleanse, refresh and bring back your skin’s natural glow.',
    description:
      'Unwind while we cleanse, exfoliate and nourish your skin. Each facial is chosen to suit your skin type and needs, leaving your face feeling fresh, soft and glowing.',
    highlights: ['Cleansing & exfoliation', 'Glow & brightening facials', 'Skin-type based selection', 'Relaxing face massage'],
    image: 'assets/images/services/facial.webp',
    imageAlt: 'Woman in a spa robe applying face cream after a facial',
    featured: true,
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    summary: 'Elegant buns, braids, curls and blow-dries for weddings, parties and everyday glamour.',
    description:
      'Whether it is a traditional bridal bun with flowers, soft curls or a sleek blow-dry, our hairstyles are designed to complement your face, outfit and occasion — and to hold beautifully.',
    highlights: ['Bridal buns & braids', 'Curls, waves & blow-dry', 'Floral & accessory styling', 'Haircuts & trims'],
    image: 'assets/images/services/hair-styling.webp',
    imageAlt: 'Bridal braid decorated with small white flowers',
    featured: true,
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    summary: 'A deeply relaxing hair spa that nourishes your scalp and leaves hair soft and shiny.',
    description:
      'Our hair spa combines nourishing care with a soothing massage to help revive dull, dry or stressed hair — a perfect self-care break that leaves your hair feeling soft and healthy.',
    highlights: ['Scalp massage', 'Deep conditioning', 'Hydration for dry hair', 'Relaxing self-care ritual'],
    image: 'assets/images/services/hair-spa.webp',
    imageAlt: 'Calm spa setting with towels, stones and white flowers',
    featured: true,
  },
  {
    id: 'hair-treatments',
    name: 'Hair Treatments',
    summary: 'Targeted treatments to care for frizz, dryness, damage and overall hair health.',
    description:
      'Tell us about your hair concerns and we will suggest a treatment that suits your hair type and goals, along with simple tips to care for it at home.',
    highlights: ['Treatment consultation', 'Frizz & dryness care', 'Smoothening & conditioning', 'Aftercare guidance'],
    image: 'assets/images/services/hair-treatments.webp',
    imageAlt: 'Hair set in rollers during a salon hair treatment',
    featured: false,
  },
  {
    id: 'skin-care',
    name: 'Skin Care',
    summary: 'Gentle, personalised skin care to help your skin look healthy, clear and radiant.',
    description:
      'Healthy-looking skin starts with the right routine. We assess your skin and recommend care that helps with dullness, uneven tone and dryness, so your skin feels its best.',
    highlights: ['Skin assessment', 'Glow & hydration care', 'Pre-bridal skin preparation', 'Home-care suggestions'],
    image: 'assets/images/services/skin-care.webp',
    imageAlt: 'Woman applying a skin serum with a dropper',
    featured: true,
  },
  {
    id: 'beauty-treatments',
    name: 'Beauty Treatments',
    summary: 'Threading, waxing, bleach, clean-ups and grooming essentials — done with care.',
    description:
      'Look polished every day with our beauty essentials, carried out with attention to comfort and detail in a calm, welcoming space.',
    highlights: ['Threading & waxing', 'Clean-ups & bleach', 'De-tan care', 'Grooming essentials'],
    image: 'assets/images/services/beauty-treatments.webp',
    imageAlt: 'Woman holding a beauty serum bottle with a golden dropper',
    featured: false,
  },
  {
    id: 'salon-services',
    name: 'Other Salon Services',
    summary: 'Manicure, pedicure, nail care, mehndi and more — just ask us on WhatsApp.',
    description:
      'Looking for something not listed here? Send us a message on WhatsApp and tell us what you need — we will be happy to help.',
    highlights: ['Manicure & pedicure', 'Nail care', 'Mehndi', 'Custom requests'],
    image: 'assets/images/services/salon-services.webp',
    imageAlt: 'Beautician carefully painting nails during a manicure',
    featured: false,
  },
];

export function findService(id: string | null | undefined): SalonService | undefined {
  return id ? SERVICES.find((s) => s.id === id) : undefined;
}
