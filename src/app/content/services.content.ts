import { SalonService } from '../models/content.model';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES  (same order as the salon signboard)
 *  Add, remove or reorder services here. To show a price, set `price`
 *  (e.g. price: 'From ₹1,500'). Without a price the card shows "Price on enquiry".
 *  Images live in src/assets/media/services/ — replace a file with the same
 *  name, or change the `image` path below.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const SERVICES: SalonService[] = [
  {
    id: 'laser-treatment',
    name: 'Laser Treatment',
    summary: 'Advanced laser care for smoother, clearer-looking skin — planned after a personal consultation.',
    description:
      'Laser treatments can help with concerns such as unwanted hair and uneven-looking skin. Every treatment begins with a consultation so we can understand your skin and recommend whether laser is right for you, how many sessions may be needed and how to care for your skin afterwards.',
    highlights: ['Personal skin consultation', 'Laser hair reduction', 'Skin-focused laser care', 'Aftercare guidance'],
    image: 'assets/media/services/laser-treatment.webp',
    imageAlt: 'Client lying back during a professional face and skin treatment',
    featured: true,
  },
  {
    id: 'body-contouring',
    name: 'Body Contouring & Slimming',
    summary: 'Non-surgical body contouring and slimming sessions tailored to your goals.',
    description:
      'Tell us about the areas you would like to work on and we will suggest a contouring and slimming plan that suits you, along with simple lifestyle tips to support your results.',
    highlights: ['Goal-based consultation', 'Non-surgical sessions', 'Targeted body areas', 'Progress check-ins'],
    image: 'assets/media/services/body-contouring.webp',
    imageAlt: 'Slim, toned waistline – body contouring and slimming',
    featured: false,
  },
  {
    id: 'skin-treatments',
    name: 'Skin Treatments',
    summary: 'Facials and skin treatments for a fresh, healthy and glowing complexion.',
    description:
      'From deep-cleansing facials to glow and hydration treatments, we assess your skin and recommend care for concerns like dullness, uneven tone, tanning and dryness — so your skin looks and feels its best.',
    highlights: ['Skin assessment', 'Facials & clean-ups', 'Glow & hydration care', 'De-tan & brightening'],
    image: 'assets/media/services/skin-treatments.webp',
    imageAlt: 'Woman in a spa robe applying face cream after a facial',
    featured: true,
  },
  {
    id: 'hair-treatments',
    name: 'Hair Treatments',
    summary: 'Hair fall & hair loss treatment and scalp care for healthier, fuller-looking hair.',
    description:
      'Worried about hair fall, thinning or a dry, itchy scalp? We assess your hair and scalp and recommend a hair loss and scalp treatment plan that suits you.',
    highlights: ['Hair fall & hair loss treatment', 'Scalp care'],
    image: 'assets/media/services/hair-treatments.webp',
    imageAlt: 'Close-up of thinning hair on the crown – hair loss treatment',
    featured: true,
  },
  {
    id: 'mehandi',
    name: 'Mehandi',
    summary: 'Intricate bridal and festive mehandi designs for your special occasions.',
    description:
      'From detailed bridal mehandi to simple and elegant designs for festivals, engagements and parties — share your preferred style and we will create a design you love.',
    highlights: ['Bridal mehandi', 'Arabic & traditional designs', 'Festive & party mehandi', 'Designs for guests'],
    image: 'assets/media/services/mehandi.webp',
    imageAlt: 'Intricate mehandi design being applied with a henna cone',
    featured: true,
  },
  {
    id: 'botox-fillers',
    name: 'Botox & Fillers',
    summary: 'Aesthetic injectables for a refreshed, natural look — only after a detailed consultation.',
    description:
      'Botox and dermal fillers can soften the look of lines and restore volume for a refreshed appearance. We discuss your goals, suitability, the procedure and aftercare in detail before any treatment is planned.',
    highlights: ['Detailed consultation', 'Natural-looking approach', 'Line softening', 'Volume & contour care'],
    image: 'assets/media/services/botox-fillers.webp',
    imageAlt: 'Close-up of smooth, glowing skin after a skin treatment',
    featured: false,
  },
  {
    id: 'microblading',
    name: 'Microblading',
    summary: 'Semi-permanent, natural-looking brows shaped to suit your face.',
    description:
      'Microblading creates fine, hair-like strokes for fuller, defined brows that save you time every day. We map the brow shape to your face and choose a shade that matches your natural colouring.',
    highlights: ['Brow shape mapping', 'Natural hair-like strokes', 'Shade matching', 'Touch-up sessions'],
    image: 'assets/media/services/microblading.webp',
    imageAlt: 'Close-up of full, well-defined eyebrows',
    featured: true,
  },
  {
    id: 'tattoo',
    name: 'Tattoo',
    summary: 'Custom tattoo designs — from fine-line minimal art to meaningful statement pieces.',
    description:
      'Bring your idea or choose from our designs. We help you finalise the size, placement and style, and guide you on aftercare so your tattoo heals beautifully.',
    highlights: ['Custom designs', 'Fine-line & minimal tattoos', 'Name & symbol tattoos', 'Aftercare guidance'],
    image: 'assets/media/services/tattoo.webp',
    imageAlt: 'Tattoo artist tattooing fine script lettering on an arm',
    featured: false,
  },
  {
    id: 'all-makeups',
    name: 'All Makeups',
    summary: 'Bridal, reception, party and HD makeup — a flawless look for every occasion.',
    description:
      'Your look should feel like you — only more radiant. From complete bridal makeup to engagement, reception and party looks, we design your makeup around your skin, outfit, jewellery and the occasion, with matching hairstyling and saree draping on request.',
    highlights: ['Bridal & reception makeup', 'Engagement & party makeup', 'HD makeup', 'Hairstyling & draping'],
    image: 'assets/media/services/all-makeups.webp',
    imageAlt: 'Makeup artist applying lipstick to a client with glam eye makeup',
    featured: true,
  },
];

export function findService(id: string | null | undefined): SalonService | undefined {
  return id ? SERVICES.find((s) => s.id === id) : undefined;
}
