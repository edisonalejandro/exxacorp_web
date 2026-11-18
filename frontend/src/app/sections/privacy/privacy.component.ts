import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  effect,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { I18nService } from '../../core/i18n.service';
import { privacyContent } from '../../core/privacy-content';

/** Página /privacidad. El contenido vive en core/privacy-content.ts. */
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-mist-50 pt-32 pb-24 sm:pt-40">
      <article class="mx-auto max-w-3xl px-5 sm:px-8">
        <p class="text-sm font-semibold tracking-wide text-violet-600 uppercase">
          {{ c().eyebrow }}
        </p>
        <h1 class="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          {{ c().title }}
        </h1>
        <p class="mt-3 text-sm text-ink-600">{{ c().meta }}</p>
        <p class="mt-8 text-base leading-relaxed text-ink-700">{{ c().intro }}</p>

        @for (s of c().sections; track s.title) {
          <section class="mt-10">
            <h2 class="font-display text-xl font-semibold text-ink-900">{{ s.title }}</h2>
            @if (s.bulletsFirst) {
              <ng-container *ngTemplateOutlet="vinetas; context: { $implicit: s.bullets }" />
              <ng-container *ngTemplateOutlet="parrafos; context: { $implicit: s.paragraphs }" />
            } @else {
              <ng-container *ngTemplateOutlet="parrafos; context: { $implicit: s.paragraphs }" />
              <ng-container *ngTemplateOutlet="vinetas; context: { $implicit: s.bullets }" />
            }
            @if (s.table) {
              <div class="mt-4 overflow-x-auto rounded-xl border border-mist-200 bg-white">
                <table class="w-full text-left text-sm">
                  <thead class="bg-mist-100 text-ink-700">
                    <tr>
                      <th scope="col" class="px-4 py-3 font-semibold">{{ s.table.head[0] }}</th>
                      <th scope="col" class="px-4 py-3 font-semibold">{{ s.table.head[1] }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-mist-200 text-ink-700">
                    @for (row of s.table.rows; track row[0]) {
                      <tr>
                        <td class="px-4 py-3 align-top">{{ row[0] }}</td>
                        <td class="px-4 py-3 align-top">{{ row[1] }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </section>
        }

        <a
          href="/"
          class="mt-14 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-500"
        >
          <span aria-hidden="true">←</span> {{ c().back }}
        </a>
      </article>
    </section>

    <ng-template #parrafos let-items>
      @for (p of items ?? []; track p) {
        <p class="mt-3 text-base leading-relaxed text-ink-700">{{ p }}</p>
      }
    </ng-template>
    <ng-template #vinetas let-items>
      @if (items?.length) {
        <ul class="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-700">
          @for (b of items; track b) {
            <li>{{ b }}</li>
          }
        </ul>
      }
    </ng-template>
  `,
})
export class PrivacyComponent {
  private readonly i18n = inject(I18nService);
  protected readonly c = computed(() => privacyContent[this.i18n.lang()]);

  constructor() {
    const doc = inject(DOCUMENT);
    effect(() => {
      doc.title = `${this.c().title} | Exxacorp`;
    });
  }
}
