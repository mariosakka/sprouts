export type Variant = 'corners' | 'edge' | 'wrap' | 'hang' | 'climb' | 'burst'
export type Density = 1 | 2 | 3
export interface SproutsOptions { seed: string | number; width: number; height: number; variant?: Variant | 'auto'; density?: Density; reach?: number }
export interface Vine { d: string; delay: number; duration: number }
export interface Layout { width: number; height: number; reach: number; variant: Variant; vines: Vine[]; total: number }
export interface SvgFrameOptions extends SproutsOptions { progress?: number }
const variants: Variant[] = ['corners', 'edge', 'wrap', 'hang', 'climb', 'burst']
const hash = (seed: string | number): number => [...String(seed)].reduce((n, c) => ((n * 31 + c.charCodeAt(0)) >>> 0), 2166136261)
const rnd = (seed: string | number) => { let n = hash(seed); return () => ((n = (n * 1664525 + 1013904223) >>> 0) / 2 ** 32) }
export function layoutSprouts(options: SproutsOptions): Layout {
  const reach = Math.max(12, options.reach ?? 56), r = rnd(options.seed), variant = options.variant === 'auto' || !options.variant ? variants[hash(options.seed) % variants.length]! : options.variant
  const count = ({ 1: 3, 2: 6, 3: 10 } as const)[options.density ?? 2]
  const vines = Array.from({ length: count }, (_, i) => { const x = Math.round(r() * options.width), y = Math.round(r() * options.height); const dx = Math.round((r() - .5) * reach * 2), dy = Math.round((r() - .5) * reach * 2); return { d: `M ${x} ${y} C ${x + dx} ${y + dy}, ${x + dx * 1.4} ${y + dy * 1.4}, ${x + dx * 2} ${y + dy * 2}`, delay: 100 + i * 150 + Math.round(r() * 300), duration: 900 + Math.round(r() * 800) } })
  return { width: options.width, height: options.height, reach, variant, vines, total: Math.max(...vines.map((v) => v.delay + v.duration)) + 350 }
}
export function renderSproutsSvg(options: SvgFrameOptions): string {
  const l = layoutSprouts(options), p = Math.max(0, Math.min(1, options.progress ?? 1)), time = p * l.total
  const art = l.vines.map((v, i) => { const t = Math.max(0, Math.min(1, (time - v.delay) / v.duration)); const point = /([\-\d.]+) ([\-\d.]+)$/.exec(v.d); const x = Number(point?.[1] ?? 0), y = Number(point?.[2] ?? 0); return `<path d="${v.d}" fill="none" stroke="#26788d" stroke-width="2.2" stroke-linecap="round" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="${1 - t}"/><g opacity="${t}"><circle cx="${x}" cy="${y}" r="${5 + (i % 3) * 2}" fill="#7b5aa6"/><circle cx="${x}" cy="${y}" r="2" fill="#f6c85f"/></g>` }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-l.reach} ${-l.reach} ${l.width + 2*l.reach} ${l.height + 2*l.reach}" width="${l.width + 2*l.reach}" height="${l.height + 2*l.reach}">${art}</svg>`
}
export { variants as SPROUT_VARIANTS }
