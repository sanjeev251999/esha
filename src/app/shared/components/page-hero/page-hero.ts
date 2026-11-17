import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Hero banner for inner pages (About, Services, Offers, Contact). */
@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="petal p1" aria-hidden="true"></div>
      <div class="petal p2" aria-hidden="true"></div>
      <div class="container position-relative">
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb-lite rise">
            <li><a routerLink="/">Home</a></li>
            <li aria-current="page">{{ crumb() }}</li>
          </ol>
        </nav>
        <p class="eyebrow rise" style="--rise-delay: 0.05s">{{ eyebrow() }}</p>
        <h1 class="display-title rise" style="--rise-delay: 0.12s">
          {{ title() }} <em>{{ accent() }}</em>
        </h1>
        <div class="ornament rise" style="--rise-delay: 0.18s" aria-hidden="true"><span></span></div>
        <p class="lead-text rise" style="--rise-delay: 0.24s">{{ intro() }}</p>
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    @use 'tokens' as *;
    :host { display: block; }
    .petal {
      position: absolute;
      border-radius: 999px 999px 0 999px;
      background: linear-gradient(135deg, rgba(232, 207, 149, 0.45), rgba(176, 138, 62, 0.15));
      pointer-events: none;
    }
    .p1 { width: 160px; height: 160px; left: -50px; top: 30%; transform: rotate(-20deg); }
    .p2 { width: 110px; height: 110px; right: 6%; bottom: -40px; transform: rotate(160deg); }
    @include down($bp-md) { .p1 { width: 100px; height: 100px; } .p2 { display: none; } }
  `,
})
export class PageHero {
  readonly crumb = input.required<string>();
  readonly eyebrow = input<string>('');
  readonly title = input.required<string>();
  readonly accent = input<string>('');
  readonly intro = input<string>('');
}
