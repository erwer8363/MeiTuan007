import { get } from '../http'
import type { ApiResponse, GoodsData, RatingData, Seller } from '@/types'

export const fetchGoods = () => get<ApiResponse<GoodsData>>('goods')
export const fetchRatings = () => get<ApiResponse<RatingData>>('ratings')
export const fetchSeller = () => get<ApiResponse<Seller>>('seller')
