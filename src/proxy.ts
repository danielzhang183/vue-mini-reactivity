import type { EffectFn } from './effect'
import { activeEffect } from './effect'

const buckets = new Set<EffectFn>()

export function createProxy<T extends Object>(data: T) {
  return new Proxy(data, {
    get(target, key) {
      if (activeEffect)
        buckets.add(activeEffect)
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      buckets.forEach(fn => fn())
      return true
    },
  })
}
