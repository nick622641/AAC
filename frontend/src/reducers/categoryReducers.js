import { 
    ALL_MEDIA_REQUEST,
    ALL_MEDIA_SUCCESS,
    ALL_MEDIA_FAIL,
    MEDIA_DETAILS_REQUEST,
    MEDIA_DETAILS_SUCCESS,
    MEDIA_DETAILS_FAIL,    
    NEW_MEDIA_REQUEST,
    NEW_MEDIA_SUCCESS,
    NEW_MEDIA_RESET,
    NEW_MEDIA_FAIL,
    DELETE_MEDIA_REQUEST,
    DELETE_MEDIA_SUCCESS,
    DELETE_MEDIA_RESET,
    DELETE_MEDIA_FAIL,
    UPDATE_MEDIA_REQUEST,
    UPDATE_MEDIA_SUCCESS,
    UPDATE_MEDIA_RESET,
    UPDATE_MEDIA_FAIL,
    ALL_ORIENTATION_REQUEST,
    ALL_ORIENTATION_SUCCESS,
    ALL_ORIENTATION_FAIL,
    ORIENTATION_DETAILS_REQUEST,
    ORIENTATION_DETAILS_SUCCESS,
    ORIENTATION_DETAILS_FAIL,    
    NEW_ORIENTATION_REQUEST,
    NEW_ORIENTATION_SUCCESS,
    NEW_ORIENTATION_RESET,
    NEW_ORIENTATION_FAIL,
    DELETE_ORIENTATION_REQUEST,
    DELETE_ORIENTATION_SUCCESS,
    DELETE_ORIENTATION_RESET,
    DELETE_ORIENTATION_FAIL,
    UPDATE_ORIENTATION_REQUEST,
    UPDATE_ORIENTATION_SUCCESS,
    UPDATE_ORIENTATION_RESET,
    UPDATE_ORIENTATION_FAIL,
    ALL_ARTISTS_REQUEST,
    ALL_ARTISTS_SUCCESS,
    ALL_ARTISTS_FAIL,
    ARTIST_DETAILS_REQUEST,
    ARTIST_DETAILS_SUCCESS,
    ARTIST_DETAILS_FAIL,    
    NEW_ARTIST_REQUEST,
    NEW_ARTIST_SUCCESS,
    NEW_ARTIST_RESET,
    NEW_ARTIST_FAIL,
    DELETE_ARTIST_REQUEST,
    DELETE_ARTIST_SUCCESS,
    DELETE_ARTIST_RESET,
    DELETE_ARTIST_FAIL,
    UPDATE_ARTIST_REQUEST,
    UPDATE_ARTIST_SUCCESS,
    UPDATE_ARTIST_RESET,
    UPDATE_ARTIST_FAIL,   
    CLEAR_ERRORS
} from '../constants/categoryConstants'

export const mediaReducer = ( state = { media: [] }, action ) => {
    switch(action.type) {

        case ALL_MEDIA_REQUEST:
            return {
                loading: true,
                media: []
            }
        
        case ALL_MEDIA_SUCCESS:
            return {
                loading: false,
                media: action.payload.media               
            }
                
        case ALL_MEDIA_FAIL:
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
export const mediaDetailsReducer = (state = { medium: {} }, action) => {
    switch(action.type) {
        case MEDIA_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case MEDIA_DETAILS_SUCCESS:
            return {
                loading: false,
                medium: action.payload               
            }                
        case MEDIA_DETAILS_FAIL:
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

export const newMediaReducer = ( state = { media: {} }, action ) => {

    switch(action.type) {
        case NEW_MEDIA_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_MEDIA_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                media: action.payload.media               
            }                
        case NEW_MEDIA_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_MEDIA_RESET:
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

export const mediumReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_MEDIA_REQUEST:
        case DELETE_MEDIA_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_MEDIA_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_MEDIA_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_MEDIA_FAIL:
        case DELETE_MEDIA_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_MEDIA_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_MEDIA_RESET:
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

export const orientationsReducer = ( state = { orientations: [] }, action ) => {
    switch(action.type) {

        case ALL_ORIENTATION_REQUEST:
            return {
                loading: true,
                orientations: []
            }
        
        case ALL_ORIENTATION_SUCCESS:
            return {
                loading: false,
                orientations: action.payload.orientations               
            }
                
        case ALL_ORIENTATION_FAIL:
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
export const orientationDetailsReducer = (state = { orientation: {} }, action) => {
    switch(action.type) {
        case ORIENTATION_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case ORIENTATION_DETAILS_SUCCESS:
            return {
                loading: false,
                orientation: action.payload               
            }                
        case ORIENTATION_DETAILS_FAIL:
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

export const newOrientationReducer = ( state = { artist: {} }, action ) => {

    switch(action.type) {
        case NEW_ORIENTATION_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_ORIENTATION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                orientation: action.payload.artist               
            }                
        case NEW_ORIENTATION_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_ORIENTATION_RESET:
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

export const orientationReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_ORIENTATION_REQUEST:
        case DELETE_ORIENTATION_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_ORIENTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_ORIENTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_ORIENTATION_FAIL:
        case DELETE_ORIENTATION_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_ORIENTATION_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_ORIENTATION_RESET:
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

export const artistsReducer = ( state = { artists: [] }, action ) => {

    switch(action.type) {
        case ALL_ARTISTS_REQUEST:
            return {                
                loading: true,
                artists: []
            }        
        case ALL_ARTISTS_SUCCESS:
            return {
                loading: false,
                artists: action.payload.artists               
            }                
        case ALL_ARTISTS_FAIL:
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
export const artistDetailsReducer = (state = { artist: {} }, action) => {
    switch(action.type) {
        case ARTIST_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case ARTIST_DETAILS_SUCCESS:
            return {
                loading: false,
                artist: action.payload               
            }                
        case ARTIST_DETAILS_FAIL:
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
export const newArtistReducer = ( state = { artist: {} }, action ) => {

    switch(action.type) {
        case NEW_ARTIST_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_ARTIST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                artist: action.payload.artist               
            }                
        case NEW_ARTIST_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_ARTIST_RESET:
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
export const artistReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_ARTIST_REQUEST:
        case DELETE_ARTIST_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_ARTIST_FAIL:
        case DELETE_ARTIST_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_ARTIST_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_ARTIST_RESET:
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