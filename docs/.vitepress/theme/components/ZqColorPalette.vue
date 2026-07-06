<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, nextTick, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import { zqThemeOptions, type ZqThemeName } from '../../../../packages/zq-ui/theme'

type ColorSection = 'primary' | 'state' | 'neutral' | 'semantic'

interface ColorToken {
  label: string
  token: string
  usage: string
}

interface ColorTokenGroup {
  title: string
  description: string
  tokens: readonly ColorToken[]
}

const activeTheme = shallowRef<ZqThemeName>('default')
const activeColorSection = shallowRef<ColorSection>('primary')
const previewRef = useTemplateRef<HTMLElement>('preview')
const colorValues = shallowRef<Record<string, string>>({})

const primaryTokens: readonly ColorToken[] = [
  { label: 'Primary', token: '--el-color-primary', usage: '品牌主色 / 主要操作' },
  { label: 'Light 3', token: '--el-color-primary-light-3', usage: '悬浮、弱强调' },
  { label: 'Light 5', token: '--el-color-primary-light-5', usage: '辅助点缀' },
  { label: 'Light 7', token: '--el-color-primary-light-7', usage: '浅色边框' },
  { label: 'Light 8', token: '--el-color-primary-light-8', usage: '浅色悬浮' },
  { label: 'Light 9', token: '--el-color-primary-light-9', usage: '浅色背景' },
  { label: 'Dark 2', token: '--el-color-primary-dark-2', usage: '按下、深色强调' },
]

const stateGroups: readonly ColorTokenGroup[] = [
  {
    title: 'Success 成功',
    description: '用于成功、完成、正向反馈。',
    tokens: [
      { label: 'Base', token: '--el-color-success', usage: '成功主色' },
      { label: 'Light 3', token: '--el-color-success-light-3', usage: '悬浮、弱强调' },
      { label: 'Light 5', token: '--el-color-success-light-5', usage: '辅助点缀' },
      { label: 'Light 7', token: '--el-color-success-light-7', usage: '浅色边框' },
      { label: 'Light 8', token: '--el-color-success-light-8', usage: '浅色悬浮' },
      { label: 'Light 9', token: '--el-color-success-light-9', usage: '浅色背景' },
      { label: 'Dark 2', token: '--el-color-success-dark-2', usage: '按下、深色强调' },
    ],
  },
  {
    title: 'Warning 警告',
    description: '用于提醒、待确认、有潜在风险的状态。',
    tokens: [
      { label: 'Base', token: '--el-color-warning', usage: '警告主色' },
      { label: 'Light 3', token: '--el-color-warning-light-3', usage: '悬浮、弱强调' },
      { label: 'Light 5', token: '--el-color-warning-light-5', usage: '辅助点缀' },
      { label: 'Light 7', token: '--el-color-warning-light-7', usage: '浅色边框' },
      { label: 'Light 8', token: '--el-color-warning-light-8', usage: '浅色悬浮' },
      { label: 'Light 9', token: '--el-color-warning-light-9', usage: '浅色背景' },
      { label: 'Dark 2', token: '--el-color-warning-dark-2', usage: '按下、深色强调' },
    ],
  },
  {
    title: 'Danger 危险',
    description: '用于错误、失败、危险操作。',
    tokens: [
      { label: 'Base', token: '--el-color-danger', usage: '危险主色' },
      { label: 'Light 3', token: '--el-color-danger-light-3', usage: '悬浮、弱强调' },
      { label: 'Light 5', token: '--el-color-danger-light-5', usage: '辅助点缀' },
      { label: 'Light 7', token: '--el-color-danger-light-7', usage: '浅色边框' },
      { label: 'Light 8', token: '--el-color-danger-light-8', usage: '浅色悬浮' },
      { label: 'Light 9', token: '--el-color-danger-light-9', usage: '浅色背景' },
      { label: 'Dark 2', token: '--el-color-danger-dark-2', usage: '按下、深色强调' },
    ],
  },
  {
    title: 'Info 信息',
    description: '用于普通信息、辅助说明、中性提示。',
    tokens: [
      { label: 'Base', token: '--el-color-info', usage: '信息主色' },
      { label: 'Light 3', token: '--el-color-info-light-3', usage: '悬浮、弱强调' },
      { label: 'Light 5', token: '--el-color-info-light-5', usage: '辅助点缀' },
      { label: 'Light 7', token: '--el-color-info-light-7', usage: '浅色边框' },
      { label: 'Light 8', token: '--el-color-info-light-8', usage: '浅色悬浮' },
      { label: 'Light 9', token: '--el-color-info-light-9', usage: '浅色背景' },
      { label: 'Dark 2', token: '--el-color-info-dark-2', usage: '按下、深色强调' },
    ],
  },
]

