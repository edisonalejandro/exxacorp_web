import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { ContactIntentService } from '../../core/contact-intent.service';
import { LEY_21719_IN_FORCE } from '../../core/config';

/** Índice de "Diagnóstico normativo (Ley 21.663 / 21.719)" en contact.form.serviceOptions. */
const REGULATORY_OPTION = 3;

@Component({
  selector: 'app-regulation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="normativa" class="border-y border-ink-900/[0.06] bg-white py-24 lg:py-32">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div class="max-w-2xl">
            <span class="text-xs font-semibold tracking-wide text-violet-600 uppercase">{{ i18n.content().regulation.eyebrow }}</span>
            <h2 class="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">{{ i18n.content().regulation.title }}</h2>
            <p class="mt-4 text-lg leading-relaxed text-ink-700/80">{{ i18n.content().regulation.subtitle }}</p>
          </div>

          <p class="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-100/50 px-4 py-3.5 text-sm font-medium text-ink-800">
            <svg class="mt-0.5 shrink-0 text-violet-700" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            {{ inForce ? i18n.content().regulation.deadlineAfter : i18n.content().regulation.deadlineBefore }}
          </p>
        </div>

        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          @for (law of i18n.content().regulation.laws; track law.code) {
            <article class="flex flex-col rounded-2xl border border-ink-900/[0.08] bg-mist-50 p-7 sm:p-8">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <span class="rounded-md bg-ink-900 px-2.5 py-1 font-display text-xs font-semibold tracking-wide text-white">{{ law.code }}</span>
                <span class="text-xs font-medium text-ink-700/70">{{ law.authority }}</span>
              </div>

              <h3 class="mt-5 text-xl font-bold text-ink-900">{{ law.name }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-700/80">
                <span class="font-semibold text-ink-800">{{ i18n.content().regulation.appliesToLabel }}:</span>
                {{ law.appliesTo }}
              </p>

              <h4 class="mt-6 text-xs font-semibold tracking-wide text-ink-700/70 uppercase">{{ i18n.content().regulation.obligationsLabel }}</h4>
              <ul class="mt-3 space-y-2.5">
                @for (item of law.obligations; track item) {
                  <li class="flex gap-2.5 text-sm leading-relaxed text-ink-800">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-700/40" aria-hidden="true"></span>
                    {{ item }}
                  </li>
                }
              </ul>

              <div class="mt-6 border-t border-ink-900/[0.08] pt-6">
                <h4 class="text-xs font-semibold tracking-wide text-violet-700 uppercase">{{ i18n.content().regulation.helpLabel }}</h4>
                <ul class="mt-3 space-y-2.5">
                  @for (item of law.help; track item) {
                    <li class="flex gap-2.5 text-sm leading-relaxed text-ink-900">
                      <svg class="mt-0.5 shrink-0 text-violet-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>

        <div class="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-medium text-ink-800">{{ i18n.content().regulation.frameworks }}</p>
            <p class="mt-1 text-xs text-ink-700/75">{{ i18n.content().regulation.disclaimer }}</p>
          </div>
          <a
            href="/#contacto"
            (click)="intent.select(regulatoryOption)"
            data-motion-safe
            class="inline-flex shrink-0 items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-[background-color,transform] duration-200 ease-out hover:bg-violet-500 active:scale-95"
          >{{ i18n.content().regulation.cta }}</a>
        </div>
      </div>
    </section>
  `,
})
export class RegulationComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly intent = inject(ContactIntentService);
  protected readonly regulatoryOption = REGULATORY_OPTION;
  protected readonly inForce = Date.now() >= LEY_21719_IN_FORCE.getTime();
}
