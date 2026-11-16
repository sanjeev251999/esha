import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BUSINESS } from '../../config/business.config';
import { environment } from '../../../environments/environment';

export interface PageSeo {
  /** Page title (site name is appended automatically). */
  title: string;
  description: string;
  /** Image path relative to the site root, used for link previews. */
  image?: string;
  noindex?: boolean;
}

const DEFAULT_IMAGE = 'og-image.jpg';

/**
 * Sets the title, description, canonical URL, Open Graph and Twitter tags for every route
 * from the route's `data.seo`. Runs during build-time prerendering too, so the generated
 * HTML already contains the correct tags for WhatsApp / Instagram / Facebook previews.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  init(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const seo = this.deepestSeo(this.router.routerState.snapshot.root);
      const path = this.router.url.split(/[?#]/)[0];
      if (seo) this.apply(seo, path);
    });
  }

  apply(seo: PageSeo, path: string): void {
    const fullTitle = path === '/' ? `${BUSINESS.name} | ${seo.title}` : `${seo.title} | ${BUSINESS.name}`;
    const url = environment.siteUrl + (path === '/' ? '/' : path);
    const image = `${environment.siteUrl}/${seo.image ?? DEFAULT_IMAGE}`;

    this.title.setTitle(fullTitle);
    this.setName('description', seo.description);
    this.setName('robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');

    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', BUSINESS.name);
    this.setProperty('og:locale', 'en_IN');
    this.setProperty('og:title', fullTitle);
    this.setProperty('og:description', seo.description);
    this.setProperty('og:url', url);
    this.setProperty('og:image', image);
    this.setProperty('og:image:width', '1200');
    this.setProperty('og:image:height', '630');
    this.setProperty('og:image:alt', `${BUSINESS.name} – beauty salon`);

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', fullTitle);
    this.setName('twitter:description', seo.description);
    this.setName('twitter:image', image);

    this.setCanonical(url);
  }

  private deepestSeo(route: ActivatedRouteSnapshot): PageSeo | undefined {
    let seo: PageSeo | undefined;
    for (let r: ActivatedRouteSnapshot | null = route; r; r = r.firstChild) {
      seo = (r.data['seo'] as PageSeo | undefined) ?? seo;
    }
    return seo;
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
