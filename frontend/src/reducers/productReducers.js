import { 
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    CALLOUT_PRODUCTS_REQUEST, 
    CALLOUT_PRODUCTS_SUCCESS, 
    CALLOUT_PRODUCTS_FAIL, 
    RANDOM_PRODUCTS_REQUEST, 
    RANDOM_PRODUCTS_SUCCESS, 
    RANDOM_PRODUCTS_FAIL,
    RANDOM_PRODUCTS_DETAILS_REQUEST, 
    RANDOM_PRODUCTS_DETAILS_SUCCESS, 
    RANDOM_PRODUCTS_DETAILS_FAIL,
    SINGLE_RANDOM_PRODUCT_REQUEST,
    SINGLE_RANDOM_PRODUCT_SUCCESS,
    SINGLE_RANDOM_PRODUCT_FAIL,
    LATEST_PRODUCT_DETAILS_REQUEST,
    LATEST_PRODUCT_DETAILS_SUCCESS,
    LATEST_PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    ADMIN_PRODUCT_DETAILS_REQUEST,
    ADMIN_PRODUCT_DETAILS_SUCCESS,
    ADMIN_PRODUCT_DETAILS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_RESET,
    DELETE_IMAGE_FAIL,
    UPDATE_IMAGE_REQUEST,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_RESET,
    UPDATE_IMAGE_FAIL,
    CLEAR_ERRORS 
} from '../constants/productConstants'

export const productsReducer = ( state = { products: [], calloutProducts: [] }, action ) => {
    switch(action.type) {

        case ALL_PRODUCTS_REQUEST:
        case CALLOUT_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
                calloutProducts: []
            }
        
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case CALLOUT_PRODUCTS_SUCCESS:            
            return {
                loading: false,
                calloutProducts: action.payload                 
            }       
        
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                productsCount: action.payload.productsCount,
                products: action.payload.products
            }

        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
        case CALLOUT_PRODUCTS_FAIL:
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

export const randomProductsReducer = ( state = { randomProducts: [] }, action ) => {
    switch(action.type) {

        case RANDOM_PRODUCTS_REQUEST:
            return {
                loading: true,
                randomProducts: []
            }  

        case RANDOM_PRODUCTS_SUCCESS:
            return {
                loading: false,
                randomProducts: action.payload                 
            }   
       
        case RANDOM_PRODUCTS_FAIL:
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

export const randomProductsDetailsReducer = ( state = { randomProductsDetails: [] }, action ) => {
    switch(action.type) {

        case RANDOM_PRODUCTS_DETAILS_REQUEST:
            return {
                loading: true,
                randomProductsDetails: []               
            }  

        case RANDOM_PRODUCTS_DETAILS_SUCCESS:
            return {
                loading: false,
                randomProductsDetails: action.payload                 
            }   
       
        case RANDOM_PRODUCTS_DETAILS_FAIL:
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

export const latestProductReducer = ( state = { latestProduct: [] }, action ) => {
    
    switch (action.type) {

        case LATEST_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LATEST_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                latestProduct: action.payload
            }
        case LATEST_PRODUCT_DETAILS_FAIL:
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

export const newProductReducer = ( state = { product: {} }, action ) => {
    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case NEW_PRODUCT_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case NEW_PRODUCT_RESET:
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
            return state;
    }
}

export const productReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_IMAGE_REQUEST:
        case UPDATE_IMAGE_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }   
        case DELETE_IMAGE_SUCCESS:     
        case DELETE_PRODUCT_SUCCESS:        
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }   
        case UPDATE_PRODUCT_SUCCESS:
        case UPDATE_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }     
        
        case DELETE_PRODUCT_FAIL:
        case DELETE_IMAGE_FAIL:
        case UPDATE_IMAGE_FAIL:
        case UPDATE_PRODUCT_FAIL:
                return {
                    ...state,
                    error: action.payload
                }
        case DELETE_PRODUCT_RESET:
        case DELETE_IMAGE_RESET:
        case UPDATE_IMAGE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PRODUCT_RESET:
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
            return state;
    }
}

export const productDetailsReducer = ( state = { product: {} }, action ) => {
    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
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
            return state;
    }
}

export const randomProductReducer = ( state = { randomProduct: {} }, action ) => {
    switch (action.type) {

        case SINGLE_RANDOM_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SINGLE_RANDOM_PRODUCT_SUCCESS:
            return {
                loading: false,
                randomProduct: action.payload
            }
        case SINGLE_RANDOM_PRODUCT_FAIL:
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
            return state;
    }
}

export const adminProductDetailsReducer = ( state = { product: {} }, action ) => {
    switch (action.type) {

        case ADMIN_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case ADMIN_PRODUCT_DETAILS_FAIL:
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

export const newReviewReducer = ( state = {}, action ) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            } 

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case NEW_REVIEW_FAIL:
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
            return state;
    }
}

export const productReviewsReducer = ( state = { reviews: [] }, action ) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }        
        
        case GET_REVIEWS_FAIL:
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
            return state;
    }
}

export const reviewReducer = ( state = {}, action ) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            } 
        
        case DELETE_REVIEW_FAIL:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                }
        case DELETE_REVIEW_RESET:
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
            return state;
    }
}

