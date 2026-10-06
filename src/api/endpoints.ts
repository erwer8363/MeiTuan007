/**
 * 接口地址表：每个接口同时声明「mock 静态文件」和「真实后端路径」。
 * 由 VITE_USE_MOCK 决定实际使用哪个，业务代码只关心 key。
 * 真实路径统一以 /api 开头，这样 vite dev 代理（见 vite.config.ts 的 server.proxy）才会转发到后端。
 */
const endpoints = {
  cities: { mock: 'data/cities.json', real: '/api/cities' },
  banners: { mock: 'data/banners.json', real: '/api/banners' },
  restaurants: { mock: 'data/restaurants.json', real: '/api/restaurants' },
  goods: { mock: 'data/goods.json', real: '/api/goods' },
  ratings: { mock: 'data/ratings.json', real: '/api/ratings' },
  seller: { mock: 'data/seller.json', real: '/api/seller' },
  login: { mock: '', real: '/api/users/login' },
  register: { mock: '', real: '/api/users/register' },
  keyword: { mock: 'data/keywords.json', real: '/api/keywords' },
} as const

export type EndpointKey = keyof typeof endpoints

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/** 根据 key 和当前模式得到请求地址 */
export const resolveUrl = (key: EndpointKey): string => {
  const { mock, real } = endpoints[key]
  // BASE_URL 在 GitHub Pages 下为 /MeiTuan007/，开发时为 /
  return USE_MOCK && mock ? `${import.meta.env.BASE_URL}${mock}` : real
}
