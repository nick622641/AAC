import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import { useParams } from 'react-router-dom'
import FormattedPrice from '../layouts/FormattedPrice'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'

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
                                        <th>Item</th>
                                        <th>Title</th>                                                
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                    {orderItems && orderItems.map(item => (
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
                                
                                <table className="top-align">
                                <tbody>  
                                    <tr>
                                        <td colSpan="2">
                                        <h4>Shipping Details</h4>
                                        </td>
                                    </tr>                           
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Name</h6>
                                        </td>
                                        <td>{user && user.name}</td>
                                    </tr>  
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Phone</h6>
                                        </td>
                                        <td>{shippingInfo && shippingInfo.phoneNo}</td>
                                    </tr>  
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Address</h6>
                                        </td>
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
                                        <td colSpan="2">
                                            <h4>Order Status</h4>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Oder ID</h6>
                                        </td>
                                        <td>{order._id}</td>
                                    </tr>  
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Date</h6>
                                        </td>
                                        <td>{createdAt}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Amount</h6>
                                        </td>
                                        <td>{totalPrice && <FormattedPrice number={totalPrice} />}</td>
                                    </tr>                                   
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Payment Status</h6>
                                        </td>
                                        <td className={isPaid ? "success" : "danger"}>                                                
                                            <b>{isPaid ? 'Paid': 'Pending'}</b>                                             
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Process Status</h6>
                                        </td>
                                        <td className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "success" : "danger" }>
                                            <b>{ orderStatus }</b>
                                        </td>
                                    </tr>                            
                                </tbody>    
                                </table>                           

                                <Link to="/orders/me">                              
                                    <Fab size="small" className="close" color="primary">
                                        <CloseIcon />
                                    </Fab>
                                </Link>                  
                            
                            </div>

                        </div>

                    </div>

                </Fragment>

            )}
            
        </Fragment>

    )

}

export default OrderDetails
