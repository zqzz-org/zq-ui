export type ZqmThemeName = 'default' | 'aiedu' | 'xk' | 'qedu' | 'aistudy'

export interface ZqmThemeOption {
  label: string
  name: ZqmThemeName
}

export interface ZqmThemeHostRule {
  theme: ZqmThemeName
  hosts?: readonly string[]
  includes?: readonly string[]
}

export interface ResolveZqmThemeOptions {
  hostname?: string
  rules?: readonly ZqmThemeHostRule[]
  fallback?: ZqmThemeName
}

export interface ApplyZqmThemeByHostOptions extends ResolveZqmThemeOptions {
  target?: HTMLElement
}

export const defaultZqmTheme: ZqmThemeName = 'default'

export const zqmThemeOptions: readonly ZqmThemeOption[] = [
  {
    label: 'Default 默认',
    name: 'default',
  },
  {
    label: 'AIEDU 通识平台',
    name: 'aiedu',
  },
  {
    label: 'XK 信息科技',
    name: 'xk',
  },
  {
    label: 'QEDU 素养',
    name: 'qedu',
  },
  {
    label: 'AIStudy 学习平台',
    name: 'aistudy',
  },
]

export const defaultZqmThemeHostRules: readonly ZqmThemeHostRule[] = [
  { theme: 'aiedu', includes: ['aiedu'] },
  { theme: 'xk', includes: ['xk'] },
  { theme: 'qedu', includes: ['qedu'] },
  { theme: 'aistudy', includes: ['aistudy'] },
]

function getCurrentHostname(): string {
  if (typeof window === 'undefined') return ''
  return window.location.hostname
}

function getDefaultTarget(): HTMLElement | undefined {
  if (typeof document === 'undefined') return undefined
  return document.documentElement
}

function normalizeHost(value: string): string {
  return value.trim().toLowerCase()
}

function matchesHostRule(hostname: string, rule: ZqmThemeHostRule): boolean {
  const normalized = normalizeHost(hostname)
  const exactMatch = rule.hosts?.some((host) => normalizeHost(host) === normalized) ?? false
  const includesMatch =
    rule.includes?.some((fragment) => normalized.includes(normalizeHost(fragment))) ?? false

  return exactMatch || includesMatch
}

export function resolveZqmThemeByHost(options: ResolveZqmThemeOptions = {}): ZqmThemeName {
  const hostname = options.hostname ?? getCurrentHostname()
  const rules = options.rules ?? defaultZqmThemeHostRules
  const fallback = options.fallback ?? defaultZqmTheme

  return rules.find((rule) => matchesHostRule(hostname, rule))?.theme ?? fallback
}

export function applyZqmTheme(
  theme: ZqmThemeName = defaultZqmTheme,
  target: HTMLElement | undefined = getDefaultTarget(),
): ZqmThemeName {
  if (target) {
    if (theme === defaultZqmTheme) {
      delete target.dataset.zqmTheme
    } else {
      target.dataset.zqmTheme = theme
    }
  }

  return theme
}

export function applyZqmThemeByHost(options: ApplyZqmThemeByHostOptions = {}): ZqmThemeName {
  const theme = resolveZqmThemeByHost(options)
  applyZqmTheme(theme, options.target)
  return theme
}
