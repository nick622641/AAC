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
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import AddTaskIcon from '@mui/icons-material/AddTask'
import Avatar from '@mui/material/Avatar'
import { FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import FormattedDate from '../layouts/FormattedDate'
import FitScreenIcon from '@mui/icons-material/FitScreen'

const ProcessOrder = () => {
    
    const orderId = useParams().id
    const alert = useAlert()   
    const dispatch = useDispatch()
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const [status,      setStatus     ] = useState('')
    const [ fullscreen, setFullscreen ] = useState(false)

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

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>                                            

                        {loading ? <Loader /> : (

    <                       Fragment>                               

                                <div className="user-form">

                                    <h1>Order</h1>

                                    <table className="middle-align bordered-table">
                                        <tbody>
                                            <tr className="bg-grey">
                                                <td>Item</td>
                                                <td>Title</td>
                                                <td>Price</td>
                                                <th>Quantity</th>
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
                                                    <td><Link to={`/artwork/${item.product}`}>{item.name}</Link></td>                                            
                                                    <td><FormattedPrice number={item.price} /></td>
                                                    <td>{item.quantity}</td> 
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>                                

                                    <table className="top-align">
                                        <tbody>
                                        <tr>
                                            <td colSpan="3">
                                                <h4>Summary</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Order ID</h6></td>
                                            <td># {order._id}</td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Date</h6></td>
                                            <td><FormattedDate iso={order.createdAt} format="dateTime" /></td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Name</h6></td>
                                            <td>{user && user.name}</td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Phone</h6></td>
                                            <td>{shippingInfo && shippingInfo.phoneNo}</td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Address</h6></td>
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
                                            <td><h6 className="text-right">Amount</h6></td>
                                            <td>
                                                {totalPrice && totalPrice !== 'undefined' && (
                                                     <FormattedPrice number={totalPrice}/>
                                                )}
                                               
                                            </td>
                                        </tr>                                    
                                        <tr>
                                            <td><h6 className="text-right">Status</h6></td>
                                            <td>
                                                {order.orderStatus && (
                                                     <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
                                                        <InputLabel>Status</InputLabel>
                                                        <Select 
                                                            label="Status"
                                                            value={status ? status : order.orderStatus}
                                                            onChange={(e) => setStatus(e.target.value)}                                          
                                                        >                                                                             
                                                            <MenuItem value="Processing">Processing</MenuItem> 
                                                            <MenuItem value="Shipped">Shipped</MenuItem> 
                                                            <MenuItem value="Delivered">Delivered</MenuItem> 
    
                                                        </Select>
                                                    </FormControl> 
                                                )}                                                                                               
                                            </td>
                                            <td>                                      
                                                <IconButton onClick={() => updateOrderHandler(order._id)}>
                                                    <AddTaskIcon />
                                                </IconButton>
                                            </td>
                                        </tr>                          
                                        <tr>
                                            <td colSpan="3">
                                                <h4>Payment</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Stripe ID</h6></td>
                                            <td><small>{paymentInfo && paymentInfo.id}</small></td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-right">Payment Status</h6></td>
                                            <td className={isPaid ? "success" : "danger"}>
                                                <b>{isPaid ? 'Paid': 'Pending'}</b>
                                            </td>
                                        </tr>                                    
                                        <tr>
                                            <td><h6 className="text-right">Order Status</h6></td>
                                            <td className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "success" : "danger"}>
                                                <b>{orderStatus}</b>
                                            </td>
                                        </tr>                                                
                                    </tbody>
                                    </table>
                                
                                    <Link to="/admin/orders">
                                        <Fab 
                                            size="small" 
                                            className="close" 
                                            color="primary"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Link>

                                    <Tooltip title="Expand">
                                        <IconButton 
                                            color="primary" 
                                            sx={{ position: 'absolute', top: 10, left: 10 }}
                                            onClick={() => setFullscreen(!fullscreen)}
                                    >
                                            <FitScreenIcon />
                                        </IconButton>
                                    </Tooltip>
                                    
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
