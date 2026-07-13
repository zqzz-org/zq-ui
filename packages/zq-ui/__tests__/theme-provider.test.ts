import { describe, expect, it } from 'vitest'
import { mount } from './test-utils'
import ZQUI, { ZqThemeProvider } from '../index'
import { POPPER_COMPONENTS, resolveThemeClass, withPopperTheme } from '../theme/context'

describe('theme-context 工具', () => {
  it('resolveThemeClass：default / 空值不产生 class', () => {
    expect(resolveThemeClass('default')).toBe('')
    expect(resolveThemeClass(undefined)).toBe('')
  })

  it('resolveThemeClass：命名主题生成 zq-theme-* class', () => {
    expect(resolveThemeClass('aiedu')).toBe('zq-theme-aiedu')
  })

  it('withPopperTheme：无主题 class 时原样返回', () => {
    const attrs = { placeholder: 'x' }
    expect(withPopperTheme(attrs, '')).toBe(attrs)
  })

  it('withPopperTheme：合并已有 popperClass', () => {
    const result = withPopperTheme({ popperClass: 'custom' }, 'zq-theme-aiedu')
    expect(result.popperClass).toBe('custom zq-theme-aiedu')
  })

  it('withPopperTheme：归一 kebab popper-class 键', () => {
    const result = withPopperTheme({ 'popper-class': 'custom' }, 'zq-theme-aiedu')
    expect(result.popperClass).toBe('custom zq-theme-aiedu')
    expect(result['popper-class']).toBeUndefined()
  })
})

describe('zq-theme-provider', () => {
  it('命名主题渲染作用域 class', () => {
    const wrapper = mount(ZqThemeProvider, {
      props: { theme: 'aiedu' },
    })
    expect(wrapper.classes()).toContain('zq-theme-aiedu')
  })

  it('default 主题不加 class', () => {
    const wrapper = mount(ZqThemeProvider, {
      props: { theme: 'default' },
    })
    expect(wrapper.classes()).not.toContain('zq-theme-default')
  })

  it('支持自定义容器标签', () => {
    const wrapper = mount(ZqThemeProvider, {
      props: { theme: 'xk', tag: 'section' },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
  })
})

describe('弹层代理主题注入', () => {
  it('弹层白名单包含 select 等 teleport 组件', () => {
    expect(POPPER_COMPONENTS.has('select')).toBe(true)
    expect(POPPER_COMPONENTS.has('date-picker')).toBe(true)
    // 非弹层组件不在名单内
    expect(POPPER_COMPONENTS.has('button')).toBe(false)
    expect(POPPER_COMPONENTS.has('input')).toBe(false)
  })

  async function openSelect(popperTheme?: 'aiedu' | undefined) {
    const template = popperTheme
      ? `<zq-theme-provider theme="${popperTheme}"><zq-select :teleported="false" /></zq-theme-provider>`
      : `<zq-select :teleported="false" />`
    const wrapper = mount({ template }, { global: { plugins: [ZQUI] }, attachTo: document.body })
    // 点击触发下拉，弹层才会渲染
    await wrapper.find('.el-select__wrapper').trigger('click')
    await wrapper.vm.$nextTick()
    return wrapper
  }

  it('Provider 内的 zq-select 弹层带上主题 class', async () => {
    const wrapper = await openSelect('aiedu')
    const popper = wrapper.find('.el-select__popper')
    expect(popper.exists()).toBe(true)
    expect(popper.classes()).toContain('zq-theme-aiedu')
    wrapper.unmount()
  })

  it('无 Provider 时 zq-select 不注入主题 class', async () => {
    const wrapper = await openSelect(undefined)
    const popper = wrapper.find('.el-select__popper')
    expect(popper.exists()).toBe(true)
    expect(popper.classes().some((c) => c.startsWith('zq-theme-'))).toBe(false)
    wrapper.unmount()
  })
})
