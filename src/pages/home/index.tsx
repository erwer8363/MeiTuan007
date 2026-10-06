import { useState, useEffect, useRef, memo } from 'react'
import styles from './index.module.scss'
import { useSearchParams, useNavigate } from 'react-router'
// 组件
import SetMeal from './SetMeal'
import StoreList from './StoreList'
import StoreInfo from './StoreInfo'
import CitySelect from './CitySelect'
import Banners from './Banners'
import Modal from './Modal'
// api
import { isFixed, backGroundColor, throttle } from '@/utils'
import { useAtomValue, useSetAtom } from 'jotai'
import { bannersViewAtom, loadRestaurantsAtom } from '@/atoms/homeStore'

function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [search] = useSearchParams()
  const cityName = search.get('name') || ''
  const containerRef = useRef(null)

  useEffect(() => {
    useSetAtom(loadRestaurantsAtom)

    isFixed('.container', 1)
    backGroundColor('.container')
    document.querySelector('.w').classList.add('failScroll')
  }, [])

  const onModalClose = () => {
    // 将自有的 visible 变为false 为了触发下次点击事件
    setVisible(false)
    document.querySelector('.kk-filter-wrapper').classList.remove('fixed')
    containerRef.current.classList.remove('fixed')
  }

  return (
    // TODO(阶段 6)：'w' / 'container' 是给 utils 里 querySelector 用的全局类名，改 Hook 后删除
    <div className={`${styles.wrapper} w`}>
      <div className={`${styles.container} container`} ref={containerRef}>
        <div className={styles.wraper}>
          <CitySelect cityName={cityName} />
          <div className={styles.search}>
            <input placeholder="请输入商家或商品名称" />
            <div className={styles.searchRight} onClick={() => navigate('/search')}>
              搜索
            </div>
          </div>
        </div>
      </div>
      <Banners />
      <SetMeal />
      <StoreList methods={setVisible} containerRef={containerRef} />
      <Modal visible={visible} onClose={onModalClose} />
      <StoreInfo />
    </div>
  )
}

export default memo(Home)
