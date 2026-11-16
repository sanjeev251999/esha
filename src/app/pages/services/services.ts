import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { CtaBand } from '../../shared/components/cta-band/cta-band';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { EnquireLinkDirective } from '../../shared/directives/enquire-link.directive';
import { SERVICES } from '../../content/services.content';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink, Icon, PageHero, CtaBand, RevealDirective, EnquireLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      crumb="Services"
      eyebrow="Our Services"
      title="Beauty services for"
      accent="every you"
      intro="Makeup, hair and skin care tailored to you. Choose a service and enquire on WhatsApp for availability and pricing."
    >
      <nav class="jump rise" style="--rise-delay: 0.3s" aria-label="Jump to a service">
        @for (s of services; track s.id) {
          <a routerLink="/services" [fragment]="s.id">{{ s.name }}</a>
        }
      </nav>
    </app-page-hero>

    <section class="section pt-4" aria-label="Service list">
      <div class="container">
        @for (s of services; track s.id; let i = $index; let odd = $odd) {
          <article class="svc" [id]="s.id" [class.flip]="odd" appReveal [attr.aria-labelledby]="s.id + '-title'">
            <div class="svc-media arch-frame">
              <img [src]="s.image" [alt]="s.imageAlt" width="800" height="600" [attr.loading]="i < 1 ? 'eager' : 'lazy'" decoding="async" />
            </div>
            <div class="svc-body">
              <span class="num">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <h2 [id]="s.id + '-title'">{{ s.name }}</h2>
              <p class="lead-text">{{ s.description }}</p>
              <ul>
                @for (h of s.highlights; track h) {
                  <li><app-icon name="check" /> {{ h }}</li>
                }
              </ul>
              <p class="price"><span>Price</span> {{ s.price ?? 'On enquiry' }}</p>
              <div class="d-flex flex-wrap gap-2">
                <a
                  class="btn-esha btn-rose"
                  [appEnquireLink]="s.id"
                  [attr.aria-label]="'Enquire now about ' + s.name"
                  >Enquire Now <app-icon name="arrow"
                /></a>
                @if (wa.quickLink(s.name); as link) {
                  <a class="btn-esha btn-outline-rose" [href]="link" target="_blank" rel="noopener" [attr.aria-label]="'Ask about ' + s.name + ' on WhatsApp'"
                    ><app-icon name="whatsapp" /> Ask on WhatsApp</a
                  >
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>

    <app-cta-band title="Not sure what you need?" accent="Just ask." text="Tell us the occasion and we will suggest the right service for you." />
  `,
  styles: `
    @use 'tokens' as *;
    .jump { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; }
    .jump a { padding: 0.45rem 1rem; border-radius: 999px; border: 1px solid $line; background: rgba(255,255,255,0.75); color: $ink; text-decoration: none; font-size: 0.85rem; min-height: 40px; display: inline-flex; align-items: center; }
    .jump a:hover { border-color: $rose; color: $rose-deep; }
    .svc { display: grid; gap: 2rem; align-items: center; padding-block: clamp(2rem, 5vw, 3.5rem); border-bottom: 1px solid $line; scroll-margin-top: calc(var(--esha-header-h) + 1rem); }
    .svc:last-child { border-bottom: 0; }
    @include up($bp-lg) {
      .svc { grid-template-columns: 1fr 1.1fr; gap: 4rem; }
      .svc.flip .svc-media { order: 2; }
    }
    .svc-media { aspect-ratio: 4 / 3.4; box-shadow: $shadow-lift; }
    .svc-media img { width: 100%; height: 100%; object-fit: cover; }
    .num { font-family: $font-display; font-size: 1.1rem; color: $rose; letter-spacing: 0.2em; }
    .svc-body h2 { font-size: clamp(2rem, 4vw, 2.75rem); margin: 0.25rem 0 0.8rem; }
    .svc-body ul { list-style: none; padding: 0; display: grid; gap: 0.5rem; margin: 1.25rem 0; }
    @include up($bp-sm) { .svc-body ul { grid-template-columns: 1fr 1fr; } }
    .svc-body li { display: flex; gap: 0.5rem; align-items: center; font-size: 0.95rem; }
    .svc-body li app-icon { color: $rose; }
    .price { display: inline-flex; gap: 0.6rem; align-items: baseline; font-family: $font-display; font-size: 1.35rem; color: $rose-deep; margin-bottom: 1.25rem; }
    .price span { font-family: $font-body; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: $ink-soft; }
  `,
})
export class Services {
  protected readonly services = SERVICES;
  protected readonly wa = inject(WhatsappService);
}
