import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
        <a href="#inicio" class="shrink-0" (click)="closeMenu()">
          <app-logo tone="onDark" [size]="34" [wordmarkSize]="18" />
        </a>

        <nav class="hidden items-center gap-8 md:flex">
          <a href="#inicio" class="text-sm font-medium text-violet-100/80 transition hover:text-white">{{ i18n.content().nav.home }}</a>
          <a href="#servicios" class="text-sm font-medium text-violet-100/80 transition hover:text-white">{{ i18n.content().nav.services }}</a>
          <a href="#nosotros" class="text-sm font-medium text-violet-100/80 transition hover:text-white">{{ i18n.content().nav.about }}</a>
          <a href="#contacto" class="text-sm font-medium text-violet-100/80 transition hover:text-white">{{ i18n.content().nav.contact }}</a>
        </nav>

        <div class="hidden items-center gap-4 md:flex">
          <button
            type="button"
            (click)="i18n.toggle()"
            class="flex items-center rounded-full border border-white/15 p-0.5 text-xs font-semibold text-violet-100/70"
            [attr.aria-label]="'Switch language'"
          >
            <span class="rounded-full px-2.5 py-1 transition" [class.bg-violet-500]="i18n.lang() === 'es'" [class.text-white]="i18n.lang() === 'es'">ES</span>
            <span class="rounded-full px-2.5 py-1 transition" [class.bg-violet-500]="i18n.lang() === 'en'" [class.text-white]="i18n.lang() === 'en'">EN</span>
          </button>
          <a
            href="#contacto"
            class="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-900/40 transition hover:bg-violet-400"
          >{{ i18n.content().nav.cta }}</a>
        </div>

        <button
          type="button"
          class="flex items-center justify-center rounded-lg border border-white/15 p-2 text-white md:hidden"
          (click)="menuOpen.set(!menuOpen())"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            @if (!menuOpen()) {
              <path d="M4 6h16M4 12h16M4 18h16" />
            } @else {
              <path d="M6 6l12 12M18 6L6 18" />
            }
          </svg>
        </button>
      </div>

      @if (menuOpen()) {
        <div class="border-t border-white/10 bg-ink-950 px-6 py-4 md:hidden">
          <nav class="flex flex-col gap-4">
            <a href="#inicio" (click)="closeMenu()" class="text-sm font-medium text-violet-100/80">{{ i18n.content().nav.home }}</a>
            <a href="#servicios" (click)="closeMenu()" class="text-sm font-medium text-violet-100/80">{{ i18n.content().nav.services }}</a>
            <a href="#nosotros" (click)="closeMenu()" class="text-sm font-medium text-violet-100/80">{{ i18n.content().nav.about }}</a>
            <a href="#contacto" (click)="closeMenu()" class="text-sm font-medium text-violet-100/80">{{ i18n.content().nav.contact }}</a>
            <div class="flex items-center justify-between pt-2">
              <button
                type="button"
                (click)="i18n.toggle()"
                class="flex items-center rounded-full border border-white/15 p-0.5 text-xs font-semibold text-violet-100/70"
              >
                <span class="rounded-full px-2.5 py-1" [class.bg-violet-500]="i18n.lang() === 'es'" [class.text-white]="i18n.lang() === 'es'">ES</span>
                <span class="rounded-full px-2.5 py-1" [class.bg-violet-500]="i18n.lang() === 'en'" [class.text-white]="i18n.lang() === 'en'">EN</span>
              </button>
              <a
                href="#contacto"
                (click)="closeMenu()"
                class="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white"
              >{{ i18n.content().nav.cta }}</a>
            </div>
          </nav>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly menuOpen = signal(false);

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
