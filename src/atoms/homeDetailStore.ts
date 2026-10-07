import { atom } from 'jotai'
import { CartItem, GoodsCategory, RatingComment, RatingLabel, Seller } from '@/types'
import { fetchGoods, fetchRatings, fetchSeller } from '@/api'

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
let orderReqId = 0
export const goodsAtom = atom<GoodsCategory[]>([])
export const loadingGoodsAtom = atom(true)
export const loadingGoodsErrorAtom = atom<Error | null>(null)

/** 购物车：商品 id -> 数量。数量单独存放，不再写回商品对象（接口自带的 praise_num 是点赞数） */
export const cartAtom = atom<Record<number, number>>({})

/** 购物车里的商品列表。「热销」等分类里会重复出现同一商品，按 id 去重 */
export const cartListAtom = atom<CartItem[]>((get) => {
  const cart = get(cartAtom)
  const seen = new Set<number>()
  const list: CartItem[] = []
  for (const category of get(goodsAtom)) {
    for (const spu of category.spus) {
      const count = cart[spu.id] ?? 0
      if (count > 0 && !seen.has(spu.id)) {
        seen.add(spu.id)
        list.push({ ...spu, count })
      }
    }
  }
  return list
})

/** 购物车商品总件数 */
export const cartNumberAtom = atom((get) =>
  get(cartListAtom).reduce((sum, item) => sum + item.count, 0),
)

/** 商品数量加减，减到 0 为止 */
export const changeGoodsNumAtom = atom(
  null,
  (get, set, { id, status }: { id: number; status: 'add' | 'reduce' }) => {
    const cart = { ...get(cartAtom) }
    const next = Math.max(0, (cart[id] ?? 0) + (status === 'add' ? 1 : -1))
    if (next === 0) {
      delete cart[id]
    } else {
      cart[id] = next
    }
    set(cartAtom, cart)
  },
)

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartAtom, {})
})

/** force=true 强制重新请求（如点击重试）；已有商品数据时直接复用，切 Tab 回来不再 loading */
export const loadGoodsAtom = atom(null, async (get, set, force?: boolean) => {
  if (!force && get(goodsAtom).length > 0) return
  const id = ++orderReqId
  set(loadingGoodsAtom, true)
  set(loadingGoodsErrorAtom, null)
  try {
    const {
      data: { food_spu_tags },
    } = await fetchGoods()
    if (id !== orderReqId) return
    set(goodsAtom, food_spu_tags)
  } catch (e) {
    if (id !== orderReqId) return
    set(loadingGoodsErrorAtom, e instanceof Error ? e : new Error(String(e)))
  } finally {
    if (id === orderReqId) set(loadingGoodsAtom, false)
  }
})
