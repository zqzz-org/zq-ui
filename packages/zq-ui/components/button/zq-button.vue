<template>
  <el-button :class="buttonClass" v-bind="forwardedBindings">
    <template v-for="(_, name) in slots" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, useAttrs, useSlots } from 'vue'
import type { ButtonProps } from 'element-plus'

type ClickHandler = (event: MouseEvent) => void
type ClickBinding = ClickHandler | ClickHandler[]

/** 自定义尺寸值 */
type ZqButtonCustomSize =
  'block-hefty' | 'block-stout' | 'block-lean' | 'inline-roomy' | 'inline-comfy' | 'inline-trim'

/** 自定义尺寸集合，用于判断是否透传给 EP */
const CUSTOM_SIZES: readonly string[] = [
  'block-hefty',
  'block-stout',
  'block-lean',
  'inline-roomy',
  'inline-comfy',
  'inline-trim',
]

interface ZqButtonProps extends Omit<Partial<ButtonProps>, 'size'> {
  /**
   * 按钮样式变体，不传则使用 Element Plus 原生样式
   * - `gradient`：渐变背景，白色文字，无边框
   * - `crisp`：白底主色描边，跟随主题主色
   * - `soft`：浅主色填充，主色文字，悬浮/点击显示主色边框
   * - `ring`：继承 EP 默认实色填充，叠加白色描边
   * - `ghost`：透明底 + 主色文字 + 主色描边，悬浮/点击显形
   * - `reveal`：白底灰框，悬浮/点击时主色浮现
   * - `bare`：极简文字，无背景无边框，hover/active 变色
   */
  variant?: 'gradient' | 'crisp' | 'soft' | 'ring' | 'ghost' | 'reveal' | 'bare'
  /**
   * 按钮尺寸，EP 原生值与自定义值共存
   * - EP 原生：`large` / `default` / `small`（原样透传）
   * - block-*（固定宽度）：`block-hefty` / `block-stout` / `block-lean`
   * - inline-*（自适应宽度）：`inline-roomy` / `inline-comfy` / `inline-trim`
   */
  size?: 'large' | 'default' | 'small' | ZqButtonCustomSize
  /**
   * 防抖延迟时间，单位 ms；不传或小于等于 0 时不启用
   */
  debounce?: number
  /**
   * 节流间隔时间，单位 ms；首次点击立即触发，间隔内忽略后续点击
   */
  throttle?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ZqButtonProps>(), {
  debounce: 0,
  throttle: 0,
})

const attrs = useAttrs()
const slots = useSlots()
let debounceTimer: ReturnType<typeof setTimeout> | undefined
let throttleTimer: ReturnType<typeof setTimeout> | undefined
let isThrottled = false

const buttonClass = computed(() => {
  const classes: string[] = []
  if (props.variant) classes.push(`zq-btn--${props.variant}`)
  if (props.size && CUSTOM_SIZES.includes(props.size)) {
    classes.push(`zq-btn--size-${props.size}`)
  }
  return classes.join(' ')
})

function isClickHandler(value: unknown): value is ClickHandler {
  return typeof value === 'function'
}

function isClickBinding(value: unknown): value is ClickBinding {
  return isClickHandler(value) || (Array.isArray(value) && value.every(isClickHandler))
}

function callClickBinding(binding: ClickBinding, event: MouseEvent) {
  if (Array.isArray(binding)) {
    binding.forEach((handler) => handler(event))
    return
  }

  binding(event)
}

function clearDebounceTimer() {
  if (debounceTimer !== undefined) {
    clearTimeout(debounceTimer)
    debounceTimer = undefined
  }
}

function clearThrottleTimer() {
  if (throttleTimer !== undefined) {
    clearTimeout(throttleTimer)
    throttleTimer = undefined
  }
  isThrottled = false
}

function handleDebouncedClick(event: MouseEvent) {
  const { onClick } = attrs

  if (!isClickBinding(onClick)) return

  clearDebounceTimer()

  debounceTimer = setTimeout(() => {
    callClickBinding(onClick, event)
    debounceTimer = undefined
  }, props.debounce)
}

function handleThrottledClick(event: MouseEvent) {
  const { onClick } = attrs

  if (!isClickBinding(onClick) || isThrottled) return

  clearDebounceTimer()
  callClickBinding(onClick, event)

  isThrottled = true
  throttleTimer = setTimeout(() => {
    isThrottled = false
    throttleTimer = undefined
  }, props.throttle)
}

onBeforeUnmount(() => {
  clearDebounceTimer()
  clearThrottleTimer()
})

/**
 * 构建转发给 el-button 的属性绑定
 * 排除自定义 props（variant、自定义 size、debounce、throttle），其余全部透传
 */
const forwardedBindings = computed(() => {
  const { variant: _variant, debounce, throttle, ...restProps } = props
  const { size } = restProps
  // 自定义 size 不透传给 EP，只用于 CSS class
  const epProps = { ...restProps }
  if (size && CUSTOM_SIZES.includes(size)) {
    delete epProps.size
  }
  const { onClick, ...restAttrs } = attrs

  if (throttle > 0 && isClickBinding(onClick)) {
    return { ...epProps, ...restAttrs, onClick: handleThrottledClick }
  }

  if (debounce > 0 && isClickBinding(onClick)) {
    return { ...epProps, ...restAttrs, onClick: handleDebouncedClick }
  }

  return { ...epProps, ...attrs }
})
</script>
