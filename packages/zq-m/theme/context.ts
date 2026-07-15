import type { ComputedRef, InjectionKey } from 'vue'
import type { ZqmThemeName } from './index'
import { defaultZqmTheme } from './index'

/**
 * provide/inject key：当前局部主题名。
 * 由 <zqm-theme-provider> 提供，后续弹层类代理组件消费。
 */
export const ZQM_THEME_KEY: InjectionKey<ComputedRef<ZqmThemeName>> = Symbol('zqm-theme')

/**
 * 需要注入主题 class 的 Vant 组件（kebab tag，不含 zqm- 前缀）。
 *
 * 这些组件的浮层常 teleport 到 body，脱离局部 `.zqm-theme-*` 作用域。
 * 后续封装弹层代理时，把组件名加入此集合即可自动注入。
 * 当前骨架阶段先留空，等实际组件落地再补。
 */
export const POPPER_COMPONENTS: ReadonlySet<string> = new Set([])

/** 主题名 → 局部作用域 class；default 主题不需要 class */
export function resolveThemeClass(theme: ZqmThemeName | undefined): string {
  if (!theme || theme === defaultZqmTheme) return ''
  return `zqm-theme-${theme}`
}

function toClassString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

/**
 * 把主题 class 合并进 attrs 的 class-name / overlay-class 等，返回新 attrs。
 * Vant 弹层常用 `className` / `overlayClass`，兼容 kebab 写法。
 */
export function withPopperTheme(
  attrs: Record<string, unknown>,
  themeClass: string,
  classKeys: readonly string[] = ['className', 'class-name'],
): Record<string, unknown> {
  if (!themeClass) return attrs

  const next: Record<string, unknown> = { ...attrs }
  let existing = ''

  for (const key of classKeys) {
    const value = toClassString(next[key])
    if (value) {
      existing = existing ? `${existing} ${value}` : value
      delete next[key]
    }
  }

  // 统一写到 camelCase className，避免重复键
  next.className = existing ? `${existing} ${themeClass}` : themeClass
  return next
}
