import { afterEach, describe, expect, it } from 'vitest'
import { createApp, h } from 'vue'
import ZQUI from '../index'

function createTestApp() {
  return createApp({
    render: () => h('div'),
  })
}

describe('zq-ui install', () => {
  afterEach(() => {
    delete document.documentElement.dataset.zqTheme
  })

  it('默认按 UI 库内置域名规则应用主题', () => {
    createTestApp().use(ZQUI, {
      theme: { hostname: 'aiedu.example.com' },
    })

    expect(document.documentElement.dataset.zqTheme).toBe('aiedu')
  })

  it('未命中域名规则时保持 Element Plus 默认主题', () => {
    createTestApp().use(ZQUI, {
      theme: { hostname: 'localhost' },
    })

    expect(document.documentElement.dataset.zqTheme).toBeUndefined()
  })

  it('支持关闭自动主题', () => {
    createTestApp().use(ZQUI, {
      theme: false,
    })

    expect(document.documentElement.dataset.zqTheme).toBeUndefined()
  })

  it('支持强制指定主题', () => {
    createTestApp().use(ZQUI, {
      theme: 'aiedu',
    })

    expect(document.documentElement.dataset.zqTheme).toBe('aiedu')
  })

  it('强制指定 default 时使用 Element Plus 默认主题', () => {
    document.documentElement.dataset.zqTheme = 'aiedu'

    createTestApp().use(ZQUI, {
      theme: 'default',
    })

    expect(document.documentElement.dataset.zqTheme).toBeUndefined()
  })
})
