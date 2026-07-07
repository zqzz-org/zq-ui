/**
 * ZQ-UI 开发预览入口
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 ZQ-UI 主题样式（覆盖 Element Plus 变量 + 组件样式）
import '@zq-ui/styles'
import '@zq-ui/styles/themes'
// 引入 ZQ-UI 组件库
import ZQUI from '@zq-ui'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(ZQUI)

app.mount('#app')
