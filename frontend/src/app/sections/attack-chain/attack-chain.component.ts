import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, computed, inject, signal, viewChild } from '@angular/core';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';
import { I18nService } from '../../core/i18n.service';
import type { AttackChainScene } from './attack-chain-scene';

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

@Component({
  selector: 'app-attack-chain',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="metodologia" class="relative bg-ink-950">
      <div class="relative mx-auto max-w-6xl px-6 pt-24 lg:px-8 lg:pt-32">
        <span class="text-xs font-semibold tracking-wide text-violet-300 uppercase">{{ i18n.content().attackChain.eyebrow }}</span>
        <h2 class="mt-3 max-w-2xl text-3xl font-bold text-balance text-white sm:text-4xl">{{ i18n.content().attackChain.title }}</h2>
      </div>

      <div #wrapper class="relative" style="height: 260vh">
      <div class="sticky top-0 h-screen overflow-hidden">
        <div class="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-violet-700/20 blur-3xl"></div>

        <div class="relative mx-auto grid h-full max-w-6xl grid-cols-1 content-center items-center gap-2 px-6 pt-[4.5rem] lg:grid-cols-[0.8fr_1.2fr] lg:gap-8 lg:px-8 lg:pt-0">
          <div class="relative border-l border-white/15 pl-8">
            <span
              class="absolute -left-[5px] h-2.5 w-2.5 bg-white transition-[top] duration-300 ease-out"
              [style.top.px]="dotTop()"
            ></span>

            @for (phase of i18n.content().attackChain.phases; track phase.tag; let i = $index) {
              <!-- Below lg only the active phase is shown, so the column fits a phone screen next to the canvas. -->
              <div
                class="relative py-6 transition-opacity duration-300 lg:block"
                [class.hidden]="activePhase() !== i"
                [style.opacity]="activePhase() === i ? 1 : 0.45"
              >
                <span class="font-display text-xs font-semibold tracking-[0.2em] text-white/80">{{ phase.tag }}</span>
                <h3 class="mt-2 text-3xl font-light text-white sm:text-4xl">{{ phase.title }}</h3>
                <p
                  class="mt-3 max-w-md overflow-hidden text-base leading-relaxed text-violet-100/70 transition-[max-height,opacity] duration-300"
                  [style.maxHeight.px]="activePhase() === i ? 120 : 0"
                  [style.opacity]="activePhase() === i ? 1 : 0"
                >
                  {{ phase.description }}
                </p>
              </div>
            }
          </div>

          <div class="relative h-[42vh] lg:h-[70vh]">
            <canvas #canvas class="h-full w-full"></canvas>
            <div #labels class="pointer-events-none absolute inset-0"></div>

            <div
              class="pointer-events-none absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-3 font-display text-[11px] tracking-[0.15em] text-white/70"
              [style.opacity]="securityStackOpacity()"
            >
              <span class="h-px w-10 bg-white/30 sm:w-16"></span>
              <span class="leading-tight">
                {{ i18n.content().attackChain.securityStackLabel[0] }}<br />
                {{ i18n.content().attackChain.securityStackLabel[1] }}
              </span>
            </div>

            <div
              class="pointer-events-none absolute right-0 bottom-2 max-w-[240px] text-right font-display text-[11px] tracking-[0.1em] text-white/70"
              [style.opacity]="objectiveOpacity()"
            >
              <div class="font-semibold text-white">{{ i18n.content().attackChain.objectiveLabel }}</div>
              <div class="mt-1 leading-relaxed">{{ objectiveItemsJoined() }}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  `,
})
export class AttackChainComponent implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(I18nService);

  private readonly wrapperRef = viewChild.required<ElementRef<HTMLElement>>('wrapper');
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly labelsRef = viewChild.required<ElementRef<HTMLElement>>('labels');

  protected readonly progress = signal(0);
  protected readonly activePhase = computed(() => {
    const t = this.progress();
    if (t < 0.34) return 0;
    if (t < 0.7) return 1;
    return 2;
  });
  /** On lg every phase is stacked (152 px apart); below lg only the active one is rendered, so the dot stays on it. */
  private readonly isLg = signal(typeof window !== 'undefined' && window.matchMedia?.('(min-width: 1024px)').matches === true);
  protected readonly dotTop = computed(() => (this.isLg() ? 24 + this.activePhase() * 152 : 24));
  protected readonly securityStackOpacity = computed(() => {
    const t = this.progress();
    return Math.min(clamp01((t - 0.4) / 0.08), 1 - clamp01((t - 0.8) / 0.08));
  });
  protected readonly objectiveOpacity = computed(() => clamp01((this.progress() - 0.86) / 0.08));
  protected readonly objectiveItemsJoined = computed(() => this.i18n.content().attackChain.objectiveItems.join(' | '));

  private scene?: AttackChainScene;
  private scrollTrigger?: ScrollTrigger;
  private resizeObserver?: ResizeObserver;
  private visibilityObserver?: IntersectionObserver;

  private readonly lgQuery = typeof window !== 'undefined' ? window.matchMedia?.('(min-width: 1024px)') : undefined;
  private readonly onLgChange = (e: MediaQueryListEvent) => this.isLg.set(e.matches);

  async ngAfterViewInit(): Promise<void> {
    this.lgQuery?.addEventListener('change', this.onLgChange);
    const canvas = this.canvasRef().nativeElement;
    const labelsEl = this.labelsRef().nativeElement;
    const parent = canvas.parentElement!;

    const [{ gsap }, { ScrollTrigger }, { AttackChainScene }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('./attack-chain-scene'),
    ]);
    gsap.registerPlugin(ScrollTrigger);

    this.scene = new AttackChainScene(canvas, labelsEl, this.i18n.content().attackChain.categories);

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      this.scene?.resize(rect.width, rect.height);
    };
    resize();
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(parent);

    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? this.scene?.resume() : this.scene?.pause()),
    );
    this.visibilityObserver.observe(this.wrapperRef().nativeElement);

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.wrapperRef().nativeElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        this.progress.set(self.progress);
        this.scene?.setProgress(self.progress);
      },
    });
  }

  ngOnDestroy(): void {
    this.lgQuery?.removeEventListener('change', this.onLgChange);
    this.scrollTrigger?.kill();
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.scene?.dispose();
  }
}
