<template>
  <div class="playground">
    <!-- 顶栏 -->
    <header class="pg-header">
      <span class="pg-logo">ZQ-UI</span>
      <span class="pg-badge">Playground</span>
      <span class="pg-hint">组件开发调试 —— 改完源码切过来即时验证</span>
    </header>

    <div class="pg-body">
      <!-- ========== 左侧组件列表 ========== -->
      <aside class="pg-sidebar">
        <div class="sidebar-title">组件列表</div>
        <nav class="sidebar-nav">
          <button
            v-for="comp in components"
            :key="comp.key"
            :class="['sidebar-item', { active: activeComponent === comp.key }]"
            @click="activeComponent = comp.key"
          >
            <span class="sidebar-icon">{{ comp.icon }}</span>
            <div class="sidebar-text">
              <span class="sidebar-name">{{ comp.name }}</span>
              <span class="sidebar-tag">{{ comp.tag }}</span>
            </div>
          </button>
        </nav>
      </aside>

      <!-- ========== 右侧测试区 ========== -->
      <main class="pg-main">
        <!-- ==================== Button 测试区 ==================== -->
        <template v-if="activeComponent === 'button'">
          <!-- 子标签 -->
          <nav class="pg-subtabs">
            <button
              v-for="tab in buttonTabs"
              :key="tab.key"
              :class="['pg-subtab', { active: activeButtonTab === tab.key }]"
              @click="activeButtonTab = tab.key"
            >
              {{ tab.label }}
            </button>
          </nav>

          <!-- 变体样式 -->
          <section v-show="activeButtonTab === 'variant'" class="pg-content">
            <h2>变体 × 类型组合</h2>
            <p class="desc">
              验证 <code>variant</code>（gradient / soft）与 Element Plus 原生
              <code>type</code> 的自由组合。
            </p>
            <div v-for="v in variants" :key="v.key" class="demo-block">
              <h3>{{ v.label }}</h3>
              <div class="demo-row">
                <zq-button :variant="v.key">默认</zq-button>
                <zq-button type="primary" :variant="v.key">Primary</zq-button>
                <zq-button type="success" :variant="v.key">Success</zq-button>
                <zq-button type="warning" :variant="v.key">Warning</zq-button>
                <zq-button type="danger" :variant="v.key">Danger</zq-button>
                <zq-button type="info" :variant="v.key">Info</zq-button>
                <zq-button :variant="v.key" disabled>Disabled</zq-button>
              </div>
            </div>
            <div class="demo-block">
              <h3>无 variant（原生对照）</h3>
              <div class="demo-row">
                <zq-button>默认</zq-button>
                <zq-button type="primary">Primary</zq-button>
                <zq-button type="success">Success</zq-button>
                <zq-button type="warning">Warning</zq-button>
                <zq-button type="danger">Danger</zq-button>
                <zq-button type="info">Info</zq-button>
                <zq-button disabled>Disabled</zq-button>
              </div>
            </div>
          </section>

          <!-- 尺寸形状 -->
          <section v-show="activeButtonTab === 'size'" class="pg-content">
            <h2>尺寸 & 形状</h2>
            <p class="desc">
              验证 <code>size</code>（large / default / small）和
              <code>round</code> / <code>circle</code> / <code>loading</code> 在各 variant 下的表现。
            </p>
            <div v-for="v in variants" :key="v.key" class="demo-block">
              <h3>{{ v.label }}</h3>
              <div class="demo-row">
                <zq-button :variant="v.key" size="large">Large</zq-button>
                <zq-button :variant="v.key">Default</zq-button>
                <zq-button :variant="v.key" size="small">Small</zq-button>
              </div>
              <div class="demo-row" style="margin-top:8px">
                <zq-button :variant="v.key" round>圆角</zq-button>
                <zq-button :variant="v.key" circle>圆</zq-button>
                <zq-button :variant="v.key" loading>加载</zq-button>
              </div>
            </div>
          </section>

          <!-- 透传测试 -->
          <section v-show="activeButtonTab === 'passthrough'" class="pg-content">
            <h2>属性 / 事件 / 插槽透传</h2>
            <p class="desc">
              验证未声明为自定义 props 的所有属性、事件、插槽均原样交给
              <code>&lt;el-button&gt;</code>。
            </p>
            <div class="demo-block">
              <h3>图标（prop + slot）</h3>
              <div class="demo-row">
                <zq-button type="primary" :icon="Search">搜索</zq-button>
                <zq-button type="success" variant="soft">
                  <el-icon style="margin-right:6px"><Check /></el-icon>
                  插槽图标
                </zq-button>
                <zq-button variant="gradient" :icon="Edit" circle />
              </div>
            </div>
            <div class="demo-block">
              <h3>事件透传</h3>
              <div class="demo-row">
                <zq-button type="primary"
                  @mouseenter="eventLog = 'mouseenter'"
                  @mouseleave="eventLog = 'mouseleave'"
                >悬停测试</zq-button>
                <zq-button variant="soft"
                  @dblclick="eventLog = 'dblclick!'"
                  @contextmenu.prevent="eventLog = 'contextmenu'"
                >双击 / 右键</zq-button>
                <zq-button size="small" @click="eventLog = ''">清除</zq-button>
              </div>
              <p class="hint" style="margin-top:4px">
                事件日志：<code>{{ eventLog || '（无事件）' }}</code>
              </p>
            </div>
            <div class="demo-block">
              <h3>原生 HTML 属性</h3>
              <div class="demo-row">
                <zq-button type="primary" autofocus>autofocus</zq-button>
                <zq-button type="primary" name="submit">name</zq-button>
                <zq-button type="primary" draggable="true">draggable</zq-button>
              </div>
            </div>
          </section>

          <!-- 全量矩阵 -->
          <section v-show="activeButtonTab === 'matrix'" class="pg-content">
            <h2>全量矩阵（type × variant）</h2>
            <p class="desc">一张表覆盖所有交叉组合。</p>
            <div class="matrix-wrap">
              <table class="matrix-table">
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="t in types" :key="t">{{ t }}</th>
                    <th>Disabled</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="v in [...variants, { key: '', label: '无 variant' }]" :key="v.key || 'native'">
                    <td class="matrix-label">{{ v.label }}</td>
                    <td v-for="t in types" :key="t">
                      <zq-button
                        :variant="v.key || undefined"
                        :type="t === 'default' ? undefined : t"
                        size="small"
                      >{{ t === 'default' ? '默认' : t }}</zq-button>
                    </td>
                    <td>
                      <zq-button :variant="v.key || undefined" size="small" disabled>Disabled</zq-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </template>

        <!-- ==================== 未来组件占位示例 ==================== -->
        <!-- ==================== 自动代理测试 ==================== -->
        <template v-if="activeComponent === 'proxy'">
          <div class="pg-content">
            <h2>自动代理验证</h2>
            <p class="desc">以下组件没有单独的 <code>.vue</code> 文件，通过 <code>index.ts</code> 自动代理到 Element Plus。</p>

            <div class="demo-block">
              <h3>zq-scrollbar（el-scrollbar 代理）</h3>
              <zq-scrollbar style="height:120px;border:1px solid #ebeef5;border-radius:6px;padding:8px;">
                <p v-for="i in 20" :key="i" style="margin:4px 0;font-size:13px;color:#999;">第 {{ i }} 行 —— 自动代理透传测试</p>
              </zq-scrollbar>
            </div>

            <div class="demo-block">
              <h3>zq-tag（el-tag 代理）</h3>
              <div class="demo-row">
                <zq-tag>默认标签</zq-tag>
                <zq-tag type="success">Success</zq-tag>
                <zq-tag type="warning">Warning</zq-tag>
                <zq-tag type="danger">Danger</zq-tag>
                <zq-tag type="info" closable @close="() => {}">可关闭</zq-tag>
              </div>
            </div>

            <div class="demo-block">
              <h3>zq-divider（el-divider 代理）</h3>
              <zq-divider content-position="left">左侧文字</zq-divider>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Check, Edit } from '@element-plus/icons-vue'

