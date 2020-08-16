import {SET_ALERT,REMOVE_ALERT} from '../types/types'

const initialState = []

const alertState = (state = initialState,action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state,action.payload]
        
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)

        default:
            return state
    }
}

export default alertState
