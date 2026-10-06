import { Link } from 'react-router'
import { useAtomValue } from 'jotai'
import { citiesViewAtom } from '@/atoms/cityStore'
import Loading from '@/components/common/loading'
import { City } from '@/types'
import styles from './index.module.scss'

const Cities = () => {
  const cities = useAtomValue(citiesViewAtom)

  return (
    <div>
      {!cities ? (
        <Loading />
      ) : (
        cities.map((item: City) => (
          <Link
            className={styles.cityName}
            // 路由除了页面跳转  还可以多页面传参
            to={{
              pathname: '/home',
              search: `name=${item.nm}`,
            }}
            key={item.id}
          >
            {item.nm}
          </Link>
        ))
      )}
    </div>
  )
}
export default Cities
