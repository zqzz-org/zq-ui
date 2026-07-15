---
layout: home

hero:
  name: 'ZQ 组件库'
  text: PC 与移动端统一品牌体验
  tagline: zq-ui（Element Plus）· zq-m（Vant）· 源码分发 · 多主题
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: PC 组件
      link: /pc/button
    - theme: alt
      text: 移动端
      link: /mobile/

features:
  - title: 双端平行
    details: packages/zq-ui 与 packages/zq-m 独立发包、独立主题（data-zq-theme / data-zqm-theme），业务可同项目双装，按端选用标签。
  - title: 主题对齐
    details: 内置 aiedu / xk / qedu / aistudy 等品牌主题名两端一致，色值对齐，运行时互不依赖，后续可按需抽公共层。
  - title: 透明代理 + 定制封装
    details: 无定制逻辑的组件自动代理透传；需要 variant / 防抖等能力时再显式封装（如 zq-button）。
  - title: 文档独立部署
    details: VitePress 静态站与 npm 包解耦，可单独部署到 https://ui.example.com（占位，部署后替换）。
---
