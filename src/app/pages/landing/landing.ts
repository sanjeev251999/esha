import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../../shared/components/icon/icon';
import { EnquiryForm } from '../../shared/components/enquiry-form/enquiry-form';
import { ContactInfo } from '../../shared/components/contact-info/contact-info';
import { OfferCard } from '../../shared/components/offer-card/offer-card';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SERVICES } from '../../content/services.content';
import { ACTIVE_OFFERS } from '../../content/offers.content';
import { BUSINESS } from '../../config/business.config';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { EnquiryService } from '../../core/services/enquiry.service';

/**
 * Dedicated landing page for Instagram / Facebook advertisements.
 * Ad URL:  https://www.eshabeautyparlour.com/enquire?utm_source=instagram&utm_medium=paid&utm_campaign=<name>
 * Optional: add &service=bridal-makeup to pre-select a service in the form.
 */
@Component({
  selector: 'app-landing',
  imports: [Icon, EnquiryForm, ContactInfo, OfferCard, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  protected readonly b = BUSINESS;
  protected readonly services = SERVICES;
  protected readonly offers = ACTIVE_OFFERS.slice(0, 3);
  protected readonly waLink = inject(WhatsappService).quickLink();
  protected readonly enquiry = inject(EnquiryService);

  protected pick(serviceId: string | null): void {
    this.enquiry.start(serviceId);
  }
}
