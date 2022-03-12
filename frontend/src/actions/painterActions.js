import axios from 'axios'

import { 
    ADMIN_PAINTERS_REQUEST,
    ADMIN_PAINTERS_SUCCESS,
    ADMIN_PAINTERS_FAIL,
    NEW_PAINTER_REQUEST,
    NEW_PAINTER_SUCCESS,
    NEW_PAINTER_FAIL,
    UPDATE_PAINTER_REQUEST,
    UPDATE_PAINTER_SUCCESS,
    UPDATE_PAINTER_FAIL,
    DELETE_PAINTER_REQUEST,
    DELETE_PAINTER_SUCCESS,
    DELETE_PAINTER_FAIL,
    ALL_PAINTERS_REQUEST, 
    ALL_PAINTERS_SUCCESS, 
    ALL_PAINTERS_FAIL,    
    PAINTER_DETAILS_REQUEST,
    PAINTER_DETAILS_SUCCESS,
    PAINTER_DETAILS_FAIL,   
    ADMIN_PAINTER_DETAILS_REQUEST,
    ADMIN_PAINTER_DETAILS_SUCCESS,
    ADMIN_PAINTER_DETAILS_FAIL,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_FAIL,
    CLEAR_ERRORS  
} from '../constants/painterConstants'

export const getPainters = ( currentPage = 1 ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PAINTERS_REQUEST })

        let link = `/api/v1/painters?page=${currentPage}`    

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PAINTERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_PAINTERS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Painters - (Admin)
export const getAdminPainters = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PAINTERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/painters')

        dispatch({
            type: ADMIN_PAINTERS_SUCCESS,
            payload: data.painters
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_PAINTERS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Painter Details
export const getPainterDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: PAINTER_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/painter/${slug}`)

        dispatch({
            type: PAINTER_DETAILS_SUCCESS,
            payload: data.painter
        })
        
    } catch (error) {

        dispatch({
            type: PAINTER_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Painter Details Admin
export const getAdminPainterDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PAINTER_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/admin/painter/${id}`)

        dispatch({
            type: ADMIN_PAINTER_DETAILS_SUCCESS,
            payload: data.painter
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_PAINTER_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// New Painter (Admin)
export const newPainter = (painterData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PAINTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.post('/api/v1/admin/painter/new', painterData, config)

        dispatch({
            type: NEW_PAINTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PAINTER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Painter (Admin)
export const updatePainter = (id, painterData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PAINTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }
        const { data } = await axios.put(`/api/v1/admin/painter/${id}`, painterData, config)
        dispatch({
            type: UPDATE_PAINTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PAINTER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Painter Images (Admin)
export const updateImages = (id, initPos, finPos) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_IMAGE_REQUEST })      

        const { data } = await axios.put(`/api/v1/painterImage?id=${id}&initPos=${initPos}&finPos=${finPos}`)

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

// Delete Painter (Admin)
export const deletePainter = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PAINTER_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/painter/${id}`)

        dispatch({
            type: DELETE_PAINTER_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_PAINTER_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete Painter Image (Admin)
export const deleteImage = (id, imgIndex, imgId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_IMAGE_REQUEST })      

        const { data } = await axios.delete(`/api/v1/painterImage?id=${id}&imgIndex=${imgIndex}&imgId=${imgId}`)

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