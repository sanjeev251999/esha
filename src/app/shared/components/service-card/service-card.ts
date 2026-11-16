import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { RevealDirective } from '../../directives/reveal.directive';
import { EnquireLinkDirective } from '../../directives/enquire-link.directive';
import { SalonService } from '../../../models/content.model';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink, Icon, RevealDirective, EnquireLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block h-100' },
  template: `
    <article class="service-card" [appReveal]="delay()">
      <div class="media">
        <img [src]="service().image" [alt]="service().imageAlt" width="800" height="600" loading="lazy" decoding="async" />
        <span class="price">{{ service().price ?? 'Price on enquiry' }}</span>
      </div>
      <div class="body">
        <h3>{{ service().name }}</h3>
        <p>{{ service().summary }}</p>
        <div class="actions">
          <a
            class="btn-esha btn-maroon btn-sm"
            [appEnquireLink]="service().id"
            [attr.aria-label]="'Enquire now about ' + service().name"
            >Enquire Now</a
          >
          @if (showDetails()) {
            <a class="btn-link-maroon" routerLink="/services" [fragment]="service().id" [attr.aria-label]="'More about ' + service().name"
              >Details <app-icon name="arrow" size="0.95em"
            /></a>
          }
        </div>
      </div>
    </article>
  `,
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  readonly service = input.required<SalonService>();
  readonly delay = input<string>('0s');
  readonly showDetails = input<boolean>(true);
}
