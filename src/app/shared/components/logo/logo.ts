import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Esha Beauty Paradise monogram + wordmark. Pure SVG/CSS – no image request. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient [attr.id]="gid()" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e7b9a6" />
          <stop offset="0.45" stop-color="#b76e79" />
          <stop offset="1" stop-color="#7a3c48" />
        </linearGradient>
      </defs>
      <path d="M8 44V22a16 16 0 0 1 32 0v22" fill="none" [attr.stroke]="paint()" stroke-width="1.6" />
      <path
        d="M30.5 15.5h-11v7.2h8.6M19.5 22.7v8.8h11.5"
        fill="none"
        [attr.stroke]="paint()"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M24 37.5c1.4-2 3.4-2 4.8 0-1.4 2-3.4 2-4.8 0Zm0 0c-1.4-2-3.4-2-4.8 0 1.4 2 3.4 2 4.8 0Z" [attr.fill]="paint()" />
    </svg>
    <span class="words">
      <span class="name">Esha</span>
      <span class="sub">Beauty Paradise</span>
    </span>
  `,
  styles: `
    @use 'tokens' as *;
    :host { display: inline-flex; align-items: center; gap: 0.6rem; color: inherit; }
    .logo-mark { width: 2.5rem; height: 2.5rem; flex-shrink: 0; }
    .words { display: flex; flex-direction: column; line-height: 1; }
    .name { font-family: $font-display; font-style: italic; font-weight: 600; font-size: 1.75rem; color: $rose-ink; letter-spacing: 0.01em; }
    .sub { font-family: $font-body; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; color: $ink-soft; margin-top: 0.2rem; }
    :host(.on-dark) .name { color: #fff; }
    :host(.on-dark) .sub { color: rgba(255, 255, 255, 0.78); }
  `,
})
export class Logo {
  /** Unique gradient id so multiple logos on one page do not clash. */
  readonly gid = input<string>('esha-logo-grad');

  protected paint(): string {
    return `url(#${this.gid()})`;
  }
}
