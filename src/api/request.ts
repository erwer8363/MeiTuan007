/**
 * @deprecated 兼容层：旧的 redux actionCreators 仍按 `res.data` 取值（AxiosResponse）。
 * 新代码请用 `@/api` 里的 fetchXxx；阶段 5 删除 redux 时一并删除本文件。
 */
import { http } from './http'
import { resolveUrl } from './endpoints'

export const getHomeDetailOrderRequest = () => http.get(resolveUrl('goods'))
export const getHomeDetailSellerRequest = () => http.get(resolveUrl('seller'))
