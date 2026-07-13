import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../core/i18n.service';
import { FORMSPREE_ENDPOINT } from '../../core/config';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

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
          <h2 class="mt-3 text-3xl font-bold text-white sm:text-4xl">{{ i18n.content().contact.title }}</h2>
          <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-violet-100/70">{{ i18n.content().contact.subtitle }}</p>
        </div>

        <form
          [formGroup]="form"
          (ngSubmit)="submit()"
          class="mt-12 grid gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:grid-cols-2 sm:p-8"
        >
          <div class="flex flex-col gap-1.5">
            <label for="name" class="text-sm font-medium text-violet-100/80">{{ i18n.content().contact.form.name }}</label>
            <input id="name" type="text" formControlName="name" required
              class="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-violet-100/30 focus:border-violet-400" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-medium text-violet-100/80">{{ i18n.content().contact.form.email }}</label>
            <input id="email" type="email" formControlName="email" required
              class="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-violet-100/30 focus:border-violet-400" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="company" class="text-sm font-medium text-violet-100/80">{{ i18n.content().contact.form.company }}</label>
            <input id="company" type="text" formControlName="company"
              class="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-violet-100/30 focus:border-violet-400" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="service" class="text-sm font-medium text-violet-100/80">{{ i18n.content().contact.form.service }}</label>
            <select id="service" formControlName="service"
              class="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-violet-400">
              <option class="bg-ink-900" value="" disabled>{{ i18n.content().contact.form.service }}</option>
              @for (option of i18n.content().contact.form.serviceOptions; track option) {
                <option class="bg-ink-900" [value]="option">{{ option }}</option>
              }
            </select>
          </div>

          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label for="message" class="text-sm font-medium text-violet-100/80">{{ i18n.content().contact.form.message }}</label>
            <textarea id="message" rows="4" formControlName="message" required
              class="resize-none rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-violet-100/30 focus:border-violet-400"></textarea>
          </div>

          <div class="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs text-violet-100/50">
              {{ i18n.content().contact.directLabel }}
              <a [href]="'mailto:' + i18n.content().contact.email" class="font-semibold text-violet-300 hover:text-violet-200">{{ i18n.content().contact.email }}</a>
            </p>

            <button
              type="submit"
              [disabled]="form.invalid || state() === 'submitting'"
              class="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ state() === 'submitting' ? i18n.content().contact.form.submitting : i18n.content().contact.form.submit }}
            </button>
          </div>

          @if (state() === 'success') {
            <p class="text-sm font-medium text-emerald-400 sm:col-span-2">{{ i18n.content().contact.form.success }}</p>
          }
          @if (state() === 'error') {
            <p class="text-sm font-medium text-red-400 sm:col-span-2">{{ i18n.content().contact.form.error }}</p>
          }
        </form>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly state = signal<SubmitState>('idle');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service: [''],
    message: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;

    this.state.set('submitting');
    this.http.post(FORMSPREE_ENDPOINT, this.form.getRawValue(), { headers: { Accept: 'application/json' } }).subscribe({
      next: () => {
        this.state.set('success');
        this.form.reset({ name: '', email: '', company: '', service: '', message: '' });
      },
      error: () => this.state.set('error'),
    });
  }
}
