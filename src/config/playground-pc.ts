/**
 * PC Playground 组件注册表
 * Demo 文件放在 ../demos/ 目录下。
 */
import type { Component } from 'vue'
import ButtonDemo from '../demos/ButtonDemo.vue'
import ProxyDemo from '../demos/ProxyDemo.vue'
import ThemeButtonDemo from '../demos/ThemeButtonDemo.vue'
import ThemeDemo from '../demos/ThemeDemo.vue'

export interface ComponentEntry {
  key: string
  name: string
  icon: string
  tag: string
  component: Component
}

export const pcComponents: ComponentEntry[] = [
  { key: 'theme', name: 'Theme', icon: 'T', tag: 'AIEDU', component: ThemeDemo },
  { key: 'button', name: 'Button', icon: 'B', tag: '已就绪', component: ButtonDemo },
  { key: 'theme-button', name: '主题按钮', icon: 'M', tag: '矩阵', component: ThemeButtonDemo },
  { key: 'proxy', name: '自动代理', icon: 'P', tag: '透传验证', component: ProxyDemo },
]

export const defaultPcKey = pcComponents[0]?.key ?? 'theme'
