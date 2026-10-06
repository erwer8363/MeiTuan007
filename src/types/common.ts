/** 部分接口（goods / ratings / seller）的统一响应包装 */
export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}
