import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {

    const id = useParams().id
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, order = {} } = useSelector(state => state.orderDetails)    
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const grandTotal = totalPrice ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : totalPrice
    const date = new Date(order.createdAt)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = new Date(date).getFullYear()
    const createdAt = day + '/' + month + '/' + year

    useEffect(() => {
        dispatch(getOrderDetails(id))
        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>

            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (

                <Fragment>

                    <div className="container">

                    <div className="wrapper">

                        <h2>Order <small># {order._id}</small></h2>

                        <div className="user-form cart">  

                            <div className="parent">

                            <table>
                                <tbody>
                                    {orderItems && orderItems.map(item => (
                                    <tr key={item.product}>
                                        <td>
                                            <Link to={`/artwork/${item.product}`}>
                                                <div className="cart-image">
                                                    <img src={item.image} alt={item.name} height="90" width="115" />
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/artwork/${item.product}`}>{item.name}</Link>
                                        </td>
                                        <td>
                                            ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </td>
                                        <td>
                                            <b>{item.quantity} </b>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table> 

                            <div style={{ width: "40px" }} />

                            <div className="order-summary">

                                <h4>Order Details</h4>
                                <br />
                                <table>
                                    <tbody>                                        
                                        <tr>
                                            <th>
                                                <h6>Name:</h6>
                                            </th>
                                            <td style={{ color: "var(--prmary-color)" }}>                                                
                                                {user && user.name}                                             
                                            </td>
                                        </tr>  
                                        <tr>
                                            <th>
                                                <h6>Phone:</h6>
                                            </th>
                                            <td>
                                                {shippingInfo && shippingInfo.phoneNo}
                                            </td>
                                        </tr>  
                                        <tr>
                                            <th>
                                                <h6>Address:</h6>
                                            </th>
                                            <td>
                                                {shippingDetails}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6>Amount:</h6>
                                            </th>
                                            <td>
                                                ${grandTotal}
                                            </td>
                                        </tr>  
                                        <tr>
                                            <th>
                                                <h6>Date:</h6>
                                            </th>
                                            <td>
                                                {createdAt}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6>Payment Status:</h6>
                                            </th>
                                            <td style={ isPaid ? {  color: "var(--primary-color)"} : { color: "red"} }>                                                
                                                { isPaid ? 'PAID': 'PENDING' }                                             
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <h6>Order Status:</h6>
                                            </th>
                                            <td style={ order.orderStatus && String(order.orderStatus).includes('Delivered') ? { color: "var(--primary-color)" } : { color: "red" } }>
                                                { orderStatus }
                                            </td>
                                        </tr>                            
                                    </tbody>    
                                </table>   
                            </div>

                            <Link to="/orders/me"><i className="fa fa-times"></i></Link>                    
                           
                        </div>
                        </div>
                    </div>
                    </div>
                </Fragment>

            )}
            
        </Fragment>
    )
}

export default OrderDetails
