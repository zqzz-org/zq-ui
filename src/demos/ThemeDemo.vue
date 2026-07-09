<script setup lang="ts">
import { shallowRef } from 'vue'

interface TradeRow {
  name: string
  type: string
  value: string
  status: string
}

const switchValue = shallowRef(true)
const radioValue = shallowRef('aiedu')
const checkboxValue = shallowRef(['button', 'form'])
const sliderValue = shallowRef(68)
const progressValue = shallowRef(72)
const inputValue = shallowRef('AIEDU')
const selectValue = shallowRef('cash')
const amountValue = shallowRef(128)
const dateValue = shallowRef('2026-07-06')
const tabValue = shallowRef('overview')
const collapseValue = shallowRef(['risk'])
const rateValue = shallowRef(4)
const colorValue = shallowRef('#50b5a6')

const tradeRows: readonly TradeRow[] = [
  { name: '现金管理', type: '低风险', value: '128.40 万', status: '稳健' },
  { name: '债券组合', type: '中低风险', value: '86.20 万', status: '观察' },
  { name: '指数增强', type: '中风险', value: '42.18 万', status: '调仓' },
]
</script>

<template>
  <section class="pg-content">
    <h2>通识平台主题</h2>
    <p class="desc">
      Playground 通过 <code>app.use(ZQUI, { theme: 'aiedu' })</code> 使用通识平台主题。
    </p>

    <div class="theme-demo zq-theme-aiedu">
      <div class="theme-demo__header">
        <div>
          <h3>AIEDU Scope</h3>
          <p>局部主题容器内的主色变量为 <code>--el-color-primary</code>。</p>
        </div>
        <zq-tag type="primary" effect="dark">AIEDU</zq-tag>
      </div>

      <div class="theme-demo__grid">
        <section class="theme-panel theme-panel--wide">
          <h3>按钮与标签</h3>
          <div class="demo-row">
            <zq-button type="primary">Primary</zq-button>
            <zq-button variant="gradient" type="primary">Gradient</zq-button>
            <zq-button variant="soft" type="primary">Soft</zq-button>
            <zq-badge :value="3">
              <zq-button>Badge</zq-button>
            </zq-badge>
            <zq-tag type="primary">Primary Tag</zq-tag>
            <zq-avatar :size="32">F</zq-avatar>
          </div>
        </section>

        <section class="theme-panel theme-panel--wide">
          <h3>表单控件</h3>
          <div class="theme-form">
            <zq-input v-model="inputValue" clearable />
            <zq-select v-model="selectValue">
              <zq-option label="现金管理" value="cash" />
              <zq-option label="债券组合" value="bond" />
              <zq-option label="指数增强" value="index" />
            </zq-select>
            <zq-input-number v-model="amountValue" :min="0" :max="500" />
            <zq-date-picker v-model="dateValue" type="date" value-format="YYYY-MM-DD" />
            <div class="theme-inline">
              <zq-switch v-model="switchValue" />
              <zq-color-picker v-model="colorValue" />
              <zq-rate v-model="rateValue" />
            </div>
            <div class="theme-inline">
              <zq-radio-group v-model="radioValue">
                <zq-radio-button label="default">Default</zq-radio-button>
                <zq-radio-button label="aiedu">AIEDU</zq-radio-button>
              </zq-radio-group>
              <zq-checkbox-group v-model="checkboxValue">
                <zq-checkbox-button label="button">Button</zq-checkbox-button>
                <zq-checkbox-button label="form">Form</zq-checkbox-button>
              </zq-checkbox-group>
            </div>
          </div>
        </section>

        <section class="theme-panel">
          <h3>进度反馈</h3>
          <div class="theme-stack">
            <zq-progress :percentage="progressValue" />
            <zq-slider v-model="sliderValue" />
            <zq-alert title="风控阈值已同步" type="info" :closable="false" show-icon />
          </div>
        </section>

        <section class="theme-panel">
          <h3>导航组件</h3>
          <div class="theme-stack">
            <zq-menu default-active="dashboard" mode="horizontal" :ellipsis="false">
              <zq-menu-item index="dashboard">Dashboard</zq-menu-item>
              <zq-menu-item index="asset">Asset</zq-menu-item>
              <zq-menu-item index="risk">Risk</zq-menu-item>
            </zq-menu>
            <zq-tabs v-model="tabValue">
              <zq-tab-pane label="概览" name="overview" />
              <zq-tab-pane label="收益" name="income" />
              <zq-tab-pane label="风险" name="risk" />
            </zq-tabs>
          </div>
        </section>

        <section class="theme-panel theme-panel--wide">
          <h3>数据展示</h3>
          <zq-table :data="tradeRows" size="small">
            <zq-table-column prop="name" label="组合" />
            <zq-table-column prop="type" label="类型" />
            <zq-table-column prop="value" label="规模" />
            <zq-table-column prop="status" label="状态" />
          </zq-table>
          <zq-pagination
            class="theme-pagination"
            background
            layout="prev, pager, next"
            :total="80"
          />
        </section>

        <section class="theme-panel theme-panel--wide">
          <h3>信息层级</h3>
          <zq-descriptions :column="3" border>
            <zq-descriptions-item label="主题">AIEDU</zq-descriptions-item>
            <zq-descriptions-item label="主色">#50B5A6</zq-descriptions-item>
            <zq-descriptions-item label="作用域">全局安装</zq-descriptions-item>
          </zq-descriptions>
          <zq-collapse v-model="collapseValue" class="theme-collapse">
            <zq-collapse-item title="风险提示" name="risk">
              <zq-text type="primary"
                >主题变量会同步影响当前作用域内的交互态、选中态和强调色。</zq-text
              >
            </zq-collapse-item>
          </zq-collapse>
          <zq-timeline class="theme-timeline">
            <zq-timeline-item timestamp="09:30" type="primary">开盘数据同步</zq-timeline-item>
            <zq-timeline-item timestamp="11:00" type="success">收益曲线更新</zq-timeline-item>
            <zq-timeline-item timestamp="14:30" type="warning">风险指标复核</zq-timeline-item>
          </zq-timeline>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.theme-demo {
  padding: 20px;
  background: var(--el-color-primary-light-9);
  border: 1px solid var(--el-color-primary-light-7);
  border-radius: 8px;
}

.theme-demo__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.theme-demo__header h3 {
  margin: 0 0 4px;
  color: var(--el-color-primary);
  font-size: 18px;
}

.theme-demo__header p {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.theme-demo__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.theme-panel {
  padding: 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
}

.theme-panel--wide {
  grid-column: span 2;
}

.theme-panel h3 {
  margin: 0 0 12px;
  color: var(--el-text-color-primary);
  font-size: 14px;
}

.theme-form,
.theme-stack {
  display: grid;
  gap: 12px;
}

.theme-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.theme-pagination {
  margin-top: 12px;
}

.theme-collapse,
.theme-timeline {
  margin-top: 12px;
}

.theme-demo :deep(.el-menu--horizontal) {
  border-bottom-color: var(--el-border-color-light);
}

@media (max-width: 900px) {
  .theme-demo__grid {
    grid-template-columns: 1fr;
  }

  .theme-panel--wide {
    grid-column: auto;
  }
}
</style>
