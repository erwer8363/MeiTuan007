import * as actionTypes from './constants'

const defaulState = {
    CitiesList: [],
   
}

export default (state = defaulState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CITIES_LIST:
            return {
                ...state,
                CitiesList: action.data,

            }
      
        default:
            return state
    }
}