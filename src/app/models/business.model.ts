export interface WorkingHours {
  /** e.g. "Monday – Saturday" */
  days: string;
  /** e.g. "10:00 AM – 8:00 PM". Leave empty until confirmed. */
  hours: string;
}

export interface BusinessAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  /**
   * WhatsApp number in international format, digits only, no "+" or spaces.
   * Example for India: "919876543210". Leave empty until the real number is known.
   */
  whatsappNumber: string;
  /** Phone number exactly as it should be displayed and dialled, e.g. "+91 98765 43210". */
  phoneNumber: string;
  email: string;
  instagramUrl: string;
  instagramHandle: string;
  address: BusinessAddress;
  /** Google Maps share link (opens the map app). */
  googleMapsUrl: string;
  /** Google Maps embed URL (Share → Embed a map → copy the src="..." value). */
  googleMapsEmbedUrl: string;
  workingHours: WorkingHours[];
  /**
   * Regular expression used to validate customer mobile numbers in the enquiry form.
   * Input is checked after removing spaces, dashes and brackets.
   */
  mobilePattern: RegExp;
  mobilePatternHint: string;
}
