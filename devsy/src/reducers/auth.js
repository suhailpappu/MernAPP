import {REGISTER_SUCCESS,
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT
} from '../types/types'


const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated: null,
    loading:true,
    user:null
}

const auth = (state=initialState,action) => {
    switch (action.type) {

        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }

        case AUTH_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false
            }


        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)

            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false
            }

        

    
        default:
            return state
    }
}

export default auth