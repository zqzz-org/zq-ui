<template>
  <div class="playground playground--mobile">
    <header class="pg-header">
      <span class="pg-logo">ZQ-M</span>
      <span class="pg-badge">Mobile</span>
      <nav class="pg-platform">
        <router-link class="pg-platform__link" to="/pc">PC</router-link>
        <router-link class="pg-platform__link" to="/m">移动</router-link>
      </nav>
      <span class="pg-hint">Vant · zqm-* · 仅本地调试</span>
    </header>

    <div class="m-body">
      <aside class="m-sidebar">
        <button
          v-for="comp in mobileComponents"
          :key="comp.key"
          :class="['m-sidebar-item', { active: activeKey === comp.key }]"
          @click="go(comp.key)"
        >
          <span>{{ comp.name }}</span>
          <span class="m-tag">{{ comp.tag }}</span>
        </button>
      </aside>

      <main class="m-stage">
        <div class="m-phone">
          <div class="m-phone__notch" />
          <div class="m-phone__screen">
            <component :is="activeDemo" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defaultMobileKey, mobileComponents } from '../config/playground-mobile'

const route = useRoute()
const router = useRouter()

const activeKey = computed(() => {
  const key = typeof route.params.key === 'string' ? route.params.key : defaultMobileKey
  return mobileComponents.some((c) => c.key === key) ? key : defaultMobileKey
})

const activeDemo = computed(
  () => mobileComponents.find((c) => c.key === activeKey.value)?.component,
)

function go(key: string) {
  if (key !== activeKey.value) {
    void router.push({ name: 'm-demo', params: { key } })
  }
}

watch(
  () => route.params.key,
  (key) => {
    if (!key || !mobileComponents.some((c) => c.key === key)) {
      void router.replace({ name: 'm-demo', params: { key: defaultMobileKey } })
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
  color: var(--van-primary-color, #1989fa);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.m-body {
  display: flex;
  min-height: calc(100vh - 49px);
  background: #eef0f3;
}

.m-sidebar {
  width: 160px;
  min-width: 160px;
  background: #fff;
  border-right: 1px solid #ebedf0;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m-sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #646566;
  text-align: left;
}
.m-sidebar-item:hover {
  background: #f7f8fa;
}
.m-sidebar-item.active {
  background: color-mix(in srgb, var(--van-primary-color, #1989fa) 12%, white);
  color: var(--van-primary-color, #1989fa);
}
.m-tag {
  font-size: 10px;
  color: #969799;
}

.m-stage {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 28px 16px 48px;
}

.m-phone {
  width: 375px;
  max-width: 100%;
  background: #111;
  border-radius: 28px;
  padding: 12px 10px 18px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}

.m-phone__notch {
  width: 120px;
  height: 8px;
  margin: 0 auto 10px;
  border-radius: 999px;
  background: #333;
}

.m-phone__screen {
  background: #f7f8fa;
  border-radius: 18px;
  min-height: 640px;
  max-height: calc(100vh - 140px);
  overflow: auto;
  padding: 14px 12px 24px;
  -webkit-overflow-scrolling: touch;
}
</style>
