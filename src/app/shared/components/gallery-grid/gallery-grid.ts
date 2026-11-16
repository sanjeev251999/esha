import { ChangeDetectionStrategy, Component, ElementRef, computed, input, signal, viewChild } from '@angular/core';
import { Icon } from '../icon/icon';
import { RevealDirective } from '../../directives/reveal.directive';
import { GalleryCategory, GalleryImage } from '../../../models/content.model';

@Component({
  selector: 'app-gallery-grid',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery-grid.html',
  styleUrl: './gallery-grid.scss',
})
export class GalleryGrid {
  readonly images = input.required<GalleryImage[]>();
  /** Show category filter buttons. */
  readonly filters = input<boolean>(false);
  /** Maximum number of images to show (0 = all). */
  readonly limit = input<number>(0);

  protected readonly category = signal<GalleryCategory | 'All'>('All');
  protected readonly categories = computed(() => ['All', ...new Set(this.images().map((i) => i.category))] as const);
  protected readonly visible = computed(() => {
    const cat = this.category();
    const list = cat === 'All' ? this.images() : this.images().filter((i) => i.category === cat);
    return this.limit() ? list.slice(0, this.limit()) : list;
  });

  protected readonly current = signal<number | null>(null);
  protected readonly currentImage = computed(() => {
    const i = this.current();
    return i === null ? null : this.visible()[i];
  });

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private touchX: number | null = null;

  protected open(index: number): void {
    this.current.set(index);
    this.dialog()?.nativeElement.showModal();
  }

  protected close(): void {
    this.dialog()?.nativeElement.close();
  }

  protected onClosed(): void {
    this.current.set(null);
  }

  protected step(delta: number): void {
    const n = this.visible().length;
    this.current.update((i) => (i === null ? null : (i + delta + n) % n));
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.step(1);
    if (event.key === 'ArrowLeft') this.step(-1);
  }

  /** Click on the dark backdrop (outside the figure) closes the lightbox. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog()?.nativeElement) this.close();
  }

  protected onTouchStart(e: TouchEvent): void {
    this.touchX = e.touches[0]?.clientX ?? null;
  }

  protected onTouchEnd(e: TouchEvent): void {
    if (this.touchX === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? this.touchX) - this.touchX;
    if (Math.abs(dx) > 45) this.step(dx < 0 ? 1 : -1);
    this.touchX = null;
  }
}
