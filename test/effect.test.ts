import { describe, expect, it } from 'vitest'
import { createProxy, effect } from '../src'

// function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

describe('effect', () => {
  it('effect', async () => {
    const data1: { text: string } = { text: 'hello world' }
    effect(() => {
      data1.text += '_changed'
      console.log(`effect data1: ${data1.text}`)
    })
    const proxy1 = createProxy(data1)

    const data2: { text: string } = { text: 'hello vue' }
    effect(() => {
      data2.text += '_changed'
      console.log(`effect data2: ${data2.text}`)
    })
    const proxy2 = createProxy(data2)
    expect(proxy1.text).toBe('hello world_changed')
    expect(proxy2.text).toBe('hello vue_changed')
  })
})
