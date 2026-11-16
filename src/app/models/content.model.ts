export interface SalonService {
  /** URL-friendly unique id, used in enquiry links (e.g. /contact?service=bridal-makeup). */
  id: string;
  name: string;
  /** One-line summary shown on cards. */
  summary: string;
  /** Longer description shown on the Services page. */
  description: string;
  /** What the service can include. Shown as a short list on the Services page. */
  highlights: string[];
  /** Path to the image inside src/assets (e.g. "assets/images/services/facial.webp"). */
  image: string;
  imageAlt: string;
  /**
   * Optional display price, e.g. "From ₹1,500". Leave undefined to show "Price on enquiry".
   */
  price?: string;
  /** Featured services are shown on the Home and Instagram landing pages. */
  featured: boolean;
}

export interface Offer {
  id: string;
  /** Small label such as "Seasonal Offer" or "Package". */
  badge: string;
  title: string;
  description: string;
  /** What the package/offer covers. */
  includes: string[];
  /**
   * Optional headline value such as "20% OFF" or "₹2,999". Leave undefined until the salon
   * confirms the real offer — the card will then say "Ask us for the current offer".
   */
  highlight?: string;
  /** Optional validity text, e.g. "Valid till 31 Dec 2026". */
  validity?: string;
  /** Optional terms, e.g. "Prior booking required". */
  terms?: string;
  /** Service id pre-selected in the enquiry form when "Enquire Now" is clicked. */
  serviceId: string;
  /** Set to false to hide the offer without deleting it. */
  active: boolean;
}

export type GalleryCategory = 'Bridal' | 'Makeup' | 'Mehandi' | 'Skin' | 'Hair' | 'Nails' | 'Tattoo';

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
}
