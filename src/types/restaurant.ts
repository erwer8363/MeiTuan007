/** 首页商家列表项（public/data/restaurants.json） */
export interface Restaurant {
  id: number
  name: string
  pic: string
  pic_icon: string
  score: string
  sales: string
  average: string
  /** 原接口字段拼写如此（frist），保持不改 */
  frist_send: string
  delivery: string
  time: string
  distance: string
  info_icon: string
  info_text: string
  info_icon2: string
  info_text2: string
  desc1: string
  desc2: string
  desc3: string
}
