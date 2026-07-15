/**
 * VitePress 自定义主题入口
 * 同时注册 PC（Element Plus + zq-ui）与移动端（Vant + zq-m），
 * 使文档中可直接渲染 <zq-*> / <zqm-*> 实例。
 *
 * 样式顺序：底层 UI → 封装 styles → 封装 themes
 * 演示规范：PC 页只用 zq-*，移动页只用 zqm-*，避免同屏混用。
 */
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import ZQUI from '../../../packages/zq-ui'
import ZQM from '../../../packages/zq-m'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '../../../packages/zq-ui/styles'
import '../../../packages/zq-ui/styles/themes'
import 'vant/lib/index.css'
import '../../../packages/zq-m/styles'
import '../../../packages/zq-m/styles/themes'
import './custom.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(ZQUI)
    app.use(Vant)
    app.use(ZQM)
  },
} satisfies Theme
