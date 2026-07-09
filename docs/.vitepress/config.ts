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
      { text: '组件', link: '/components/button', activeMatch: '^/components/' },
    ],

    // 侧边栏 —— 按路径分组，支持折叠
    sidebar: {
      '/guide/': [
        {
          text: '快速入门',
          collapsed: false,
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '代理组件列表', link: '/guide/proxy-components' },
            { text: '主题定制', link: '/guide/theme' },
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
      '/components/': [
        {
          text: '通用',
          collapsed: false,
          items: [
            { text: 'Color 色彩', link: '/components/color' },
            { text: 'Button 按钮', link: '/components/button' },
          ],
        },
        {
          text: '表单',
          collapsed: true,
          items: [
            { text: 'Input 输入框', link: '/components/form/input' },
            { text: 'Select 选择器', link: '/components/form/select' },
          ],
        },
        {
          text: '数据展示',
          collapsed: true,
          items: [{ text: 'Table 表格', link: '/components/data/table' }],
        },
        {
          text: '导航',
          collapsed: true,
          items: [{ text: 'Menu 菜单', link: '/components/navigation/menu' }],
        },
        {
          text: '反馈',
          collapsed: true,
          items: [{ text: 'Alert 提示', link: '/components/feedback/alert' }],
        },
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
