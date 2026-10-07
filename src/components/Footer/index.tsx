import { memo } from 'react'
import { Link, useLocation } from 'react-router'
import styles from './index.module.scss'
import classnames from 'classnames'
import { isPathPartlyExisted } from '@/utils'

const Footer = () => {
  const { pathname } = useLocation()

  if (isPathPartlyExisted(pathname)) {
    return null
  }
  return (
    <div className={styles.footerWrapper}>
      {/* Link的本质是a标签 */}
      <Link
        to="/home"
        className={classnames({ [styles.active]: pathname == '/home' || pathname == '/' })}
      >
        <div className={styles.iconHome}></div>
        <div className={styles.footerHome}>首页</div>
      </Link>
      <Link to="/order" className={classnames({ [styles.active]: pathname == '/order' })}>
        <div className={styles.iconOrder}></div>
        <div className={styles.footerOrder}>订单</div>
      </Link>
      <Link to="/mine" className={classnames({ [styles.active]: pathname == '/mine' })}>
        <div className={styles.iconMine}></div>
        <div className={styles.footerMine}>我的</div>
      </Link>
    </div>
  )
}
export default memo(Footer)
