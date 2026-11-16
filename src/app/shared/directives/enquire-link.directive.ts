import { Directive, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { EnquiryService } from '../../core/services/enquiry.service';

/**
 * Turns an <a> into an "Enquire Now" link.
 *
 *   <a appEnquireLink="bridal-makeup">Enquire Now</a>   (pre-selects a service)
 *   <a appEnquireLink>Enquire Now</a>                   (no pre-selection)
 *
 * - If the current page already has the enquiry form, it scrolls there smoothly and
 *   pre-selects the service.
 * - Otherwise it navigates to /contact?service=<id>#enquiry.
 * The real href is kept so "open in new tab" and no-JS visitors still work.
 */
@Directive({
  selector: 'a[appEnquireLink]',
  host: {
    '[attr.href]': 'href()',
    '(click)': 'onClick($event)',
  },
})
export class EnquireLinkDirective {
  readonly serviceId = input<string | null | undefined>(null, { alias: 'appEnquireLink' });

  private readonly enquiry = inject(EnquiryService);
  private readonly router = inject(Router);

  protected readonly href = computed(() => {
    const id = this.serviceId();
    return `/contact${id ? `?service=${encodeURIComponent(id)}` : ''}#enquiry`;
  });

  protected onClick(event: MouseEvent): void {
    // Let the browser handle new-tab / new-window clicks.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!this.enquiry.start(this.serviceId() || null)) {
      void this.router.navigateByUrl(this.href());
    }
  }
}
