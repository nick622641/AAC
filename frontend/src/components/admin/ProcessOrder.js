import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

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

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.postalCode} ${shippingInfo.country}`
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

                            <h1 >Order <small># {order._id}</small></h1>

                            <div className="user-form cart">

                                <table>
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
                                            <td>{shippingDetails}</td>
                                        </tr>
                                        <tr>
                                            <th><h6>Amount:</h6></th>
                                            <td>${totalPrice && totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <br />                                

                                <table>
                                    <tbody>
                                    {orderItems && orderItems.map(item => (
                                        <tr key={item.product}>
                                            <td>
                                                <Link to={`/artwork/${item.product}`}>
                                                    <div className="cart-image">
                                                        <img src={item.image}alt={item.name} />
                                                    </div>
                                                </Link>
                                            </td>
                                            <td><Link to={`/artwork/${item.product}`}>{item.name}</Link></td>                                            
                                            <td>
                                                ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;CAD
                                            </td>
                                            <td><b>{item.quantity} Items(s)</b></td> 
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <br />
                                <table>
                                    <tbody>
                                        <tr>
                                            <th><h6>Status</h6></th>
                                            <td>
                                                <select
                                                    value={status ? status : order.orderStatus}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                            <th>
                                                <button className="submit" style={{ width: "auto" }}                                                           
                                                    onClick={() => updateOrderHandler(order._id)
                                                }>
                                                    Update Status
                                                </button>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <div className="order-summary">
                                    <h4>Payment</h4>
                                    <br />
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th>
                                                <h6>Payment Status:</h6>
                                            </th>
                                            <td>
                                            <p style={isPaid ? {color: "green"} : {color: "red"}}><b>{isPaid ? 'PAID': 'PENDING'}</b></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><h6>Stripe ID:</h6></th>
                                            <td>{paymentInfo && paymentInfo.id}</td>
                                        </tr>
                                        <tr>
                                            <th><h6>Order Status:</h6></th>
                                            <td>
                                                <p style={order.orderStatus && String(order.orderStatus).includes('Delivered') ? {color: "green"} : {color: "red"}}><b>{orderStatus}</b></p> 
                                            </td>
                                        </tr>                                                
                                        </tbody>
                                    </table>
                                </div>
                                <Link to="/admin/orders"><i className="fa fa-times"></i></Link>
                                
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
