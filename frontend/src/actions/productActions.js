import axios from 'axios';
import { 
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    RELATED_PRODUCTS_REQUEST, 
    RELATED_PRODUCTS_SUCCESS, 
    RELATED_PRODUCTS_FAIL, 
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS 
} from '../constants/productConstants'

export const getProducts = ( keyword = '', currentPage = 1, price, artist = '', orientation = '', medium = '', rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `/api/v1/products?page=${currentPage}&keyword=${keyword}`
     
        if( artist ) {    
            link = `/api/v1/products?page=${currentPage}&artist=${artist}`
        }   
        if( orientation ) {    
            link = `/api/v1/products?page=${currentPage}&orientation=${orientation}`
        } 
        if( medium ) {    
            link = `/api/v1/products?page=${currentPage}&media=${medium}`
        }
        if( rating ) {    
            link = `/api/v1/products?page=${currentPage}&ratings[gte]=${rating}`
        }
        if( price[0] > 1 || price[1] < 10000 ) {    
            link = `/api/v1/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get related products limit 3
export const getRelatedProducts = (artist = '') => async (dispatch) => {
    try {

        dispatch({ type: RELATED_PRODUCTS_REQUEST })

        let link = '/api/v1/products/related'

        if( artist ) {    
            link = `/api/v1/products/related?artist=${artist}`
        } 

        const { data } = await axios.get(link)

        dispatch({
            type: RELATED_PRODUCTS_SUCCESS,
            payload: data.relatedProducts
        })
        
    } catch (error) {

        dispatch({
            type: RELATED_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get products - (Admin)
export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/products')

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
        
    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Single Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}
// New Product (Admin)
export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/product/new', productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Product (Admin)
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })      

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}
// Add new review
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/review', reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get product reviews - (Admin)
export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({
            type: GET_REVIEWS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })
        
    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete product review - (Admin)
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({
            type: DELETE_REVIEW_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {

        dispatch({
            type: DELETE_REVIEW_FAIL,
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