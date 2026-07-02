import { mount as baseMount, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'
import ElementPlus from 'element-plus'

type MountOptions = Parameters<typeof baseMount>[1]

/** 预配置 Element Plus 的 mount 封装 */
export function mount(component: Component, options?: MountOptions): VueWrapper {
  return baseMount(component, {
    ...options,
    global: {
      plugins: [ElementPlus],
      ...options?.global,
    },
  })
}
