/**
 * rem 布局适配（仅浏览器端执行）
 * 基准：1920 屏宽下 1rem = 16px
 * 全尺寸等比缩放，无上限
 */

const BASE_WIDTH = 1920
const BASE_FONT_SIZE = 16

function setRem() {
  if (typeof document === 'undefined') return
  const scale = document.documentElement.clientWidth / BASE_WIDTH
  document.documentElement.style.fontSize = BASE_FONT_SIZE * scale + 'px'
}

if (typeof window !== 'undefined') {
  setRem()
  let timer: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(setRem, 100)
  })
}
