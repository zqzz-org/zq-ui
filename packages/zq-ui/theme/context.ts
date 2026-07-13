import type { ComputedRef, InjectionKey } from 'vue'
import type { ZqThemeName } from './index'
import { defaultZqTheme } from './index'

/**
 * provide/inject key：当前局部主题名。
 * 由 <zq-theme-provider> 提供，弹层类代理组件消费。
 */
export const ZQ_THEME_KEY: InjectionKey<ComputedRef<ZqThemeName>> = Symbol('zq-theme')

/**
 * 需要注入主题 class 的 EP 组件（kebab tag，不含 zq- 前缀）。
 *
 * 这些组件的弹层会 teleport 到 <body>，脱离局部 `.zq-theme-*` 作用域，
 * 拿不到被覆盖的 `--el-color-primary`。给它们的 popper-class 补一个主题 class，
 * 让弹层节点重新进入作用域即可适配。
 *
 * 名单来源：EP 中声明了 `popperClass` prop 的组件。
 */
export const POPPER_COMPONENTS: ReadonlySet<string> = new Set([
  'select',
  'tree-select',
  'cascader',
  'date-picker',
  'time-picker',
  'time-select',
  'dropdown',
  'tooltip',
  'popover',
  'color-picker',
])

/** 主题名 → 局部作用域 class；default 主题不需要 class */
export function resolveThemeClass(theme: ZqThemeName | undefined): string {
  if (!theme || theme === defaultZqTheme) return ''
  return `zq-theme-${theme}`
}

function toClassString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

/**
 * 把主题 class 合并进 attrs 的 popper-class，返回新 attrs。
 * 兼容用户写 `popper-class` 或 `popperClass` 两种键，统一归一到 `popperClass`。
 */
export function withPopperTheme(
  attrs: Record<string, unknown>,
  themeClass: string,
): Record<string, unknown> {
  if (!themeClass) return attrs
  const { popperClass, 'popper-class': popperClassKebab, ...rest } = attrs
  const existing = [toClassString(popperClass), toClassString(popperClassKebab)]
    .filter(Boolean)
    .join(' ')
  return { ...rest, popperClass: existing ? `${existing} ${themeClass}` : themeClass }
}
