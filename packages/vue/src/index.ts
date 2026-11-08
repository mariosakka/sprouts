import { defineComponent, h, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'
import { renderSproutsSvg, type Density, type Variant } from '@mariosakka/sprouts'
export const Sprouts = defineComponent({
  name: 'Sprouts', props: { seed: { type: [String, Number], default: 1 }, variant: { type: String as PropType<Variant | 'auto'>, default: 'auto' }, density: { type: Number as PropType<Density>, default: 2 }, reach: Number, static: Boolean },
  setup(props) { const el = ref<HTMLDivElement>(); let frame = 0, start = 0; const draw = (time: number) => { const node = el.value; if (!node) return; const progress = props.static ? 1 : Math.min(1, (time - start) / 2800); node.innerHTML = renderSproutsSvg({ seed: props.seed, variant: props.variant, density: props.density, reach: props.reach, width: node.parentElement?.clientWidth || 320, height: node.parentElement?.clientHeight || 200, progress }); if (progress < 1) frame = requestAnimationFrame(draw) }; onMounted(() => { start = performance.now(); frame = requestAnimationFrame(draw) }); onBeforeUnmount(() => cancelAnimationFrame(frame)); return () => h('div', { ref: el, class: 'sprouts', 'aria-hidden': 'true' }) }
})
