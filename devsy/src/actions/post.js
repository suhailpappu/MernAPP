import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_SINGLE_POST, ADD_COMMENT, REMOVE_COMMENT } from "../types/types"
import axios from 'axios'

import {setAlert} from './alert'

export const getPosts = () => async dispatch =>{
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

export const addLike = (postId) => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:res.data
            }
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}


export const removeLike = (postId) => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)

        dispatch({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:res.data
            }
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

export const deletePost = (postId) => async dispatch =>{
    try {
        await axios.delete(`/api/posts/${postId}`)

        dispatch({
            type:DELETE_POST,
            payload: postId
                
        })

        dispatch(setAlert('Post Removed !','success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}
export const addPost = (formData) => async dispatch =>{
    try {

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post(`/api/posts/`,formData,config)

        dispatch({
            type:ADD_POST,
            payload: res.data
                
        })

        dispatch(setAlert('Post Created !','success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

export const getSinglePost = (postId) => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/${postId}`)

        dispatch({
            type:GET_SINGLE_POST,
            payload:res.data
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}


export const addComment = (postId,formData) => async dispatch =>{
    try {

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config)

        dispatch({
            type:ADD_COMMENT,
            payload: res.data
                
        })

        dispatch(setAlert('Comment Added !','success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}

export const deleteComment = (postId,commentId) => async dispatch =>{
    try {

        

        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type:REMOVE_COMMENT,
            payload: commentId
                
        })

        dispatch(setAlert('Comment Removed !','success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: e.response.statusText,
                status:e.response.status
            }
        })
    }
}