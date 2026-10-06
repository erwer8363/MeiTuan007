import { useEffect, memo } from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router'

interface IProps {
  cityName: string | null
}

// 子组件一般不做数据请求 由父组件统一并传参过来
const CitySelect = (props: IProps) => {
  let { cityName } = props
    useEffect(() => {
        cityName == '' && window.sessionStorage.getItem('cityName')
            ? (cityName = window.sessionStorage.getItem('cityName'))
            : (window.sessionStorage.cityName = cityName)
    },[])

  return (
    <Link className={styles.citygps} to="/cities">
      <i className={styles.iconCity}></i>
      <span>{cityName ? cityName : '获取城市坐标'}</span>
      <i className={styles.iconCityNext}></i>
    </Link>
  )
}
export default memo(CitySelect)
