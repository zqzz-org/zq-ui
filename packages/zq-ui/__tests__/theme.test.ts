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
    expect(resolveZqThemeByHost({ hostname: 'localhost' })).toBe('admin')
    expect(resolveZqThemeByHost({ hostname: 'finance.example.com' })).toBe('finance')
    expect(resolveZqThemeByHost({ hostname: 'admin.example.com' })).toBe('admin')
    expect(resolveZqThemeByHost({ hostname: 'www.example.com' })).toBe('default')
  })

  it('提供内置主题展示配置', () => {
    expect(zqThemeOptions.map((theme) => theme.name)).toEqual(['default', 'finance', 'admin'])
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

    expect(applyZqTheme('finance', target)).toBe('finance')
    expect(target.dataset.zqTheme).toBe('finance')
  })

  it('可以按域名解析并写入目标元素', () => {
    const target = document.createElement('div')

    expect(
      applyZqThemeByHost({
        hostname: 'admin.example.com',
        target,
      }),
    ).toBe('admin')
    expect(target.dataset.zqTheme).toBe('admin')
  })
})
