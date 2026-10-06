/** 商品评论（嵌在 Spu.rating 里） */
export interface SpuComment {
  user_icon: string
  user_name: string
  comment_time: string
  comment_unix_time: number
  comment_content: string
}

/** 单个商品 */
export interface Spu {
  id: number
  name: string
  min_price: number
  /**
   * 注意：接口里自带 praise_num（点赞数），旧代码又把它复用成「购物车数量」并 mutate。
   * 阶段 5 改成 Jotai 后，购物车数量不再放在商品上，这里按接口原样定义。
   */
  praise_num: number
  praise_content: string
  unit: string
  description: string
  picture: string
  month_saled: number
  month_saled_content: string
  // TODO(ts): 按需补充 rating、status、tread_num 等字段
}

/** 商品分类（左侧菜单一项 + 右侧一组商品） */
export interface GoodsCategory {
  name: string
  icon: string
  spus: Spu[]
}

/** goods.json 的 data 部分 */
export interface GoodsData {
  food_spu_tags: GoodsCategory[]
}
