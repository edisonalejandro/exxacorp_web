import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="nosotros" class="bg-mist-100 py-24 lg:py-32">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span class="text-xs font-semibold tracking-wide text-violet-600 uppercase">{{ i18n.content().about.eyebrow }}</span>
            <h2 class="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">{{ i18n.content().about.title }}</h2>
            @for (p of i18n.content().about.paragraphs; track p) {
              <p class="mt-5 text-base leading-relaxed text-ink-700/80">{{ p }}</p>
            }
          </div>

          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            @for (member of i18n.content().about.team; track member.role) {
              <div class="flex flex-col items-center rounded-2xl border border-ink-900/[0.06] bg-white px-4 py-6 text-center shadow-sm">
                <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-800 to-violet-400 font-display text-sm font-bold text-white">
                  {{ member.initials }}
                </div>
                <p class="mt-3 text-xs leading-snug font-semibold text-ink-800">{{ member.role }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly i18n = inject(I18nService);
}
