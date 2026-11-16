import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { WhatsappFloat } from './shared/components/whatsapp-float/whatsapp-float';
import { SeoService } from './core/services/seo.service';

type Layout = 'full' | 'landing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, WhatsappFloat],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  protected readonly layout = signal<Layout>('full');

  constructor() {
    inject(SeoService).init();

    const router = inject(Router);
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.layout.set(this.findLayout(router.routerState.snapshot.root)));
  }

  private findLayout(route: ActivatedRouteSnapshot): Layout {
    for (let r: ActivatedRouteSnapshot | null = route; r; r = r.firstChild) {
      if (r.data['layout'] === 'landing') return 'landing';
    }
    return 'full';
  }
}
