const buckets = new Set<Function>()

export function createProxy<T extends Object>(data: T, effectFn: Function) {
  return new Proxy(data, {
    get(target, key) {
      buckets.add(effectFn)
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      buckets.forEach(fn => fn())
      return true
    },
  })
}
