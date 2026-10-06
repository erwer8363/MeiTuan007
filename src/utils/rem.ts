// rem 适配：以 375 宽设计稿为基准，1rem = 20px，最大按 750 宽计算
const MAX_WIDTH = 750
const DESIGN_WIDTH = 375
const BASE_FONT_SIZE = 20

const setRem = (): void => {
  const clientWidth = Math.min(
    document.documentElement.clientWidth || document.body.clientWidth,
    MAX_WIDTH,
  )
  document.documentElement.style.fontSize = `${(BASE_FONT_SIZE / DESIGN_WIDTH) * clientWidth}px`
}

export const initRem = (): void => {
  setRem()
  window.addEventListener('resize', setRem)
}
