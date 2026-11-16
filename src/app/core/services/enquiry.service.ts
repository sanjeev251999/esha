import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

/**
 * Coordinates "Enquire Now" buttons with the enquiry form.
 *
 * Used by EnquireLinkDirective and the landing page: when the current page already
 * contains the form (Home, Contact, the Instagram landing page) the service is
 * pre-selected and the page scrolls smoothly to the form instead of navigating away.
 */
@Injectable({ providedIn: 'root' })
export class EnquiryService {
  /** Service id most recently chosen via an "Enquire Now" button. */
  readonly selectedServiceId = signal<string | null>(null);

  private readonly doc = inject(DOCUMENT);

  /** Scrolls to the in-page form (if any). Returns false when the page has no form. */
  start(serviceId: string | null): boolean {
    const form = this.doc.getElementById('enquiry');
    if (!form) return false;
    if (serviceId) this.selectedServiceId.set(serviceId);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Move focus to the first field for keyboard & screen-reader users.
    setTimeout(() => form.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true }), 500);
    return true;
  }
}
