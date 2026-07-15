<script setup lang="ts">
import { shallowRef } from 'vue'

const checked = shallowRef(true)
const rate = shallowRef(3)
const switchOn = shallowRef(true)
</script>

<template>
  <section class="m-demo">
    <h2>自动代理透传</h2>
    <p class="m-desc">以下均为 <code>zqm-*</code> 透明代理，行为与 Vant 一致。</p>

    <zqm-theme-provider theme="aiedu" class="m-block">
      <zqm-cell-group inset>
        <zqm-cell title="单元格" value="内容" is-link />
        <zqm-cell title="开关">
          <template #right-icon>
            <zqm-switch v-model="switchOn" size="20px" />
          </template>
        </zqm-cell>
      </zqm-cell-group>

      <div class="m-row">
        <zqm-button type="primary" size="small">Primary</zqm-button>
        <zqm-button type="success" size="small">Success</zqm-button>
        <zqm-button type="warning" plain size="small">Warning</zqm-button>
        <zqm-button type="danger" plain size="small">Danger</zqm-button>
      </div>

      <div class="m-row">
        <zqm-checkbox v-model="checked">复选</zqm-checkbox>
        <zqm-rate v-model="rate" />
      </div>

      <zqm-progress :percentage="60" stroke-width="6" />
      <zqm-tag type="primary" style="margin-top: 10px">Tag</zqm-tag>
      <zqm-badge :content="5" style="margin-left: 12px">
        <zqm-button size="mini">消息</zqm-button>
      </zqm-badge>
    </zqm-theme-provider>
  </section>
</template>

<style scoped>
.m-demo h2 {
  margin: 0 0 6px;
  font-size: 18px;
}
.m-desc {
  margin: 0 0 14px;
  font-size: 12px;
  color: #888;
}
.m-desc code {
  font-size: 11px;
  background: #f0f0f0;
  padding: 0 4px;
  border-radius: 3px;
}
.m-block {
  padding: 12px 0;
  border-radius: 8px;
  background: #fff;
}
.m-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
}
</style>
