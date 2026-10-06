import { get } from '../http'
import type { Banner, City, Restaurant } from '@/types'

export const fetchCities = () => get<City[]>('cities')
export const fetchBanners = () => get<Banner[]>('banners')
export const fetchRestaurants = () => get<Restaurant[]>('restaurants')
