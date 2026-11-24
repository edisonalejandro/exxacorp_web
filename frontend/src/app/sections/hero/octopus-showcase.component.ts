import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { prefersReducedMotion } from '../../core/reduced-motion';
import type { ServiceItem } from '../../core/translations';
import type { HotspotCorner, Octopus3DScene } from './octopus-3d-scene';

interface Hotspot {
  corner: HotspotCorner;
  /** Tied to the service by its icon, not its position in the list, so reordering services can't mislabel a hotspot. */
  service: ServiceItem['icon'];
  tooltipAlign: 'left' | 'right' | 'center';
  tooltipSide: 'top' | 'bottom';
}

const HOTSPOTS: Hotspot[] = [
  { corner: 'top', service: 'hardening', tooltipAlign: 'center', tooltipSide: 'bottom' },
  { corner: 'lowerRight', service: 'pentesting', tooltipAlign: 'right', tooltipSide: 'top' },
  { corner: 'lowerLeft', service: 'compliance', tooltipAlign: 'left', tooltipSide: 'top' },
];

const POSTER_SRC = '/logo/octopus-hero.webp';

/**
 * Touch devices (no hover, so no parallax) and reduced-motion users get the
 * static artwork instead of downloading and running the WebGL scene.
 */
function useStaticArtwork(): boolean {
  if (typeof window === 'undefined') return true;
  return prefersReducedMotion() || window.matchMedia?.('(hover: none)').matches === true;
}

@Component({
  selector: 'app-octopus-showcase',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'dismissTips()',
  },
  template: `
    <div
      class="relative mx-auto aspect-[413/465] w-full max-w-[15rem] select-none sm:max-w-[22rem] lg:max-w-sm"
      (pointerleave)="onLeave()"
      (pointermove)="onMove($event)"
    >
      <img
        [src]="posterSrc"
        alt=""
        width="413"
        height="465"
        decoding="async"
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
        [class.opacity-0]="ready()"
      />

      @if (!isStatic) {
        <canvas #canvas class="absolute inset-0 h-full w-full transition-opacity duration-500 ease-out" [class.opacity-0]="!ready()"></canvas>

        @if (ready()) {
          @for (spot of hotspots(); track spot.corner) {
            <div
              class="absolute -translate-x-1/2 -translate-y-1/2"
              [style.left.px]="positions()[spot.corner].x"
              [style.top.px]="positions()[spot.corner].y"
              (pointerenter)="showTip(spot.corner)"
              (pointerleave)="hideTip(spot.corner)"
            >
              <button
                type="button"
                class="relative flex h-6 w-6 items-center justify-center"
                (focus)="showTip(spot.corner)"
                (blur)="hideTip(spot.corner)"
                (click)="toggleTip(spot.corner)"
                [attr.aria-describedby]="'hotspot-desc-' + spot.corner"
              >
                <span class="sr-only">{{ spot.item.title }}</span>
                <span class="absolute h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_0_4px_rgba(167,139,250,0.25)]" aria-hidden="true"></span>
              </button>

              <!-- Always in the DOM so aria-describedby resolves; hidden visually until active.
                   Being a sibling inside the hover wrapper keeps it open while the pointer moves onto it (WCAG 1.4.13). -->
              <div
                role="tooltip"
                class="absolute z-10 w-52 rounded-xl border border-white/10 bg-ink-900/95 p-3 text-left text-sm shadow-xl backdrop-blur"
                [class.hidden]="active() !== spot.corner"
                [class.left-0]="spot.tooltipAlign === 'left'"
                [class.right-0]="spot.tooltipAlign === 'right'"
                [class.left-1/2]="spot.tooltipAlign === 'center'"
                [class.-translate-x-1/2]="spot.tooltipAlign === 'center'"
                [class.top-7]="spot.tooltipSide === 'bottom'"
                [class.bottom-7]="spot.tooltipSide === 'top'"
              >
                <p class="font-display font-semibold text-white">{{ spot.item.title }}</p>
                <p [id]="'hotspot-desc-' + spot.corner" class="mt-1 text-xs leading-relaxed text-violet-100/75">{{ spot.item.description }}</p>
              </div>
            </div>
          }
        }
      }
    </div>
  `,
})
export class OctopusShowcaseComponent implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(I18nService);
  protected readonly isStatic = useStaticArtwork();
  protected readonly posterSrc = POSTER_SRC;

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  protected readonly ready = signal(false);
  protected readonly positions = signal<Record<HotspotCorner, { x: number; y: number }>>({
    top: { x: -100, y: -100 },
    lowerRight: { x: -100, y: -100 },
    lowerLeft: { x: -100, y: -100 },
  });

  protected readonly hotspots = computed(() => {
    const items = this.i18n.content().services.items;
    return HOTSPOTS.map((spot) => ({ ...spot, item: items.find((i) => i.icon === spot.service)! }));
  });

  private readonly hovered = signal<HotspotCorner | null>(null);
  private readonly pinned = signal<HotspotCorner | null>(null);
  protected readonly active = computed(() => this.pinned() ?? this.hovered());

  private scene?: Octopus3DScene;
  private resizeObserver?: ResizeObserver;
  private visibilityObserver?: IntersectionObserver;
  private destroyed = false;

  async ngAfterViewInit(): Promise<void> {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const container = canvas.parentElement!;

    const { Octopus3DScene } = await import('./octopus-3d-scene');
    if (this.destroyed) return;
    this.scene = new Octopus3DScene(canvas);
    this.scene.onHotspots((positions) => this.positions.set(positions));
    this.scene.onReady(() => this.ready.set(true));

    const resize = () => {
      const rect = container.getBoundingClientRect();
      this.scene?.resize(rect.width, rect.height);
    };
    resize();
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(container);

    this.visibilityObserver = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? this.scene?.resume() : this.scene?.pause(),
    );
    this.visibilityObserver.observe(container);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.scene?.dispose();
  }

  onLeave(): void {
    this.scene?.resetPointer();
    this.hovered.set(null);
  }

  onMove(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    this.scene?.setPointer(nx, ny);
  }

  showTip(corner: HotspotCorner): void {
    this.hovered.set(corner);
  }

  hideTip(corner: HotspotCorner): void {
    if (this.hovered() === corner) {
      this.hovered.set(null);
    }
  }

  /** Escape dismisses any open tooltip without moving focus (WCAG 1.4.13 "dismissible"). */
  protected dismissTips(): void {
    this.hovered.set(null);
    this.pinned.set(null);
  }

  toggleTip(corner: HotspotCorner): void {
    this.pinned.set(this.pinned() === corner ? null : corner);
  }
}
