import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO, REMOVE_ALL_CART } from "../constants/cartConstants"

export const addItemToCart = (slug, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${slug}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            slug: data.product.slug,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {    

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const emptyCart = (cartItems) => async (dispatch, getState) => {    

    dispatch({ type: REMOVE_ALL_CART })

    localStorage.removeItem('cartItems')
}

export const saveShippingInfo = (data) => async (dispatch) => {    

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}