import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { EnquiryForm } from '../../shared/components/enquiry-form/enquiry-form';
import { ContactInfo } from '../../shared/components/contact-info/contact-info';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [PageHero, EnquiryForm, ContactInfo, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      crumb="Contact"
      eyebrow="Contact Us"
      title="Let's plan your"
      accent="beautiful day"
      intro="Send an enquiry in under a minute — it opens WhatsApp with your details filled in, ready to send."
    />
    <section class="section pt-4" aria-label="Enquiry and contact details">
      <div class="container">
        <div class="row g-4 g-lg-5">
          <div class="col-lg-7" id="enquiry" appReveal>
            <app-enquiry-form />
          </div>
          <div class="col-lg-5" appReveal="120ms">
            <app-contact-info />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {}
