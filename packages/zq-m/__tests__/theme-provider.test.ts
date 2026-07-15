import { describe, expect, it } from 'vitest'
import { mount } from './test-utils'
import { ZqmThemeProvider } from '../index'
import { resolveThemeClass, withPopperTheme } from '../theme/context'

describe('zq-m theme-context 工具', () => {
  it('resolveThemeClass：default / 空值不产生 class', () => {
    expect(resolveThemeClass('default')).toBe('')
    expect(resolveThemeClass(undefined)).toBe('')
  })

  it('resolveThemeClass：命名主题生成 zqm-theme-* class', () => {
    expect(resolveThemeClass('aiedu')).toBe('zqm-theme-aiedu')
  })

  it('withPopperTheme：无主题 class 时原样返回', () => {
    const attrs = { placeholder: 'x' }
    expect(withPopperTheme(attrs, '')).toBe(attrs)
  })

  it('withPopperTheme：合并已有 className', () => {
    const result = withPopperTheme({ className: 'custom' }, 'zqm-theme-aiedu')
    expect(result.className).toBe('custom zqm-theme-aiedu')
  })

  it('withPopperTheme：归一 kebab class-name 键', () => {
    const result = withPopperTheme({ 'class-name': 'custom' }, 'zqm-theme-aiedu')
    expect(result.className).toBe('custom zqm-theme-aiedu')
    expect(result['class-name']).toBeUndefined()
  })
})

describe('zqm-theme-provider', () => {
  it('命名主题渲染作用域 class', () => {
    const wrapper = mount(ZqmThemeProvider, {
      props: { theme: 'aiedu' },
    })
    expect(wrapper.classes()).toContain('zqm-theme-aiedu')
  })

  it('default 主题不加 class', () => {
    const wrapper = mount(ZqmThemeProvider, {
      props: { theme: 'default' },
    })
    expect(wrapper.classes()).not.toContain('zqm-theme-default')
  })

  it('支持自定义容器标签', () => {
    const wrapper = mount(ZqmThemeProvider, {
      props: { theme: 'xk', tag: 'section' },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
  })
})
