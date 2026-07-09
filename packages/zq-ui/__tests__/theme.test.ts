import { describe, expect, it } from 'vitest'
import {
  applyZqTheme,
  applyZqThemeByHost,
  resolveZqThemeByHost,
  zqThemeOptions,
  type ZqThemeHostRule,
} from '../theme'

describe('theme helpers', () => {
  it('根据默认域名规则解析主题', () => {
    expect(resolveZqThemeByHost({ hostname: 'localhost' })).toBe('default')
    expect(resolveZqThemeByHost({ hostname: 'aiedu.example.com' })).toBe('aiedu')
    expect(resolveZqThemeByHost({ hostname: 'www.example.com' })).toBe('default')
  })

  it('提供内置主题展示配置', () => {
    expect(zqThemeOptions.map((theme) => theme.name)).toEqual(['default', 'aiedu'])
  })

  it('支持业务项目传入自定义域名规则', () => {
    const rules: readonly ZqThemeHostRule[] = [
      { theme: 'aiedu', hosts: ['learn.example.com'] },
      { theme: 'aiedu', includes: ['edu'] },
    ]

    expect(resolveZqThemeByHost({ hostname: 'learn.example.com', rules })).toBe('aiedu')
    expect(resolveZqThemeByHost({ hostname: 'edu.example.com', rules })).toBe('aiedu')
    expect(
      resolveZqThemeByHost({
        hostname: 'mall.example.com',
        rules,
        fallback: 'aiedu',
      }),
    ).toBe('aiedu')
  })

  it('可以把主题写入目标元素', () => {
    const target = document.createElement('div')

    expect(applyZqTheme('aiedu', target)).toBe('aiedu')
    expect(target.dataset.zqTheme).toBe('aiedu')
  })

  it('应用默认主题时清除自定义主题标记', () => {
    const target = document.createElement('div')
    target.dataset.zqTheme = 'aiedu'

    expect(applyZqTheme('default', target)).toBe('default')
    expect(target.dataset.zqTheme).toBeUndefined()
  })

  it('可以按域名解析并写入目标元素', () => {
    const target = document.createElement('div')

    expect(
      applyZqThemeByHost({
        hostname: 'aiedu.example.com',
        target,
      }),
    ).toBe('aiedu')
    expect(target.dataset.zqTheme).toBe('aiedu')
  })
})
