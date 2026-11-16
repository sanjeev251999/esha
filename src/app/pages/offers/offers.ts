import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../../shared/components/icon/icon';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { OfferCard } from '../../shared/components/offer-card/offer-card';
import { CtaBand } from '../../shared/components/cta-band/cta-band';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ACTIVE_OFFERS } from '../../content/offers.content';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { BUSINESS } from '../../config/business.config';

@Component({
  selector: 'app-offers',
  imports: [Icon, PageHero, OfferCard, CtaBand, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      crumb="Offers"
      eyebrow="Special Offers"
      title="Seasonal offers &amp;"
      accent="beauty packages"
      intro="Curated packages for brides, celebrations and self-care. Offers change through the year — message us for what is available now."
    />

    <section class="pb-2" aria-label="Current offer">
      <div class="container">
        <div class="promo" appReveal>
          <img src="assets/images/offers/offers-banner.webp" alt="" width="960" height="641" loading="lazy" decoding="async" />
          <div class="promo-body">
            <span class="tag"><app-icon name="gift" /> This month at Esha</span>
            <h2>Ask about this month's <em>special offer</em></h2>
            <p>New offers are announced on Instagram and WhatsApp. Send us a message to know the latest offer before you book.</p>
            <div class="d-flex flex-wrap gap-2">
              @if (waLink) {
                <a class="btn-esha btn-wa" [href]="waLink" target="_blank" rel="noopener"><app-icon name="whatsapp" /> Ask on WhatsApp</a>
              }
              <a class="btn-esha btn-light-solid" [href]="b.instagramUrl" target="_blank" rel="noopener"><app-icon name="instagram" /> See on Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-label="Packages">
      <div class="container">
        <div class="row g-4">
          @for (o of offers; track o.id; let i = $index) {
            <div class="col-md-6 col-xl-3">
              <app-offer-card [offer]="o" [delay]="(i % 4) * 80 + 'ms'" />
            </div>
          }
        </div>
        <p class="note">Offers and packages are subject to availability. Please confirm details on WhatsApp before booking.</p>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: `
    @use 'tokens' as *;
    .promo { position: relative; border-radius: $radius-lg; overflow: hidden; isolation: isolate; box-shadow: $shadow-lift; }
    .promo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
    .promo::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(110deg, rgba(90, 21, 32,0.95) 0%, rgba(125, 31, 44,0.85) 55%, rgba(176, 138, 62,0.35) 100%); }
    .promo-body { padding: clamp(2rem, 6vw, 4rem); max-width: 640px; color: #fff; }
    .promo-body h2 { color: #fff; font-size: clamp(2rem, 4.5vw, 3rem); margin: 1rem 0 0.8rem; }
    .promo-body h2 em { color: #f1dca5; }
    .promo-body p { color: rgba(255,255,255,0.88); margin-bottom: 1.5rem; }
    .tag { display: inline-flex; gap: 0.45rem; align-items: center; padding: 0.4rem 0.9rem; border-radius: 999px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; }
    .btn-light-solid { background: #fff; color: $maroon; }
    .btn-light-solid:hover { color: $maroon-ink; background: $champagne-soft; }
    .note { text-align: center; font-size: 0.85rem; color: $ink-soft; margin: 2rem 0 0; }
  `,
})
export class Offers {
  protected readonly offers = ACTIVE_OFFERS;
  protected readonly b = BUSINESS;
  protected readonly waLink = inject(WhatsappService).link(`Hello ${BUSINESS.name}! Could you please share this month's special offers?`);
}
