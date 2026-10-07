import { get } from '../http'
import type { ApiResponse, Banner, City, Restaurant } from '@/types'
import { USE_MOCK } from '@/api/endpoints'

export interface PageResult<T> {
  list: T[]
  total: number
}

/** mock 与真实接口都是 { code, msg, data: { list } }，这里统一拆出 list */
type ListResponse<T> = ApiResponse<{ list: T[] }>

export const fetchCities = async () => (await get<ListResponse<City>>('cities')).data.list
export const fetchBanners = async () => (await get<ListResponse<Banner>>('banners')).data.list
export const fetchRestaurants = async (params: {
  page: number
  size: number
}): Promise<PageResult<Restaurant>> => {
  if (USE_MOCK) {
    // mock 是静态文件，没有分页能力，在这里切片模拟
    const all = (await get<ListResponse<Restaurant>>('restaurants')).data.list
    const start = (params.page - 1) * params.size
    return { list: all.slice(start, start + params.size), total: all.length }
  }
  // TODO(后端对接)：真实接口的分页响应结构待确认，这里假设 data 就是 { list, total }
  return (await get<ApiResponse<PageResult<Restaurant>>>('restaurants', { params })).data
}
