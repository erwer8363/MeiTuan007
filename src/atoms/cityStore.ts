import { atom } from 'jotai'
import { fetchCities } from '@/api'
import { unwrap } from 'jotai/utils'

export const citiesAtom = atom(() => fetchCities())
export const citiesViewAtom = unwrap(citiesAtom, (prev) => prev ?? null)
