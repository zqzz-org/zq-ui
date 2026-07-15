import { describe, expect, it } from 'vitest'
import {
  applyZqmTheme,
  applyZqmThemeByHost,
  resolveZqmThemeByHost,
  zqmThemeOptions,
  type ZqmThemeHostRule,
} from '../theme'

describe('zq-m theme helpers', () => {
  it('根据默认域名规则解析主题', () => {
    expect(resolveZqmThemeByHost({ hostname: 'localhost' })).toBe('default')
    expect(resolveZqmThemeByHost({ hostname: 'aiedu.example.com' })).toBe('aiedu')
    expect(resolveZqmThemeByHost({ hostname: 'www.example.com' })).toBe('default')
  })

  it('提供内置主题展示配置', () => {
    expect(zqmThemeOptions.map((theme) => theme.name)).toEqual([
      'default',
      'aiedu',
      'xk',
      'qedu',
      'aistudy',
    ])
  })

  it('支持业务项目传入自定义域名规则', () => {
    const rules: readonly ZqmThemeHostRule[] = [
      { theme: 'aiedu', hosts: ['learn.example.com'] },
      { theme: 'aiedu', includes: ['edu'] },
    ]

    expect(resolveZqmThemeByHost({ hostname: 'learn.example.com', rules })).toBe('aiedu')
    expect(resolveZqmThemeByHost({ hostname: 'edu.example.com', rules })).toBe('aiedu')
    expect(
      resolveZqmThemeByHost({
        hostname: 'mall.example.com',
        rules,
        fallback: 'aiedu',
      }),
    ).toBe('aiedu')
  })

  it('可以把主题写入目标元素（data-zqm-theme）', () => {
    const target = document.createElement('div')

    expect(applyZqmTheme('aiedu', target)).toBe('aiedu')
    expect(target.dataset.zqmTheme).toBe('aiedu')
  })

  it('应用默认主题时清除自定义主题标记', () => {
    const target = document.createElement('div')
    target.dataset.zqmTheme = 'aiedu'

    expect(applyZqmTheme('default', target)).toBe('default')
    expect(target.dataset.zqmTheme).toBeUndefined()
  })

  it('可以按域名解析并写入目标元素', () => {
    const target = document.createElement('div')

    expect(
      applyZqmThemeByHost({
        hostname: 'aiedu.example.com',
        target,
      }),
    ).toBe('aiedu')
    expect(target.dataset.zqmTheme).toBe('aiedu')
  })
})
