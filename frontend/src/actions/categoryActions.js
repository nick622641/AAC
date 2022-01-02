import axios from 'axios'
import { 
    ALL_MEDIA_REQUEST,
    ALL_MEDIA_SUCCESS,
    ALL_MEDIA_FAIL,
    MEDIA_DETAILS_REQUEST,
    MEDIA_DETAILS_SUCCESS,
    MEDIA_DETAILS_FAIL,    
    NEW_MEDIA_REQUEST,
    NEW_MEDIA_SUCCESS,
    NEW_MEDIA_FAIL,
    DELETE_MEDIA_REQUEST,
    DELETE_MEDIA_SUCCESS,
    DELETE_MEDIA_FAIL,
    UPDATE_MEDIA_REQUEST,
    UPDATE_MEDIA_SUCCESS,
    UPDATE_MEDIA_FAIL,
    ALL_ORIENTATION_REQUEST,
    ALL_ORIENTATION_SUCCESS,
    ALL_ORIENTATION_FAIL,
    ORIENTATION_DETAILS_REQUEST,
    ORIENTATION_DETAILS_SUCCESS,
    ORIENTATION_DETAILS_FAIL,    
    NEW_ORIENTATION_REQUEST,
    NEW_ORIENTATION_SUCCESS,
    NEW_ORIENTATION_FAIL,
    DELETE_ORIENTATION_REQUEST,
    DELETE_ORIENTATION_SUCCESS,
    DELETE_ORIENTATION_FAIL,
    UPDATE_ORIENTATION_REQUEST,
    UPDATE_ORIENTATION_SUCCESS,
    UPDATE_ORIENTATION_FAIL,
    ALL_ARTISTS_REQUEST,
    ALL_ARTISTS_SUCCESS,
    ALL_ARTISTS_FAIL,
    ARTIST_DETAILS_REQUEST,
    ARTIST_DETAILS_SUCCESS,
    ARTIST_DETAILS_FAIL,
    NEW_ARTIST_REQUEST,
    NEW_ARTIST_SUCCESS,
    NEW_ARTIST_FAIL,
    DELETE_ARTIST_REQUEST,
    DELETE_ARTIST_SUCCESS,
    DELETE_ARTIST_FAIL,
    UPDATE_ARTIST_REQUEST,
    UPDATE_ARTIST_SUCCESS,
    UPDATE_ARTIST_FAIL,
    CLEAR_ERRORS
} from '../constants/categoryConstants'

export const getMedia = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_MEDIA_REQUEST })    
        const { data } = await axios.get('/api/v1/admin/mediums')
        dispatch({
            type: ALL_MEDIA_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_MEDIA_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Media Details
export const getMediaDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MEDIA_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/medium/${id}`)
        dispatch({
            type: MEDIA_DETAILS_SUCCESS,
            payload: data.medium
        })        
    } catch (error) {
        dispatch({
            type: MEDIA_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Media (Admin)
export const newMedia = (mediaData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_MEDIA_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/medium/new', mediaData )
        dispatch({
            type: NEW_MEDIA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_MEDIA_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Media (Admin)
export const updateMedia = (id, mediaData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_MEDIA_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/medium/${id}`, mediaData )
        dispatch({
            type: UPDATE_MEDIA_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_MEDIA_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Media (Admin)
export const deleteMedia = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_MEDIA_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/medium/${id}` )
        dispatch({
            type: DELETE_MEDIA_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_MEDIA_FAIL,
            payload: error.response.data.message
        })
    }

}
// Get Orientations
export const getOrientations = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORIENTATION_REQUEST })    
        const { data } = await axios.get('/api/v1/admin/orientations')
        dispatch({
            type: ALL_ORIENTATION_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_ORIENTATION_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Orientation Details
export const getOrientationDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORIENTATION_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/orientation/${id}`)
        dispatch({
            type: ORIENTATION_DETAILS_SUCCESS,
            payload: data.orientation
        })        
    } catch (error) {
        dispatch({
            type: ORIENTATION_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Orientation (Admin)
export const newOrientation = (orientationData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_ORIENTATION_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/orientation/new', orientationData )
        dispatch({
            type: NEW_ORIENTATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_ORIENTATION_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Orientation (Admin)
export const updateOrientation = (id, orientationData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_ORIENTATION_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/orientation/${id}`, orientationData )
        dispatch({
            type: UPDATE_ORIENTATION_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORIENTATION_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Orientation (Admin)
export const deleteOrientation = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_ORIENTATION_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/orientation/${id}` )
        dispatch({
            type: DELETE_ORIENTATION_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORIENTATION_FAIL,
            payload: error.response.data.message
        })
    }

}
// Get all Artists
export const getArtists = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ARTISTS_REQUEST })    
        const { data } = await axios.get('/api/v1/admin/artists')
        dispatch({
            type: ALL_ARTISTS_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_ARTISTS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Artist Details
export const getArtistDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ARTIST_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/artist/${id}`)
        dispatch({
            type: ARTIST_DETAILS_SUCCESS,
            payload: data.artist
        })        
    } catch (error) {
        dispatch({
            type: ARTIST_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Artist (Admin)
export const newArtist = (artistData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_ARTIST_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/artist/new', artistData )
        dispatch({
            type: NEW_ARTIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_ARTIST_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Artist (Admin)
export const updateArtist = (id, artistData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_ARTIST_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/artist/${id}`, artistData )
        dispatch({
            type: UPDATE_ARTIST_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ARTIST_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Artist (Admin)
export const deleteArtist = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_ARTIST_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/artist/${id}` )
        dispatch({
            type: DELETE_ARTIST_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ARTIST_FAIL,
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