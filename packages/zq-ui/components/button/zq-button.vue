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

interface ZqButtonProps extends Partial<ButtonProps> {
  /**
   * 按钮样式变体，不传则使用 Element Plus 原生样式
   * - `gradient`：渐变背景，白色文字，无边框
   * - `primary-outline`：白底主色描边，跟随主题主色
   */
  variant?: 'gradient' | 'primary-outline'
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
  return props.variant ? `zq-btn--${props.variant}` : ''
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
 * 排除自定义 props（variant、debounce、throttle），其余全部透传
 */
const forwardedBindings = computed(() => {
  const { variant: _variant, debounce, throttle, ...elButtonProps } = props
  const { onClick, ...restAttrs } = attrs

  if (throttle > 0 && isClickBinding(onClick)) {
    return { ...elButtonProps, ...restAttrs, onClick: handleThrottledClick }
  }

  if (debounce > 0 && isClickBinding(onClick)) {
    return { ...elButtonProps, ...restAttrs, onClick: handleDebouncedClick }
  }

  return { ...elButtonProps, ...attrs }
})
</script>
