import * as actionTypes  from './constants'
import {getCitiesRequest } from '@/api/request'

export const changeCitiesList = (data) => ({
    type:actionTypes.CHANGE_CITIES_LIST,
    data
})

export const getCitiesList = () => {
    return dispatch => {
        getCitiesRequest ().then(data => {
            const action = changeCitiesList(data.data)
            dispatch(action)
            // console.log(action);
        })
    }
}

