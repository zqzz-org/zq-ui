<script setup lang="ts">
import { CollectionTag, CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, nextTick, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import { zqThemeOptions, type ZqThemeName } from '../../../../packages/zq-ui/theme'

interface ColorToken {
  label: string
  token: string
  usage: string
}

interface ColorTokenGroup {
  title: string
  tokens: readonly ColorToken[]
}

interface ColorTokenSection {
  title: string
  groups: readonly ColorTokenGroup[]
}

const activeTheme = shallowRef<ZqThemeName>('default')
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
    title: 'Success',
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
    title: 'Warning',
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
    title: 'Danger',
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
    title: 'Info',
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
    tokens: [
      { label: 'White', token: '--el-color-white', usage: '白色' },
      { label: 'Black', token: '--el-color-black', usage: '黑色' },
    ],
  },
  {
    title: '文本颜色',
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

const primaryGroups: readonly ColorTokenGroup[] = [
  {
    title: 'Brand Color',
    tokens: primaryTokens,
  },
]

const semanticGroups: readonly ColorTokenGroup[] = [
  {
    title: 'ZQ 语义色',
    tokens: semanticTokens,
  },
]

const themes = zqThemeOptions
const activeThemeClass = computed(() => `zq-theme-${activeTheme.value}`)
const colorGroupSections: readonly ColorTokenSection[] = [
  { title: 'ZQ 语义色', groups: semanticGroups },
  { title: '主色', groups: primaryGroups },
  { title: '辅助色', groups: stateGroups },
  { title: '中性色', groups: neutralGroups },
]
const allTokens = colorGroupSections.flatMap((section) =>
  section.groups.flatMap((group) => group.tokens),
)

function tokenStyle(token: string) {
  return { background: `var(${token})` }
}

function tokenLabel(item: ColorToken) {
  return item.label
}

function tokenValue(token: string) {
  return colorValues.value[token] || token
}

function getBaseToken(tokens: readonly ColorToken[]) {
  return tokens.find((item) => item.label === 'Primary' || item.label === 'Base') || tokens[0]
}

function getShadeTokens(tokens: readonly ColorToken[]) {
  const baseToken = getBaseToken(tokens)
  return tokens.filter((item) => item.token !== baseToken?.token)
}

function isLightColor(value: string) {
  const hex = value.replace('#', '')
  if (hex.length !== 6) return false

  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000

  return brightness > 180
}

function tokenTextStyle(token: string) {
  const value = tokenValue(token)
  return { color: isLightColor(value) ? 'var(--el-text-color-primary)' : 'var(--el-color-white)' }
}

function groupClass(sectionTitle: string) {
  if (isFlatSection(sectionTitle)) return 'zq-color-neutral-grid'
  return isRampSection(sectionTitle) ? 'zq-color-card-grid' : 'zq-color-neutral-grid'
}

function isRampSection(sectionTitle: string) {
  return sectionTitle === '辅助色'
}

function isFlatSection(sectionTitle: string) {
  return sectionTitle === '主色' || sectionTitle === 'ZQ 语义色'
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
  allTokens.forEach((item) => {
    nextValues[item.token] = resolveColorValue(target, item.token)
  })
  colorValues.value = nextValues
}

async function copyColor(token: string) {
  await copyText(tokenValue(token))
}

async function copyText(value: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value)
    } else {
      copyColorWithTextarea(value)
    }
    ElMessage.success(`已复制 ${value}`)
  } catch {
    try {
      copyColorWithTextarea(value)
      ElMessage.success(`已复制 ${value}`)
    } catch {
      ElMessage.error('复制失败')
    }
  }
}

