import axios from "axios"
import { GET_REPOS,CLEAR_PROFILE,DELETE_ACCOUNT,GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_ALL_PROFILES } from "../types/types"
import { setAlert } from "./alert"


export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: e.response.statusText,status:e.response.status}
        })
    }
}

//Get all profiles

export const getAllProfiles = () => async dispatch => {

    dispatch({
        type:CLEAR_PROFILE
    })

    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type:GET_ALL_PROFILES,
            payload:res.data
        })
    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: e.response.statusText,status:e.response.status}
        })
    }
}

//Get  Profile by ID

export const getProfileById = (id) => async dispatch => {

    dispatch({
        type:CLEAR_PROFILE
    })

    try {
        const res = await axios.get(`/api/profile/user/${id}`)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: e.response.statusText,status:e.response.status}
        })
    }
}

//Get Github Repos

export const getGithubRepos = (username) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`)

        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: e.response.statusText,status:e.response.status}
        })
    }
}


//Create or update profile

export const createProfile = (formData,history,edit=false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const res = await axios.post('/api/profile',formData,config)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })


        dispatch(setAlert(edit ? "Profile updated" :"Profile created",'success'))

        if(!edit){
            //history.push('/dashboard')
        }


    } catch (e) {

        const errors = e.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

//Add Experience

export const addExperience = (formData,history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const res = await axios.put('/api/profile/experience',formData,config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })


        dispatch(setAlert("Experience Added !"))

       
        history.push('/dashboard')
        


    } catch (e) {

        const errors = e.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

//Add Education

export const addEducation = (formData,history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const res = await axios.put('/api/profile/education',formData,config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })


        dispatch(setAlert("Education Added !"))

       
        history.push('/dashboard')
        


    } catch (e) {

        const errors = e.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

export const deleteExperience = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("Experience removed",'success'))

    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}


export const deleteEducation = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("Education removed",'success'))
        
    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

//Delete account and profile

export const deleteAccount = () => async dispatch =>{

    if (window.confirm("Are you sure?This cannot be undone")) {
        
    try {
        await axios.delete(`/api/profile`)

        dispatch({
            type: CLEAR_PROFILE
        })

        dispatch({
            type: DELETE_ACCOUNT
        })

        dispatch(setAlert("Your account has been deleted",'danger'))
        
    } catch (e) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
    }

}