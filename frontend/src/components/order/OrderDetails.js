import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import { useParams } from 'react-router-dom'
import FormattedPrice from '../layouts/FormattedPrice'

const OrderDetails = () => {

    const id = useParams().id
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, order = {} } = useSelector(state => state.orderDetails)    
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
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

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>

            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (

                <Fragment>

                    <div className="container">

                        <div className="wrapper">                        

                            <div className="user-form">  

                                <h1>Order Details</h1>

                                <table className="middle-align bordered-table">
                                <tbody>
                                    <tr className="bg-grey">
                                        <td><h6>Item</h6></td>
                                        <td><h6>Title</h6></td>                                                
                                        <td><h6>Quantity</h6></td>
                                        <td><h6>Price</h6></td>
                                    </tr>
                                    {orderItems && orderItems.map(item => (
                                        <tr key={item.product}>
                                            <td>
                                                <Link to={`/artwork/${item.product}`}>
                                                    <div className="cart-image">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name} 
                                                            className="centered-image"
                                                        />
                                                    </div>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/artwork/${item.product}`}>{item.name}</Link>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                <FormattedPrice number={item.price} />
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
                                        <td>{shippingInfo && shippingInfo.phoneNo}</td>
                                    </tr>  
                                    <tr>
                                        <th><h6>Address</h6></th>
                                        <td>
                                            {shippingInfo && shippingInfo.address}
                                            <br />
                                            {shippingInfo && shippingInfo.city}
                                            <br />
                                            {shippingInfo && shippingInfo.postalCode}
                                            <br />
                                            {shippingInfo && shippingInfo.country}
                                        </td>
                                    </tr>                              
                                    <tr>
                                        <td colSpan="2" className="spacer-cell">
                                            <h4>Order Status</h4>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <th><h6>Oder ID</h6></th>
                                        <td>{order._id}</td>
                                    </tr>  
                                    <tr>
                                        <th><h6>Date</h6></th>
                                        <td>{createdAt}</td>
                                    </tr>
                                    <tr>
                                        <th><h6>Amount</h6></th>
                                        <td>{totalPrice && <FormattedPrice number={totalPrice} />}</td>
                                    </tr>                                   
                                    <tr>
                                        <th><h6>Payment Status</h6></th>
                                        <td className={isPaid ? "success" : "danger"}>                                                
                                            <b>{isPaid ? 'Paid': 'Pending'}</b>                                             
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h6>Process Status</h6></th>
                                        <td className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "success" : "danger" }>
                                            <b>{ orderStatus }</b>
                                        </td>
                                    </tr>                            
                                </tbody>    
                                </table>                           

                                <Link to="/orders/me"><i className="fa fa-times" /></Link>                    
                            
                            </div>

                        </div>

                    </div>

                </Fragment>

            )}
            
        </Fragment>

    )

}

export default OrderDetails
