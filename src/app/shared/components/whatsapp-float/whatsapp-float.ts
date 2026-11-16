import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { BUSINESS } from '../../../config/business.config';

/**
 * Floating chat button shown on every page.
 * Opens WhatsApp with a prefilled enquiry. Until a WhatsApp number is configured it
 * falls back to Instagram Direct Messages so visitors always have a way to reach the salon.
 */
@Component({
  selector: 'app-whatsapp-float',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (waLink) {
      <a class="float wa" [href]="waLink" target="_blank" rel="noopener" aria-label="Chat with Esha Beauty Paradise on WhatsApp">
        <span class="ring" aria-hidden="true"></span>
        <app-icon name="whatsapp" size="1.75rem" />
        <span class="label">Chat with us</span>
      </a>
    } @else {
      <a class="float ig" [href]="igDm" target="_blank" rel="noopener" aria-label="Message Esha Beauty Paradise on Instagram">
        <span class="ring" aria-hidden="true"></span>
        <app-icon name="instagram" size="1.6rem" />
        <span class="label">Message us</span>
      </a>
    }
  `,
  styleUrl: './whatsapp-float.scss',
})
export class WhatsappFloat {
  protected readonly waLink = inject(WhatsappService).quickLink();
  protected readonly igDm = `https://ig.me/m/${BUSINESS.instagramHandle.replace('@', '')}`;
}
