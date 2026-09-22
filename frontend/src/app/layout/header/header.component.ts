import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { LogoComponent } from '../../shared/logo/logo.component';

const SECTION_IDS = ['inicio', 'servicios', 'nosotros', 'contacto'] as const;

interface NavLink {
  id: (typeof SECTION_IDS)[number];
  href: string;
  label: string;
}

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
          @for (link of navLinks(); track link.id) {
            <a
              [href]="link.href"
              data-motion-safe
              class="group relative py-1 text-sm font-medium text-violet-100/80 transition-colors duration-200 hover:text-white"
              [class.text-white]="activeSection() === link.id"
            >
              {{ link.label }}
              <span
                class="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-violet-400 transition-transform duration-300 ease-out group-hover:scale-x-100"
                [class.scale-x-100]="activeSection() === link.id"
              ></span>
            </a>
          }
        </nav>

        <div class="hidden items-center gap-4 md:flex">
          <button
            type="button"
            (click)="i18n.toggle()"
            data-motion-safe
            class="relative flex items-center overflow-hidden rounded-full border border-white/15 p-0.5 text-xs font-semibold text-violet-100/70 active:scale-95"
            [attr.aria-label]="'Switch language'"
          >
            <span
              class="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-violet-500 transition-transform duration-300 ease-out"
              [class.translate-x-full]="i18n.lang() === 'en'"
            ></span>
            <span class="relative z-10 rounded-full px-2.5 py-1 transition-colors duration-200" [class.text-white]="i18n.lang() === 'es'">ES</span>
            <span class="relative z-10 rounded-full px-2.5 py-1 transition-colors duration-200" [class.text-white]="i18n.lang() === 'en'">EN</span>
          </button>
          <a
            href="#contacto"
            data-motion-safe
            class="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-900/40 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-violet-400 hover:shadow-md hover:shadow-violet-900/50 active:scale-95"
          >{{ i18n.content().nav.cta }}</a>
        </div>

        <button
          type="button"
          data-motion-safe
          class="flex items-center justify-center rounded-lg border border-white/15 p-2 text-white transition-transform duration-150 active:scale-90 md:hidden"
          (click)="menuOpen.set(!menuOpen())"
          [attr.aria-expanded]="menuOpen()"
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

      <div
        data-motion-safe
        class="grid overflow-hidden border-t border-white/10 bg-ink-950 transition-[grid-template-rows] duration-300 ease-out md:hidden"
        [style.gridTemplateRows]="menuOpen() ? '1fr' : '0fr'"
      >
        <nav class="flex min-h-0 flex-col gap-4 px-6 py-4">
          @for (link of navLinks(); track link.id) {
            <a
              [href]="link.href"
              (click)="closeMenu()"
              class="text-sm font-medium text-violet-100/80 transition-colors duration-200"
              [class.text-white]="activeSection() === link.id"
            >{{ link.label }}</a>
          }
          <div class="flex items-center justify-between pt-2">
            <button
              type="button"
              (click)="i18n.toggle()"
              data-motion-safe
              class="relative flex items-center overflow-hidden rounded-full border border-white/15 p-0.5 text-xs font-semibold text-violet-100/70 active:scale-95"
            >
              <span
                class="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-violet-500 transition-transform duration-300 ease-out"
                [class.translate-x-full]="i18n.lang() === 'en'"
              ></span>
              <span class="relative z-10 rounded-full px-2.5 py-1 transition-colors duration-200" [class.text-white]="i18n.lang() === 'es'">ES</span>
              <span class="relative z-10 rounded-full px-2.5 py-1 transition-colors duration-200" [class.text-white]="i18n.lang() === 'en'">EN</span>
            </button>
            <a
              href="#contacto"
              (click)="closeMenu()"
              data-motion-safe
              class="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 active:scale-95"
            >{{ i18n.content().nav.cta }}</a>
          </div>
        </nav>
      </div>
    </header>

    <div
      data-motion-safe
      class="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden"
      [class.opacity-100]="menuOpen()"
      [class.opacity-0]="!menuOpen()"
      [class.pointer-events-none]="!menuOpen()"
      (click)="closeMenu()"
    ></div>
  `,
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(I18nService);
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal<string>('inicio');

  protected readonly navLinks = computed<NavLink[]>(() => {
    const nav = this.i18n.content().nav;
    return [
      { id: 'inicio', href: '#inicio', label: nav.home },
      { id: 'servicios', href: '#servicios', label: nav.services },
      { id: 'nosotros', href: '#nosotros', label: nav.about },
      { id: 'contacto', href: '#contacto', label: nav.contact },
    ];
  });

  private sectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    elements.forEach((el) => this.sectionObserver!.observe(el));
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
