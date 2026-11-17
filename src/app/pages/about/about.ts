import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { CtaBand } from '../../shared/components/cta-band/cta-band';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { BUSINESS } from '../../config/business.config';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Icon, PageHero, SectionHeading, CtaBand, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      crumb="About Us"
      eyebrow="About Us"
      title="The story of"
      [accent]="b.name"
      intro="Beauty | Skin | Hair | Body — an aesthetic centre built around one idea: everyone deserves to feel cared for, confident and beautiful."
    />

    <section class="section" aria-labelledby="intro-title">
      <div class="container">
        <div class="row g-4 g-lg-5 align-items-center">
          <div class="col-lg-6">
            <div class="frames" appReveal>
              <div class="arch-frame f1">
                <img src="assets/media/about/about-main.webp" alt="Makeup artist with a professional brush set" width="720" height="900" loading="lazy" decoding="async" />
              </div>
              <div class="arch-frame f2">
                <img src="assets/media/services/skin-treatments.webp" alt="Client enjoying a relaxing skin treatment" width="800" height="600" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <app-section-heading align="start" eyebrow="Who we are" title="Welcome to" accent="our centre" headingId="intro-title" />
            <div appReveal>
              <p class="lead-text">
                {{ b.name }} in Nagercoil offers advanced aesthetic treatments alongside beauty services — from laser and skin treatments to microblading, tattoo and bridal makeup.
              </p>
              <p>
                We believe beauty is personal. That is why we take time to understand your preferences, your skin and hair, and the occasion
                you are getting ready for — and then create a look that brings out the best in you, while still feeling like you.
              </p>
              <p>
                From a complete bridal look to a skin treatment or a new set of brows, every visit is designed to be comfortable, unhurried
                and enjoyable.
              </p>
              <a class="btn-esha btn-maroon mt-2" routerLink="/services">Explore our services <app-icon name="arrow" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-cream" aria-labelledby="values-title">
      <div class="container">
        <app-section-heading eyebrow="What drives us" title="Our mission &amp;" accent="commitment" headingId="values-title" />
        <div class="row g-4">
          @for (v of values; track v.title; let i = $index) {
            <div class="col-md-6 col-lg-4">
              <article class="value-card" [appReveal]="i * 90 + 'ms'">
                <span class="v-icon"><app-icon [name]="v.icon" size="1.5rem" /></span>
                <h3>{{ v.title }}</h3>
                <p>{{ v.text }}</p>
              </article>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="overview-title">
      <div class="container">
        <div class="row g-4 g-lg-5 align-items-center">
          <div class="col-lg-5">
            <app-section-heading align="start" eyebrow="Our services" title="Everything you need," accent="under one roof" headingId="overview-title" />
          </div>
          <div class="col-lg-7" appReveal>
            <ul class="overview">
              @for (o of overview; track o) {
                <li><app-icon name="check" /> {{ o }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: `
    @use 'tokens' as *;
    .frames { position: relative; max-width: 520px; margin-inline: auto; padding-bottom: 4rem; }
    .frames img { width: 100%; height: 100%; object-fit: cover; }
    .f1 { width: 70%; aspect-ratio: 4 / 5; box-shadow: $shadow-lift; }
    .f2 { position: absolute; right: 0; bottom: 0; width: 50%; aspect-ratio: 3 / 4; border: 8px solid $ivory; box-shadow: $shadow-lift; }
    .value-card { height: 100%; padding: 2rem 1.75rem; background: #fff; border: 1px solid $line; border-radius: $radius-lg; box-shadow: $shadow-soft; }
    .value-card h3 { font-size: 1.55rem; margin: 1rem 0 0.5rem; }
    .value-card p { color: $ink-soft; margin: 0; }
    .v-icon { width: 56px; height: 56px; display: inline-flex; align-items: center; justify-content: center; color: $maroon; border-radius: 50%; background: $cream-soft; }
    .overview { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.9rem; grid-template-columns: 1fr; }
    @include up($bp-md) { .overview { grid-template-columns: 1fr 1fr; } }
    .overview li { display: flex; gap: 0.6rem; align-items: center; padding: 1rem 1.2rem; background: #fff; border: 1px solid $line; border-radius: $radius; }
    .overview app-icon { color: $gold; }
  `,
})
export class About {
  protected readonly b = BUSINESS;

  protected readonly values: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'gem',
      title: 'Our mission',
      text: 'To help every client look and feel her most beautiful through personalised, thoughtful beauty services.',
    },
    {
      icon: 'heart',
      title: 'Customer satisfaction',
      text: 'We listen carefully, explain clearly and take the time needed so that you leave happy with your look.',
    },
    {
      icon: 'shield',
      title: 'Comfort & care',
      text: 'A clean, calm and friendly space where you can relax and enjoy your time with us.',
    },
  ];

  protected readonly overview = [
    'Laser treatment',
    'Body contouring & slimming',
    'Skin treatments',
    'Hair treatments',
    'Botox & fillers',
    'Microblading',
    'Tattoo',
    'All makeups',
  ];
}