const neutralGroups: readonly ColorTokenGroup[] = [
  {
    title: '基础色',
    description: '黑白基础变量，常用于纯色文字、反白文字和基础背景。',
    tokens: [
      { label: 'White', token: '--el-color-white', usage: '白色' },
      { label: 'Black', token: '--el-color-black', usage: '黑色' },
    ],
  },
  {
    title: '文本颜色',
    description: '用于标题、正文、辅助说明、占位和禁用文本。',
    tokens: [
      { label: 'Primary', token: '--el-text-color-primary', usage: '标题、正文重点' },
      { label: 'Regular', token: '--el-text-color-regular', usage: '正文内容' },
      { label: 'Secondary', token: '--el-text-color-secondary', usage: '次级说明' },
      { label: 'Placeholder', token: '--el-text-color-placeholder', usage: '占位文本' },
      { label: 'Disabled', token: '--el-text-color-disabled', usage: '禁用文本' },
    ],
  },
  {
    title: '边框颜色',
    description: '用于分割线、表单边框、卡片边界和弱层级结构。',
    tokens: [
      { label: 'Darker', token: '--el-border-color-darker', usage: '更强边框' },
      { label: 'Dark', token: '--el-border-color-dark', usage: '强边框' },
      { label: 'Base', token: '--el-border-color', usage: '默认边框' },
      { label: 'Light', token: '--el-border-color-light', usage: '浅色边框' },
      { label: 'Lighter', token: '--el-border-color-lighter', usage: '更浅边框' },
      { label: 'Extra Light', token: '--el-border-color-extra-light', usage: '极浅边框' },
    ],
  },
  {
    title: '填充色',
    description: '用于禁用背景、浅色面板、表格底色和 hover 填充。',
    tokens: [
      { label: 'Darker', token: '--el-fill-color-darker', usage: '更强填充' },
      { label: 'Dark', token: '--el-fill-color-dark', usage: '强填充' },
      { label: 'Base', token: '--el-fill-color', usage: '默认填充' },
      { label: 'Light', token: '--el-fill-color-light', usage: '浅色填充' },
      { label: 'Lighter', token: '--el-fill-color-lighter', usage: '更浅填充' },
      { label: 'Extra Light', token: '--el-fill-color-extra-light', usage: '极浅填充' },
      { label: 'Blank', token: '--el-fill-color-blank', usage: '空白填充' },
    ],
  },
  {
    title: '背景色',
    description: '用于页面背景、基础容器和浮层容器。',
    tokens: [
      { label: 'Page', token: '--el-bg-color-page', usage: '页面背景' },
      { label: 'Base', token: '--el-bg-color', usage: '基础背景' },
      { label: 'Overlay', token: '--el-bg-color-overlay', usage: '浮层背景' },
    ],
  },
]

const semanticTokens: readonly ColorToken[] = [
  { label: 'Brand', token: '--zq-color-brand', usage: '当前主题品牌主色' },
  { label: 'Brand Soft', token: '--zq-color-brand-soft', usage: '品牌浅色背景' },
  { label: 'Brand Muted', token: '--zq-color-brand-muted', usage: '品牌弱强调色' },
  { label: 'Brand Strong', token: '--zq-color-brand-strong', usage: '品牌深色' },
]

const colorSections: readonly { label: string; name: ColorSection }[] = [
  { label: '主色', name: 'primary' },
  { label: '辅助色', name: 'state' },
  { label: '中性色', name: 'neutral' },
  { label: 'ZQ 语义色', name: 'semantic' },
]

