import { Injectable } from '@angular/core';
import { BUSINESS } from '../../config/business.config';

export interface Lead {
  name: string;
  mobile: string;
  service: string;
  preferredDate?: string;
  message?: string;
  source?: string;
  page?: string;
  /** Honeypot – must stay empty for real visitors. */
  website?: string;
}

/**
 * Sends enquiries to the Google Sheet web app (scripts/google-sheet-leads.gs).
 * Resolves true only when the Sheet confirms the row was saved, so the form never
 * shows a "received" message that did not really happen.
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly url = BUSINESS.leadCaptureUrl.trim();

  get isConfigured(): boolean {
    return /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(this.url);
  }

  async save(lead: Lead): Promise<boolean> {
    if (!this.isConfigured) return false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      // A plain-text body keeps this a "simple" request (no CORS preflight), which Apps Script supports.
      const res = await fetch(this.url, { method: 'POST', body: JSON.stringify(lead), redirect: 'follow', signal: controller.signal });
      if (!res.ok) return false;
      const data = (await res.json()) as { ok?: boolean };
      return data.ok === true;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }
}
