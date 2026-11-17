import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../core/i18n.service';
import { FORMSPREE_ENDPOINT } from '../../core/config';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'message';
const VALIDATED_FIELDS: FieldName[] = ['name', 'email', 'message'];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div class="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-violet-700/25 blur-3xl"></div>

      <div class="relative mx-auto max-w-3xl px-6 lg:px-8">
        <div class="text-center">
          <span class="text-xs font-semibold tracking-wide text-violet-300 uppercase">{{ i18n.content().contact.eyebrow }}</span>
          <h2 id="contact-title" class="mt-3 text-3xl font-bold text-white sm:text-4xl">{{ i18n.content().contact.title }}</h2>
          <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-violet-100/70">{{ i18n.content().contact.subtitle }}</p>
        </div>

        <form
          #formEl
          [formGroup]="form"
          (ngSubmit)="submit()"
          [attr.aria-labelledby]="'contact-title'"
          class="mt-12 grid gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:grid-cols-2 sm:p-8"
        >
          <div class="flex flex-col gap-1.5">
            <label for="name" class="text-sm font-medium text-violet-100/80">
              {{ f.name }} <span class="text-violet-300" aria-hidden="true">*</span><span class="sr-only">({{ f.required }})</span>
            </label>
            <input id="name" name="name" type="text" formControlName="name" required autocomplete="name" enterkeyhint="next"
              [class]="inputClass"
              [class.field-error]="showError('name')"
              [attr.aria-invalid]="showError('name')"
              [attr.aria-describedby]="showError('name') ? 'name-error' : null" />
            @if (showError('name')) {
              <p id="name-error" class="field-error-msg">
                <span class="sr-only">{{ f.errorPrefix }}: </span><span aria-hidden="true">⚠</span> {{ f.nameError }}
              </p>
            }
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-medium text-violet-100/80">
              {{ f.email }} <span class="text-violet-300" aria-hidden="true">*</span><span class="sr-only">({{ f.required }})</span>
            </label>
            <input id="email" name="email" type="email" formControlName="email" required autocomplete="email" enterkeyhint="next"
              autocapitalize="none" spellcheck="false"
              [class]="inputClass"
              [class.field-error]="showError('email')"
              [attr.aria-invalid]="showError('email')"
              [attr.aria-describedby]="showError('email') ? 'email-error' : null" />
            @if (showError('email')) {
              <p id="email-error" class="field-error-msg">
                <span class="sr-only">{{ f.errorPrefix }}: </span><span aria-hidden="true">⚠</span> {{ f.emailError }}
              </p>
            }
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="company" class="text-sm font-medium text-violet-100/80">{{ f.company }}</label>
            <input id="company" name="company" type="text" formControlName="company" autocomplete="organization" enterkeyhint="next"
              [class]="inputClass" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="service" class="text-sm font-medium text-violet-100/80">{{ f.service }}</label>
            <select id="service" name="service" formControlName="service" [class]="inputClass">
              <option class="bg-ink-900" value="" disabled>{{ f.service }}</option>
              @for (option of f.serviceOptions; track option) {
                <option class="bg-ink-900" [value]="option">{{ option }}</option>
              }
            </select>
          </div>

          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label for="message" class="text-sm font-medium text-violet-100/80">
              {{ f.message }} <span class="text-violet-300" aria-hidden="true">*</span><span class="sr-only">({{ f.required }})</span>
            </label>
            <textarea id="message" name="message" rows="4" formControlName="message" required
              [class]="inputClass + ' resize-y'"
              [class.field-error]="showError('message')"
              [attr.aria-invalid]="showError('message')"
              [attr.aria-describedby]="showError('message') ? 'message-error' : null"></textarea>
            @if (showError('message')) {
              <p id="message-error" class="field-error-msg">
                <span class="sr-only">{{ f.errorPrefix }}: </span><span aria-hidden="true">⚠</span> {{ f.messageError }}
              </p>
            }
          </div>

          <!-- Honeypot for Formspree spam filtering: hidden from sight, keyboard and assistive tech. -->
          <div class="hidden" aria-hidden="true">
            <label for="gotcha">Leave this field empty</label>
            <input id="gotcha" name="_gotcha" type="text" formControlName="_gotcha" tabindex="-1" autocomplete="off" />
          </div>

          <div class="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs text-violet-100/50">
              {{ i18n.content().contact.directLabel }}
              <a [href]="'mailto:' + i18n.content().contact.email" class="font-semibold text-violet-300 hover:text-violet-200">{{ i18n.content().contact.email }}</a>
            </p>

            <button
              type="submit"
              [disabled]="state() === 'submitting'"
              data-motion-safe
              class="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-violet-400 hover:shadow-xl hover:shadow-violet-900/60 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            >
              {{ state() === 'submitting' ? f.submitting : f.submit }}
            </button>
          </div>

          <div role="status" class="sm:col-span-2">
            @if (state() === 'success') {
              <p class="text-sm font-medium text-emerald-400">{{ f.success }}</p>
            }
            @if (state() === 'error') {
              <p class="text-sm font-medium text-red-400">{{ f.error }}</p>
            }
          </div>
        </form>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');

  protected readonly state = signal<SubmitState>('idle');
  /** Bumped on every submit attempt so OnPush re-renders touched/invalid state. */
  private readonly attempt = signal(0);

  protected readonly inputClass =
    'rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-base text-white outline-none placeholder:text-violet-100/30 focus:border-violet-400';

  protected get f() {
    return this.i18n.content().contact.form;
  }

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service: [''],
    message: ['', Validators.required],
    _gotcha: [''],
  });

  /** Show an error only once the user has left the field (or tried to submit), like :user-invalid. */
  protected showError(name: FieldName): boolean {
    this.attempt();
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  submit(): void {
    if (this.state() === 'submitting') return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.attempt.update((n) => n + 1);
      // Route focus to the first invalid field (in DOM order) so its error is announced with it.
      const firstInvalid = VALIDATED_FIELDS.find((name) => this.form.controls[name].invalid);
      if (firstInvalid) {
        this.formEl().nativeElement.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      }
      return;
    }

    this.state.set('submitting');
    this.http.post(FORMSPREE_ENDPOINT, this.form.getRawValue(), { headers: { Accept: 'application/json' } }).subscribe({
      next: () => {
        this.state.set('success');
        this.form.reset();
      },
      error: () => this.state.set('error'),
    });
  }
}
