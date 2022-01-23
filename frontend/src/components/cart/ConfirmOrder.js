import React, { Fragment } from 'react'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FormattedPrice from '../layouts/FormattedPrice'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'

const ConfirmOrder = () => {

    const navigate = useNavigate()
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const proceedToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    return (

        <Fragment>

            <MetaData title={'Confirm Order'} />

            <div className="container">            

                <div className="wrapper">                                  

                    <div className="user-form"> 

                        <CheckoutSteps shipping confirmOrder /> 

                        <table className="middle-align bordered-table">
                        <tbody>                               

                        <tr className="bg-grey">
                            <td><h6>Item</h6></td>
                            <td><h6>Title</h6></td>
                            <td><h6>Price</h6></td>
                            <td><h6>Sub total</h6></td>
                        </tr>
                            
                        {cartItems.map(item => (
                            <tr key={item.product}>
                                <td>
                                    <Link to={`/artwork/${item.product}`}>
                                        <Avatar
                                            src={item.image} 
                                            alt={item.name} 
                                            sx={{ width: 50, height: 50 }}
                                        />                                 
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/artwork/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </td>                                
                                <td>                                    
                                    {item.quantity}
                                    &nbsp;x&nbsp;
                                    <FormattedPrice number={item.price} />                                    
                                </td>
                                <td>
                                    <FormattedPrice number={(item.quantity * item.price)} />                                                                          
                                </td>                                     
                            </tr>
                        ))}                           

                        </tbody>
                        </table>          

                        <h4>Shipping Details</h4>                   

                        <table className="bordered-table">
                        <tbody>                            
                            <tr>
                                <th><h6>Name</h6></th>
                                <td>{user && user.name}</td>
                            </tr>
                            <tr>
                                <th><h6>Phone</h6></th>
                                <td>{shippingInfo.phoneNo}</td>
                            </tr>
                            <tr>
                                <th><h6>Address</h6></th>
                                <td>
                                {shippingInfo.address}
                                <br />
                                {shippingInfo.city}
                                <br />
                                {shippingInfo.postalCode.toUpperCase()}
                                <br />
                                {shippingInfo.country}
                                </td>
                            </tr>   
                            <tr>
                                <td colSpan="2" className="spacer-cell">
                                    <h4>Order Summary</h4>
                                </td>                                
                            </tr>
                            <tr>
                                <th>
                                    <h6>Subtotal</h6>
                                </th>
                                <td>
                                    <FormattedPrice number={itemsPrice} /> 
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Shipping</h6>
                                </th>
                                <td>
                                    <FormattedPrice number={shippingPrice} /> 
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Tax</h6>
                                </th>
                                <td>
                                    <FormattedPrice number={taxPrice} /> 
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Total</h6>
                                </th>
                                <td>
                                    <FormattedPrice number={totalPrice} /> 
                                </td>
                            </tr>
                        </tbody>
                        </table>

                        <br />

                        <button className="submit" onClick={proceedToPayment}>Proceed to Payment</button>   

                        <Link to="/shipping">                              
                            <Fab size="small" className="close">
                                <CloseIcon />
                            </Fab>
                        </Link>  

                    </div>              
                    
                </div>

            </div>

        </Fragment>

    )
    
}

export default ConfirmOrder
