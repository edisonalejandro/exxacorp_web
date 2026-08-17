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
import type { Octopus3DScene } from './octopus-3d-scene';

interface Hotspot {
  serviceIndex: number;
  tooltipAlign: 'left' | 'right' | 'center';
  tooltipSide: 'top' | 'bottom';
}

const HOTSPOTS: Hotspot[] = [
  { serviceIndex: 0, tooltipAlign: 'center', tooltipSide: 'bottom' }, // top
  { serviceIndex: 1, tooltipAlign: 'right', tooltipSide: 'bottom' }, // upper-right
  { serviceIndex: 2, tooltipAlign: 'right', tooltipSide: 'top' }, // lower-right
  { serviceIndex: 3, tooltipAlign: 'center', tooltipSide: 'top' }, // bottom
  { serviceIndex: 4, tooltipAlign: 'left', tooltipSide: 'top' }, // lower-left
  { serviceIndex: 5, tooltipAlign: 'left', tooltipSide: 'bottom' }, // upper-left
];

@Component({
  selector: 'app-octopus-showcase',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative mx-auto aspect-[413/465] w-full max-w-md select-none"
      (pointerenter)="onEnter()"
      (pointerleave)="onLeave()"
      (pointermove)="onMove($event)"
    >
      <canvas #canvas class="absolute inset-0 h-full w-full"></canvas>

      @for (spot of hotspots; track spot.serviceIndex; let i = $index) {
        <button
          type="button"
          class="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          [style.left.px]="hotspotPositions()[i].x"
          [style.top.px]="hotspotPositions()[i].y"
          (pointerenter)="showTip(spot.serviceIndex)"
          (pointerleave)="hideTip(spot.serviceIndex)"
          (focus)="showTip(spot.serviceIndex)"
          (blur)="hideTip(spot.serviceIndex)"
          (click)="toggleTip(spot.serviceIndex)"
          [attr.aria-label]="i18n.content().services.items[spot.serviceIndex].title"
        >
          <span class="absolute h-2.5 w-2.5 animate-ping rounded-full bg-violet-300/70"></span>
          <span class="absolute h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_0_4px_rgba(167,139,250,0.25)]"></span>

          @if (active() === spot.serviceIndex) {
            <div
              class="absolute z-10 w-48 rounded-xl border border-white/10 bg-ink-900/95 p-3 text-left text-sm shadow-xl backdrop-blur"
              [class.left-0]="spot.tooltipAlign === 'left'"
              [class.right-0]="spot.tooltipAlign === 'right'"
              [class.left-1/2]="spot.tooltipAlign === 'center'"
              [class.-translate-x-1/2]="spot.tooltipAlign === 'center'"
              [class.top-7]="spot.tooltipSide === 'bottom'"
              [class.bottom-7]="spot.tooltipSide === 'top'"
            >
              <p class="font-display font-semibold text-white">{{ i18n.content().services.items[spot.serviceIndex].title }}</p>
              <p class="mt-1 text-xs leading-relaxed text-violet-100/70">{{ i18n.content().services.items[spot.serviceIndex].description }}</p>
            </div>
          }
        </button>
      }
    </div>
  `,
})
export class OctopusShowcaseComponent implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(I18nService);
  protected readonly hotspots = HOTSPOTS;

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  protected readonly hotspotPositions = signal(HOTSPOTS.map(() => ({ x: -100, y: -100 })));

  private readonly hovered = signal<number | null>(null);
  private readonly pinned = signal<number | null>(null);
  protected readonly active = computed(() => this.pinned() ?? this.hovered());

  private scene?: Octopus3DScene;
  private resizeObserver?: ResizeObserver;

  async ngAfterViewInit(): Promise<void> {
    const canvas = this.canvasRef().nativeElement;
    const container = canvas.parentElement!;

    const { Octopus3DScene } = await import('./octopus-3d-scene');
    this.scene = new Octopus3DScene(canvas);
    this.scene.onHotspots((positions) => this.hotspotPositions.set(positions));

    const resize = () => {
      const rect = container.getBoundingClientRect();
      this.scene?.resize(rect.width, rect.height);
    };
    resize();
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(container);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.scene?.dispose();
  }

  onEnter(): void {
    this.scene?.setMood(true);
  }

  onLeave(): void {
    this.scene?.setMood(false);
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

  showTip(i: number): void {
    this.hovered.set(i);
  }

  hideTip(i: number): void {
    if (this.hovered() === i) {
      this.hovered.set(null);
    }
  }

  toggleTip(i: number): void {
    this.pinned.set(this.pinned() === i ? null : i);
  }
}
