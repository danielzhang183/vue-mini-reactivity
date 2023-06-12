import { describe, expect, it } from 'vitest'
import { createProxy } from '../src'

describe('proxy', () => {
  it('exported', () => {
    const data: { text: string } = { text: 'hello world' }
    const effect = () => { console.log('effect fn') }
    // effect()
    const proxy = createProxy(data, effect)
    expect(proxy.text).toMatchInlineSnapshot('"hello world"')
    proxy.text = 'hello vue'
    expect(proxy.text).toMatchInlineSnapshot('"hello vue"')
  })
})