// ==================== 组件注册表（新增组件只需在此追加） ====================
interface ComponentEntry {
  key: string
  name: string
  icon: string
  tag: string
}

const components: ComponentEntry[] = [
  { key: 'button', name: 'Button', icon: '🔘', tag: '已就绪' },
  { key: 'proxy', name: '自动代理', icon: '🔗', tag: '透传验证' },
  // 后续自定义组件在此追加：
  // { key: 'select',   name: 'Select',   icon: '📋', tag: '待开发' },
  // { key: 'table',    name: 'Table',    icon: '📊', tag: '待开发' },
  // { key: 'dialog',   name: 'Dialog',   icon: '💬', tag: '待开发' },
]

const activeComponent = ref('button')

// ==================== Button 子标签 ====================
const buttonTabs = [
  { key: 'variant', label: '🎨 变体样式' },
  { key: 'size', label: '📐 尺寸形状' },
  { key: 'passthrough', label: '🔗 透传测试' },
  { key: 'matrix', label: '📊 全量矩阵' },
]
const activeButtonTab = ref('variant')

// ==================== 测试数据 ====================
const variants = [
  { key: 'gradient' as const, label: 'Gradient（渐变）' },
  { key: 'soft' as const, label: 'Soft（浅色）' },
]
const types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

const eventLog = ref('')
</script>

