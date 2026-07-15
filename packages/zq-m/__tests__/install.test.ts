import { afterEach, describe, expect, it } from 'vitest'
import { createApp, h } from 'vue'
import ZQM from '../index'

function createTestApp() {
  return createApp({
    render: () => h('div'),
  })
}

describe('zq-m install', () => {
  afterEach(() => {
    delete document.documentElement.dataset.zqmTheme
  })

  it('默认按 UI 库内置域名规则应用主题', () => {
    createTestApp().use(ZQM, {
      theme: { hostname: 'aiedu.example.com' },
    })

    expect(document.documentElement.dataset.zqmTheme).toBe('aiedu')
  })

  it('未命中域名规则时保持 Vant 默认主题', () => {
    createTestApp().use(ZQM, {
      theme: { hostname: 'localhost' },
    })

    expect(document.documentElement.dataset.zqmTheme).toBeUndefined()
  })

  it('支持关闭自动主题', () => {
    createTestApp().use(ZQM, {
      theme: false,
    })

    expect(document.documentElement.dataset.zqmTheme).toBeUndefined()
  })

  it('支持强制指定主题', () => {
    createTestApp().use(ZQM, {
      theme: 'aiedu',
    })

    expect(document.documentElement.dataset.zqmTheme).toBe('aiedu')
  })

  it('强制指定 default 时使用 Vant 默认主题', () => {
    document.documentElement.dataset.zqmTheme = 'aiedu'

    createTestApp().use(ZQM, {
      theme: 'default',
    })

    expect(document.documentElement.dataset.zqmTheme).toBeUndefined()
  })

  it('注册 zqm-button 与 zqm-theme-provider 标签', () => {
    const app = createTestApp()
    app.use(ZQM, { theme: false })

    expect(app._context.components.ZqmButton || app._context.components['zqm-button']).toBeTruthy()
    expect(
      app._context.components.ZqmThemeProvider || app._context.components['zqm-theme-provider'],
    ).toBeTruthy()
  })
})
