/**
 * 移动端 Playground 组件注册表
 * Demo 文件放在 ../demos/mobile/ 目录下。
 */
import type { Component } from 'vue'
import MobileProxyDemo from '../demos/mobile/ProxyDemo.vue'
import MobileThemeDemo from '../demos/mobile/ThemeDemo.vue'

export interface MobileComponentEntry {
  key: string
  name: string
  tag: string
  component: Component
}

export const mobileComponents: MobileComponentEntry[] = [
  { key: 'theme', name: 'Theme', tag: '多主题', component: MobileThemeDemo },
  { key: 'proxy', name: '自动代理', tag: '透传', component: MobileProxyDemo },
]

export const defaultMobileKey = mobileComponents[0]?.key ?? 'theme'