const primaryGroups: readonly ColorTokenGroup[] = [
  {
    title: '主色',
    description: '用于品牌识别、关键操作和当前状态强调。',
    tokens: primaryTokens,
  },
]

const semanticGroups: readonly ColorTokenGroup[] = [
  {
    title: 'ZQ 语义色',
    description: '业务样式可以优先使用这一组语义变量，随当前主题自动变化。',
    tokens: semanticTokens,
  },
]

const themes = zqThemeOptions
const activeThemeMeta = computed(() => themes.find((theme) => theme.name === activeTheme.value))
const activeThemeClass = computed(() => `zq-theme-${activeTheme.value}`)
const activeColorGroups = computed(() => {
  if (activeColorSection.value === 'primary') return primaryGroups
  if (activeColorSection.value === 'state') return stateGroups
  if (activeColorSection.value === 'neutral') return neutralGroups
  return semanticGroups
})
const activeTokens = computed(() => activeColorGroups.value.flatMap((group) => group.tokens))

function tokenStyle(token: string) {
  return { background: `var(${token})` }
}

function rgbToHex(value: string) {
  const match = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)$/)
  if (!match) return value

  const [, red = '0', green = '0', blue = '0', alpha] = match
  const channels = [red, green, blue].map((channel) =>
    Number(channel).toString(16).padStart(2, '0'),
  )

  if (alpha !== undefined && Number(alpha) < 1) return value
  return `#${channels.join('')}`
}

function resolveColorValue(target: HTMLElement, token: string) {
  const probe = document.createElement('span')
  probe.style.color = `var(${token})`
  probe.style.position = 'absolute'
  probe.style.pointerEvents = 'none'
  probe.style.visibility = 'hidden'
  target.append(probe)

  const value = getComputedStyle(probe).color
  probe.remove()

  return rgbToHex(value)
}

async function updateColorValues() {
  await nextTick()

  const target = previewRef.value
  if (!target) return

  const nextValues: Record<string, string> = {}
  activeTokens.value.forEach((item) => {
    nextValues[item.token] = resolveColorValue(target, item.token)
  })
  colorValues.value = nextValues
}

async function copyToken(token: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(token)
    } else {
      copyTokenWithTextarea(token)
    }
    ElMessage.success(`已复制 ${token}`)
  } catch {
    try {
      copyTokenWithTextarea(token)
      ElMessage.success(`已复制 ${token}`)
    } catch {
      ElMessage.error('复制失败')
    }
  }
}

function copyTokenWithTextarea(token: string) {
  const textarea = document.createElement('textarea')
  textarea.value = token
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '-9999px'
  document.body.append(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) {
    throw new Error('copy failed')
  }
}

onMounted(() => {
  void updateColorValues()
})

watch([activeTheme, activeColorSection], () => {
  void updateColorValues()
})
</script>

