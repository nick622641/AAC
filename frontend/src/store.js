import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, latestProductReducer, randomProductReducer, randomProductsReducer, randomProductsDetailsReducer, productDetailsReducer, adminProductDetailsReducer, newReviewReducer, newProductReducer, newProductUserReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { blogsReducer, blogDetailsReducer, adminBlogDetailsReducer, newBlogReducer, blogReducer, newCommentReducer, blogCommentsReducer, commentReducer } from './reducers/blogReducers'
import { paintersReducer, painterDetailsReducer, adminPainterDetailsReducer, newPainterReducer, painterReducer } from './reducers/painterReducers'
import { pagesReducer, pageDetailsReducer, adminPageDetailsReducer, newPageReducer, pageReducer } from './reducers/pageReducers'
import { mediaReducer, newMediaReducer, mediumReducer, mediaDetailsReducer, orientationsReducer, orientationDetailsReducer, orientationReducer, newOrientationReducer, artistsReducer, newArtistReducer, artistReducer, artistDetailsReducer } from './reducers/categoryReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersdReducer, userDetailsReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'
import { staffMembersReducer, staffDetailsReducer, adminStaffDetailsReducer, newStaffReducer, staffReducer } from './reducers/staffReducers'
import { friendsReducer, friendDetailsReducer, adminFriendDetailsReducer, newFriendReducer, friendReducer } from './reducers/friendReducers'

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

    randomProducts: randomProductsReducer,    
    randomProductsDetails: randomProductsDetailsReducer,    
    products: productsReducer,    
    productDetails: productDetailsReducer,
    adminProductDetails: adminProductDetailsReducer,    
    newProduct: newProductReducer,
    newProductUser: newProductUserReducer,
    product: productReducer,
    randomProduct: randomProductReducer,
    latestProduct: latestProductReducer,

    blogs: blogsReducer,    
    blogDetails: blogDetailsReducer,
    adminBlogDetails: adminBlogDetailsReducer,
    newBlog: newBlogReducer,
    blog: blogReducer,

    blogComments: blogCommentsReducer,
    comment: commentReducer,
    newComment: newCommentReducer,

    painters: paintersReducer,    
    painterDetails: painterDetailsReducer,
    adminPainterDetails: adminPainterDetailsReducer,
    newPainter: newPainterReducer,
    painter: painterReducer,

    staffMembers: staffMembersReducer,    
    staffDetails: staffDetailsReducer,
    adminStaffDetails: adminStaffDetailsReducer,
    newStaff: newStaffReducer,
    staff: staffReducer,

    friends: friendsReducer,    
    friendDetails: friendDetailsReducer,
    adminFriendDetails: adminFriendDetailsReducer,
    newFriend: newFriendReducer,
    friend: friendReducer,

    pages: pagesReducer,    
    pageDetails: pageDetailsReducer,
    adminPageDetails: adminPageDetailsReducer,
    newPage: newPageReducer,
    page: pageReducer,

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