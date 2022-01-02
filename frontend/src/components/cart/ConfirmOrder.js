import React, { Fragment } from 'react'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

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

            <CheckoutSteps shipping confirmOrder />

            <div className="wrapper">                

                <div className="user-form cart">

                    <h2>Confirm Order</h2>

                    <table>
                        <tbody>                            
                            <tr>
                                <th>
                                    <h6>Name:</h6>
                                </th>
                                <td>
                                    {user && user.name}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Phone:</h6>
                                </th>
                                <td>
                                    {shippingInfo.phoneNo}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <h6>Address:</h6>
                                </th>
                                <td>
                                { `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country  }`}
                                </td>
                            </tr>
                        </tbody>
                    </table>   

                    <br />  

                    <div className="parent">

                        <table>

                            <tbody>
                                
                            {cartItems.map(item => (
                                <tr key={item.product}>
                                    <td>
                                        <Link to={`/artwork/${item.product}`}>
                                            <div className="cart-image">
                                                <img src={item.image}alt={item.name} height="90" width="115" />
                                            </div>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/artwork/${item.product}`}>{item.name}</Link>
                                    </td>
                                       
                                    <td style={{ whiteSpace: "nowrap" }}>
                                    {item.quantity}
                                    &nbsp;x&nbsp;
                                        ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                                        &nbsp;CAD
                                        
                                    </td>
                                    <td>
                                        <b>
                                        $
                                        {(item.quantity * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        &nbsp;CAD
                                        </b>
                                    </td>                                     
                                </tr>
                            ))}

                            </tbody>

                        </table>   

                        <div style={{ width: "40px" }} />                  

                        <div>
                            <div className="order-summary">
                                <h4>Order Summary</h4>
                                <br />
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>
                                            <h6>Subtotal:</h6>
                                        </th>
                                        <td>
                                            ${itemsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <h6>Shipping:</h6>
                                        </th>
                                        <td>
                                            ${shippingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <h6>Tax:</h6>
                                        </th>
                                        <td>
                                            ${taxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <h6>Total:</h6>
                                        </th>
                                        <td>
                                            ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <br />
                                <button className="submit" onClick={proceedToPayment}>Proceed to Payment</button>
                            </div>
                        </div>  

                    </div>

                </div>              
                
            </div>

            </div>

        </Fragment>
    )
}

export default ConfirmOrder
