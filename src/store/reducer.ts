//  模块化  路由模块基本就是数据模块
import { combineReducers } from 'redux'
import { reducer as SearchReducer } from '@/pages/search/store/index'
import { reducer as HomeDetailGoodsReducer } from '@/pages/homeDetail/HomeOrder/store/index'
import { reducer as HomeDetailBusinessReducer } from '@/pages/homeDetail/HomeBusiness/store/index'

export default combineReducers({
  search: SearchReducer,
  business: HomeDetailBusinessReducer,
  goods: HomeDetailGoodsReducer,
})