function copyColorWithTextarea(value: string) {
  const textarea = document.createElement('textarea')
  textarea.value = value
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

watch(activeTheme, () => {
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
      <section v-for="section in colorGroupSections" :key="section.title" class="zq-color-section">
        <h2 class="zq-color-section-title">{{ section.title }}</h2>
        <div :class="groupClass(section.title)">
          <section
            v-for="group in section.groups"
            :key="group.title"
            :class="[
              'zq-color-token-section',
              { 'zq-color-token-section--flat': isFlatSection(section.title) },
            ]"
          >
            <button
              v-if="isRampSection(section.title) && getBaseToken(group.tokens)"
              class="zq-color-card zq-color-card--main"
              type="button"
              :style="tokenStyle(getBaseToken(group.tokens).token)"
              :title="getBaseToken(group.tokens).token"
              @click="copyColor(getBaseToken(group.tokens).token)"
            >
              <span :style="tokenTextStyle(getBaseToken(group.tokens).token)">
                {{ group.title }}
              </span>
              <strong :style="tokenTextStyle(getBaseToken(group.tokens).token)">
                {{ tokenValue(getBaseToken(group.tokens).token) }}
              </strong>
            </button>
            <div
              v-if="isRampSection(section.title) && getShadeTokens(group.tokens).length > 0"
              class="zq-color-shades"
            >
              <button
                v-for="item in getShadeTokens(group.tokens)"
                :key="item.token"
                class="zq-color-shade"
                type="button"
                :style="tokenStyle(item.token)"
                :title="`${item.token} ${tokenValue(item.token)}`"
                @click="copyColor(item.token)"
              />
            </div>
            <template v-if="isFlatSection(section.title)">
              <article
                v-for="item in group.tokens"
                :key="item.token"
                class="zq-color-card zq-color-card--flat"
                :style="tokenStyle(item.token)"
                :title="item.token"
              >
                <span class="zq-color-card-content">
                  <span :style="tokenTextStyle(item.token)">{{ tokenLabel(item) }}</span>
                  <strong :style="tokenTextStyle(item.token)">{{ tokenValue(item.token) }}</strong>
                </span>
                <span class="zq-color-copy-actions">
                  <button
                    class="zq-color-copy-action"
                    type="button"
                    :aria-label="`Copy ${item.token}`"
                    :title="`Copy ${item.token}`"
                    @click="copyText(item.token)"
                  >
                    <CollectionTag />
                  </button>
                  <button
                    class="zq-color-copy-action"
                    type="button"
                    :aria-label="`Copy ${tokenValue(item.token)}`"
                    :title="`Copy ${tokenValue(item.token)}`"
                    @click="copyColor(item.token)"
                  >
                    <CopyDocument />
                  </button>
                </span>
              </article>
            </template>
            <template v-else-if="!isRampSection(section.title)">
              <button
                v-for="item in group.tokens"
                :key="item.token"
                class="zq-color-card zq-color-card--neutral"
                type="button"
                :style="tokenStyle(item.token)"
                :title="item.token"
                @click="copyColor(item.token)"
              >
                <span :style="tokenTextStyle(item.token)">{{ tokenLabel(item) }}</span>
                <strong :style="tokenTextStyle(item.token)">{{ tokenValue(item.token) }}</strong>
              </button>
            </template>
          </section>
        </div>
      </section>
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

.zq-color-section {
  margin-top: 24px;
}

.zq-color-section:first-child {
  margin-top: 4px;
}

.zq-color-section-title {
  margin: 0 0 14px;
  padding-top: 0;
  border-top: 0;
  border-bottom: 0;
  font-size: 20px;
}

.zq-color-token-section {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.zq-color-card-grid,
.zq-color-neutral-grid {
  display: grid;
  gap: 12px;
}

.zq-color-card-grid {
  grid-template-columns: repeat(auto-fill, minmax(190px, 220px));
  justify-content: start;
}

.zq-color-neutral-grid {
  grid-template-columns: repeat(auto-fill, minmax(180px, 220px));
  justify-content: start;
}

.zq-color-neutral-grid .zq-color-token-section {
  display: grid;
  gap: 8px;
  overflow: visible;
  border: 0;
  border-radius: 0;
}

.zq-color-card {
  display: grid;
  align-content: center;
  gap: 4px;
  width: 100%;
  min-height: 72px;
  padding: 16px 20px;
  border: 0;
  cursor: copy;
  font: inherit;
  text-align: left;
}

.zq-color-card--flat {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  min-height: 84px;
  cursor: default;
}

.zq-color-card span,
.zq-color-card strong {
  position: relative;
  z-index: 1;
}

.zq-color-card span,
.zq-color-card-content {
  min-width: 0;
}

.zq-color-card > span:not(.zq-color-copy-actions),
.zq-color-card-content {
  display: grid;
  gap: 4px;
}

.zq-color-card span:not(.zq-color-copy-actions) {
  font-size: 14px;
  line-height: 1.35;
}

.zq-color-card strong {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  text-transform: uppercase;
}

.zq-color-copy-actions {
  display: grid;
  gap: 6px;
}

.zq-color-copy-action {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  color: var(--el-text-color-primary);
  background: rgb(255 255 255 / 42%);
  border: 1px solid rgb(255 255 255 / 46%);
  border-radius: 4px;
  cursor: copy;
}

.zq-color-copy-action svg {
  width: 15px;
  height: 15px;
}

.zq-color-card--neutral {
  min-height: 96px;
  border: 1px solid var(--vp-c-divider);
}

.zq-color-shades {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28px, 1fr));
}

.zq-color-shade {
  min-height: 40px;
  border: 0;
  cursor: copy;
}

.zq-color-neutral-grid .zq-color-token-section--flat {
  grid-column: 1 / -1;
  grid-template-columns: repeat(auto-fill, minmax(136px, 160px));
  justify-content: start;
}

@media (max-width: 720px) {
  .zq-color-card-grid,
  .zq-color-neutral-grid {
    grid-template-columns: 1fr;
  }

  .zq-color-card {
    min-height: 68px;
  }

  .zq-color-card--neutral {
    min-height: 84px;
  }
}
</style>
