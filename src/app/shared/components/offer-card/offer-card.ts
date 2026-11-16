import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { RevealDirective } from '../../directives/reveal.directive';
import { EnquireLinkDirective } from '../../directives/enquire-link.directive';
import { Offer } from '../../../models/content.model';

@Component({
  selector: 'app-offer-card',
  imports: [Icon, RevealDirective, EnquireLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block h-100' },
  template: `
    <article class="offer" [appReveal]="delay()">
      <div class="top">
        <span class="badge-pill"><app-icon name="sparkles" size="0.9em" /> {{ offer().badge }}</span>
        <div class="value">
          @if (offer().highlight) {
            <strong>{{ offer().highlight }}</strong>
          } @else {
            <span class="ask">Ask us for the current offer</span>
          }
        </div>
      </div>
      <h3>{{ offer().title }}</h3>
      <p>{{ offer().description }}</p>
      <ul>
        @for (item of offer().includes; track item) {
          <li><app-icon name="check" size="1em" /> {{ item }}</li>
        }
      </ul>
      @if (offer().validity || offer().terms) {
        <p class="fine">
          {{ offer().validity }}
          @if (offer().validity && offer().terms) {
            ·
          }
          {{ offer().terms }}
        </p>
      }
      <a
        class="btn-esha btn-maroon w-100 mt-auto"
        [appEnquireLink]="offer().serviceId"
        [attr.aria-label]="'Enquire now about ' + offer().title"
        >Enquire Now</a
      >
    </article>
  `,
  styleUrl: './offer-card.scss',
})
export class OfferCard {
  readonly offer = input.required<Offer>();
  readonly delay = input<string>('0s');
}
