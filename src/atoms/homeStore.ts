import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { fetchBanners, fetchRestaurants } from '@/api'
import { Restaurant } from '@/types'

const PAGE_SIZE = 5

export const bannersAtom = atom(() => fetchBanners())
export const bannersViewAtom = unwrap(bannersAtom, (prev) => prev ?? null)

export const restaurantsAtom = atom<Restaurant[]>([])
export const hasMoreAtom = atom(true)
const pageAtom = atom(1)
const loadingMoreAtom = atom(false)

export const loadMoreRestaurantsAtom = atom(null, async (get, set) => {
  if (get(loadingMoreAtom) || !get(hasMoreAtom)) return
  set(loadingMoreAtom, true)
  try {
    const page = get(pageAtom)
    const { list, total } = await fetchRestaurants({ page, size: PAGE_SIZE })
    set(restaurantsAtom, (prev) => [...prev, ...list])
    set(pageAtom, page + 1)
    set(hasMoreAtom, get(restaurantsAtom).length < total)
  } finally {
    set(loadingMoreAtom, false)
  }
})

export const resetRestaurantsAtom = atom(null, (_get, set) => {
  set(restaurantsAtom, [])
  set(pageAtom, 1)
  set(hasMoreAtom, true)
})
