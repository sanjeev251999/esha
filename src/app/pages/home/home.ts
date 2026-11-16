import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { ServiceCard } from '../../shared/components/service-card/service-card';
import { OfferCard } from '../../shared/components/offer-card/offer-card';
import { GalleryGrid } from '../../shared/components/gallery-grid/gallery-grid';
import { EnquiryForm } from '../../shared/components/enquiry-form/enquiry-form';
import { ContactInfo } from '../../shared/components/contact-info/contact-info';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { EnquireLinkDirective } from '../../shared/directives/enquire-link.directive';
import { SERVICES } from '../../content/services.content';
import { ACTIVE_OFFERS } from '../../content/offers.content';
import { GALLERY } from '../../content/gallery.content';
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
    GalleryGrid,
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
  protected readonly gallery = GALLERY;
  protected readonly waLink = inject(WhatsappService).quickLink();

  protected readonly highlights: { icon: IconName; title: string; text: string }[] = [
    { icon: 'gem', title: 'Bridal & Party Makeup', text: 'Looks designed for your big day' },
    { icon: 'scissors', title: 'Hair Styling & Spa', text: 'Styles, care and treatments' },
    { icon: 'flower', title: 'Facials & Skin Care', text: 'Fresh, healthy, glowing skin' },
    { icon: 'chat', title: 'Easy WhatsApp Booking', text: 'Enquire in under a minute' },
  ];

  protected readonly promises: { icon: IconName; title: string; text: string }[] = [
    { icon: 'user', title: 'Personal consultation', text: 'We listen first and suggest what suits your skin, hair, outfit and occasion.' },
    { icon: 'shield', title: 'Hygiene & comfort', text: 'A clean, calm and welcoming space where you can truly relax.' },
    { icon: 'brush', title: 'Carefully chosen products', text: 'We select products with care to suit different skin and hair types.' },
    { icon: 'heart', title: 'Your satisfaction', text: 'We take the time to make sure you leave happy and confident.' },
  ];
}