<style>
/* ====== 全局 ====== */
*,
*::before,
*::after { box-sizing: border-box; }

body {
  margin: 0;
  background: #f5f6f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

/* ====== 顶栏 ====== */
.pg-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  position: sticky;
  top: 0;
  z-index: 20;
}
.pg-logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--el-color-primary, #2f6bff);
  letter-spacing: -0.5px;
}
.pg-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 10px;
  background: var(--el-color-primary-light-9, #e8edff);
  color: var(--el-color-primary, #2f6bff);
  text-transform: uppercase;
}
.pg-hint {
  margin-left: auto;
  font-size: 12px;
  color: #aaa;
}

/* ====== 主体布局 ====== */
.pg-body {
  display: flex;
  min-height: calc(100vh - 49px);
}

/* ====== 左侧组件列表 ====== */
.pg-sidebar {
  width: 200px;
  min-width: 200px;
  background: #fff;
  border-right: 1px solid #ebeef5;
  padding: 16px 0;
  position: sticky;
  top: 49px;
  height: calc(100vh - 49px);
  overflow-y: auto;
}
.sidebar-title {
  padding: 0 16px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}
.sidebar-item:hover {
  background: #f5f6f8;
}
.sidebar-item.active {
  background: var(--el-color-primary-light-9, #e8edff);
  color: var(--el-color-primary, #2f6bff);
}
.sidebar-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.sidebar-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sidebar-name {
  font-size: 14px;
  font-weight: 500;
}
.sidebar-tag {
  font-size: 10px;
  color: #aaa;
}
.sidebar-item.active .sidebar-tag {
  color: var(--el-color-primary-light-5, #89a9ff);
}

/* ====== 右侧主区 ====== */
.pg-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* ====== 子标签栏 ====== */
.pg-subtabs {
  display: flex;
  gap: 0;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  overflow-x: auto;
  position: sticky;
  top: 49px;
  z-index: 10;
}
.pg-subtab {
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #888;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
}
.pg-subtab:hover { color: var(--el-color-primary, #2f6bff); }
.pg-subtab.active {
  color: var(--el-color-primary, #2f6bff);
  border-bottom-color: var(--el-color-primary, #2f6bff);
}

/* ====== 内容区 ====== */
.pg-content {
  padding: 28px 32px 60px;
  max-width: 1100px;
}
.pg-content h2 {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 600;
}
.pg-content > .desc {
  margin: 0 0 24px;
  color: #888;
  font-size: 13px;
  line-height: 1.6;
}
.pg-content > .desc code {
  padding: 1px 6px;
  background: #f0f0f0;
  border-radius: 3px;
  font-size: 12px;
  color: #e0526e;
}

/* 示例块 */
.demo-block {
  margin-bottom: 20px;
  padding: 18px 22px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}
.demo-block h3 {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  color: #555;
}
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.hint {
  margin: 8px 0 0;
  color: #aaa;
  font-size: 12px;
}
.hint code {
  padding: 1px 5px;
  background: #f0f0f0;
  border-radius: 3px;
  font-size: 11px;
}

/* 全量矩阵 */
.matrix-wrap { overflow-x: auto; }
.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ebeef5;
}
.matrix-table th,
.matrix-table td {
  padding: 10px 12px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}
.matrix-table thead th {
  background: #fafbfc;
  font-weight: 600;
  color: #555;
}
.matrix-label {
  text-align: left !important;
  font-weight: 500;
  white-space: nowrap;
}

/* 待开发占位 */
.pg-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #aaa;
  text-align: center;
  padding: 60px 20px;
}
.pg-empty .empty-icon { font-size: 48px; margin-bottom: 16px; }
.pg-empty h2 { margin: 0 0 8px; color: #999; }
.pg-empty p { margin: 0; font-size: 13px; }
.pg-empty code {
  padding: 1px 6px;
  background: #f0f0f0;
  border-radius: 3px;
  font-size: 12px;
}
</style>
