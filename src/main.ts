/**
 * Playground 入口（仅开发调试，不随组件库发布）
 * 同时挂载 PC（zq-ui）与移动（zq-m），由路由 /pc、/m 分端展示。
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'

import '@zq-ui/styles'
import '@zq-ui/styles/themes'
import ZQUI from '@zq-ui'

import '@zq-m/styles'
import '@zq-m/styles/themes'
import ZQM from '@zq-m'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(ZQUI, { theme: false })
app.use(Vant)
app.use(ZQM, { theme: false })
app.use(router)

app.mount('#app')
