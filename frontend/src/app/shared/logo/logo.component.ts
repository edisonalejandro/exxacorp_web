import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center gap-2.5">
      <svg
        [attr.width]="size()"
        [attr.height]="size()"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="96,50 73,10.2 27,10.2 4,50 27,89.8 73,89.8"
          [attr.stroke]="tone() === 'onDark' ? 'white' : 'var(--color-ink-900)'"
          stroke-width="3.2"
        />
        <g id="exxacorp-mark">
          <ellipse cx="50" cy="38" rx="15.5" ry="13" fill="currentColor" />
          <path
            d="M34,50 C24,58 16,68 15,82 C15,85 17,88 20,90"
            stroke="currentColor" stroke-width="4.6" fill="none" stroke-linecap="round"
          />
          <path
            d="M40,50 C33,60 28,72 27,84 C27,87 29,89 31,91"
            stroke="currentColor" stroke-width="4.6" fill="none" stroke-linecap="round"
          />
          <path
            d="M45,51 C41,63 38,75 39,86 C39,88 40,90 41,92"
            stroke="currentColor" stroke-width="4.6" fill="none" stroke-linecap="round"
          />
          <path
            d="M55,51 C59,63 62,75 61,86 C61,88 60,90 59,92"
            stroke="currentColor" stroke-width="4.6" fill="none" stroke-linecap="round"
          />
          <path
            d="M60,50 C67,60 72,72 73,84 C73,87 71,89 69,91"
            stroke="currentColor" stroke-width="4.6" fill="none" stroke-linecap="round"
          />
          <path
            d="M66,50 C76,58 84,68 85,82 C85,85 83,88 80,90"
            stroke="currentColor" stroke-width="4.6" fill="none" stroke-linecap="round"
          />
        </g>
        <clipPath id="exxacorp-right-half">
          <rect x="50" y="0" width="50" height="100" />
        </clipPath>
        <use href="#exxacorp-mark" [attr.color]="darkPurple" />
        <use href="#exxacorp-mark" [attr.color]="lightPurple" clip-path="url(#exxacorp-right-half)" />
      </svg>
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

  readonly darkPurple = '#4c1d95';
  readonly lightPurple = '#a78bfa';
}
