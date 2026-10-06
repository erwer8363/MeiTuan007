import { useEffect, useState, useRef, memo } from 'react'
import { Link } from 'react-router'
import styles from './index.module.scss'
// 图片延迟加载
import Loading from '@/components/common/loading'
import loadingPic from '@/assets/images/loading.gif'
import { lazyload } from '@/utils'
import { InfiniteScroll } from 'antd-mobile'
import { mockRequest } from './data'
import { useAtomValue } from 'jotai'
import { loadingAtom, restaurantsAtom } from '@/atoms/homeStore'

const StoreInfo = () => {
  const loading = useAtomValue(loadingAtom)
  const restaurants = useAtomValue(restaurantsAtom)

  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    lazyload('.poilist-item-icon-pic')
  }, [])
  useEffect(() => {
    restaurants.length && setData(restaurants)
  }, [loading])
  async function loadMore() {
    const append = await mockRequest(restaurants)
    setData((val) => [...val, ...append])
    setHasMore(append.length > 0)
  }

  // 首屏渲染

  useEffect(() => {
    let timer
    window.addEventListener('scroll', function () {
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        lazyload('.poilist-item-icon-pic')
        timer = null
      }, 500)
    })
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <ul>
        {!loading &&
          data.map((item, index) => {
            return (
              <li key={item.id + index}>
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
                          <span className={`${styles.poiInfoTxt} ${styles.score}`}>
                            {item.score}
                          </span>
                          <span className={styles.poiInfoTxt}>{item.sales}</span>
                          <span className={styles.poiInfoTxt}>{item.average}</span>
                        </div>

                        <div className={styles.poilistItemInfo2right}></div>
                      </div>
                      <div className={styles.poilistItemInfo3}>
                        <div className={styles.poilistItemInfo3left}>
                          <span className={styles.poiInfoTxt}>{item.first_send}</span>
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
                                backGroundColor: 'rgb(255, 255, 255) ',
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
                                backGroundColor: 'rgb(255, 255, 255)',
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
                                      backGroundColor: 'rgb(255, 255, 255)',
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
                                      backGroundColor: 'rgb(255, 255, 255)',
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
                                      backGroundColor: 'rgb(255, 255, 255)',
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
