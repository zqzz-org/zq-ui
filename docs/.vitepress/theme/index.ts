/**
 * VitePress 自定义主题入口
 * 注册 Element Plus + ZQ-UI，使文档中可直接渲染组件实例
 */
import '../../../src/utils/rem'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import ZQUI from '../../../packages/zq-ui'

import 'element-plus/dist/index.css'
import '../../../packages/zq-ui/styles'
import './custom.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(ZQUI)
  },
} satisfies Theme
