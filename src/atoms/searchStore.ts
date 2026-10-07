import { atom } from 'jotai'

const enterLoadingAtom = atom(false)
const changeEnterLoading = atom(null, (get, set) => {
  set(enterLoadingAtom, !get(enterLoadingAtom))
})
