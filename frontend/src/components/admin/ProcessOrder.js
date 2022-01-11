import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import FormattedPrice from '../layouts/FormattedPrice'

const ProcessOrder = () => {

    const [status, setStatus] = useState('')
    const orderId = useParams().id
    const alert = useAlert()   
    const dispatch = useDispatch()
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    useEffect(() => {

        dispatch(getOrderDetails(orderId))
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }  
        if(isUpdated) {            
            alert.success('Order updated successfully')
            dispatch({ type: UPDATE_ORDER_RESET })
        }
    }, [dispatch, orderId, alert, error, isUpdated])

    const updateOrderHandler = (id) => {
        const formData = new FormData()
        formData.set('status', status) 
        dispatch(updateOrder(id, formData))
    }

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (

        <Fragment>

            <MetaData title={`Process Order # ${order && order._id}`} />

            <div className="container">

                <div className="wrapper parent dashboard">

                <aside><Sidebar /></aside>            

                <article>                                            

                    {loading ? <Loader /> : (

<                       Fragment>                               

                            <div className="user-form">

                                <h1 >
                                    Order 
                                    <small style={{ float: "right" }}># {order._id}</small>
                                </h1>

                                <table className="middle-align bordered-table">
                                <tbody>
                                    <tr className="bg-grey">
                                        <td><h6>Item</h6></td>
                                        <td><h6>Title</h6></td>
                                        <td><h6>Price</h6></td>
                                        <th><h6>Quantity</h6></th>
                                    </tr>
                                    {orderItems && orderItems.map(item => (
                                        <tr key={item.product}>
                                            <td>
                                                <Link to={`/artwork/${item.product}`}>
                                                    <div className="cart-image">
                                                        <img src={item.image} alt={item.name} className="centered-image" />
                                                    </div>
                                                </Link>
                                            </td>
                                            <td><Link to={`/artwork/${item.product}`}>{item.name}</Link></td>                                            
                                            <td>
                                                <FormattedPrice number={item.price} />
                                            </td>
                                            <th>{item.quantity}</th> 
                                        </tr>
                                    ))}
                                </tbody>
                                </table>

                                <h4>Summary</h4>

                                <table className="bordered-table">
                                    <tbody>
                                    <tr>
                                        <th><h6>Name:</h6></th>
                                        <td>{user && user.name}</td>
                                    </tr>
                                    <tr>
                                        <th><h6>Phone:</h6></th>
                                        <td>{shippingInfo && shippingInfo.phoneNo}</td>
                                    </tr>
                                    <tr>
                                        <th><h6>Address:</h6></th>
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
                                        <th><h6>Amount:</h6></th>
                                        <td>${totalPrice && totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD</td>
                                    </tr>
                                
                                    <tr>
                                        <th><h6>Status</h6></th>
                                        <td>
                                            <select
                                                style={{ width: "auto", padding: 0 }}
                                                value={status ? status : order.orderStatus}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                        <th>
                                            <button                                                          
                                                onClick={() => updateOrderHandler(order._id)
                                            }>                                                
                                               <i className="fa fa-pencil" />                                          
                                            </button>
                                        </th>
                                    </tr>                          
                                    <tr>
                                        <td colSpan="3" className="spacer-cell">
                                            <h4>Payment</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h6>Stripe ID:</h6></th>
                                        <td><small>{paymentInfo && paymentInfo.id}</small></td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <h6>Payment Status:</h6>
                                        </th>
                                        <td>
                                            <p className={isPaid ? "success" : "danger"}>
                                                <b>{isPaid ? 'Paid': 'Pending'}</b>
                                            </p>
                                        </td>
                                    </tr>                                    
                                    <tr>
                                        <th><h6>Order Status:</h6></th>
                                        <td>
                                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "success" : "danger"}>
                                                <b>{orderStatus}</b>
                                            </p> 
                                        </td>
                                    </tr>                                                
                                </tbody>
                                </table>
                             
                                <Link to="/admin/orders"><i className="fa fa-times"/></Link>
                                
                            </div>

                            </Fragment>
                        )}                    

                </article>
                
            </div>

            </div>
            
        </Fragment>
    )
}

export default ProcessOrder
