import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="relative overflow-hidden bg-ink-950 pt-36 pb-24 lg:pt-44 lg:pb-28">
      <div class="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-700/30 blur-3xl"></div>
      <div class="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-900/40 blur-3xl"></div>

      <div class="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-violet-200 uppercase">
            {{ i18n.content().hero.eyebrow }}
          </span>

          <h1 class="mt-6 text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-[3.4rem]">
            {{ i18n.content().hero.title }}
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-relaxed text-violet-100/70">
            {{ i18n.content().hero.subtitle }}
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              class="rounded-full bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:bg-violet-400"
            >{{ i18n.content().hero.ctaPrimary }}</a>
            <a
              href="#servicios"
              class="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
            >{{ i18n.content().hero.ctaSecondary }}</a>
          </div>
        </div>

        <div class="relative">
          <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <div class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full bg-violet-400/60"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-violet-400/40"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-violet-400/25"></span>
            </div>

            <dl class="mt-6 divide-y divide-white/10">
              @for (stat of i18n.content().hero.stats; track stat.label) {
                <div class="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                  <dt class="text-sm text-violet-100/60">{{ stat.label }}</dt>
                  <dd class="font-display text-2xl font-bold text-white">{{ stat.value }}</dd>
                </div>
              }
            </dl>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
}
