/**
 * VitePress 自定义主题入口
 * 注册 Element Plus + ZQ-UI，使文档中可直接渲染组件实例
 */
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import ZQUI from '../../../packages/zq-ui'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '../../../packages/zq-ui/styles'
import '../../../packages/zq-ui/styles/themes'
import './custom.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(ZQUI)
  },
} satisfies Theme
