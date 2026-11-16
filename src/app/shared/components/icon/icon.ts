import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS, IconName } from './icons';

/**
 * Lightweight inline SVG icon. Icons are static, trusted strings from icons.ts,
 * so they are safe to render as HTML. Decorative by default (aria-hidden).
 */
@Component({
  selector: 'app-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[innerHTML]': 'html()',
    '[style.font-size]': 'size()',
    'aria-hidden': 'true',
  },
  styles: `
    :host { display: inline-flex; line-height: 0; vertical-align: -0.125em; }
    :host ::ng-deep svg { width: 1em; height: 1em; fill: currentColor; }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<string>('1.1em');

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly html = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false">${ICONS[this.name()]}</svg>`,
    ),
  );
}
