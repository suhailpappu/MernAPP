import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_ALL_PROFILES, GET_REPOS } from "../types/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profileState = (state=initialState,action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            
            return {
                ...state,
                profile:action.payload,
                loading:false
            }

        case GET_ALL_PROFILES:
            return{
                ...state,
                profiles:action.payload,
                loading:false
            }
        
        case GET_REPOS:
            return{
                ...state,
                repos:action.payload,
                loaing:false
            }

        case PROFILE_ERROR:
            return{
                ...state,
                error:action.payload,
                loading:false
            }

        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                loading:false
            }

        

    
        default:
            return state
    }
}

export default profileState