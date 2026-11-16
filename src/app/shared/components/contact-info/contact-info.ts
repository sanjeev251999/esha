import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Icon } from '../icon/icon';
import { BUSINESS } from '../../../config/business.config';
import { WhatsappService } from '../../../core/services/whatsapp.service';

/**
 * Business contact details + Google Map. Any detail that is not yet configured in
 * business.config.ts is shown as "To be updated" instead of inventing information.
 */
@Component({
  selector: 'app-contact-info',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.scss',
})
export class ContactInfo {
  readonly showMap = input<boolean>(true);

  protected readonly b = BUSINESS;
  protected readonly waLink = inject(WhatsappService).quickLink();
  protected readonly waDisplay = BUSINESS.whatsappNumber ? '+' + BUSINESS.whatsappNumber.replace(/\D/g, '') : '';
  protected readonly telLink = BUSINESS.phoneNumber ? `tel:${BUSINESS.phoneNumber.replace(/[^\d+]/g, '')}` : null;
  protected readonly address = [BUSINESS.address.line1, BUSINESS.address.line2, BUSINESS.address.city, BUSINESS.address.state, BUSINESS.address.pincode]
    .filter(Boolean)
    .join(', ');

  /** Only Google Maps embed URLs are allowed into the iframe. */
  protected readonly mapUrl: SafeResourceUrl | null = /^https:\/\/www\.google\.com\/maps\/embed\?/.test(BUSINESS.googleMapsEmbedUrl)
    ? inject(DomSanitizer).bypassSecurityTrustResourceUrl(BUSINESS.googleMapsEmbedUrl)
    : null;
}
