import axios from 'axios'

import { 
    ADMIN_COURSES_REQUEST,
    ADMIN_COURSES_SUCCESS,
    ADMIN_COURSES_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAIL,
    ALL_COURSES_REQUEST, 
    ALL_COURSES_SUCCESS, 
    ALL_COURSES_FAIL,    
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,   
    ADMIN_COURSE_DETAILS_REQUEST,
    ADMIN_COURSE_DETAILS_SUCCESS,
    ADMIN_COURSE_DETAILS_FAIL,  
    CLEAR_ERRORS  
} from '../constants/courseConstants'

export const getCourses = (  ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_COURSES_REQUEST })

        let link = '/api/v1/courses'    

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_COURSES_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_COURSES_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Courses - (Admin)
export const getAdminCourses = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_COURSES_REQUEST })

        const { data } = await axios.get('/api/v1/admin/courses')

        dispatch({
            type: ADMIN_COURSES_SUCCESS,
            payload: data.courses
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_COURSES_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Course Details
export const getCourseDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: COURSE_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/course/${slug}`)

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data.course
        })
        
    } catch (error) {

        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Course Details Admin
export const getAdminCourseDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_COURSE_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/admin/course/${id}`)

        dispatch({
            type: ADMIN_COURSE_DETAILS_SUCCESS,
            payload: data.course
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_COURSE_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// New Course (Admin)
export const newCourse = (courseData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COURSE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.post('/api/v1/admin/course/new', courseData, config)

        dispatch({
            type: NEW_COURSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Course (Admin)
export const updateCourse = (id, courseData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COURSE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }
        const { data } = await axios.put(`/api/v1/admin/course/${id}`, courseData, config)
        dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Course (Admin)
export const deleteCourse = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_COURSE_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/course/${id}`)

        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_COURSE_FAIL,
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