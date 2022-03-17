import axios from 'axios'

import { 
    ADMIN_FRIENDS_REQUEST,
    ADMIN_FRIENDS_SUCCESS,
    ADMIN_FRIENDS_FAIL,
    NEW_FRIEND_REQUEST,
    NEW_FRIEND_SUCCESS,
    NEW_FRIEND_FAIL,
    UPDATE_FRIEND_REQUEST,
    UPDATE_FRIEND_SUCCESS,
    UPDATE_FRIEND_FAIL,
    DELETE_FRIEND_REQUEST,
    DELETE_FRIEND_SUCCESS,
    DELETE_FRIEND_FAIL,
    ALL_FRIENDS_REQUEST, 
    ALL_FRIENDS_SUCCESS, 
    ALL_FRIENDS_FAIL,    
    FRIEND_DETAILS_REQUEST,
    FRIEND_DETAILS_SUCCESS,
    FRIEND_DETAILS_FAIL,   
    ADMIN_FRIEND_DETAILS_REQUEST,
    ADMIN_FRIEND_DETAILS_SUCCESS,
    ADMIN_FRIEND_DETAILS_FAIL,   
    CLEAR_ERRORS  
} from '../constants/friendConstants'

export const getFriends = ( currentPage = 1 ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_FRIENDS_REQUEST })

        let link = `/api/v1/friends?page=${currentPage}`    

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_FRIENDS_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_FRIENDS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Friends - (Admin)
export const getAdminFriends = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_FRIENDS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/friends')

        dispatch({
            type: ADMIN_FRIENDS_SUCCESS,
            payload: data.friends
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_FRIENDS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Friend Details
export const getFriendDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: FRIEND_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/friend/${slug}`)

        dispatch({
            type: FRIEND_DETAILS_SUCCESS,
            payload: data.friend
        })
        
    } catch (error) {

        dispatch({
            type: FRIEND_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Friend Details Admin
export const getAdminFriendDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_FRIEND_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/admin/friend/${id}`)

        dispatch({
            type: ADMIN_FRIEND_DETAILS_SUCCESS,
            payload: data.friend
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_FRIEND_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// New Friend (Admin)
export const newFriend = (friendData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_FRIEND_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.post('/api/v1/admin/friend/new', friendData, config)

        dispatch({
            type: NEW_FRIEND_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FRIEND_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Friend (Admin)
export const updateFriend = (id, friend) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FRIEND_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }
        const { data } = await axios.put(`/api/v1/admin/friend/${id}`, friend, config)
        dispatch({
            type: UPDATE_FRIEND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_FRIEND_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Friend (Admin)
export const deleteFriend = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_FRIEND_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/friend/${id}`)

        dispatch({
            type: DELETE_FRIEND_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_FRIEND_FAIL,
            payload: error.response.data.message
        })

    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}