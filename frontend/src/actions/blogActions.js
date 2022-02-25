import axios from 'axios'

import { 
    ADMIN_BLOGS_REQUEST,
    ADMIN_BLOGS_SUCCESS,
    ADMIN_BLOGS_FAIL,
    NEW_BLOG_REQUEST,
    NEW_BLOG_SUCCESS,
    NEW_BLOG_FAIL,
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    ALL_BLOGS_REQUEST, 
    ALL_BLOGS_SUCCESS, 
    ALL_BLOGS_FAIL,    
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,   
    ADMIN_BLOG_DETAILS_REQUEST,
    ADMIN_BLOG_DETAILS_SUCCESS,
    ADMIN_BLOG_DETAILS_FAIL,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_FAIL,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_FAIL,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    CLEAR_ERRORS  
} from '../constants/blogConstants'

export const getBlogs = ( currentPage = 1 ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_BLOGS_REQUEST })

        let link = `/api/v1/blogs?page=${currentPage}`    

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_BLOGS_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_BLOGS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Blogs - (Admin)
export const getAdminBlogs = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_BLOGS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/blogs')

        dispatch({
            type: ADMIN_BLOGS_SUCCESS,
            payload: data.blogs
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_BLOGS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Blog Details
export const getBlogDetails = (slug) => async (dispatch) => {
    try {

        dispatch({ type: BLOG_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/blog/${slug}`)

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data.blog
        })
        
    } catch (error) {

        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Blog Details Admin
export const getAdminBlogDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_BLOG_DETAILS_REQUEST })        

        const { data } = await axios.get(`/api/v1/admin/blog/${id}`)

        dispatch({
            type: ADMIN_BLOG_DETAILS_SUCCESS,
            payload: data.blog
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_BLOG_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// New Blog (Admin)
export const newBlog = (blogData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BLOG_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.post('/api/v1/admin/blog/new', blogData, config)

        dispatch({
            type: NEW_BLOG_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BLOG_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Blog (Admin)
export const updateBlog = (id, blogtData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BLOG_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }
        const { data } = await axios.put(`/api/v1/admin/blog/${id}`, blogtData, config)
        dispatch({
            type: UPDATE_BLOG_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BLOG_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Blog Images (Admin)
export const updateImages = (id, initPos, finPos) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_IMAGE_REQUEST })      

        const { data } = await axios.put(`/api/v1/blogImage?id=${id}&initPos=${initPos}&finPos=${finPos}`)

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

// Delete Blog (Admin)
export const deleteBlog = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BLOG_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/blog/${id}`)

        dispatch({
            type: DELETE_BLOG_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_BLOG_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete Blog Image (Admin)
export const deleteImage = (id, imgIndex, imgId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_IMAGE_REQUEST })      

        const { data } = await axios.delete(`/api/v1/blogImage?id=${id}&imgIndex=${imgIndex}&imgId=${imgId}`)

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

// Add New Comment
export const newComment = (commentData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COMMENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'   
            }
        }

        const { data } = await axios.put('/api/v1/comment', commentData, config)

        dispatch({
            type: NEW_COMMENT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: NEW_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Blog Comments - (Admin)
export const getBlogComments = (id) => async (dispatch) => {
    try {

        dispatch({
            type: GET_COMMENTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/comments?id=${id}`)

        dispatch({
            type: GET_COMMENTS_SUCCESS,
            payload: data.comments
        })
        
    } catch (error) {

        dispatch({
            type: GET_COMMENTS_FAIL,
            payload: error.response.data.message
        })

    }}

// Delete Blog Comment - (Admin)
export const deleteComment = (id, blogId) => async (dispatch) => {
    try {

        dispatch({
            type: DELETE_COMMENT_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/comments?id=${id}&blogId=${blogId}`)

        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_COMMENT_FAIL,
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