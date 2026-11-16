import { ChangeDetectionStrategy, Component, DOCUMENT, HostListener, effect, inject, input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Icon } from '../icon/icon';
import { Logo } from '../logo/logo';
import { EnquireLinkDirective } from '../../directives/enquire-link.directive';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { BUSINESS } from '../../../config/business.config';

interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, Logo, EnquireLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.scrolled]': 'scrolled() || menuOpen()',
    '[class.landing]': "mode() === 'landing'",
  },
})
export class Header {
  /** 'landing' shows a minimal, distraction-free header for advertisement traffic. */
  readonly mode = input<'full' | 'landing'>('full');

  protected readonly nav: NavItem[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Offers', path: '/offers' },
    { label: 'Contact', path: '/contact' },
  ];

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly business = BUSINESS;
  protected readonly waLink = inject(WhatsappService).quickLink();
  protected readonly telLink = BUSINESS.phoneNumber ? `tel:${BUSINESS.phoneNumber.replace(/[^\d+]/g, '')}` : null;

  private readonly doc = inject(DOCUMENT);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));

    // Lock page scroll while the mobile menu is open.
    effect(() => {
      this.doc.body?.classList.toggle('menu-open', this.menuOpen());
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set((this.doc.defaultView?.scrollY ?? 0) > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen.set(false);
  }

  scrollToEnquiry(): void {
    this.doc.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
