import { activeEffect, buckets } from './effect'

export function createProxy<T extends Object>(data: T) {
  return new Proxy(data, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      return trigger(target, key)
    },
  })
}

export function track(target: Object, key: string | symbol) {
  if (!activeEffect)
    return target[key]
  let depsMap = buckets.get(target)
  if (!depsMap)
    buckets.set(target, (depsMap = new Map()))
  let deps = depsMap.get(key)
  if (!deps)
    depsMap.set(key, (deps = new Set()))
  deps.add(activeEffect)
}

export function trigger(target: Object, key: string | symbol): boolean {
  const depsMap = buckets.get(target)
  if (!depsMap)
    return false
  const effects = depsMap.get(key)
  effects?.forEach(fn => fn())

  return true
}
