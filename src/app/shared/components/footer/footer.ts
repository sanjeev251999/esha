import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { Logo } from '../logo/logo';
import { EnquireLinkDirective } from '../../directives/enquire-link.directive';
import { BUSINESS } from '../../../config/business.config';
import { SERVICES } from '../../../content/services.content';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon, Logo, EnquireLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  /** 'landing' renders a compact footer for advertisement landing pages. */
  readonly mode = input<'full' | 'landing'>('full');

  protected readonly b = BUSINESS;
  protected readonly services = SERVICES.slice(0, 6);
  protected readonly year = new Date().getFullYear();
  protected readonly waLink = inject(WhatsappService).quickLink();
  protected readonly telLink = BUSINESS.phoneNumber ? `tel:${BUSINESS.phoneNumber.replace(/[^\d+]/g, '')}` : null;
  protected readonly address = [BUSINESS.address.line1, BUSINESS.address.line2, BUSINESS.address.city, BUSINESS.address.state, BUSINESS.address.pincode]
    .filter(Boolean)
    .join(', ');
  protected readonly hours = BUSINESS.workingHours.filter((h) => h.hours);
}
