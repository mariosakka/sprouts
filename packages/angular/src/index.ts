import { ChangeDetectionStrategy, Component, ElementRef, afterRenderEffect, inject, input } from '@angular/core'
import { renderSproutsSvg, type Density, type Variant } from '@mariosakka/sprouts'

@Component({
  selector: 'sprouts',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'sprouts' },
})
export class SproutsComponent {
  readonly seed = input<string | number>(1)
  readonly variant = input<Variant | 'auto'>('auto')
  readonly density = input<Density>(2)
  readonly reach = input<number | undefined>(undefined)
  readonly static = input(false)

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    // afterRenderEffect only runs in the browser (SSR-safe) and re-runs when any input changes.
    afterRenderEffect((onCleanup) => {
      const { seed, variant, density, reach } = { seed: this.seed(), variant: this.variant(), density: this.density(), reach: this.reach() }
      const still = this.static()
      const start = performance.now()
      let id = 0
      const draw = (now: number) => {
        const progress = still ? 1 : Math.min(1, (now - start) / 2800)
        el.innerHTML = renderSproutsSvg({ seed, variant, density, reach, width: el.parentElement?.clientWidth || 320, height: el.parentElement?.clientHeight || 200, progress })
        if (progress < 1) id = requestAnimationFrame(draw)
      }
      id = requestAnimationFrame(draw)
      onCleanup(() => cancelAnimationFrame(id))
    })
  }
}
