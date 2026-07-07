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
    expect(resolveZqThemeByHost({ hostname: 'finance.example.com' })).toBe('finance')
    expect(resolveZqThemeByHost({ hostname: 'admin.example.com' })).toBe('admin')
    expect(resolveZqThemeByHost({ hostname: 'www.example.com' })).toBe('default')
  })

  it('提供内置主题展示配置', () => {
    expect(zqThemeOptions.map((theme) => theme.name)).toEqual([
      'default',
      'aiedu',
      'finance',
      'admin',
    ])
  })

  it('支持业务项目传入自定义域名规则', () => {
    const rules: readonly ZqThemeHostRule[] = [
      { theme: 'finance', hosts: ['pay.example.com'] },
      { theme: 'admin', includes: ['ops'] },
    ]

    expect(resolveZqThemeByHost({ hostname: 'pay.example.com', rules })).toBe('finance')
    expect(resolveZqThemeByHost({ hostname: 'ops.example.com', rules })).toBe('admin')
    expect(
      resolveZqThemeByHost({
        hostname: 'mall.example.com',
        rules,
        fallback: 'finance',
      }),
    ).toBe('finance')
  })

  it('可以把主题写入目标元素', () => {
    const target = document.createElement('div')

    expect(applyZqTheme('aiedu', target)).toBe('aiedu')
    expect(target.dataset.zqTheme).toBe('aiedu')
  })

  it('应用默认主题时清除自定义主题标记', () => {
    const target = document.createElement('div')
    target.dataset.zqTheme = 'finance'

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
