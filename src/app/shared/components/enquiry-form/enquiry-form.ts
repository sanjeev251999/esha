import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, effect, inject, input, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Icon } from '../icon/icon';
import { BUSINESS } from '../../../config/business.config';
import { SERVICES, findService } from '../../../content/services.content';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { EnquiryService } from '../../../core/services/enquiry.service';

type Status = 'idle' | 'opened' | 'blocked' | 'not-configured';

const OTHER = 'other';

/** Strips spaces, dashes, dots and brackets before checking the configured mobile pattern. */
function mobileValidator(control: AbstractControl<string>): ValidationErrors | null {
  const raw = (control.value ?? '').trim();
  if (!raw) return null; // handled by `required`
  return BUSINESS.mobilePattern.test(raw.replace(/[\s\-().]/g, '')) ? null : { mobile: true };
}

function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function notPastDate(control: AbstractControl<string>): ValidationErrors | null {
  const v = control.value;
  if (!v) return null;
  return v < todayIso() ? { past: true } : null;
}

const NAME_PATTERN = /^[\p{L}][\p{L} .'-]*$/u;

@Component({
  selector: 'app-enquiry-form',
  imports: [ReactiveFormsModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enquiry-form.html',
  styleUrl: './enquiry-form.scss',
})
export class EnquiryForm {
  readonly heading = input('Book your appointment');
  readonly subheading = input('Share a few details and continue the conversation with us on WhatsApp.');

  protected readonly services = SERVICES;
  protected readonly OTHER = OTHER;
  protected readonly business = BUSINESS;
  protected readonly igDm = `https://ig.me/m/${BUSINESS.instagramHandle.replace('@', '')}`;
  protected readonly telLink = BUSINESS.phoneNumber ? `tel:${BUSINESS.phoneNumber.replace(/[^\d+]/g, '')}` : null;
  protected readonly minDate = signal<string | null>(null);
  protected readonly status = signal<Status>('idle');
  protected readonly waUrl = signal<string | null>(null);
  protected readonly submitted = signal(false);

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly whatsapp = inject(WhatsappService);
  private readonly enquiry = inject(EnquiryService);
  private readonly route = inject(ActivatedRoute);
  private readonly host = inject(ElementRef<HTMLElement>);
  private source = '';

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern(NAME_PATTERN)]],
    mobile: ['', [Validators.required, mobileValidator]],
    service: ['', Validators.required],
    preferredDate: ['', notPastDate],
    message: ['', Validators.maxLength(500)],
  });

  constructor() {
    // Pre-select a service from ?service=<id> and remember the ad source (?utm_source=instagram).
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = params.get('service');
      if (id && (findService(id) || id === OTHER)) this.form.controls.service.setValue(id);
      const src = params.get('utm_source');
      if (src) this.source = src.replace(/[^\w .-]/g, '').slice(0, 40);
    });

    // Pre-select when an in-page "Enquire Now" button is clicked.
    effect(() => {
      const id = this.enquiry.selectedServiceId();
      if (id) this.form.controls.service.setValue(id);
    });

    // Date limits depend on the visitor's clock, so set them in the browser only.
    afterNextRender(() => this.minDate.set(todayIso()));
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.status.set('idle');
      this.host.nativeElement.querySelector('input.ng-invalid, select.ng-invalid, textarea.ng-invalid')?.focus();
      return;
    }

    const v = this.form.getRawValue();
    const serviceName = v.service === OTHER ? 'Other / Not sure yet' : (findService(v.service)?.name ?? v.service);
    const message = this.whatsapp.enquiryMessage({
      name: v.name,
      mobile: v.mobile,
      service: serviceName,
      preferredDate: v.preferredDate,
      message: v.message,
      source: this.source,
    });

    const { result, url } = this.whatsapp.open(message);
    this.waUrl.set(url);
    this.status.set(result);
  }

  protected reset(): void {
    this.form.reset();
    this.submitted.set(false);
    this.status.set('idle');
    this.waUrl.set(null);
  }
}
