import { atom } from 'jotai'
import { RatingComment, RatingLabel } from '@/types'
import { fetchRatings } from '@/api'

// homeComment
export const commentsAtom = atom<RatingComment[]>([])
export const navsAtom = atom<RatingLabel[]>([])
export const loadingAtom = atom(true)
export const commentsErrorAtom = atom<Error | null>(null)

let reqId = 0

export const loadCommentsAndNavsAtom = atom(null, async (_get, set) => {
  const id = ++reqId
  set(loadingAtom, true)
  set(commentsErrorAtom, null)
  // 清空旧数据，避免再次进入页面时闪出上一次的评论
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

// homeOrder
