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
      title: 'Beauty, Skin, Hair & Body Clinic in Nagercoil',
      description:
        'Esha Aesthetic Centre, Nagercoil – laser treatment, skin & hair treatments, body contouring, Botox & fillers, microblading, tattoo and bridal makeup. Enquire on WhatsApp.',
    }),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    data: seo({
      title: 'About Us',
      description: 'Get to know Esha Aesthetic Centre, Nagercoil – our mission, our commitment to customer satisfaction and the beauty, skin, hair and body services we offer.',
    }),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    data: seo({
      title: 'Services – Laser, Skin, Hair, Makeup, Microblading & More',
      description:
        'Laser treatment, body contouring & slimming, skin and hair treatments, Botox & fillers, microblading, tattoo and all makeups at Esha Aesthetic Centre, Nagercoil.',
    }),
  },
  {
    path: 'offers',
    loadComponent: () => import('./pages/offers/offers').then((m) => m.Offers),
    data: seo({
      title: 'Special Offers & Beauty Packages',
      description: 'Seasonal offers, bridal packages and treatment packages at Esha Aesthetic Centre, Nagercoil. Message us on WhatsApp for current offers.',
    }),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    data: seo({
      title: 'Contact & Enquiry',
      description: 'Contact Esha Aesthetic Centre, PWD Office Road, Kottar, Nagercoil. Call or WhatsApp +91 82484 74624. Open 9 AM – 9 PM.',
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
          'Laser, skin, hair & body treatments, microblading, tattoo and bridal makeup at Esha Aesthetic Centre, Nagercoil. Tap to enquire on WhatsApp.',
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