<template>
  <section class="zq-color-doc">
    <el-tabs v-model="activeTheme" class="zq-color-tabs">
      <el-tab-pane
        v-for="theme in themes"
        :key="theme.name"
        :label="theme.label"
        :name="theme.name"
      />
    </el-tabs>

    <div ref="preview" :class="['zq-color-preview', activeThemeClass]">
      <div class="zq-color-hero">
        <div>
          <h2>{{ activeThemeMeta?.label }}</h2>
          <p>{{ activeThemeMeta?.description }}</p>
        </div>
      </div>

      <el-tabs v-model="activeColorSection" class="zq-color-section-tabs">
        <el-tab-pane
          v-for="section in colorSections"
          :key="section.name"
          :label="section.label"
          :name="section.name"
        />
      </el-tabs>

      <section v-for="group in activeColorGroups" :key="group.title" class="zq-color-token-section">
        <h3>{{ group.title }}</h3>
        <p class="zq-color-subdesc">{{ group.description }}</p>
        <div class="zq-color-table">
          <div class="zq-color-table-head">
            <span>色值</span>
            <span>名称</span>
            <span>值</span>
            <span>变量</span>
            <span>说明</span>
          </div>
          <button
            v-for="item in group.tokens"
            :key="item.token"
            class="zq-color-row"
            type="button"
            @click="copyToken(item.token)"
          >
            <div class="zq-color-chip" :style="tokenStyle(item.token)" />
            <strong>{{ item.label }}</strong>
            <span class="zq-color-value">{{ colorValues[item.token] }}</span>
            <code>{{ item.token }}</code>
            <span>{{ item.usage }}</span>
          </button>
        </div>
      </section>

      <p v-if="activeColorSection === 'neutral'" class="zq-color-note">
        ZQ-UI 未覆盖的中性色变量继承 Element Plus 默认值。
      </p>

      <details class="zq-color-all">
        <summary>完整变量索引</summary>
        <div class="zq-color-all-content">
          <section class="zq-color-token-section">
            <h3>主色</h3>
            <div class="zq-color-mini-list">
              <code v-for="item in primaryTokens" :key="item.token">{{ item.token }}</code>
            </div>
          </section>
          <section v-for="group in stateGroups" :key="group.title" class="zq-color-token-section">
            <h3>{{ group.title }}</h3>
            <div class="zq-color-mini-list">
              <code v-for="item in group.tokens" :key="item.token">{{ item.token }}</code>
            </div>
          </section>
          <section v-for="group in neutralGroups" :key="group.title" class="zq-color-token-section">
            <h3>{{ group.title }}</h3>
            <div class="zq-color-mini-list">
              <code v-for="item in group.tokens" :key="item.token">{{ item.token }}</code>
            </div>
          </section>
          <section class="zq-color-token-section">
            <h3>ZQ 语义色</h3>
            <div class="zq-color-mini-list">
              <code v-for="item in semanticTokens" :key="item.token">{{ item.token }}</code>
            </div>
          </section>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.zq-color-doc {
  padding-top: 8px;
}

.zq-color-tabs {
  margin-top: 16px;
}

.zq-color-doc :deep(.el-tabs__item) {
  color: var(--vp-c-text-2);
}

.zq-color-doc :deep(.el-tabs__item:hover),
.zq-color-doc :deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
}

.zq-color-doc :deep(.el-tabs__active-bar) {
  background-color: var(--el-color-primary);
}

.zq-color-doc :deep(.el-tabs__nav-wrap::after) {
  background-color: var(--vp-c-divider);
}

.zq-color-preview {
  padding: 14px 0 8px;
}

.zq-color-hero {
  padding: 2px 0 2px 14px;
  margin: 8px 0 18px;
  border-left: 3px solid var(--el-color-primary);
}

.zq-color-hero h2 {
  margin: 0;
  padding: 0;
  font-size: 22px;
  border: 0;
}

.zq-color-hero p {
  max-width: 620px;
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
}

.zq-color-section-tabs {
  margin-bottom: 14px;
}

.zq-color-token-section {
  margin-top: 16px;
}

.zq-color-token-section h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.zq-color-subdesc {
  margin: 0 0 10px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.zq-color-table {
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.zq-color-table-head,
.zq-color-row {
  display: grid;
  grid-template-columns: 48px minmax(92px, 0.6fr) minmax(92px, 0.6fr) minmax(220px, 1.4fr) minmax(
      150px,
      1fr
    );
  align-items: center;
  gap: 12px;
}

.zq-color-table-head {
  padding: 9px 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
}

.zq-color-row {
  width: 100%;
  min-height: 48px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  color: inherit;
  cursor: copy;
  font: inherit;
  text-align: left;
  transition: background var(--zq-transition-fast, 0.15s ease);
}

.zq-color-row:hover {
  background: var(--vp-c-bg-soft);
}

.zq-color-row strong {
  font-size: 14px;
}

.zq-color-row span {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.zq-color-row code {
  width: fit-content;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-size: 12px;
}

.zq-color-value {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.zq-color-chip {
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
}

.zq-color-note {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.zq-color-all {
  margin-top: 18px;
}

.zq-color-all-content {
  display: grid;
  gap: 12px;
  padding: 12px;
}

.zq-color-mini-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 720px) {
  .zq-color-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .zq-color-table-head {
    display: none;
  }

  .zq-color-row {
    grid-template-columns: 36px 1fr;
    gap: 6px 10px;
  }

  .zq-color-value,
  .zq-color-row code,
  .zq-color-row span {
    grid-column: 2;
  }
}
</style>
