import axios from 'axios'

import { 
    ADMIN_PAGES_REQUEST,
    ADMIN_PAGES_SUCCESS,
    ADMIN_PAGES_FAIL,
    NEW_PAGE_REQUEST,
    NEW_PAGE_SUCCESS,
    NEW_PAGE_FAIL,
    UPDATE_PAGE_REQUEST,
    UPDATE_PAGE_SUCCESS,
    UPDATE_PAGE_FAIL,
    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    DELETE_PAGE_FAIL,
    ALL_PAGES_REQUEST, 
    ALL_PAGES_SUCCESS, 
    ALL_PAGES_FAIL,    
    PAGE_DETAILS_REQUEST,
    PAGE_DETAILS_SUCCESS,
    PAGE_DETAILS_FAIL,   
    ADMIN_PAGE_DETAILS_REQUEST,
    ADMIN_PAGE_DETAILS_SUCCESS,
    ADMIN_PAGE_DETAILS_FAIL,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_FAIL,
    CLEAR_ERRORS  
} from '../constants/pageConstants'

export const getPages = (  ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PAGES_REQUEST })

        let link = '/api/v1/pages'    

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PAGES_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_PAGES_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Pages - (Admin)
export const getAdminPages = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PAGES_REQUEST })

        const { data } = await axios.get('/api/v1/admin/pages')

        dispatch({
            type: ADMIN_PAGES_SUCCESS,
            payload: data.pages
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_PAGES_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Page Details
export const getPageDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: PAGE_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/page/${slug}`)

        dispatch({
            type: PAGE_DETAILS_SUCCESS,
            payload: data.page
        })
        
    } catch (error) {

        dispatch({
            type: PAGE_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Page Details Admin
export const getAdminPageDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PAGE_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/admin/page/${id}`)

        dispatch({
            type: ADMIN_PAGE_DETAILS_SUCCESS,
            payload: data.page
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_PAGE_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// New Page (Admin)
export const newPage = (pageData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PAGE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.post('/api/v1/admin/page/new', pageData, config)

        dispatch({
            type: NEW_PAGE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PAGE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Page (Admin)
export const updatePage = (id, pageData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PAGE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }
        const { data } = await axios.put(`/api/v1/admin/page/${id}`, pageData, config)
        dispatch({
            type: UPDATE_PAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PAGE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Page Images (Admin)
export const updateImages = (id, initPos, finPos) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_IMAGE_REQUEST })      

        const { data } = await axios.put(`/api/v1/pageImage?id=${id}&initPos=${initPos}&finPos=${finPos}`)

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

// Delete Page (Admin)
export const deletePage = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PAGE_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/page/${id}`)

        dispatch({
            type: DELETE_PAGE_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_PAGE_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete Blog Image (Admin)
export const deleteImage = (id, imgIndex, imgId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_IMAGE_REQUEST })      

        const { data } = await axios.delete(`/api/v1/pageImage?id=${id}&imgIndex=${imgIndex}&imgId=${imgId}`)

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