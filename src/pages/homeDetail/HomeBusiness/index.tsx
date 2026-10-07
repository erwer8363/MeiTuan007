import { memo, useEffect } from 'react'
import styles from './index.module.scss'
import { useAtomValue, useSetAtom } from 'jotai'
import { Button, ErrorBlock } from 'antd-mobile'
import Loading from '@/components/common/loading'
import {
  businessAtom,
  loadBusinessAtom,
  loadingBusinessAtom,
  loadingBusinessErrorAtom,
} from '@/atoms/homeDetailStore'

const HomeBusiness = () => {
  const business = useAtomValue(businessAtom)
  const loading = useAtomValue(loadingBusinessAtom)
  const businessErr = useAtomValue(loadingBusinessErrorAtom)
  const loadBusiness = useSetAtom(loadBusinessAtom)
  useEffect(() => {
    loadBusiness()
  }, [loadBusiness])

  // 首次加载（还没有数据）时才显示 loading / 错误页；已有数据时后台刷新不打断界面
  if (!business) {
    return (
      <div className={styles.seller}>
        {loading ? (
          <Loading />
        ) : (
          <ErrorBlock status="default" title="商家信息加载失败" description={businessErr?.message}>
            <Button size="small" color="primary" onClick={() => loadBusiness()}>
              重试
            </Button>
          </ErrorBlock>
        )}
      </div>
    )
  }
  return (
    <div className={styles.seller}>
      <div className={styles.sellerWrapper}>
        <div className={styles.sellerView}>
          <div className={styles.addressWrapper}>
            <div className={styles.addressLeft}>{business.address}</div>
            <div className={styles.addressRight}>
              <div className={styles.content}></div>
              {/* <span style={{fontSize: "0.3rem",paddingTop:'0.1rem'}}>{business.call_center}</span> */}
            </div>
          </div>

          <div className={styles.picsWrapper}>
            <ul>
              {business?.poi_env.thumbnails_url_list.map((url) => (
                <li className={styles.picsItem} key={url}>
                  <img src={url} alt="" />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.safetyWrapper}>
            查看食品安全档案
            <span className="fa fa-arrow-right"></span>
          </div>
        </div>

        <div className={styles.tipWrapper}>
          <div className={styles.deliveryWrapper}>配送服务:{business.app_delivery_tip}</div>

          <div className={styles.shippingWrapper}>配送时间:{business.shipping_time}</div>
        </div>

        <div className={styles.otherWrapper}>
          <div className={styles.serverWrapper}>
            商家服务:
            {business.poi_service.map((item) => (
              <div className={styles.poiServer} key={item.content}>
                <img src={item.icon} alt="" />
                {item.content}
              </div>
            ))}
          </div>
          <div className={styles.discountsWrapper}>
            {business.discounts2.map((item) => (
              <div className={styles.discountsItem} key={item.id}>
                <div className={styles.icon}>
                  <img src={item.icon_url} alt="" />
                </div>
                <div className={styles.text}>{item.info}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HomeBusiness)
