import { useEffect, memo } from 'react'
import { Link } from 'react-router'
import styles from './index.module.scss'
// 图片延迟加载
import Loading from '@/components/common/loading'
import loadingPic from '@/assets/images/loading.gif'
import { lazyload } from '@/utils'
import { InfiniteScroll } from 'antd-mobile'
import { useAtomValue, useSetAtom } from 'jotai'
import { hasMoreAtom, loadMoreRestaurantsAtom, restaurantsAtom } from '@/atoms/homeStore'

const StoreInfo = () => {
  const restaurants = useAtomValue(restaurantsAtom)
  const hasMore = useAtomValue(hasMoreAtom)
  // InfiniteScroll 触底时会无参调用 loadMore，页码由 atom 自己维护，见 atoms/homeStore.ts
  const loadMore = useSetAtom(loadMoreRestaurantsAtom)

  // 首屏：还没有数据且还有更多，说明第一页正在加载
  const loading = restaurants.length === 0 && hasMore

  useEffect(() => {
    lazyload('.poilist-item-icon-pic')
  }, [])

  // 滚动时节流触发图片懒加载
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const onScroll = () => {
      if (timer) return
      timer = setTimeout(() => {
        lazyload('.poilist-item-icon-pic')
        timer = null
      }, 500)
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <ul>
        {restaurants.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={{
                  pathname: `/homedetail/${item.id} `,
                }}
              >
                <div className={styles.poilistItem} style={{ position: 'relative' }}>
                  <div className={styles.poilistItemIcon}>
                    <img
                      className={`${styles.poilistItemIconPic} poilist-item-icon-pic`}
                      data-src={item.pic}
                      src={loadingPic}
                    />
                    <div className={styles.poilistItemIconPoitypepic}>
                      <img className={styles.poitypePic} src={item.pic_icon} />
                    </div>
                  </div>
                  <div className={styles.poilistItemInfo}>
                    <div className={styles.poilistItemInfo1}>
                      <div className={styles.poilistItemInfo1name}>{item.name}</div>
                    </div>
                    <div className={styles.poilistItemInfo2}>
                      <div className={styles.poilistItemInfo2left}>
                        <span className={`${styles.poiInfoTxt} ${styles.score}`}>{item.score}</span>
                        <span className={styles.poiInfoTxt}>{item.sales}</span>
                        <span className={styles.poiInfoTxt}>{item.average}</span>
                      </div>

                      <div className={styles.poilistItemInfo2right}></div>
                    </div>
                    <div className={styles.poilistItemInfo3}>
                      <div className={styles.poilistItemInfo3left}>
                        <span className={styles.poiInfoTxt}>{item.frist_send}</span>
                        <span className={`${styles.poiInfoTxt} ${styles.noMarginRight}`}>
                          {item.delivery}
                        </span>
                      </div>
                      <div className={styles.poilistItemInfo3right}>
                        <span className={styles.poiInfoTxt}>{item.time}</span>
                        <span className={`${styles.poiInfoTxt} ${styles.noMarginRight}`}>
                          {item.distance}
                        </span>
                      </div>
                    </div>
                    <div className={styles.poilistItemInfo4}>
                      <div className={styles.poilistItemInfo4item}>
                        <div className={styles.poilistItemInfo4itemtxt}>
                          <img className={styles.info4ItemTxtlefticon} src={item.info_icon} />
                          <span
                            className={styles.info4ItemTxt}
                            style={{
                              color: 'rgb(155, 118, 56)',
                              backgroundColor: 'rgb(255, 255, 255) ',
                            }}
                          >
                            {item.info_text}
                          </span>
                        </div>
                      </div>
                      <div className={styles.poilistItemInfo4item}>
                        <div className={styles.poilistItemInfo4itemtxt}>
                          <img className={styles.info4ItemTxtlefticon} src={item.info_icon2} />
                          <span
                            className={styles.info4ItemTxt}
                            style={{
                              color: 'rgb(255, 128, 0)',
                              backgroundColor: 'rgb(255, 255, 255)',
                            }}
                          >
                            {item.info_text2}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.poilistItemInfo5} ${styles.moreIconNeed}`}>
                      <div className={styles.dCmmLabelCompWrap}>
                        <div className={`${styles.dSublabelContainer} ${styles.dMultiLine}`}>
                          <div className={styles.dSublabelBlock}>
                            <div
                              className={styles.dSublabel}
                              style={{ borderColor: 'rgb(255, 217, 178)' }}
                            >
                              <div>
                                <div
                                  className={styles.dLb}
                                  style={{
                                    color: 'rgb(255, 128, 0)',
                                    backgroundColor: 'rgb(255, 255, 255)',
                                  }}
                                >
                                  {item.desc1}
                                  <span></span>
                                </div>
                              </div>
                            </div>
                            <div
                              className={styles.dSublabel}
                              style={{ borderColor: 'rgb(255, 198, 193) ' }}
                            >
                              <div>
                                <div
                                  className={styles.dLb}
                                  style={{
                                    color: 'rgb(255, 74, 38)',
                                    backgroundColor: 'rgb(255, 255, 255)',
                                  }}
                                >
                                  {item.desc2}
                                  <span></span>
                                </div>
                              </div>
                            </div>
                            <div
                              className={styles.dSublabel}
                              style={{ borderColor: 'rgb(255, 198, 193)' }}
                            >
                              <div>
                                <div
                                  className={styles.dLb}
                                  style={{
                                    color: 'rgb(255, 74, 38)',
                                    backgroundColor: 'rgb(255, 255, 255)',
                                  }}
                                >
                                  {item.desc3}
                                  <span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </ul>
      {loading ? (
        <div className={styles.enterLoading}>
          <Loading></Loading>
        </div>
      ) : null}
    </div>
  )
}

export default memo(StoreInfo)
