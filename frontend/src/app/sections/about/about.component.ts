import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

/**
 * Perfiles del equipo pendientes. Cuando estén listos, agregar aquí una
 * grilla con nombre, foto, cargo y LinkedIn (no volver a poner placeholders).
 */
@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="nosotros" class="bg-mist-100 py-24 lg:py-32">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <span class="text-xs font-semibold tracking-wide text-violet-600 uppercase">{{ i18n.content().about.eyebrow }}</span>
            <h2 class="mt-3 text-3xl font-bold text-balance text-ink-900 sm:text-4xl">{{ i18n.content().about.title }}</h2>
            @for (p of i18n.content().about.paragraphs; track p) {
              <p class="mt-5 text-base leading-relaxed text-ink-700/80">{{ p }}</p>
            }
          </div>

          <ul class="divide-y divide-ink-900/[0.08] self-start rounded-2xl border border-ink-900/[0.08] bg-white">
            @for (item of i18n.content().about.principles; track item.title) {
              <li class="flex gap-4 p-6">
                <svg class="mt-0.5 shrink-0 text-violet-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1z" />
                </svg>
                <div>
                  <h3 class="font-display text-base font-semibold text-ink-900">{{ item.title }}</h3>
                  <p class="mt-1.5 text-sm leading-relaxed text-ink-700/80">{{ item.description }}</p>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly i18n = inject(I18nService);
}
