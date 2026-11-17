import { BusinessConfig } from '../models/business.model';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ESHA AESTHETIC CENTRE – BUSINESS DETAILS
 *  Edit this one file to update the WhatsApp number, phone, address, map and
 *  working hours everywhere on the website.
 *
 *  Empty values ('') are treated as "not configured yet": the related button or
 *  line is hidden or shows a friendly "details coming soon" note instead of
 *  showing wrong information.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const BUSINESS: BusinessConfig = {
  name: 'Esha Aesthetic Centre',
  shortName: 'Esha',
  tagline: 'Beauty | Skin | Hair | Body',

  // WhatsApp: country code + number, digits only. Example: '919876543210'
  whatsappNumber: '918248474624',

  // Phone number as displayed and dialled. Example: '+91 98765 43210'
  phoneNumber: '+91 82484 74624',

  email: '',

  instagramUrl: 'https://www.instagram.com/esha_aesthetic_centre/',
  instagramHandle: '@esha_aesthetic_centre',

  address: {
    line1: '201-C, Chidhambara Nagar, P.W.D Office Road',
    line2: 'Near D.V.D School Bus Stop, Kottar Post, near SLB School Road',
    city: 'Nagercoil',
    state: 'Tamil Nadu',
    pincode: '629001',
    country: 'India',
  },

  // Google Maps → search the salon → Share → "Send a link" (copy) / "Embed a map" (copy src).
  // Currently an address search; replace with the exact Google Maps share/embed links for a precise pin.
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Esha%20Beauty%20Paradise%20%26%20Tattoo%20Academy%2C%20201-C%20Chidhambara%20Nagar%2C%20PWD%20Office%20Road%2C%20Kottar%2C%20Nagercoil%20629001',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sEsha+Beauty+Paradise+%26+Tattoo+Academy,+201-C+Chidhambara+Nagar,+PWD+Office+Road,+Kottar,+Nagercoil+629001',

  workingHours: [
    { days: 'Monday – Sunday', hours: '9:00 AM – 9:00 PM' },
  ],

  // Indian mobile numbers: 10 digits starting 6–9, optional +91 / 91 / 0 prefix.
  mobilePattern: /^(?:\+?91|0)?[6-9]\d{9}$/,
  mobilePatternHint: 'Please enter a valid 10-digit mobile number.',

  // Record every enquiry in a Google Sheet (+ email alert). Paste the Apps Script web-app URL
  // here (see scripts/google-sheet-leads.gs). Empty = off: the form only opens WhatsApp.
  leadCaptureUrl: '',
  leadCaptureMode: 'save-and-whatsapp',
};
