import { 
    ADMIN_FRIENDS_REQUEST,
    ADMIN_FRIENDS_SUCCESS,
    ADMIN_FRIENDS_FAIL,
    NEW_FRIEND_REQUEST,
    NEW_FRIEND_RESET,
    NEW_FRIEND_SUCCESS,
    NEW_FRIEND_FAIL,
    UPDATE_FRIEND_REQUEST,
    UPDATE_FRIEND_SUCCESS,
    UPDATE_FRIEND_RESET,
    UPDATE_FRIEND_FAIL,
    DELETE_FRIEND_REQUEST,
    DELETE_FRIEND_SUCCESS,
    DELETE_FRIEND_RESET,
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

export const friendsReducer = ( state = { friends: [] }, action ) => {
    switch(action.type) {

        case ALL_FRIENDS_REQUEST:
        case ADMIN_FRIENDS_REQUEST:
            return {
                loading: true,
                friends: []
            }        
        case ALL_FRIENDS_SUCCESS:
            return {
                loading: false,
                friends: action.payload.friends,
                friendCount: action.payload.friendCount,
                resPerPage: action.payload.resPerPage,
            }   
        case ADMIN_FRIENDS_SUCCESS:
            return {
                loading: false,
                friends: action.payload
            }
        case ALL_FRIENDS_FAIL:
        case ADMIN_FRIENDS_FAIL:
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

export const newFriendReducer = ( state = { friend: {} }, action ) => {
    switch (action.type) {

        case NEW_FRIEND_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_FRIEND_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                friend: action.payload.friend
            }
        case NEW_FRIEND_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case NEW_FRIEND_RESET:
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

export const friendReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_FRIEND_REQUEST:
        case UPDATE_FRIEND_REQUEST:
            return {
                ...state,
                loading: true
            } 
        case DELETE_FRIEND_SUCCESS:        
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            } 
        case UPDATE_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_FRIEND_FAIL:
        case UPDATE_FRIEND_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case DELETE_FRIEND_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_FRIEND_RESET:
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

export const friendDetailsReducer = ( state = { friend: {} }, action ) => {
    switch (action.type) {

        case FRIEND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FRIEND_DETAILS_SUCCESS:
            return {
                loading: false,
                friend: action.payload
            }
        case FRIEND_DETAILS_FAIL:
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

export const adminFriendDetailsReducer = ( state = { friend: {} }, action ) => {
    switch (action.type) {

        case ADMIN_FRIEND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_FRIEND_DETAILS_SUCCESS:
            return {
                loading: false,
                friend: action.payload
            }
        case ADMIN_FRIEND_DETAILS_FAIL:
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