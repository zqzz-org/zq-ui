<template>
  <div class="playground playground--pc">
    <header class="pg-header">
      <span class="pg-logo">ZQ-UI</span>
      <span class="pg-badge">Playground</span>
      <nav class="pg-platform">
        <router-link class="pg-platform__link" to="/pc">PC</router-link>
        <router-link class="pg-platform__link" to="/m">移动</router-link>
      </nav>
      <span class="pg-hint">组件开发调试 · 不发布到 npm</span>
    </header>

    <div class="pg-body">
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
            @click="go(comp.key)"
          >
            {{ comp.name }}
          </button>
        </nav>
      </aside>

      <main class="pg-main">
        <component :is="activeDemo" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { defaultPcKey, pcComponents } from '../config/playground-pc'

const route = useRoute()
const router = useRouter()
const searchText = ref('')

const activeKey = computed(() => {
  const key = typeof route.params.key === 'string' ? route.params.key : defaultPcKey
  return pcComponents.some((c) => c.key === key) ? key : defaultPcKey
})

const filteredComponents = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  if (!q) return pcComponents
  return pcComponents.filter(
    (c) => c.name.toLowerCase().includes(q) || c.key.toLowerCase().includes(q),
  )
})

const activeDemo = computed(() => pcComponents.find((c) => c.key === activeKey.value)?.component)

function go(key: string) {
  if (key !== activeKey.value) {
    void router.push({ name: 'pc-demo', params: { key } })
  }
}

watch(
  () => route.params.key,
  (key) => {
    if (!key || !pcComponents.some((c) => c.key === key)) {
      void router.replace({ name: 'pc-demo', params: { key: defaultPcKey } })
    }
  },
  { immediate: true },
)
</script>

<style>
@import '../styles/playground.css';

.pg-platform {
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
  padding: 2px;
  background: #f0f2f5;
  border-radius: 8px;
}
.pg-platform__link {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-decoration: none;
}
.pg-platform__link.router-link-active,
.pg-platform__link.is-active {
  background: #fff;
  color: var(--el-color-primary, #2f6bff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}
</style>
