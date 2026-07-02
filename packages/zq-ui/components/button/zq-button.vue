<template>
  <el-button :class="buttonClass" v-bind="forwardedBindings">
    <template v-for="(_, name) in slots" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope || {}" />
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import type { ButtonProps } from 'element-plus'

interface ZqButtonProps extends Partial<ButtonProps> {
  /**
   * 按钮样式变体，不传则使用 Element Plus 原生样式
   * - `gradient`：渐变背景，白色文字，无边框
   * - `soft`：浅色背景，文字色为主色，无边框
   */
  variant?: 'gradient' | 'soft'
}

const props = defineProps<ZqButtonProps>()

const attrs = useAttrs()
const slots = useSlots()

const buttonClass = computed(() => {
  return props.variant ? `zq-btn--${props.variant}` : ''
})

/**
 * 构建转发给 el-button 的属性绑定
 * 排除自定义 props（variant），其余全部透传
 */
const forwardedBindings = computed(() => {
  const { variant, ...elButtonProps } = props
  return { ...elButtonProps, ...attrs }
})
</script>
