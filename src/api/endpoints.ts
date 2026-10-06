/**
 * 接口地址表：每个接口同时声明「mock 静态文件」和「真实后端路径」。
 * 由 VITE_USE_MOCK 决定实际使用哪个，业务代码只关心 key。
 */
const endpoints = {
  cities: { mock: 'data/cities.json', real: '/cities' },
  banners: { mock: 'data/banners.json', real: '/banners' },
  restaurants: { mock: 'data/restaurants.json', real: '/restaurants' },
  goods: { mock: 'data/goods.json', real: '/goods' },
  ratings: { mock: 'data/ratings.json', real: '/ratings' },
  seller: { mock: 'data/seller.json', real: '/seller' },
  login: { mock: '', real: '/api/users/login' },
  register: { mock: '', real: '/api/users/register' },
} as const

export type EndpointKey = keyof typeof endpoints

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/** 根据 key 和当前模式得到请求地址 */
export const resolveUrl = (key: EndpointKey): string => {
  const { mock, real } = endpoints[key]
  // BASE_URL 在 GitHub Pages 下为 /MeiTuan007/，开发时为 /
  return USE_MOCK && mock ? `${import.meta.env.BASE_URL}${mock}` : real
}
