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
    <h2>渐变按钮</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="gradient">默认</zq-button>
        <zq-button variant="gradient" type="primary">Primary</zq-button>
        <zq-button variant="gradient" type="success">Success</zq-button>
        <zq-button variant="gradient" type="warning">Warning</zq-button>
        <zq-button variant="gradient" type="danger">Danger</zq-button>
        <zq-button variant="gradient" type="info">Info</zq-button>
        <zq-button variant="gradient" disabled>Disabled</zq-button>
      </div>
    </div>

    <h2 style="margin-top:32px">浅色按钮</h2>
    <div class="demo-block">
      <div class="demo-row">
        <zq-button variant="soft">默认</zq-button>
        <zq-button variant="soft" type="primary">Primary</zq-button>
        <zq-button variant="soft" type="success">Success</zq-button>
        <zq-button variant="soft" type="warning">Warning</zq-button>
        <zq-button variant="soft" type="danger">Danger</zq-button>
        <zq-button variant="soft" type="info">Info</zq-button>
        <zq-button variant="soft" disabled>Disabled</zq-button>
      </div>
    </div>

    <h2 style="margin-top:32px">点击控制</h2>
    <p class="desc">防抖会在最后一次点击后执行，节流会立即执行第一次点击并忽略间隔内的重复点击。</p>
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
      <p class="hint">
        <code>debounce</code> 与 <code>throttle</code> 只包装 <code>click</code> 事件；同时传入时
        <code>throttle</code> 优先。
      </p>
    </div>

    <h2 style="margin-top:32px">原生按钮</h2>
    <div class="demo-block">
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
</template>
