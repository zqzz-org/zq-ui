import { mount as baseMount, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'
import Vant from 'vant'

type MountOptions = Parameters<typeof baseMount>[1]

/** 预配置 Vant 的 mount 封装 */
export function mount(component: Component, options?: MountOptions): VueWrapper {
  return baseMount(component, {
    ...options,
    global: {
      plugins: [Vant],
      ...options?.global,
    },
  })
}
