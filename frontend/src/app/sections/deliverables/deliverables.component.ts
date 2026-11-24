import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-deliverables',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="entregables" class="bg-white py-24 lg:py-32">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="text-xs font-semibold tracking-wide text-violet-600 uppercase">{{ i18n.content().deliverables.eyebrow }}</span>
          <h2 class="mt-3 text-3xl font-bold text-balance text-ink-900 sm:text-4xl">{{ i18n.content().deliverables.title }}</h2>
          <p class="mt-4 text-lg leading-relaxed text-ink-700/80">{{ i18n.content().deliverables.subtitle }}</p>
        </div>

        <h3 class="mt-14 text-xs font-semibold tracking-wide text-ink-700/70 uppercase">{{ i18n.content().deliverables.processLabel }}</h3>
        <ol class="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          @for (step of i18n.content().deliverables.steps; track step.title; let i = $index; let last = $last) {
            <li class="relative lg:pr-8">
              <div class="flex items-center">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-300 bg-violet-100/60 font-display text-sm font-semibold text-violet-700">
                  {{ i + 1 }}
                </span>
                @if (!last) {
                  <span class="ml-3 hidden h-px flex-1 bg-ink-900/10 lg:block" aria-hidden="true"></span>
                }
              </div>
              <p class="mt-4 font-display text-base font-semibold text-ink-900">{{ step.title }}</p>
              <p class="mt-1.5 text-sm leading-relaxed text-ink-700/80">{{ step.description }}</p>
            </li>
          }
        </ol>

        <h3 class="mt-16 text-xs font-semibold tracking-wide text-ink-700/70 uppercase">{{ i18n.content().deliverables.itemsLabel }}</h3>
        <div class="mt-5 grid gap-5 sm:grid-cols-2">
          @for (item of i18n.content().deliverables.items; track item.title) {
            <article class="flex gap-4 rounded-2xl border border-ink-900/[0.08] bg-mist-50 p-6">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-violet-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13.5l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h4 class="font-display text-base font-semibold text-ink-900">{{ item.title }}</h4>
                <p class="mt-1.5 text-sm leading-relaxed text-ink-700/80">{{ item.description }}</p>
              </div>
            </article>
          }
        </div>

        <div class="mt-10">
          <a
            href="/#contacto"
            data-motion-safe
            class="inline-flex items-center justify-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-[background-color,transform] duration-200 ease-out hover:bg-violet-500 active:scale-95"
          >{{ i18n.content().deliverables.cta }}</a>
        </div>
      </div>
    </section>
  `,
})
export class DeliverablesComponent {
  protected readonly i18n = inject(I18nService);
}
