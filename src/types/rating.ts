/** 评价列表项 */
export interface RatingComment {
  wm_comment_id: number
  user_name: string
  user_pic_url: string
  comment: string
  comment_time: number
  order_comment_score: number
  praise_food_tip: string
  critic_food_tip: string
  // TODO(ts): 按需补充 comment_pics、poi_reply_contents 等字段
}

/** 评价筛选标签（全部 / 好评 / 差评 …） */
export interface RatingLabel {
  label_id: number
  content: string
  label_count: number
  label_star: number
}

/** ratings.json 的 data 部分 */
export interface RatingData {
  comment_num: number
  comment_score: number
  food_score: number
  delivery_score: number
  comments: RatingComment[]
  labels: RatingLabel[]
  // TODO(ts): 按需补充 scores、tab 等字段
}
