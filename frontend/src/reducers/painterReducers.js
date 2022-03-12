import { 
    ADMIN_PAINTERS_REQUEST,
    ADMIN_PAINTERS_SUCCESS,
    ADMIN_PAINTERS_FAIL,
    NEW_PAINTER_REQUEST,
    NEW_PAINTER_RESET,
    NEW_PAINTER_SUCCESS,
    NEW_PAINTER_FAIL,
    UPDATE_PAINTER_REQUEST,
    UPDATE_PAINTER_SUCCESS,
    UPDATE_PAINTER_RESET,
    UPDATE_PAINTER_FAIL,
    DELETE_PAINTER_REQUEST,
    DELETE_PAINTER_SUCCESS,
    DELETE_PAINTER_RESET,
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
    DELETE_IMAGE_RESET,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_RESET,
    UPDATE_IMAGE_FAIL, 
    CLEAR_ERRORS 
} from '../constants/painterConstants'

export const paintersReducer = ( state = { painters: [] }, action ) => {
    switch(action.type) {

        case ALL_PAINTERS_REQUEST:
        case ADMIN_PAINTERS_REQUEST:
            return {
                loading: true,
                painters: []
            }        
        case ALL_PAINTERS_SUCCESS:
            return {
                loading: false,
                painters: action.payload.painters,
                paintersCount: action.payload.paintersCount,
                resPerPage: action.payload.resPerPage,
            }   
        case ADMIN_PAINTERS_SUCCESS:
            return {
                loading: false,
                painters: action.payload
            }
        case ALL_PAINTERS_FAIL:
        case ADMIN_PAINTERS_FAIL:
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

export const newPainterReducer = ( state = { painter: {} }, action ) => {
    switch (action.type) {

        case NEW_PAINTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PAINTER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                painter: action.payload.painter
            }
        case NEW_PAINTER_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case NEW_PAINTER_RESET:
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

export const painterReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_IMAGE_REQUEST:
        case UPDATE_IMAGE_REQUEST:
        case DELETE_PAINTER_REQUEST:
        case UPDATE_PAINTER_REQUEST:
            return {
                ...state,
                loading: true
            } 
        case DELETE_IMAGE_SUCCESS:    
        case DELETE_PAINTER_SUCCESS:        
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            } 
        case UPDATE_IMAGE_SUCCESS:  
        case UPDATE_PAINTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_IMAGE_FAIL:
        case UPDATE_IMAGE_FAIL:                
        case DELETE_PAINTER_FAIL:
        case UPDATE_PAINTER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case DELETE_IMAGE_RESET:        
        case DELETE_PAINTER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_IMAGE_RESET:
        case UPDATE_PAINTER_RESET:
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

export const painterDetailsReducer = ( state = { painter: {} }, action ) => {
    switch (action.type) {

        case PAINTER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PAINTER_DETAILS_SUCCESS:
            return {
                loading: false,
                painter: action.payload
            }
        case PAINTER_DETAILS_FAIL:
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

export const adminPainterDetailsReducer = ( state = { painter: {} }, action ) => {
    switch (action.type) {

        case ADMIN_PAINTER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_PAINTER_DETAILS_SUCCESS:
            return {
                loading: false,
                painter: action.payload
            }
        case ADMIN_PAINTER_DETAILS_FAIL:
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