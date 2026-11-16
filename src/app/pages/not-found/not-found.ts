import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero nf">
      <div class="container">
        <p class="eyebrow">Page not found</p>
        <h1 class="display-title">This page has <em>wandered off</em></h1>
        <p class="lead-text">The page you are looking for doesn't exist. Let's get you back to something beautiful.</p>
        <div class="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <a class="btn-esha btn-rose" routerLink="/">Go to Home <app-icon name="arrow" /></a>
          <a class="btn-esha btn-outline-rose" routerLink="/services">View Services</a>
        </div>
      </div>
    </section>
  `,
  styles: `.nf { min-height: 75vh; display: flex; align-items: center; }`,
})
export class NotFound {}
