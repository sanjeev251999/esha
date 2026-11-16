import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { GalleryGrid } from '../../shared/components/gallery-grid/gallery-grid';
import { CtaBand } from '../../shared/components/cta-band/cta-band';
import { GALLERY } from '../../content/gallery.content';

@Component({
  selector: 'app-gallery',
  imports: [PageHero, GalleryGrid, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      crumb="Gallery"
      eyebrow="Gallery"
      title="A glimpse of"
      accent="our world"
      intro="Bridal looks, makeup, hair and skin care moments. Tap any photo to view it larger."
    />
    <section class="section pt-4" aria-label="Photo gallery">
      <div class="container">
        <app-gallery-grid [images]="images" [filters]="true" />
      </div>
    </section>
    <app-cta-band title="Love what you see?" accent="Let's create yours." />
  `,
})
export class Gallery {
  protected readonly images = GALLERY;
}
