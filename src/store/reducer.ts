//  模块化  路由模块基本就是数据模块
import { combineReducers } from 'redux'
import { reducer as SearchReducer } from '@/pages/search/store/index'

export default combineReducers({
  search: SearchReducer,
})
