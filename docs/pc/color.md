# Color 色彩

ZQ-UI 的色彩体系基于 Element Plus 的 CSS 变量之上，通过主题系统实现多套品牌色的统一管理。

## 色彩层级

- **ZQ 语义色**：`--zq-color-brand` 系列，始终指向当前激活主题的品牌主色，业务代码应优先使用语义变量而非硬编码色值。
- **Element Plus 主色**：`--el-color-primary` 系列，由主题文件覆盖，控制所有 EP 组件的交互态、选中态颜色。
- **中性色**：`--el-text-color-*`、`--el-border-color-*`、`--el-fill-color-*` 系列，在 `:root` 中统一覆盖，不随主题变化。

## 主题预览

下方面板展示当前激活主题的完整色彩 token：

<script setup lang="ts">
import ZqColorPalette from '../.vitepress/theme/components/ZqColorPalette.vue'

</script>

<ClientOnly>
  <ZqColorPalette />
</ClientOnly>
