export type DepsMap = Map<string | symbol, Deps>
export type Deps = Set<EffectFn> | undefined
export type EffectFn = () => void

export const buckets = new WeakMap<Object, DepsMap>()
export let activeEffect: EffectFn | undefined

export function effect(fn: EffectFn) {
  activeEffect = fn
  fn()
}
