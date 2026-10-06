import { memo } from 'react'
import { Link } from 'react-router'
import styles from './index.module.scss'
import { useAtomValue } from 'jotai'
import { bannersViewAtom } from '@/atoms/homeStore'
import Loading from '@/components/common/loading'

const Banners = () => {
  const banners = useAtomValue(bannersViewAtom)
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {banners ? (
          banners.map((item) => (
            <Link to="banners/detail" key={item.id} className={styles.item}>
              <div className={styles.content}>
                <p className={styles.icon}>
                  <img src={item.image_src} alt={item.desc} />
                </p>
                <span>{item.desc}</span>
              </div>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default memo(Banners)
