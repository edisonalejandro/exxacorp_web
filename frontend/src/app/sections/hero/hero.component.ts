import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { readStorage, writeStorage } from '../../core/storage';
import { OctopusShowcaseComponent } from './octopus-showcase.component';

const INTRO_SEEN_KEY = 'exxacorp-intro-seen';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [OctopusShowcaseComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="relative overflow-hidden bg-ink-950 pt-36 pb-24 lg:pt-44 lg:pb-28">
      <div class="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-700/30 blur-3xl"></div>
      <div class="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-900/40 blur-3xl"></div>

      <div class="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div class="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span class="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-violet-200 uppercase">
              {{ i18n.content().hero.eyebrow }}
            </span>

            <h1 class="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {{ i18n.content().hero.title }}
            </h1>

            <p class="mt-6 max-w-xl text-lg leading-relaxed text-violet-100/70">
              {{ i18n.content().hero.subtitle }}
            </p>

            <div class="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                data-motion-safe
                class="rounded-full bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-violet-400 hover:shadow-xl hover:shadow-violet-900/60 active:scale-[0.97]"
              >{{ i18n.content().hero.ctaPrimary }}</a>
              <a
                href="#servicios"
                data-motion-safe
                class="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-white/5 active:scale-[0.97]"
              >{{ i18n.content().hero.ctaSecondary }}</a>
            </div>
          </div>

          <div>
            @if (showIntro()) {
              <video
                #introVideo
                class="mx-auto aspect-video w-full max-w-md rounded-2xl border border-white/10 shadow-2xl shadow-violet-950/50 transition-opacity duration-300 ease-out"
                [class.opacity-0]="videoFading()"
                [muted]="true"
                [autoplay]="true"
                playsinline
                (ended)="dismissIntro()"
                (error)="dismissIntro()"
              >
                <source src="/assets/video/intro.mp4" type="video/mp4" />
              </video>
            } @else {
              <div class="transition-opacity duration-300 ease-out" [class.opacity-0]="!showcaseEntering()">
                <app-octopus-showcase />
              </div>
            }
            <p class="mt-5 text-center text-sm text-violet-100/50">{{ i18n.content().hero.visualHint }}</p>
          </div>
        </div>

        <dl class="mt-16 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-6 sm:mt-20">
          @for (stat of i18n.content().hero.stats; track stat.label) {
            <div class="flex flex-col items-center gap-1 px-2 text-center">
              <dd class="font-display text-2xl font-bold text-white sm:text-3xl">{{ stat.value }}</dd>
              <dt class="text-xs text-violet-100/60 sm:text-sm">{{ stat.label }}</dt>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly showIntro = signal(!readStorage(INTRO_SEEN_KEY));
  protected readonly videoFading = signal(false);
  protected readonly showcaseEntering = signal(!this.showIntro());
  private readonly introVideo = viewChild<ElementRef<HTMLVideoElement>>('introVideo');
  private dismissed = false;

  constructor() {
    effect(() => {
      const video = this.introVideo()?.nativeElement;
      if (video) {
        video.muted = true;
        video.play().catch(() => this.dismissIntro());
      }
    });
  }

  dismissIntro(): void {
    if (this.dismissed) return;
    this.dismissed = true;

    writeStorage(INTRO_SEEN_KEY, '1');
    this.videoFading.set(true);
    setTimeout(() => {
      this.showIntro.set(false);
      requestAnimationFrame(() => this.showcaseEntering.set(true));
    }, 300);
  }
}
