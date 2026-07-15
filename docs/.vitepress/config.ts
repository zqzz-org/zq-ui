import { defineConfig } from 'vitepress'

/**
 * 文档站点配置。
 *
 * base：
 * - GitHub Pages 项目站（https://crazily6617.github.io/zq-ui/）→ '/zq-ui/'
 * - 自定义域名根路径 → '/'
 * 须首尾斜杠。改 base 后需重新 docs:build。
 *
 * 当前在线文档：https://crazily6617.github.io/zq-ui/
 */
export default defineConfig({
  title: 'ZQ 组件库',
  description: 'PC（zq-ui）与移动端（zq-m）团队自定义组件库',
  lang: 'zh-CN',
  // GitHub Pages 项目站路径；绑定自定义域名根时改回 '/'
  base: '/zq-ui/',

  // 兼容旧路径 /components/* → /pc/*
  rewrites: {
    'components/:path*': 'pc/:path*',
  },

  scrollOffset: 'header',

  themeConfig: {
    logo: { src: '/logo.svg', alt: '', width: 24, height: 24 },

    search: {
      provider: 'local',
    },

    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '^/guide/' },
      { text: 'PC（zq-ui）', link: '/pc/button', activeMatch: '^/pc/' },
      { text: '移动（zq-m）', link: '/mobile/', activeMatch: '^/mobile/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '快速入门',
          collapsed: false,
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: 'PC 代理组件', link: '/guide/proxy-components' },
            { text: '主题定制', link: '/guide/theme' },
            { text: '文档部署', link: '/guide/deploy' },
            { text: '更新日志', link: '/guide/changelog' },
          ],
        },
        {
          text: '开发规范',
          collapsed: false,
          items: [
            { text: '代码规范', link: '/guide/code-style' },
            { text: '贡献指南', link: '/guide/contribution' },
          ],
        },
      ],
      '/pc/': [
        {
          text: '通用',
          collapsed: false,
          items: [
            { text: 'Color 色彩', link: '/pc/color' },
            { text: 'Button 按钮', link: '/pc/button' },
          ],
        },
        {
          text: '表单',
          collapsed: true,
          items: [
            { text: 'Input 输入框', link: '/pc/form/input' },
            { text: 'Select 选择器', link: '/pc/form/select' },
          ],
        },
        {
          text: '数据展示',
          collapsed: true,
          items: [{ text: 'Table 表格', link: '/pc/data/table' }],
        },
        {
          text: '导航',
          collapsed: true,
          items: [{ text: 'Menu 菜单', link: '/pc/navigation/menu' }],
        },
        {
          text: '反馈',
          collapsed: true,
          items: [{ text: 'Alert 提示', link: '/pc/feedback/alert' }],
        },
      ],
      '/mobile/': [
        {
          text: '概览',
          collapsed: false,
          items: [
            { text: '移动端总览', link: '/mobile/' },
            { text: '主题', link: '/mobile/theme' },
            { text: '代理组件列表', link: '/mobile/proxy-components' },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com' }],

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    footer: {
      message: 'Released under the MIT License. 文档站：https://crazily6617.github.io/zq-ui/',
      copyright: 'Copyright © 2024–2026 ZQ UI Team',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: false,
  },
})
