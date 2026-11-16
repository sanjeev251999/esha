import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * All pages are prerendered to static HTML at build time (no server needed).
 * Unknown URLs are rendered in the browser and show the "Page not found" page.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'services', renderMode: RenderMode.Prerender },
  { path: 'gallery', renderMode: RenderMode.Prerender },
  { path: 'offers', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'enquire', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
