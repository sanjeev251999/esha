import { Injectable } from '@angular/core';
import { BUSINESS } from '../../config/business.config';

export interface EnquiryDetails {
  name: string;
  mobile: string;
  service: string;
  preferredDate?: string;
  message?: string;
  /** Traffic source, e.g. "instagram" from ?utm_source=instagram. */
  source?: string;
}

export type OpenResult = 'opened' | 'blocked' | 'not-configured';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /** Digits-only WhatsApp number from the business config. */
  private readonly number = BUSINESS.whatsappNumber.replace(/\D/g, '');

  /** True once a WhatsApp number has been set in business.config.ts. */
  get isConfigured(): boolean {
    return this.number.length >= 8;
  }

  /** wa.me link with a prefilled message, or null when no number is configured. */
  link(message: string): string | null {
    if (!this.isConfigured) return null;
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  }

  /** Short greeting used by the floating button and generic WhatsApp CTAs. */
  quickMessage(serviceName?: string): string {
    const about = serviceName ? ` about *${serviceName}*` : ' about your services';
    return `Hello ${BUSINESS.name}! I would like to enquire${about}. Please share the details.`;
  }

  quickLink(serviceName?: string): string | null {
    return this.link(this.quickMessage(serviceName));
  }

  /** Full enquiry message built from the enquiry form. */
  enquiryMessage(d: EnquiryDetails): string {
    const lines = [
      `Hello ${BUSINESS.name}!`,
      `I would like to make an enquiry.`,
      ``,
      `*Name:* ${d.name.trim()}`,
      `*Mobile:* ${d.mobile.trim()}`,
      `*Service:* ${d.service}`,
    ];
    if (d.preferredDate) lines.push(`*Preferred date:* ${formatDate(d.preferredDate)}`);
    if (d.message?.trim()) lines.push(`*Message:* ${d.message.trim()}`);
    lines.push(``, d.source ? `(Sent from website – ${d.source})` : `(Sent from website)`);
    return lines.join('\n');
  }

  /**
   * Opens WhatsApp in a new tab/app. Must be called directly from a user click/submit
   * handler so the browser does not block it. Reports honestly whether it opened.
   */
  open(message: string): { result: OpenResult; url: string | null } {
    const url = this.link(message);
    if (!url) return { result: 'not-configured', url: null };
    if (typeof window === 'undefined') return { result: 'blocked', url };
    const win = window.open(url, '_blank');
    if (!win) return { result: 'blocked', url };
    try {
      win.opener = null;
    } catch {
      /* cross-origin; safe to ignore */
    }
    return { result: 'opened', url };
  }
}

/** "2026-11-20" → "20 Nov 2026" (no timezone shifting). */
function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
}
