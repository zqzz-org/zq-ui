export type ZqThemeName = 'default' | 'aiedu' | 'finance' | 'admin'

export interface ZqThemeOption {
  label: string
  name: ZqThemeName
}

export interface ZqThemeHostRule {
  theme: ZqThemeName
  hosts?: readonly string[]
  includes?: readonly string[]
}

export interface ResolveZqThemeOptions {
  hostname?: string
  rules?: readonly ZqThemeHostRule[]
  fallback?: ZqThemeName
}

export interface ApplyZqThemeByHostOptions extends ResolveZqThemeOptions {
  target?: HTMLElement
}

export const defaultZqTheme: ZqThemeName = 'default'

export const zqThemeOptions: readonly ZqThemeOption[] = [
  {
    label: 'Default 默认',
    name: 'default',
  },
  {
    label: 'AIEDU 通识平台',
    name: 'aiedu',
  },
  {
    label: 'Finance 金融',
    name: 'finance',
  },
  {
    label: 'Admin 管理',
    name: 'admin',
  },
]

export const defaultZqThemeHostRules: readonly ZqThemeHostRule[] = [
  { theme: 'aiedu', includes: ['aiedu'] },
  { theme: 'finance', includes: ['finance'] },
  { theme: 'admin', includes: ['admin'] },
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

function matchesHostRule(hostname: string, rule: ZqThemeHostRule): boolean {
  const normalized = normalizeHost(hostname)
  const exactMatch = rule.hosts?.some((host) => normalizeHost(host) === normalized) ?? false
  const includesMatch =
    rule.includes?.some((fragment) => normalized.includes(normalizeHost(fragment))) ?? false

  return exactMatch || includesMatch
}

export function resolveZqThemeByHost(options: ResolveZqThemeOptions = {}): ZqThemeName {
  const hostname = options.hostname ?? getCurrentHostname()
  const rules = options.rules ?? defaultZqThemeHostRules
  const fallback = options.fallback ?? defaultZqTheme

  return rules.find((rule) => matchesHostRule(hostname, rule))?.theme ?? fallback
}

export function applyZqTheme(
  theme: ZqThemeName = defaultZqTheme,
  target: HTMLElement | undefined = getDefaultTarget(),
): ZqThemeName {
  if (target) {
    if (theme === defaultZqTheme) {
      delete target.dataset.zqTheme
    } else {
      target.dataset.zqTheme = theme
    }
  }

  return theme
}

export function applyZqThemeByHost(options: ApplyZqThemeByHostOptions = {}): ZqThemeName {
  const theme = resolveZqThemeByHost(options)
  applyZqTheme(theme, options.target)
  return theme
}
