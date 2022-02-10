import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { blogsReducer, blogDetailsReducer, newBlogReducer, blogReducer, newCommentReducer, blogCommentsReducer, commentReducer } from './reducers/blogReducers'
import { mediaReducer, newMediaReducer, mediumReducer, mediaDetailsReducer, orientationsReducer, orientationDetailsReducer, orientationReducer, newOrientationReducer, artistsReducer, newArtistReducer, artistReducer, artistDetailsReducer } from './reducers/categoryReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersdReducer, userDetailsReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    artists: artistsReducer,
    newArtist: newArtistReducer,
    artist: artistReducer,
    artistDetails: artistDetailsReducer,
    media: mediaReducer,
    newMedia: newMediaReducer,
    medium: mediumReducer,
    mediaDetails: mediaDetailsReducer,
    orientations: orientationsReducer,
    newOrientation: newOrientationReducer,
    orientation: orientationReducer,
    orientationDetails: orientationDetailsReducer,

    products: productsReducer,    
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,

    blogs: blogsReducer,    
    blogDetails: blogDetailsReducer,
    newBlog: newBlogReducer,
    blog: blogReducer,
    blogComments: blogCommentsReducer,
    comment: commentReducer,
    newComment: newCommentReducer,

    productReviews: productReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersdReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newReview: newReviewReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo') 
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store