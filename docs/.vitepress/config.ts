import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ZQ UI',
  description: '基于 Element Plus 的团队自定义组件库',
  lang: 'zh-CN',
  base: '/',

  // 页面滚动时 URL 自动追加 hash
  scrollOffset: 'header',

  themeConfig: {
    // 站点 Logo
    logo: { src: '/logo.svg', alt: '', width: 24, height: 24 },

    // 本地搜索
    search: {
      provider: 'local',
    },

    // 顶部导航栏
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '^/guide/' },
      { text: '组件', link: '/components/color', activeMatch: '^/components/' },
    ],

    // 侧边栏 —— 按路径分组，支持折叠
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题定制', link: '/guide/theme' },
            { text: '代码规范', link: '/guide/code-style' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          collapsed: false,
          items: [
            { text: 'Color 色彩', link: '/components/color' },
            { text: 'Button 按钮', link: '/components/button' },
          ],
        },
        // 后续新增组件分类在此追加
      ],
    },

    // 右侧大纲（页面内标题导航）
    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    // 社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com' }],

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    // 全局页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 ZQ-UI Team',
    },
  },

  // Markdown 扩展
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: false,
  },
})
