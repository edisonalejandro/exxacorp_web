import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-ink-950 pt-16 pb-8">
      <div class="mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid gap-12 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <app-logo tone="onDark" [size]="32" [wordmarkSize]="17" />
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-violet-100/55">{{ i18n.content().footer.tagline }}</p>

            <div class="mt-5 flex items-center gap-3">
              <a href="#" aria-label="LinkedIn" class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-violet-100/60 transition hover:border-violet-400/40 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.98h4v12.02H3zM9.5 8.98H13v1.64h.05c.5-.9 1.7-1.84 3.5-1.84 3.75 0 4.45 2.35 4.45 5.4v6.82h-4v-6.05c0-1.44-.03-3.3-2.05-3.3-2.05 0-2.37 1.55-2.37 3.2v6.15h-4z"/></svg>
              </a>
              <a href="#" aria-label="GitHub" class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-violet-100/60 transition hover:border-violet-400/40 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.84.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0012 2z"/></svg>
              </a>
              <a href="#" aria-label="X" class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-violet-100/60 transition hover:border-violet-400/40 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-6.9L4.8 22H1.7l8-9.2L.9 2h7.1l4.9 6.3L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z"/></svg>
              </a>
            </div>
          </div>

          @for (col of i18n.content().footer.columns; track col.title) {
            <div>
              <h4 class="text-sm font-semibold text-white">{{ col.title }}</h4>
              <ul class="mt-4 space-y-2.5">
                @for (link of col.links; track link) {
                  <li><span class="text-sm text-violet-100/55">{{ link }}</span></li>
                }
              </ul>
            </div>
          }
        </div>

        <div class="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-violet-100/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {{ year }} Exxacorp. {{ i18n.content().footer.rights }}</span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly year = new Date().getFullYear();
}
