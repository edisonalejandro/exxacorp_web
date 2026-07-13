import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="servicios" class="bg-mist-50 py-24 lg:py-32">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="text-xs font-semibold tracking-wide text-violet-600 uppercase">{{ i18n.content().services.eyebrow }}</span>
          <h2 class="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">{{ i18n.content().services.title }}</h2>
          <p class="mt-4 text-lg leading-relaxed text-ink-700/80">{{ i18n.content().services.subtitle }}</p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          @for (item of i18n.content().services.items; track item.title) {
            <article class="flex flex-col rounded-2xl border border-ink-900/[0.06] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                @switch (item.icon) {
                  @case ('hardening') {
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 3l7 3v5.5c0 5-3.2 8-7 9.5-3.8-1.5-7-4.5-7-9.5V6l7-3z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  }
                  @case ('pentesting') {
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="7.5" />
                      <circle cx="12" cy="12" r="2.5" />
                      <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" />
                    </svg>
                  }
                  @case ('compliance') {
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="5" y="4" width="14" height="17" rx="2" />
                      <path d="M9 3.5h6v2H9z" fill="currentColor" stroke="none" />
                      <path d="M8.5 12.5l2 2 4.5-4.5" />
                      <path d="M8.5 17h7" />
                    </svg>
                  }
                }
              </div>

              <h3 class="mt-5 text-lg font-bold text-ink-900">{{ item.title }}</h3>
              <p class="mt-2.5 text-sm leading-relaxed text-ink-700/75">{{ item.description }}</p>

              <ul class="mt-5 space-y-2 border-t border-ink-900/[0.06] pt-5">
                @for (bullet of item.bullets; track bullet) {
                  <li class="flex items-center gap-2 text-sm text-ink-800">
                    <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"></span>
                    {{ bullet }}
                  </li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  protected readonly i18n = inject(I18nService);
}
