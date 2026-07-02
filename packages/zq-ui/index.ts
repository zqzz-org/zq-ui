/**
 * ZQ-UI 组件库入口
 * 提供组件按需导出 + install 全局注册方法
 */
import type { App, Plugin } from 'vue'
import ZqButton from './components/button/zq-button.vue'

// 组件列表（后续新增组件在此注册即可）
const components: Record<string, unknown> = {
  ZqButton,
}

/**
 * 按需导出各组件
 */
export { ZqButton }

/**
 * install 方法 —— 支持 app.use(ZqUI) 全量注册
 * @param app - Vue 应用实例
 *
 * @example
 * ```ts
 * // main.ts
 * import { createApp } from 'vue'
 * import ZqUI from '@zq-ui'
 * import App from './App.vue'
 *
 * const app = createApp(App)
 * app.use(ZqUI)
 * app.mount('#app')
 * ```
 */
const install: Plugin = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component as never)
    })
  },
}

/**
 * 默认导出 —— 包含 install 方法，支持 app.use()
 */
export default install

export { install }
