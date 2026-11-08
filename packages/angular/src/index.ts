import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core'
import { renderSproutsSvg, type Density, type Variant } from '@mariosakka/sprouts'
@Component({ selector: 'sprouts', standalone: true, template: '', host: { '[attr.aria-hidden]': "'true'", 'class': 'sprouts' } })
export class SproutsComponent implements AfterViewInit, OnDestroy {
  @Input() seed: string | number = 1; @Input() variant: Variant | 'auto' = 'auto'; @Input() density: Density = 2; @Input() reach?: number; @Input() static = false; private frame = 0
  constructor(private readonly host: ElementRef<HTMLElement>) {}
  ngAfterViewInit() { const start = performance.now(); const draw = (now: number) => { const el = this.host.nativeElement; const p = this.static ? 1 : Math.min(1, (now - start) / 2800); el.innerHTML = renderSproutsSvg({ seed: this.seed, variant: this.variant, density: this.density, reach: this.reach, width: el.parentElement?.clientWidth || 320, height: el.parentElement?.clientHeight || 200, progress: p }); if (p < 1) this.frame = requestAnimationFrame(draw) }; this.frame = requestAnimationFrame(draw) }
  ngOnDestroy() { cancelAnimationFrame(this.frame) }
}
