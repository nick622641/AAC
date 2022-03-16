import { 
    ADMIN_STAFF_REQUEST,
    ADMIN_STAFF_SUCCESS,
    ADMIN_STAFF_FAIL,
    NEW_STAFF_REQUEST,
    NEW_STAFF_RESET,
    NEW_STAFF_SUCCESS,
    NEW_STAFF_FAIL,
    UPDATE_STAFF_REQUEST,
    UPDATE_STAFF_SUCCESS,
    UPDATE_STAFF_RESET,
    UPDATE_STAFF_FAIL,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_RESET,
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
    DELETE_IMAGE_RESET,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_RESET,
    UPDATE_IMAGE_FAIL, 
    CLEAR_ERRORS 
} from '../constants/staffConstants'

export const staffMembersReducer = ( state = { staffMembers: [] }, action ) => {
    switch(action.type) {

        case ALL_STAFF_REQUEST:
        case ADMIN_STAFF_REQUEST:
            return {
                loading: true,
                staffMembers: []
            }        
        case ALL_STAFF_SUCCESS:
            return {
                loading: false,
                staffMembers: action.payload.staff,
                staffCount: action.payload.staffCount,
                resPerPage: action.payload.resPerPage,
            }   
        case ADMIN_STAFF_SUCCESS:
            return {
                loading: false,
                staffMembers: action.payload
            }
        case ALL_STAFF_FAIL:
        case ADMIN_STAFF_FAIL:
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

export const newStaffReducer = ( state = { staffMember: {} }, action ) => {
    switch (action.type) {

        case NEW_STAFF_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_STAFF_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                staffMember: action.payload.staff
            }
        case NEW_STAFF_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case NEW_STAFF_RESET:
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

export const staffReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_IMAGE_REQUEST:
        case UPDATE_IMAGE_REQUEST:
        case DELETE_STAFF_REQUEST:
        case UPDATE_STAFF_REQUEST:
            return {
                ...state,
                loading: true
            } 
        case DELETE_IMAGE_SUCCESS:    
        case DELETE_STAFF_SUCCESS:        
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            } 
        case UPDATE_IMAGE_SUCCESS:  
        case UPDATE_STAFF_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_IMAGE_FAIL:
        case UPDATE_IMAGE_FAIL:                
        case DELETE_STAFF_FAIL:
        case UPDATE_STAFF_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case DELETE_IMAGE_RESET:        
        case DELETE_STAFF_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_IMAGE_RESET:
        case UPDATE_STAFF_RESET:
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

export const staffDetailsReducer = ( state = { staffMember: {} }, action ) => {
    switch (action.type) {

        case STAFF_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case STAFF_DETAILS_SUCCESS:
            return {
                loading: false,
                staffMember: action.payload
            }
        case STAFF_DETAILS_FAIL:
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

export const adminStaffDetailsReducer = ( state = { staffMember: {} }, action ) => {
    switch (action.type) {

        case ADMIN_STAFF_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_STAFF_DETAILS_SUCCESS:
            return {
                loading: false,
                staffMember: action.payload
            }
        case ADMIN_STAFF_DETAILS_FAIL:
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