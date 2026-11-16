import { BusinessConfig } from '../models/business.model';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ESHA BEAUTY PARADISE – BUSINESS DETAILS
 *  Edit this one file to update the WhatsApp number, phone, address, map and
 *  working hours everywhere on the website.
 *
 *  Empty values ('') are treated as "not configured yet": the related button or
 *  line is hidden or shows a friendly "details coming soon" note instead of
 *  showing wrong information.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const BUSINESS: BusinessConfig = {
  name: 'Esha Beauty Paradise',
  shortName: 'Esha',
  tagline: 'Where every look is crafted with care',

  // WhatsApp: country code + number, digits only. Example: '919876543210'
  whatsappNumber: '',

  // Phone number as displayed and dialled. Example: '+91 98765 43210'
  phoneNumber: '',

  email: '',

  instagramUrl: 'https://www.instagram.com/esha_beauty_paradise/',
  instagramHandle: '@esha_beauty_paradise',

  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  },

  // Google Maps → search the salon → Share → "Send a link" (copy) / "Embed a map" (copy src).
  googleMapsUrl: '',
  googleMapsEmbedUrl: '',

  workingHours: [
    { days: 'Monday – Saturday', hours: '' },
    { days: 'Sunday', hours: '' },
  ],

  // Indian mobile numbers: 10 digits starting 6–9, optional +91 / 91 / 0 prefix.
  mobilePattern: /^(?:\+?91|0)?[6-9]\d{9}$/,
  mobilePatternHint: 'Please enter a valid 10-digit mobile number.',
};
