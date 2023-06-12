import { describe, expect, it } from 'vitest'
import { createProxy, effect } from '../src'

describe('proxy', () => {
  it('exported', () => {
    const data: { text: string } = { text: 'hello world' }
    let count = 0
    effect(() => {
      count++
      console.log('effect fn')
    })
    const proxy = createProxy(data)
    expect(proxy.text).toBe('hello world')
    proxy.text = 'hello vue'
    expect(proxy.text).toBe('hello vue')
    expect(count).toBe(2)
  })
})
