/** 商家详情（seller.json 的 data 部分） */
export interface Seller {
  id: number
  name: string
  call_center: string
  address: string
  pic_url: string
  shipping_time: string
  shipping_fee: number
  min_price: number
  bulletin: string
  wm_poi_score: number
  comment_num: number
  // TODO(ts): 按需补充 discounts2、show_info、poi_env、poi_service 等字段
}
