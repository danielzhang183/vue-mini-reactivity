export type EffectFn = () => void

export let activeEffect: EffectFn | undefined

export function effect(fn: EffectFn) {
  activeEffect = fn
  fn()
}
