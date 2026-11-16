import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Esha Aesthetic Centre logo — crowned gold "E" with maroon leaves, as on the salon signboard,
 * plus the ESHA / AESTHETIC CENTRE wordmark. Pure SVG/CSS – no image request.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="logo-mark" viewBox="0 0 48 54" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient [attr.id]="gid()" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f3dc9a" />
          <stop offset="0.5" stop-color="#c9a24e" />
          <stop offset="1" stop-color="#8a6420" />
        </linearGradient>
      </defs>
      <!-- crown -->
      <path d="M14 15 12.5 5.5 18.5 10 24 3 29.5 10 35.5 5.5 34 15Z" [attr.fill]="paint()" />
      <circle cx="12.5" cy="5" r="1.4" [attr.fill]="paint()" />
      <circle cx="24" cy="2.4" r="1.4" [attr.fill]="paint()" />
      <circle cx="35.5" cy="5" r="1.4" [attr.fill]="paint()" />
      <!-- maroon leaves -->
      <path d="M17 46c-7-1-11-6-11-12 6 1 10 5 11 12Z" fill="#7d1f2c" />
      <path d="M17 46c-5 3-11 3-14-1 5-3 10-3 14 1Z" fill="#962a3a" />
      <!-- E -->
      <text x="28" y="48" text-anchor="middle" class="e" [attr.fill]="paint()">E</text>
    </svg>
    <span class="words">
      <span class="name">ESHA</span>
      <span class="sub">Aesthetic Centre</span>
    </span>
  `,
  styles: `
    @use 'tokens' as *;
    :host { display: inline-flex; align-items: center; gap: 0.55rem; color: inherit; }
    .logo-mark { width: 2.4rem; height: 2.7rem; flex-shrink: 0; overflow: visible; }
    .e { font-family: 'Cinzel', $font-display; font-weight: 700; font-size: 36px; }
    .words { display: flex; flex-direction: column; line-height: 1; }
    .name { font-family: 'Cinzel', $font-display; font-weight: 700; font-size: 1.5rem; color: $maroon; letter-spacing: 0.08em; }
    .sub { font-family: 'Cinzel', $font-display; font-size: 0.56rem; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: $gold; margin-top: 0.25rem; }
    :host(.on-dark) .name { color: #fff; }
    :host(.on-dark) .sub { color: $gold-light; }
  `,
})
export class Logo {
  /** Unique gradient id so multiple logos on one page do not clash. */
  readonly gid = input<string>('esha-logo-grad');

  protected paint(): string {
    return `url(#${this.gid()})`;
  }
}
