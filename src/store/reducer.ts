//  模块化  路由模块基本就是数据模块
import {combineReducers}  from 'redux'
import {reducer as HomeReducer} from '@/pages/home/store/index'
import {reducer as SearchReducer} from '@/pages/search/store/index'
import {reducer as HomeDetailGoodsReducer} from '@/pages/homeDetail/HomeOrder/store/index'
import {reducer as HomeDetailCommentsReducer} from '@/pages/homeDetail/HomeComment/store/index'
import {reducer as HomeDetailBusinessReducer} from '@/pages/homeDetail/HomeBusiness/store/index'




export default combineReducers({
    home:HomeReducer,
    search:SearchReducer,
    comment:HomeDetailCommentsReducer,
    business:HomeDetailBusinessReducer,
    goods:HomeDetailGoodsReducer
   
})