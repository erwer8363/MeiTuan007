import axios, { type AxiosRequestConfig } from 'axios'
import { getCookie } from '@/utils/storage'
import { resolveUrl, USE_MOCK, type EndpointKey } from './endpoints'

/** axios 实例。mock 模式下请求的是同源静态文件，所以 baseURL 为空 */
export const http = axios.create({
  baseURL: USE_MOCK ? '' : import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  // 拦截器在 React 之外运行，token 直接从 cookie 读（阶段 5 改 Jotai 后可用 store.get(tokenAtom)）
  const token = getCookie('usertoken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // TODO(ts): 统一错误提示（antd-mobile Toast）、401 跳登录
    console.error('网络请求失败', err.message)
    return Promise.reject(err)
  },
)

/** GET：按 endpoint key 请求，直接返回响应体 */
export const get = async <T>(key: EndpointKey, config?: AxiosRequestConfig): Promise<T> => {
  const res = await http.get<T>(resolveUrl(key), config)
  return res.data
}

/** POST：按 endpoint key 请求，直接返回响应体 */
export const post = async <T, B = unknown>(
  key: EndpointKey,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const res = await http.post<T>(resolveUrl(key), body, config)
  return res.data
}
