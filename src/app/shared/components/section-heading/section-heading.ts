import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

/** Eyebrow + serif title (with optional italic accent) + intro text. */
@Component({
  selector: 'app-section-heading',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.text-center]': "align() === 'center'", class: 'd-block mb-4 mb-lg-5' },
  template: `
    <div appReveal>
      @if (eyebrow()) {
        <p class="eyebrow">{{ eyebrow() }}</p>
      }
      @switch (level()) {
        @case (1) {
          <h1 class="display-title" [id]="headingId()">{{ title() }} @if (accent()) {<em>{{ accent() }}</em>}</h1>
        }
        @default {
          <h2 class="display-title" [id]="headingId()">{{ title() }} @if (accent()) {<em>{{ accent() }}</em>}</h2>
        }
      }
      @if (align() === 'center') {
        <div class="ornament" aria-hidden="true"><span></span></div>
      }
      @if (intro()) {
        <p class="lead-text" [class.mx-auto]="align() === 'center'">{{ intro() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input<string>('');
  readonly title = input.required<string>();
  /** Italic rose-coloured words appended to the title. */
  readonly accent = input<string>('');
  readonly intro = input<string>('');
  readonly align = input<'center' | 'start'>('center');
  readonly level = input<1 | 2>(2);
  readonly headingId = input<string | null>(null);
}
