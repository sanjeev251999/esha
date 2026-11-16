import { DOCUMENT, Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Fades/slides an element in when it scrolls into view.
 * Content stays fully visible in prerendered HTML and for users without JS;
 * the hidden start state only applies once this directive is running in the browser.
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.--reveal-delay]': 'delay()' },
})
export class RevealDirective implements OnDestroy {
  /** CSS delay, e.g. "120ms" — handy for staggering cards. */
  readonly delay = input<string>('0s', { alias: 'appReveal' });

  private observer?: IntersectionObserver;
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    afterNextRender(() => {
      if (!isBrowser || !('IntersectionObserver' in window)) return;
      this.doc.documentElement.classList.add('reveal-ready');
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
