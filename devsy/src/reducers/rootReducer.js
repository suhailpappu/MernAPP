import {combineReducers} from 'redux'
import alertState from './alertState'
import auth from './auth'
import profileState from './profile'
import postState from './post'

export default combineReducers({
    alertState,
    auth,
    profileState,
    postState

})