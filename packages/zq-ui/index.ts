/**
 * ZQ-UI 组件库入口
 * - 有自定义逻辑的组件（如 zq-button）→ 显式封装
 * - 其余组件 → 自动代理到 Element Plus，完整透传 attrs/slots
 */
import type { App, Component, Plugin } from 'vue'
import { defineComponent, h } from 'vue'
import {
  ElScrollbar,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElTag,
  ElTooltip,
  ElPopover,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElTabs,
  ElTabPane,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPagination,
  ElBadge,
  ElAvatar,
  ElSkeleton,
  ElEmpty,
  ElResult,
  ElDescriptions,
  ElDescriptionsItem,
  ElTimeline,
  ElTimelineItem,
  ElDivider,
  ElLink,
  ElText,
  ElImage,
  ElBacktop,
  ElAffix,
  ElSpace,
  ElIcon,
  ElAlert,
  ElProgress,
  ElTree,
  ElTreeSelect,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElCascader,
  ElCascaderPanel,
  ElTransfer,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSwitch,
  ElSlider,
  ElRate,
  ElColorPicker,
  ElUpload,
  ElPopconfirm,
  ElConfigProvider,
} from 'element-plus'

// 自定义封装组件（有额外 props / 逻辑）
import ZqButton from './components/button/zq-button.vue'
import { applyZqTheme, applyZqThemeByHost } from './theme'
import type { ApplyZqThemeByHostOptions, ZqThemeName } from './theme'

export type ZqUiThemeOption = false | ZqThemeName | ApplyZqThemeByHostOptions

export interface ZqUiOptions {
  /**
   * 默认自动按 UI 库内置域名规则切换主题。
   * - false：关闭自动主题
   * - 'aiedu'：强制指定主题
   * - { rules: [...] }：覆盖域名规则
   */
  theme?: ZqUiThemeOption
}

const customComponents: Record<string, Component> = {
  ZqButton,
}

// Element Plus 组件名 → 组件引用映射
const elComponentMap: Record<string, Component> = {
  ElScrollbar,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElTag,
  ElTooltip,
  ElPopover,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElTabs,
  ElTabPane,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPagination,
  ElBadge,
  ElAvatar,
  ElSkeleton,
  ElEmpty,
  ElResult,
  ElDescriptions,
  ElDescriptionsItem,
  ElTimeline,
  ElTimelineItem,
  ElDivider,
  ElLink,
  ElText,
  ElImage,
  ElBacktop,
  ElAffix,
  ElSpace,
  ElIcon,
  ElAlert,
  ElProgress,
  ElTree,
  ElTreeSelect,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElCascader,
  ElCascaderPanel,
  ElTransfer,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSwitch,
  ElSlider,
  ElRate,
  ElColorPicker,
  ElUpload,
  ElPopconfirm,
  ElConfigProvider,
}

const proxyCache = new Map<string, Component>()

/** kebab → PascalCase: scrollbar → Scrollbar, input-number → InputNumber */
function toPascal(name: string): string {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/** 生成透明代理组件，完整透传 attrs 和 slots 到对应的 el-xxx */
function createProxy(elName: string, elComponent: Component) {
  return defineComponent({
    name: `Zq${toPascal(elName)}`,
    setup(_props, { slots, attrs }) {
      return () => h(elComponent, attrs, slots)
    },
  })
}

// 导出有自定义逻辑的组件
export { ZqButton }
export {
  applyZqTheme,
  applyZqThemeByHost,
  defaultZqTheme,
  defaultZqThemeHostRules,
  resolveZqThemeByHost,
  zqThemeOptions,
} from './theme'
export type {
  ApplyZqThemeByHostOptions,
  ResolveZqThemeOptions,
  ZqThemeHostRule,
  ZqThemeName,
  ZqThemeOption,
} from './theme'

function applyInstallTheme(theme: ZqUiThemeOption = {}) {
  if (theme === false) return

  if (typeof theme === 'string') {
    applyZqTheme(theme)
    return
  }

  applyZqThemeByHost(theme)
}

const install: Plugin = {
  install(app: App, options?: ZqUiOptions) {
    applyInstallTheme(options?.theme)

    // 注册所有自定义组件
    Object.entries(customComponents).forEach(([name, component]) => {
      app.component(name, component)
    })

    // 自动注册已映射的 Element Plus 代理组件
    Object.keys(elComponentMap).forEach((elName) => {
      // ElScrollbar → scrollbar
      const kebab = elName
        .replace(/^El/, '')
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
      const tag = `zq-${kebab}`

      if (!proxyCache.has(kebab)) {
        const proxy = createProxy(kebab, elComponentMap[elName])
        proxyCache.set(kebab, proxy)
      }

      const proxy = proxyCache.get(kebab)
      if (proxy) {
        app.component(tag, proxy)
      }
    })
  },
}

export default install
export { install }
