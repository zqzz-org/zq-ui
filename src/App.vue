<template>
  <div class="playground">
    <!-- 顶栏 -->
    <header class="pg-header">
      <span class="pg-logo">ZQ-UI</span>
      <span class="pg-badge">Playground</span>
      <span class="pg-hint">组件开发调试工具</span>
    </header>

    <div class="pg-body">
      <!-- ========== 左侧组件列表 ========== -->
      <aside class="pg-sidebar">
        <div class="sidebar-search">
          <el-input
            v-model="searchText"
            placeholder="搜索组件..."
            clearable
            :prefix-icon="Search"
            size="small"
          />
        </div>
        <nav class="sidebar-nav">
          <button
            v-for="comp in filteredComponents"
            :key="comp.key"
            :class="['sidebar-item', { active: activeKey === comp.key }]"
            @click="activeKey = comp.key"
          >
            {{ comp.name }}
          </button>
        </nav>
      </aside>

      <!-- ========== 右侧测试区 ========== -->
      <main class="pg-main">
        <component :is="activeDemo" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { components } from './config/playground'

const activeKey = ref('button')
const searchText = ref('')

const filteredComponents = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  if (!q) return components
  return components.filter(c => c.name.toLowerCase().includes(q) || c.key.toLowerCase().includes(q))
})

const activeDemo = computed(() => components.find(c => c.key === activeKey.value)?.component)
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
  width: 180px;
  min-width: 180px;
  background: #fff;
  border-right: 1px solid #ebeef5;
  padding: 16px 0;
  position: sticky;
  top: 49px;
  height: calc(100vh - 49px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 搜索 */
.sidebar-search {
  padding: 0 12px 12px;
}

/* 组件列表 */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
  flex: 1;
  overflow-y: auto;
}
.sidebar-item {
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  transition: background 0.15s, color 0.15s;
}
.sidebar-item:hover {
  background: #f5f6f8;
  color: #333;
}
.sidebar-item.active {
  background: var(--el-color-primary-light-9, #e8edff);
  color: var(--el-color-primary, #2f6bff);
}

/* ====== 右侧主区 ====== */
.pg-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* ====== 子标签栏（多个 Demo 复用） ====== */
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

/* ====== 内容区（多个 Demo 复用） ====== */
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

/* ====== 通用 Demo 组件（多个 Demo 复用） ====== */
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

/* ====== 全量矩阵（多个 Demo 复用） ====== */
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

/* ====== 待开发占位 ====== */
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
