import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { RevealDirective } from '../../directives/reveal.directive';
import { EnquireLinkDirective } from '../../directives/enquire-link.directive';
import { WhatsappService } from '../../../core/services/whatsapp.service';

/** Full-width call-to-action band: "Enquire Now" + "WhatsApp". */
@Component({
  selector: 'app-cta-band',
  imports: [Icon, RevealDirective, EnquireLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta" aria-labelledby="cta-title">
      <div class="container">
        <div class="inner" appReveal>
          <div class="text">
            <p class="eyebrow light">Your moment awaits</p>
            <h2 id="cta-title">{{ title() }} <em>{{ accent() }}</em></h2>
            <p>{{ text() }}</p>
          </div>
          <div class="buttons">
            <a class="btn-esha btn-light-solid btn-lg" appEnquireLink
              >Enquire Now <app-icon name="arrow"
            /></a>
            @if (waLink) {
              <a class="btn-esha btn-wa btn-lg" [href]="waLink" target="_blank" rel="noopener"><app-icon name="whatsapp" /> WhatsApp Us</a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './cta-band.scss',
})
export class CtaBand {
  readonly title = input('Ready to look and feel');
  readonly accent = input('beautiful?');
  readonly text = input('Tell us what you are looking for and we will get back to you with availability and details.');

  protected readonly waLink = inject(WhatsappService).quickLink();
}
