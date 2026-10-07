import { atom } from 'jotai'
import { RatingComment, RatingLabel, Seller } from '@/types'
import { fetchRatings, fetchSeller } from '@/api'

// homeComment
export const commentsAtom = atom<RatingComment[]>([])
export const navsAtom = atom<RatingLabel[]>([])
export const loadingAtom = atom(true)
export const commentsErrorAtom = atom<Error | null>(null)

let reqId = 0

/** force=true 强制重新请求（如点击重试）；否则已有数据时直接复用，切 Tab 回来不再 loading */
export const loadCommentsAndNavsAtom = atom(null, async (get, set, force?: boolean) => {
  if (!force && get(commentsAtom).length > 0) return
  const id = ++reqId
  set(loadingAtom, true)
  set(commentsErrorAtom, null)
  // 重新请求前清空旧数据，避免失败后还显示过期评论
  set(commentsAtom, [])
  set(navsAtom, [])
  try {
    const {
      data: { comments, labels },
    } = await fetchRatings()
    if (id !== reqId) return
    set(commentsAtom, comments)
    set(navsAtom, labels)
  } catch (e) {
    if (id !== reqId) return
    set(commentsErrorAtom, e instanceof Error ? e : new Error(String(e)))
  } finally {
    if (id === reqId) set(loadingAtom, false)
  }
})

// homeBusiness
export const businessAtom = atom<Seller | null>(null)
export const loadingBusinessAtom = atom(true)
export const loadingBusinessErrorAtom = atom<Error | null>(null)

let businessReqId = 0

export const loadBusinessAtom = atom(null, async (_get, set) => {
  const id = ++businessReqId
  set(loadingBusinessAtom, true)
  set(loadingBusinessErrorAtom, null)
  try {
    const { data } = await fetchSeller()
    if (id !== businessReqId) return
    set(businessAtom, data)
  } catch (e) {
    if (id !== businessReqId) return
    set(loadingBusinessErrorAtom, e instanceof Error ? e : new Error(String(e)))
  } finally {
    if (id === businessReqId) set(loadingBusinessAtom, false)
  }
})
// homeOrder
