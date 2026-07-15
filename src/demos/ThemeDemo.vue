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

const popperValue = shallowRef('cash')
const popperDate = shallowRef('2026-07-06')
const popperThemes = [
  { name: 'aiedu', label: '通识平台' },
  { name: 'xk', label: '信息科技' },
  { name: 'qedu', label: '素养' },
  { name: 'aistudy', label: '学习平台' },
] as const
</script>

<template>
  <section class="pg-content">
    <zq-theme-provider theme="aiedu" class="theme-demo">
      <div class="theme-demo__grid">
        <section class="theme-panel theme-panel--wide">
          <h3>按钮与标签</h3>
          <div class="demo-row">
            <zq-button type="primary">Primary</zq-button>
            <zq-button variant="gradient" type="primary">Gradient</zq-button>
            <zq-button variant="soft">Soft</zq-button>
            <zq-button variant="ring">Ring</zq-button>
            <zq-button variant="ghost">Ghost</zq-button>
            <zq-button variant="reveal">Reveal</zq-button>
            <zq-button variant="bare">Bare</zq-button>
            <zq-button variant="crisp">Crisp</zq-button>
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
    </zq-theme-provider>

    <h2 class="multi-theme-title">同页多主题 · 弹层适配</h2>
    <p class="multi-theme-desc">
      用 <code>&lt;zq-theme-provider&gt;</code> 包裹即可局部切主题。下拉/日期等弹层会 teleport 到
      body，Provider 自动把主题 class 注入到 <code>popper-class</code>，点开对比选中项颜色。
    </p>
    <div class="multi-theme-grid">
      <zq-theme-provider
        v-for="t in popperThemes"
        :key="t.name"
        :theme="t.name"
        class="multi-theme-cell"
      >
        <div class="multi-theme-cell__head">
          <strong>{{ t.label }}</strong>
          <zq-tag type="primary" effect="dark" size="small">{{ t.name }}</zq-tag>
        </div>
        <zq-select v-model="popperValue" placeholder="选择组合">
          <zq-option label="现金管理" value="cash" />
          <zq-option label="债券组合" value="bond" />
          <zq-option label="指数增强" value="index" />
        </zq-select>
        <zq-date-picker v-model="popperDate" type="date" value-format="YYYY-MM-DD" />
      </zq-theme-provider>
    </div>
  </section>
</template>

<style scoped>
.theme-demo {
  padding: 20px;
  border: 1px solid var(--el-color-primary-light-7);
  border-radius: 8px;
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

.multi-theme-title {
  margin-top: 32px;
}

.multi-theme-desc {
  margin: 0 0 16px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.multi-theme-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.multi-theme-cell {
  display: grid;
  gap: 10px;
  padding: 16px;
  background: var(--el-color-primary-light-9);
  border: 1px solid var(--el-color-primary-light-7);
  border-radius: 8px;
}

.multi-theme-cell__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.multi-theme-cell__head strong {
  color: var(--el-color-primary);
  font-size: 14px;
}

@media (max-width: 900px) {
  .theme-demo__grid {
    grid-template-columns: 1fr;
  }

  .theme-panel--wide {
    grid-column: auto;
  }

  .multi-theme-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
