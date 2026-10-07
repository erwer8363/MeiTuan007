/** 商家环境图 */
export interface PoiEnv {
  show: boolean
  thumbnails_url: string
  thumbnails_url_list: string[]
}

/** 商家服务（如「可开发票」） */
export interface PoiService {
  icon: string
  content: string
}

/** 商家优惠 */
export interface Discount {
  id: number
  type: number
  info: string
  icon_url: string
  use_icon_from_server: number
  display_code: number
  sequence: number
}

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
  app_delivery_tip: string
  poi_env: PoiEnv
  poi_service: PoiService[]
  discounts2: Discount[]
  // TODO(ts): 按需补充 show_info 等字段
}
