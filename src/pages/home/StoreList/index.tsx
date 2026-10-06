import { useState, useEffect, useRef, memo } from 'react'
import styles from './index.module.scss'
import { isFixed } from '@/utils'

function StoreList(props) {
  const { methods, containerRef } = props
  const [show, setShow] = useState(true)
  const [toTop, setToTop] = useState('none')
  const listRef = useRef()

  const backTop = () => {
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    isFixed('.kk-filter-wrapper', 250)
  }, [])

  useEffect(() => {
    function fn() {
      let height = window.innerHeight / 2
      var scrollTop =
        document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop > height) {
        setToTop('block')
      } else {
        setToTop('none')
      }
    }
    window.addEventListener('scroll', fn)
    return () => {
      window.removeEventListener('scroll', fn)
    }
  }, [toTop])
  const modal = () => {
    methods(show)
    setShow(!show)
    if (show) {
      listRef.current.classList.add('fixed')
      containerRef.current.classList.add('fixed')
    } else {
      listRef.current.classList.remove('fixed')
      containerRef.current.classList.remove('fixed')
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.kkFilterWrapper} kk-filter-wrapper`} ref={listRef}>
        <div className={styles.comFilter} id="m-filter-wrapper-nosticky" style={{ height: 'auto' }}>
          <div
            className={styles.filterWrapper}
            id="m-filter-wrapper-sticky"
            style={{ top: 'auto' }}
          >
            <div className={styles.mFilterOut}>
              <div className={styles.outWrapper}>
                <div className={styles.outItemLeft}>
                  <div className={styles.outItemInfo} onClick={() => modal()}>
                    <div className={styles.outItemInfoTit}>综合排序</div>
                    <img
                      className={styles.outItemInfoTitarrow}
                      src="https://p0.meituan.net/travelcube/c031c9628ddd446e8c7635535297acda228.png"
                    />
                  </div>
                </div>
                <div className={styles.outItemCenter}></div>
                <div className={styles.outItemRight}>
                  <div className={styles.outItemInfo}>
                    <img
                      className={styles.outItemInfoTitarrow}
                      src="https://p0.meituan.net/travelcube/c031c9628ddd446e8c7635535297acda228.png"
                    />
                    <div className={styles.outItemInfoTit}>全部筛选</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mFilterQuick}>
              <div className={styles.quickWrapper}>
                <div className={styles.quickItem}>
                  <div className={styles.quickItemHidebar}>
                    <div className={styles.quickItemTit}>
                      <div className={styles.quickItemTittxt}>点评高分</div>
                    </div>
                  </div>
                </div>
                <div className={styles.quickItem}>
                  <div className={styles.quickItemHidebar}>
                    <div className={styles.quickItemTit}>
                      <div className={styles.quickItemTittxt}>优惠商家</div>
                    </div>
                  </div>
                </div>
                <div className={styles.quickItem}>
                  <div className={styles.quickItemHidebar}>
                    <div className={styles.quickItemTit}>
                      <div className={styles.quickItemTittxt}>满减优惠</div>
                    </div>
                  </div>
                </div>
                <div className={styles.quickItem}>
                  <div className={styles.quickItemHidebar}>
                    <div className={styles.quickItemTit}>
                      <div className={styles.quickItemTittxt}>品牌商家</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.backTop} onClick={backTop} style={{ display: toTop }}>
        <i className="fa fa-angle-double-up"></i>
      </div>
    </div>
  )
}
export default memo(StoreList)
