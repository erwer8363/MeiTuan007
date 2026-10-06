import {atom} from "jotai";
import {unwrap} from "jotai/utils";
import {fetchBanners, fetchRestaurants} from "@/api";
import {Restaurant} from "@/types";

export const loadingAtom = atom(true)
export const bannersAtom = atom(() => fetchBanners())
export const bannersViewAtom = unwrap(bannersAtom, (prev) => prev ?? null)

export const restaurantsAtom = atom<Restaurant[]>([])
export const loadRestaurantsAtom = atom(null, async (_get, set) => {
    set(loadingAtom, true)
    try {
        set(restaurantsAtom, await fetchRestaurants())
    } finally {
        set(loadingAtom, false)
    }
})


