import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount } from '../../../__tests__/test-utils'
import ZqButton from '../zq-button.vue'

describe('zq-button', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  // ==================== 基础渲染 ====================

  it('渲染一个 el-button', () => {
    const wrapper = mount(ZqButton, {
      slots: { default: '按钮' },
    })
    expect(wrapper.find('.el-button').exists()).toBe(true)
    expect(wrapper.text()).toBe('按钮')
  })

  // ==================== variant ====================

  it('variant="gradient" 时添加 zq-btn--gradient class', () => {
    const wrapper = mount(ZqButton, {
      props: { variant: 'gradient' },
    })
    expect(wrapper.find('.el-button').classes()).toContain('zq-btn--gradient')
  })

  it('variant="soft" 时添加 zq-btn--soft class', () => {
    const wrapper = mount(ZqButton, {
      props: { variant: 'soft' },
    })
    expect(wrapper.find('.el-button').classes()).toContain('zq-btn--soft')
  })

  it('未传 variant 时不添加额外 class', () => {
    const wrapper = mount(ZqButton)
    const classes = wrapper.find('.el-button').classes()
    expect(classes).not.toContain('zq-btn--gradient')
    expect(classes).not.toContain('zq-btn--soft')
  })

  // ==================== Element Plus props 透传 ====================

  it('透传 type 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { type: 'primary' },
    })
    expect(wrapper.find('.el-button').classes()).toContain('el-button--primary')
  })

  it('透传 size 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { size: 'large' },
    })
    expect(wrapper.find('.el-button').classes()).toContain('el-button--large')
  })

  it('透传 disabled 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { disabled: true },
    })
    expect(wrapper.find('.el-button').classes()).toContain('is-disabled')
  })

  it('透传 loading 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { loading: true },
    })
    expect(wrapper.find('.el-button').classes()).toContain('is-loading')
  })

  it('透传 round 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { round: true },
    })
    expect(wrapper.find('.el-button').classes()).toContain('is-round')
  })

  it('透传 circle 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { circle: true },
    })
    expect(wrapper.find('.el-button').classes()).toContain('is-circle')
  })

  it('透传 plain 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { plain: true },
    })
    expect(wrapper.find('.el-button').classes()).toContain('is-plain')
  })

  it('透传 text 属性（文字按钮）', () => {
    const wrapper = mount(ZqButton, {
      props: { text: true },
    })
    expect(wrapper.find('.el-button').classes()).toContain('is-text')
  })

  // ==================== variant + type 组合 ====================

  it('variant 和 type 可同时生效', () => {
    const wrapper = mount(ZqButton, {
      props: { variant: 'soft', type: 'success' },
    })
    const classes = wrapper.find('.el-button').classes()
    expect(classes).toContain('zq-btn--soft')
    expect(classes).toContain('el-button--success')
  })

  it('variant 和 disabled 可同时生效', () => {
    const wrapper = mount(ZqButton, {
      props: { variant: 'gradient', disabled: true },
    })
    const classes = wrapper.find('.el-button').classes()
    expect(classes).toContain('zq-btn--gradient')
    expect(classes).toContain('is-disabled')
  })

  // ==================== 插槽透传 ====================

  it('透传 default 插槽', () => {
    const wrapper = mount(ZqButton, {
      slots: { default: '<span class="custom">自定义内容</span>' },
    })
    expect(wrapper.find('.custom').exists()).toBe(true)
    expect(wrapper.find('.custom').text()).toBe('自定义内容')
  })

  it('透传 loading 插槽', () => {
    const wrapper = mount(ZqButton, {
      props: { loading: true },
      slots: { loading: '<span class="custom-loading">加载中...</span>' },
    })
    expect(wrapper.find('.custom-loading').exists()).toBe(true)
  })

  it('透传 icon 插槽', () => {
    const wrapper = mount(ZqButton, {
      slots: { icon: '<span class="custom-icon">icon</span>' },
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // ==================== 事件透传 ====================

  it('透传 click 事件', async () => {
    let clicked = false
    const wrapper = mount(ZqButton, {
      attrs: { onClick: () => { clicked = true } },
    })
    await wrapper.find('.el-button').trigger('click')
    expect(clicked).toBe(true)
  })

  it('透传 dblclick 事件', async () => {
    let dblClicked = false
    const wrapper = mount(ZqButton, {
      attrs: { onDblclick: () => { dblClicked = true } },
    })
    await wrapper.find('.el-button').trigger('dblclick')
    expect(dblClicked).toBe(true)
  })

  it('debounce 大于 0 时延迟触发 click 事件', async () => {
    vi.useFakeTimers()
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { debounce: 200 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')

    expect(clickSpy).not.toHaveBeenCalled()
    vi.advanceTimersByTime(199)
    expect(clickSpy).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('debounce 期间多次点击只触发最后一次 click 事件', async () => {
    vi.useFakeTimers()
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { debounce: 200 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(100)
    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(100)
    await wrapper.find('.el-button').trigger('click')

    vi.advanceTimersByTime(199)
    expect(clickSpy).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('debounce 小于等于 0 时 click 事件保持即时触发', async () => {
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { debounce: 0 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('throttle 大于 0 时首次 click 立即触发', async () => {
    vi.useFakeTimers()
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { throttle: 200 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('throttle 间隔内多次点击只触发第一次 click 事件', async () => {
    vi.useFakeTimers()
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { throttle: 200 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(100)
    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(99)
    await wrapper.find('.el-button').trigger('click')

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('throttle 间隔结束后允许再次触发 click 事件', async () => {
    vi.useFakeTimers()
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { throttle: 200 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(200)
    await wrapper.find('.el-button').trigger('click')

    expect(clickSpy).toHaveBeenCalledTimes(2)
  })

  it('同时传入 debounce 和 throttle 时 throttle 优先', async () => {
    vi.useFakeTimers()
    const clickSpy = vi.fn()
    const wrapper = mount(ZqButton, {
      props: { debounce: 200, throttle: 500 },
      attrs: { onClick: clickSpy },
    })

    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(200)
    await wrapper.find('.el-button').trigger('click')
    vi.advanceTimersByTime(300)
    await wrapper.find('.el-button').trigger('click')

    expect(clickSpy).toHaveBeenCalledTimes(2)
  })

  // ==================== 原生 HTML 属性透传 ====================

  it('透传 autofocus 属性', () => {
    const wrapper = mount(ZqButton, {
      props: { autofocus: true },
    })
    expect(wrapper.find('.el-button').attributes('autofocus')).toBeDefined()
  })

  // ==================== 默认值 ====================

  it('variant 默认为 undefined，type 默认为 default', () => {
    const wrapper = mount(ZqButton)
    const classes = wrapper.find('.el-button').classes()
    expect(classes).not.toContain('zq-btn--gradient')
    expect(classes).not.toContain('zq-btn--soft')
    // Element Plus 默认 type 不加 type class
    expect(classes).not.toContain('el-button--primary')
    expect(classes).not.toContain('el-button--success')
  })
})
