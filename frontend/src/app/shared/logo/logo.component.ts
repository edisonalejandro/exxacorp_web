import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center gap-2.5">
      <img
        src="/logo/octopus-serious-final.png"
        alt="Exxacorp"
        [style.width.px]="size()"
        [style.height.px]="size()"
        class="object-contain"
      />
      @if (showWordmark()) {
        <span
          class="font-display font-bold tracking-tight"
          [class.text-white]="tone() === 'onDark'"
          [class.text-ink-900]="tone() === 'onLight'"
          [style.font-size.px]="wordmarkSize()"
        >Exxacorp</span>
      }
    </span>
  `,
})
export class LogoComponent {
  readonly tone = input<'onDark' | 'onLight'>('onDark');
  readonly size = input(40);
  readonly wordmarkSize = input(20);
  readonly showWordmark = input(true);
}
