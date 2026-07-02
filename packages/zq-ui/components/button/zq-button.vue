<template>
  <el-button :class="buttonClass" v-bind="forwardedBindings">
    <!-- 动态转发所有插槽到 el-button -->
    <template v-for="(_, name) in slots" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ElButton } from 'element-plus'
import type { ButtonProps } from 'element-plus'

/**
 * ZQ Button - 基于 Element Plus Button 的二次封装
 * 完全继承 Element Plus Button 的所有属性、事件和插槽，
 * 并扩展了自定义 variant 样式变体和 debounce 防抖能力。
 */
interface ZqButtonProps extends Partial<ButtonProps> {
  /**
   * 按钮样式变体，不传则使用 Element Plus 原生样式
   * - `gradient`：渐变背景，白色文字，无边框
   * - `soft`：浅色背景，文字色为主色，无边框
   */
  variant?: 'gradient' | 'soft'

  /**
   * 防抖延迟时间（毫秒），设置为大于 0 的值时启用 click 事件防抖
   * 在防抖期间内的重复点击将被忽略，但原生事件对象在首次触发时完整传递
   * @default 0
   */
  debounce?: number
}

const props = withDefaults(defineProps<ZqButtonProps>(), {
  debounce: 0,
})

const attrs = useAttrs()
const slots = useSlots()

/** 防抖定时器 */
let debounceTimer: ReturnType<typeof setTimeout> | null = null

/** 根据 variant 动态生成 BEM class */
const buttonClass = computed(() => {
  return props.variant ? `zq-btn--${props.variant}` : ''
})

/**
 * 构建转发给 el-button 的属性绑定
 * - 排除自定义 props（variant、debounce）
 * - 对 onClick 做防抖包装后统一放入 bindings
 * - 其他事件（如 onDblclick）原样透传
 *
 * 包装后的 onClick 直接通过 v-bind 传入 el-button。
 */
const forwardedBindings = computed(() => {
  const { variant, debounce, ...elButtonProps } = props
  const { onClick, ...restAttrs } = attrs as Record<string, unknown>

  // 仅当父组件传了 @click 且需要防抖时才包装
  const wrapped: Record<string, unknown> = {}
  if (typeof onClick === 'function') {
    wrapped.onClick =
      props.debounce > 0
        ? (e: MouseEvent) => {
            if (debounceTimer) return
            debounceTimer = setTimeout(() => {
              debounceTimer = null
            }, props.debounce)
            ;(onClick as (e: MouseEvent) => void)(e)
          }
        : onClick // 无防抖时直接透传原始函数，零开销
  }

  return { ...elButtonProps, ...restAttrs, ...wrapped }
})
</script>
