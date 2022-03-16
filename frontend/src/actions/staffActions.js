import axios from 'axios'

import { 
    ADMIN_STAFF_REQUEST,
    ADMIN_STAFF_SUCCESS,
    ADMIN_STAFF_FAIL,
    NEW_STAFF_REQUEST,
    NEW_STAFF_SUCCESS,
    NEW_STAFF_FAIL,
    UPDATE_STAFF_REQUEST,
    UPDATE_STAFF_SUCCESS,
    UPDATE_STAFF_FAIL,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAIL,
    ALL_STAFF_REQUEST, 
    ALL_STAFF_SUCCESS, 
    ALL_STAFF_FAIL,    
    STAFF_DETAILS_REQUEST,
    STAFF_DETAILS_SUCCESS,
    STAFF_DETAILS_FAIL,   
    ADMIN_STAFF_DETAILS_REQUEST,
    ADMIN_STAFF_DETAILS_SUCCESS,
    ADMIN_STAFF_DETAILS_FAIL,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_FAIL,
    CLEAR_ERRORS  
} from '../constants/staffConstants'

export const getStaff = ( currentPage = 1 ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_STAFF_REQUEST })

        let link = `/api/v1/staff?page=${currentPage}`    

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_STAFF_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_STAFF_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Staff - (Admin)
export const getAdminStaff = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_STAFF_REQUEST })

        const { data } = await axios.get('/api/v1/admin/staff')

        dispatch({
            type: ADMIN_STAFF_SUCCESS,
            payload: data.staff
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_STAFF_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Staff Details
export const getStaffDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: STAFF_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/staff/${slug}`)

        dispatch({
            type: STAFF_DETAILS_SUCCESS,
            payload: data.staff
        })
        
    } catch (error) {

        dispatch({
            type: STAFF_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Staff Details Admin
export const getAdminStaffDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_STAFF_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/admin/staff/${id}`)

        dispatch({
            type: ADMIN_STAFF_DETAILS_SUCCESS,
            payload: data.staff
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_STAFF_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// New Staff (Admin)
export const newStaff = (staffData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_STAFF_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.post('/api/v1/admin/staff/new', staffData, config)

        dispatch({
            type: NEW_STAFF_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_STAFF_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Staff (Admin)
export const updateStaff = (id, staffData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_STAFF_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }
        const { data } = await axios.put(`/api/v1/admin/staff/${id}`, staffData, config)
        dispatch({
            type: UPDATE_STAFF_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_STAFF_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Staff Images (Admin)
export const updateImages = (id, initPos, finPos) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_IMAGE_REQUEST })      

        const { data } = await axios.put(`/api/v1/staffImage?id=${id}&initPos=${initPos}&finPos=${finPos}`)

        dispatch({
            type: UPDATE_IMAGE_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: UPDATE_IMAGE_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete Staff (Admin)
export const deleteStaff = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_STAFF_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/staff/${id}`)

        dispatch({
            type: DELETE_STAFF_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_STAFF_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete Staff Image (Admin)
export const deleteImage = (id, imgIndex, imgId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_IMAGE_REQUEST })      

        const { data } = await axios.delete(`/api/v1/staffImage?id=${id}&imgIndex=${imgIndex}&imgId=${imgId}`)

        dispatch({
            type: DELETE_IMAGE_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_IMAGE_FAIL,
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