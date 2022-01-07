import React, { Fragment } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = () => {    
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector( state => state.cart )
    const { isAuthenticated } = useSelector( state => state.auth )


    let totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    totalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1
        if(newQty > stock) { return }
        dispatch(addItemToCart(id, newQty))
    }
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1
        if(newQty <= 0) { return }
        dispatch(addItemToCart(id, newQty))
    }
    const checkoutHandler = () => {    
        const link = isAuthenticated ? '/shipping' : '/login?redirect=shipping'    
        navigate(link)
    }

    return (

        <Fragment>

            <MetaData title={'Your Cart'} />

            <div className="container">

                <div className="wrapper stage">

                    <div className="user-form">

                    {cartItems.length === 0 ? <h2>Your Cart is Empty</h2> : (

                        <Fragment>
                            
                            <h1>Your Cart <small><b>({cartItems.length} items)</b></small></h1> 

                            <table className="middle-align bordered-table">
                            <tbody>
                                <tr className="bg-grey">
                                    <td><h6>Item</h6></td>
                                    <td><h6>Title</h6></td>
                                    <td><h6>Price</h6></td>                                    
                                    <td><h6>Quantity</h6></td>                                    
                                    <th><i className="fa fa-ban"/></th>
                                </tr>
                                {cartItems.map(item => (
                                    <tr key={item.product}>
                                        <td>
                                            <Link to={`/artwork/${item.product}`}>
                                                <div className="cart-image">
                                                    <img src={item.image} alt={item.name} className="centered-image" />
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/artwork/${item.product}`}>{item.name}</Link>
                                        </td>
                                        <td className="whitespace-nowrap">
                                            ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} CAD
                                        </td>
                                        <td className="stockcounter">
                                            <span 
                                                className={item.quantity === 1 ? 'inactive minus' : 'minus'}
                                                onClick={() => decreaseQty(item.product, item.quantity)}
                                            >
                                                <i className="fa fa-minus-circle"/>
                                            </span>

                                            <input                                                
                                                value={item.quantity} 
                                                readOnly 
                                            />

                                            <span 
                                                className={item.quantity === item.stock ? 'inactive plus' : 'plus'} 
                                                onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                                            >
                                                <i className="fa fa-plus-circle" />
                                            </span> 
                                        </td>
                                        <th>                                  
                                            <i className="fa fa-trash-o" onClick={() => removeCartItemHandler(item.product)}/>
                                        </th>                                        
                                    </tr>
                                ))}    
                            </tbody>
                            </table>

                            <h4>Order Summary</h4>
                            
                            <table>
                            <tbody>
                                <tr>
                                    <th><h6>Items</h6></th>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                        {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)
                                    </td>
                                </tr>
                                <tr>
                                    <th><h6>Total</h6></th>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                        <b style={{ color: "var(--primary-color)" }}>
                                            ${totalPrice} CAD
                                        </b>                                                
                                    </td>
                                </tr>
                            </tbody>
                            </table>                                
                            <br />
                            <button className="submit" onClick={checkoutHandler}>
                                Check Out
                            </button>

                            <button onClick={() => navigate(-1)}><i className="fa fa-times"/></button>

                        </Fragment>

                    )}

                    </div>

                </div>

            </div>

        </Fragment>

    )

}

export default Cart
