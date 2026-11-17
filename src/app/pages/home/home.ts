import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { ServiceCard } from '../../shared/components/service-card/service-card';
import { OfferCard } from '../../shared/components/offer-card/offer-card';
import { EnquiryForm } from '../../shared/components/enquiry-form/enquiry-form';
import { ContactInfo } from '../../shared/components/contact-info/contact-info';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { EnquireLinkDirective } from '../../shared/directives/enquire-link.directive';
import { SERVICES } from '../../content/services.content';
import { ACTIVE_OFFERS } from '../../content/offers.content';
import { BUSINESS } from '../../config/business.config';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Icon,
    SectionHeading,
    ServiceCard,
    OfferCard,
    EnquiryForm,
    ContactInfo,
    RevealDirective,
    EnquireLinkDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly b = BUSINESS;
  protected readonly featured = SERVICES.filter((s) => s.featured).slice(0, 6);
  protected readonly offers = ACTIVE_OFFERS.slice(0, 3);
  protected readonly waLink = inject(WhatsappService).quickLink();

  /**
   * Before/after panels. These are ILLUSTRATIVE images, not Esha's own client results, so the page
   * shows a clear disclaimer. Replace with real client photos (with consent) when available.
   */
  protected readonly results = [
    { image: 'assets/media/results/weight-loss.webp', title: 'Body Contouring & Slimming', serviceId: 'body-contouring', alt: 'Illustrative before and after of weight loss treatment' },
    { image: 'assets/media/results/laser.webp', title: 'Laser Treatment', serviceId: 'laser-treatment', alt: 'Illustrative before and after of laser facial hair removal' },
    { image: 'assets/media/results/skin.webp', title: 'Skin Treatment', serviceId: 'skin-treatments', alt: 'Illustrative before and after of acne skin treatment' },
    { image: 'assets/media/results/hair-loss.webp', title: 'Hair Fall Treatment', serviceId: 'hair-treatments', alt: 'Illustrative before and after of hair fall treatment' },
  ];

  protected readonly highlights:{ icon: IconName; title: string; text: string }[] = [
    { icon: 'gem', title: 'All Makeups', text: 'Bridal, party & HD looks' },
    { icon: 'sparkles', title: 'Laser & Skin', text: 'Clearer, glowing skin' },
    { icon: 'flower', title: 'Brows & Tattoo', text: 'Artistry in every detail' },
    { icon: 'chat', title: 'Easy WhatsApp Booking', text: 'Enquire in under a minute' },
  ];

  protected readonly promises: { icon: IconName; title: string; text: string }[] = [
    { icon: 'user', title: 'Personal consultation', text: 'We listen first and suggest what suits your skin, hair, outfit and occasion.' },
    { icon: 'shield', title: 'Hygiene & comfort', text: 'A clean, calm and welcoming space where you can truly relax.' },
    { icon: 'brush', title: 'Consultation first', text: 'Advanced treatments are planned only after we understand your needs.' },
    { icon: 'heart', title: 'Your satisfaction', text: 'We take the time to make sure you leave happy and confident.' },
  ];
}
