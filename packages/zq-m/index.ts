/**
 * ZQ-M 组件库入口
 * - 有自定义逻辑的组件（如 zqm-theme-provider）→ 显式封装
 * - 其余组件 → 自动代理到 Vant，完整透传 attrs/slots
 */
import type { App, Component, Plugin } from 'vue'
import { defineComponent, h, inject } from 'vue'
import {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  BackTop,
  Badge,
  Button,
  Calendar,
  Card,
  Cascader,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Circle,
  Col,
  Collapse,
  CollapseItem,
  ConfigProvider,
  CountDown,
  DatePicker,
  Dialog,
  Divider,
  DropdownItem,
  DropdownMenu,
  Empty,
  Field,
  FloatingBubble,
  FloatingPanel,
  Form,
  Grid,
  GridItem,
  Icon,
  Image,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  List,
  Loading,
  NavBar,
  NoticeBar,
  Notify,
  NumberKeyboard,
  Overlay,
  Pagination,
  PasswordInput,
  Picker,
  PickerGroup,
  Popover,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Search,
  Sidebar,
  SidebarItem,
  Skeleton,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonParagraph,
  SkeletonTitle,
  Slider,
  Space,
  Step,
  Steps,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Switch,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  TextEllipsis,
  TimePicker,
  TreeSelect,
  Uploader,
} from 'vant'

import ZqmThemeProvider from './components/theme-provider/zqm-theme-provider.vue'
import { applyZqmTheme, applyZqmThemeByHost } from './theme'
import type { ApplyZqmThemeByHostOptions, ZqmThemeName } from './theme'
import {
  POPPER_COMPONENTS,
  ZQM_THEME_KEY,
  resolveThemeClass,
  withPopperTheme,
} from './theme/context'

export type ZqmUiThemeOption = false | ZqmThemeName | ApplyZqmThemeByHostOptions

export interface ZqmUiOptions {
  /**
   * 默认自动按 UI 库内置域名规则切换主题。
   * - false：关闭自动主题
   * - 'aiedu'：强制指定主题
   * - { rules: [...] }：覆盖域名规则
   */
  theme?: ZqmUiThemeOption
}

const customComponents: Record<string, Component> = {
  ZqmThemeProvider,
}

/**
 * Vant 组件名 → 组件引用映射
 * key 使用 Vant 导出的 PascalCase 名；注册时转成 zqm-kebab。
 */
const vanComponentMap: Record<string, Component> = {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  BackTop,
  Badge,
  Button,
  Calendar,
  Card,
  Cascader,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Circle,
  Col,
  Collapse,
  CollapseItem,
  ConfigProvider,
  CountDown,
  DatePicker,
  Dialog,
  Divider,
  DropdownItem,
  DropdownMenu,
  Empty,
  Field,
  FloatingBubble,
  FloatingPanel,
  Form,
  Grid,
  GridItem,
  Icon,
  Image,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  List,
  Loading,
  NavBar,
  NoticeBar,
  Notify,
  NumberKeyboard,
  Overlay,
  Pagination,
  PasswordInput,
  Picker,
  PickerGroup,
  Popover,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Search,
  Sidebar,
  SidebarItem,
  Skeleton,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonParagraph,
  SkeletonTitle,
  Slider,
  Space,
  Step,
  Steps,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Switch,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  TextEllipsis,
  TimePicker,
  TreeSelect,
  Uploader,
}

const proxyCache = new Map<string, Component>()

/** PascalCase → kebab: ActionBar → action-bar, NavBar → nav-bar */
function toKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

/** kebab → PascalCase: action-bar → ActionBar */
function toPascal(name: string): string {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/**
 * 生成透明代理组件，完整透传 attrs 和 slots 到对应的 van-xxx。
 *
 * 对弹层类组件（POPPER_COMPONENTS）额外注入主题：inject 上层
 * <zqm-theme-provider> 提供的主题名，拼进 className，让 teleport 到
 * body 的弹层重新进入 `.zqm-theme-*` 作用域。
 * 非弹层组件保持零开销的纯透传。
 */
function createProxy(kebabName: string, vanComponent: Component) {
  const isPopper = POPPER_COMPONENTS.has(kebabName)

  return defineComponent({
    name: `Zqm${toPascal(kebabName)}`,
    inheritAttrs: false,
    setup(_props, { slots, attrs }) {
      if (!isPopper) {
        return () => h(vanComponent, attrs, slots)
      }

      const theme = inject(ZQM_THEME_KEY, undefined)
      return () => {
        const themeClass = resolveThemeClass(theme?.value)
        return h(vanComponent, withPopperTheme(attrs, themeClass), slots)
      }
    },
  })
}

export { ZqmThemeProvider }
export {
  applyZqmTheme,
  applyZqmThemeByHost,
  defaultZqmTheme,
  defaultZqmThemeHostRules,
  resolveZqmThemeByHost,
  zqmThemeOptions,
} from './theme'
export type {
  ApplyZqmThemeByHostOptions,
  ResolveZqmThemeOptions,
  ZqmThemeHostRule,
  ZqmThemeName,
  ZqmThemeOption,
} from './theme'
export { POPPER_COMPONENTS, ZQM_THEME_KEY } from './theme/context'

function applyInstallTheme(theme: ZqmUiThemeOption = {}) {
  if (theme === false) return

  if (typeof theme === 'string') {
    applyZqmTheme(theme)
    return
  }

  applyZqmThemeByHost(theme)
}

const install: Plugin = {
  install(app: App, options?: ZqmUiOptions) {
    applyInstallTheme(options?.theme)

    Object.entries(customComponents).forEach(([name, component]) => {
      app.component(name, component)
    })

    Object.keys(vanComponentMap).forEach((pascalName) => {
      const kebab = toKebab(pascalName)
      const tag = `zqm-${kebab}`

      if (!proxyCache.has(kebab)) {
        const proxy = createProxy(kebab, vanComponentMap[pascalName])
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
