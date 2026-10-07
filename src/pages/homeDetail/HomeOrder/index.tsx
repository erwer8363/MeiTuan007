import { FC, MouseEvent, memo, useEffect, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { Button, ErrorBlock } from 'antd-mobile'
import styles from './index.module.scss'
import classnames from 'classnames'
import {
  cartAtom,
  cartListAtom,
  cartNumberAtom,
  changeGoodsNumAtom,
  clearCartAtom,
  goodsAtom,
  loadGoodsAtom,
  loadingGoodsAtom,
  loadingGoodsErrorAtom,
} from '@/atoms/homeDetailStore'
// 组件
import ShoppingCart from '@/components/ShoppingCart'
import Loading from '@/components/common/loading'

const HomeOrder: FC = () => {
  const goods = useAtomValue(goodsAtom)
  const cart = useAtomValue(cartAtom)
  const cartList = useAtomValue(cartListAtom)
  const cartNumber = useAtomValue(cartNumberAtom)
  const loading = useAtomValue(loadingGoodsAtom)
  const error = useAtomValue(loadingGoodsErrorAtom)
  const loadGoods = useSetAtom(loadGoodsAtom)
  const changeGoodsNum = useSetAtom(changeGoodsNumAtom)
  const clearCart = useSetAtom(clearCartAtom)

  // 当前选中的左侧分类
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    loadGoods()
  }, [loadGoods])

  // 商品数量加减
  const changeGoodNum = (e: MouseEvent, status: 'add' | 'reduce', id: number) => {
    e.preventDefault()
    e.stopPropagation()
    changeGoodsNum({ id, status })
  }
  // 点击左侧分类，滚动到右侧对应分类
  const scrollToAnchorLeft = (anchorName: string) => {
    document.getElementById(anchorName)?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }

  const sideBarList = () => {
    return goods.map((item, index) => {
      const num = item.spus.reduce((sum, spu) => sum + (cart[spu.id] ?? 0), 0)

      return (
        <div
          className={classnames(styles.menuItem, { [styles.siderbarBg]: activeIndex === index })}
          key={index}
          onClick={() => {
            scrollToAnchorLeft(item.name)
            setActiveIndex(index)
          }}
        >
          <div className={styles.text}>
            {num > 0 && (
              <div className={classnames(styles.menuItemIcon, styles.menuItemIconv2)}>{num}</div>
            )}
            <img src={item.icon ? item.icon : ''} style={{ width: '15px' }} />
            {item.name}
          </div>
        </div>
      )
    })
  }
  const goodsContent = () => {
    return goods.map((category, index) => {
      return (
        <div className={styles.foodList} key={index} id={category.name}>
          <h3 className={styles.title}>{category.name}</h3>
          {/* <!-- 具体的商品列表 --> */}
          <ul>
            {category.spus.map((item) => {
              const count = cart[item.id] ?? 0
              return (
                <li className={styles.foodItem} key={item.id}>
                  <div className={styles.icon}>
                    <img src={item.picture} alt="" />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <div className={styles.desc}>{item.description}</div>
                    <div className={styles.extra}>
                      <span className={styles.saled}>{item.month_saled_content}</span>
                      <span>{item.praise_content}</span>
                    </div>
                    <div className={styles.price}>
                      <div>
                        <span className={styles.text}>${item.min_price}</span>
                        <span className={styles.unit}>/{item.unit}</span>
                      </div>
                      <div className={styles.priceRight}>
                        {count > 0 && (
                          <span className={styles.priceRightReduce}>
                            <span
                              className={styles.reduceBox}
                              onClick={(e) => changeGoodNum(e, 'reduce', item.id)}
                            ></span>
                          </span>
                        )}
                        <span className={styles.priceRightNum}>{count || ''}</span>
                        <span className={styles.priceRightAdd}>
                          <span
                            className={styles.addBox}
                            onClick={(e) => changeGoodNum(e, 'add', item.id)}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }
  return (
    <>
      <div className={styles.goods}>
        {/* 侧边栏 */}
        <div className={styles.menuWrapper}>
          <ul>{sideBarList()}</ul>
        </div>
        {/* <!--商品列表--> */}
        <div className={styles.foodsWrapper}>
          {error && !loading ? (
            <ErrorBlock status="default" title="商品加载失败" description={error.message}>
              <Button size="small" color="primary" onClick={() => loadGoods(true)}>
                重试
              </Button>
            </ErrorBlock>
          ) : null}
          <ul className={styles.foodContainer}>{goodsContent()}</ul>
        </div>
      </div>
      <ShoppingCart list={cartList} cartNumber={cartNumber} clearCart={clearCart} />
      {loading ? (
        <div className={styles.enterLoading}>
          <Loading></Loading>
        </div>
      ) : null}
    </>
  )
}

export default memo(HomeOrder)
