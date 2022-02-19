import { 
    ADMIN_BLOGS_REQUEST,
    ADMIN_BLOGS_SUCCESS,
    ADMIN_BLOGS_FAIL,
    NEW_BLOG_REQUEST,
    NEW_BLOG_RESET,
    NEW_BLOG_SUCCESS,
    NEW_BLOG_FAIL,
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_RESET,
    UPDATE_BLOG_FAIL,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_RESET,
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
    DELETE_IMAGE_RESET,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_RESET,
    UPDATE_IMAGE_FAIL,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_RESET,
    NEW_COMMENT_FAIL,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_RESET,
    DELETE_COMMENT_FAIL,
    CLEAR_ERRORS 
} from '../constants/blogConstants'

export const blogsReducer = ( state = { blogs: [] }, action ) => {
    switch(action.type) {

        case ALL_BLOGS_REQUEST:
        case ADMIN_BLOGS_REQUEST:
            return {
                loading: true,
                blogs: []
            }        
        case ALL_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: action.payload.blogs,
                blogsCount: action.payload.blogsCount,
                resPerPage: action.payload.resPerPage,
            }   
        case ADMIN_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: action.payload
            }
        case ALL_BLOGS_FAIL:
        case ADMIN_BLOGS_FAIL:
             return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}

export const newBlogReducer = ( state = { blog: {} }, action ) => {
    switch (action.type) {

        case NEW_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_BLOG_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                blog: action.payload.blog
            }
        case NEW_BLOG_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case NEW_BLOG_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const blogReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_IMAGE_REQUEST:
        case UPDATE_IMAGE_REQUEST:
        case DELETE_BLOG_REQUEST:
        case UPDATE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            } 
        case DELETE_IMAGE_SUCCESS:    
        case DELETE_BLOG_SUCCESS:        
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            } 
        case UPDATE_IMAGE_SUCCESS:  
        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_IMAGE_FAIL:
        case UPDATE_IMAGE_FAIL:                
        case DELETE_BLOG_FAIL:
        case UPDATE_BLOG_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case DELETE_IMAGE_RESET:        
        case DELETE_BLOG_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_IMAGE_RESET:
        case UPDATE_BLOG_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const blogDetailsReducer = ( state = { blog: {} }, action ) => {
    switch (action.type) {

        case BLOG_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BLOG_DETAILS_SUCCESS:
            return {
                loading: false,
                blog: action.payload
            }
        case BLOG_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const adminBlogDetailsReducer = ( state = { blog: {} }, action ) => {
    switch (action.type) {

        case ADMIN_BLOG_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_BLOG_DETAILS_SUCCESS:
            return {
                loading: false,
                blog: action.payload
            }
        case ADMIN_BLOG_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newCommentReducer = ( state = {}, action ) => {
    switch (action.type) {

        case NEW_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_COMMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload
            } 
        case NEW_COMMENT_RESET:
            return {
                ...state,
                success: false
            }
        case NEW_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const blogCommentsReducer = ( state = { comments: [] }, action ) => {
    switch (action.type) {

        case GET_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_COMMENTS_SUCCESS:
            return {
                loading: false,
                comments: action.payload
            }  
        case GET_COMMENTS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const commentReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }         
        case DELETE_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case DELETE_COMMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}