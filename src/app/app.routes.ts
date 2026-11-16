import { Routes } from '@angular/router';
import { PageSeo } from './core/services/seo.service';

const seo = (s: PageSeo) => ({ seo: s });

/**
 * Every page is lazy-loaded and prerendered to static HTML at build time.
 * `layout: 'landing'` switches the header/footer to the minimal advertisement layout.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: seo({
      title: 'Bridal Makeup, Hair & Skin Care Salon',
      description:
        'Esha Beauty Paradise – beauty salon for bridal makeup, party makeup, hair styling, hair spa, facials and skin care. Enquire on WhatsApp in under a minute.',
    }),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    data: seo({
      title: 'About Us',
      description: 'Get to know Esha Beauty Paradise – our mission, our commitment to customer satisfaction and the beauty services we offer.',
    }),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    data: seo({
      title: 'Services – Bridal Makeup, Facials, Hair Spa & More',
      description:
        'Bridal makeup, party makeup, facials, hair styling, hair spa, hair treatments, skin care and beauty treatments at Esha Beauty Paradise. Enquire on WhatsApp.',
    }),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
    data: seo({
      title: 'Gallery',
      description: 'Browse bridal looks, makeup, hair and skin care moments from Esha Beauty Paradise.',
    }),
  },
  {
    path: 'offers',
    loadComponent: () => import('./pages/offers/offers').then((m) => m.Offers),
    data: seo({
      title: 'Special Offers & Beauty Packages',
      description: 'Seasonal offers, bridal packages and self-care packages at Esha Beauty Paradise. Message us on WhatsApp for current offers.',
    }),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    data: seo({
      title: 'Contact & Enquiry',
      description: 'Send an enquiry to Esha Beauty Paradise on WhatsApp, find our contact details, location and working hours.',
    }),
  },
  {
    // Instagram / Facebook advertisement landing page
    path: 'enquire',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
    data: {
      layout: 'landing',
      ...seo({
        title: 'Book Your Beauty Appointment',
        description:
          'Bridal & party makeup, hair styling, hair spa, facials and skin care at Esha Beauty Paradise. Tap to enquire on WhatsApp.',
      }),
    },
  },
  // Friendly aliases for advertisement links
  { path: 'book', redirectTo: 'enquire' },
  { path: 'offer', redirectTo: 'enquire' },
  { path: 'instagram', redirectTo: 'enquire' },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    data: seo({ title: 'Page Not Found', description: 'The page you are looking for could not be found.', noindex: true }),
  },
];
