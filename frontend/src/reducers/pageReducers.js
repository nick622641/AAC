import { 
    ADMIN_PAGES_REQUEST,
    ADMIN_PAGES_SUCCESS,
    ADMIN_PAGES_FAIL,
    NEW_PAGE_REQUEST,
    NEW_PAGE_RESET,
    NEW_PAGE_SUCCESS,
    NEW_PAGE_FAIL,
    UPDATE_PAGE_REQUEST,
    UPDATE_PAGE_SUCCESS,
    UPDATE_PAGE_RESET,
    UPDATE_PAGE_FAIL,
    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    DELETE_PAGE_RESET,
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
    DELETE_IMAGE_RESET,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_RESET,
    UPDATE_IMAGE_FAIL,
    CLEAR_ERRORS 
} from '../constants/pageConstants'

export const pagesReducer = ( state = { pages: [] }, action ) => {
    switch(action.type) {

        case ALL_PAGES_REQUEST:
        case ADMIN_PAGES_REQUEST:
            return {
                loading: true,
                pages: []
            }        
        case ALL_PAGES_SUCCESS:
            return {
                loading: false,
                pages: action.payload.pages,
                pagesCount: action.payload.pagesCount,
            }   
        case ADMIN_PAGES_SUCCESS:
            return {
                loading: false,
                pages: action.payload
            }
        case ALL_PAGES_FAIL:
        case ADMIN_PAGES_FAIL:
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

export const newPageReducer = ( state = { page: {} }, action ) => {
    switch (action.type) {

        case NEW_PAGE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PAGE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page
            }
        case NEW_PAGE_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case NEW_PAGE_RESET:
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

export const pageReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_IMAGE_REQUEST:
        case UPDATE_IMAGE_REQUEST:
        case DELETE_PAGE_REQUEST:
        case UPDATE_PAGE_REQUEST:
            return {
                ...state,
                loading: true
            } 
        case DELETE_IMAGE_SUCCESS:    
        case DELETE_PAGE_SUCCESS:        
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            } 
        case UPDATE_IMAGE_SUCCESS:  
        case UPDATE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_IMAGE_FAIL:
        case UPDATE_IMAGE_FAIL:                
        case DELETE_PAGE_FAIL:
        case UPDATE_PAGE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case DELETE_IMAGE_RESET:        
        case DELETE_PAGE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_IMAGE_RESET:
        case UPDATE_PAGE_RESET:
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

export const pageDetailsReducer = ( state = { page: {} }, action ) => {
    switch (action.type) {

        case PAGE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PAGE_DETAILS_SUCCESS:
            return {
                loading: false,
                page: action.payload
            }
        case PAGE_DETAILS_FAIL:
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

export const adminPageDetailsReducer = ( state = { page: {} }, action ) => {
    switch (action.type) {

        case ADMIN_PAGE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_PAGE_DETAILS_SUCCESS:
            return {
                loading: false,
                page: action.payload
            }
        case ADMIN_PAGE_DETAILS_FAIL:
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