/**
 * Playground 组件注册表
 *
 * 新增组件的唯一入口：在此追加一条即可，无需修改 App.vue。
 * Demo 文件放在 ../demos/ 目录下，文件名建议 {Name}Demo.vue。
 */
import type { Component } from 'vue'
import ButtonDemo from '../demos/ButtonDemo.vue'
import ProxyDemo from '../demos/ProxyDemo.vue'
import ThemeDemo from '../demos/ThemeDemo.vue'

export interface ComponentEntry {
  key: string
  name: string
  icon: string
  tag: string
  component: Component
}

export const components: ComponentEntry[] = [
  { key: 'theme', name: 'Theme', icon: 'T', tag: 'AIEDU', component: ThemeDemo },
  { key: 'button', name: 'Button', icon: 'B', tag: '已就绪', component: ButtonDemo },
  { key: 'proxy', name: '自动代理', icon: 'P', tag: '透传验证', component: ProxyDemo },
  // 后续组件在此追加：
  // { key: 'select', name: 'Select', icon: 'S', tag: '待开发', component: SelectDemo },
  // { key: 'table',  name: 'Table',  icon: 'T', tag: '待开发', component: TableDemo },
]
