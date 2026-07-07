<template>
  <div class="pg-content">
    <h2>自动代理验证</h2>
    <p class="desc">
      以下组件没有单独的 <code>.vue</code> 文件，通过 <code>index.ts</code> 自动代理到 Element
      Plus。
    </p>

    <div class="demo-block">
      <h3>zq-scrollbar（el-scrollbar 代理）</h3>
      <zq-scrollbar
        style="height: 120px; border: 1px solid #ebeef5; border-radius: 6px; padding: 8px"
      >
        <p v-for="i in 20" :key="i" style="margin: 4px 0; font-size: 13px; color: #999">
          第 {{ i }} 行 —— 自动代理透传测试
        </p>
      </zq-scrollbar>
    </div>

    <div class="demo-block">
      <h3>zq-tag（el-tag 代理）</h3>
      <div class="demo-row">
        <zq-tag>默认标签</zq-tag>
        <zq-tag type="success">Success</zq-tag>
        <zq-tag type="warning">Warning</zq-tag>
        <zq-tag type="danger">Danger</zq-tag>
        <zq-tag type="info" closable @close="() => {}">可关闭</zq-tag>
      </div>
    </div>

    <div class="demo-block">
      <h3>zq-divider（el-divider 代理）</h3>
      <zq-divider content-position="left">左侧文字</zq-divider>
    </div>
  </div>
</template>
