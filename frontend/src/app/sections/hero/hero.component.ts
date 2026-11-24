import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { OctopusShowcaseComponent } from './octopus-showcase.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [OctopusShowcaseComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="relative overflow-hidden bg-ink-950 pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div class="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-700/25 blur-3xl"></div>
      <div class="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-900/35 blur-3xl"></div>

      <div class="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <span class="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-violet-200 uppercase">
              {{ i18n.content().hero.eyebrow }}
            </span>

            <h1 class="mt-6 text-5xl leading-[1.05] font-bold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
              {{ i18n.content().hero.title }}
            </h1>

            <p class="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-violet-100/75">
              {{ i18n.content().hero.subtitle }}
            </p>

            <div class="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                data-motion-safe
                class="rounded-full bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-violet-400 hover:shadow-xl hover:shadow-violet-900/60 active:scale-[0.97]"
              >{{ i18n.content().hero.ctaPrimary }}</a>
              <a
                href="#entregables"
                data-motion-safe
                class="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-white/5 active:scale-[0.97]"
              >{{ i18n.content().hero.ctaSecondary }}</a>
            </div>
          </div>

          <div>
            <app-octopus-showcase />
          </div>
        </div>

        <ul class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 md:grid-cols-3">
          @for (item of i18n.content().hero.proof; track item.value) {
            <li class="flex items-start gap-3 bg-ink-950 px-5 py-5 sm:px-6">
              <svg class="mt-0.5 shrink-0 text-violet-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1z" />
                <path d="M8.5 12.2l2.4 2.4 4.6-4.6" />
              </svg>
              <div>
                <p class="font-display text-sm font-semibold text-white">{{ item.value }}</p>
                <p class="mt-1 text-sm text-violet-100/70">{{ item.label }}</p>
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
}
