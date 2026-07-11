<script setup lang="ts">
import { shallowRef } from 'vue'
import { Edit } from '@element-plus/icons-vue'

const normalClickCount = shallowRef(0)
const debouncedClickCount = shallowRef(0)
const throttledClickCount = shallowRef(0)

function increaseNormalClickCount() {
  normalClickCount.value += 1
}

function increaseDebouncedClickCount() {
  debouncedClickCount.value += 1
}

function increaseThrottledClickCount() {
  throttledClickCount.value += 1
}
</script>

<template>
  <section class="pg-content">
    <h2>主题验证</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button type="primary">Primary</zq-button>
        <zq-button variant="gradient" type="primary">Gradient</zq-button>
        <zq-button variant="soft">Soft</zq-button>
        <zq-button variant="ring">Ring</zq-button>
        <zq-button variant="ghost">Ghost</zq-button>
        <zq-button variant="reveal">Reveal</zq-button>
        <zq-button variant="crisp">Crisp</zq-button>
        <zq-button type="primary" disabled>Disabled</zq-button>
      </div>
    </div>

    <h2 style="margin-top: 32px">局部主题</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="gradient" type="primary"> Default </zq-button>
        <zq-button class="zq-theme-aiedu" variant="gradient" type="primary"> AIEDU </zq-button>
      </div>
    </div>

    <h2 style="margin-top: 32px">变体样式</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="gradient" type="primary">Primary</zq-button>
        <zq-button variant="soft">Soft</zq-button>
        <zq-button variant="ring">Ring</zq-button>
        <zq-button variant="ghost">Ghost</zq-button>
        <zq-button variant="reveal">Reveal</zq-button>
        <zq-button variant="crisp">Crisp</zq-button>
        <zq-button variant="gradient" type="danger" disabled>Disabled</zq-button>
      </div>
    </div>

    <h2 style="margin-top: 32px">自定义尺寸</h2>
    <p class="demo-label">block-*（固定宽度）</p>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="gradient" size="block-hefty" :icon="Edit">block-hefty</zq-button>
        <zq-button variant="crisp" size="block-stout">block-stout</zq-button>
        <zq-button variant="soft" size="block-lean" :icon="Edit">block-lean</zq-button>
      </div>
    </div>
    <p class="demo-label">inline-*（自适应宽度）</p>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="soft" size="inline-roomy" :icon="Edit">inline-roomy</zq-button>
        <zq-button variant="ghost" size="inline-comfy">inline-comfy</zq-button>
        <zq-button variant="reveal" size="inline-trim" :icon="Edit">inline-trim</zq-button>
      </div>
    </div>

    <h2 style="margin-top: 32px">点击控制</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button type="primary" @click="increaseNormalClickCount">
          普通点击：{{ normalClickCount }}
        </zq-button>
        <zq-button
          variant="gradient"
          type="primary"
          :debounce="600"
          @click="increaseDebouncedClickCount"
        >
          防抖点击：{{ debouncedClickCount }}
        </zq-button>
        <zq-button variant="crisp" :throttle="1000" @click="increaseThrottledClickCount">
          节流点击：{{ throttledClickCount }}
        </zq-button>
      </div>
    </div>
  </section>
</template>
