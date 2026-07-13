<template>
  <component :is="tag" :class="themeClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import type { ZqThemeName } from '../../theme'
import { defaultZqTheme } from '../../theme'
import { ZQ_THEME_KEY, resolveThemeClass } from '../../theme/context'

interface ZqThemeProviderProps {
  /** 当前作用域主题，默认 default（不加任何主题 class） */
  theme?: ZqThemeName
  /** 渲染的容器标签，默认 div */
  tag?: string
}

const props = withDefaults(defineProps<ZqThemeProviderProps>(), {
  theme: defaultZqTheme,
  tag: 'div',
})

// provide 一个响应式 ref，主题切换时后代弹层组件自动拿到新值
provide(
  ZQ_THEME_KEY,
  computed(() => props.theme),
)

const themeName = toRef(props, 'theme')
const themeClass = computed(() => resolveThemeClass(themeName.value))
</script>
