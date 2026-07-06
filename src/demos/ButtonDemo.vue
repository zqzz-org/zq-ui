<script setup lang="ts">
import { shallowRef } from 'vue'

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
        <zq-button variant="soft" type="primary">Soft</zq-button>
        <zq-button type="primary" disabled>Disabled</zq-button>
      </div>
    </div>

    <h2 style="margin-top:32px">局部主题</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button class="zq-theme-default" variant="gradient" type="primary">
          Default
        </zq-button>
        <zq-button class="zq-theme-finance" variant="gradient" type="primary">
          Finance
        </zq-button>
        <zq-button class="zq-theme-admin" variant="gradient" type="primary">
          Admin
        </zq-button>
      </div>
    </div>

    <h2 style="margin-top:32px">变体样式</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="gradient" type="primary">Primary</zq-button>
        <zq-button variant="soft" type="success">Success</zq-button>
        <zq-button variant="gradient" type="danger" disabled>Disabled</zq-button>
      </div>
    </div>

    <h2 style="margin-top:32px">点击控制</h2>
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
        <zq-button
          variant="soft"
          type="success"
          :throttle="1000"
          @click="increaseThrottledClickCount"
        >
          节流点击：{{ throttledClickCount }}
        </zq-button>
      </div>
    </div>
  </section>
</template>
