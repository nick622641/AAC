import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import { useParams, Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import FormattedPrice from '../layouts/FormattedPrice'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import FormattedDate from '../layouts/FormattedDate'

const OrderDetails = () => {

    const id = useParams().id
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, order = {} } = useSelector(state => state.orderDetails)    
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(id))
        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, id])

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    const setCartItems = () => {
        const data = {
            columns: [
                {
                    label: 'Preview',
                    field: 'url',
                    sort: 'disabled',
                    width: 75
                },                
                {
                    label: 'Title',
                    field: 'name',
                    sort: 'disabled',
                    width: 100
                },  
                {
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'disabled',
                    width: 100
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'disabled',
                    width: 150
                }   
            ],
            rows: []
        }
       
        orderItems && orderItems.forEach( item => {
            let name = item.name.replace(/-/g, '_')    
            name = name.replace(/ /g, '-') 
            data.rows.push({
                url: <Link to={`/artwork/${name}`}>
                        <Avatar
                            src={item.image} 
                            alt={item.name} 
                            sx={{ width: 50, height: 50 }}
                        />                                          
                    </Link>,                  
                name: <Link to={`/artwork/${name}`}>{item.name}</Link>,
                quantity: item.quantity,         
                price: <FormattedPrice number={item.price} />              
            })
        })

        return data
    }

    return (
        <Fragment>

            <MetaData title={'Order Details'} noIndex={true} />

            {loading ? <Loader /> : (

                <Fragment>

                    <div className="container">

                        <div className="wrapper">                        

                            <div className="user-form">  

                                <h1>Order Details</h1>

                                <MDBDataTableV5 
                                    className="cart-table"
                                    data={setCartItems()}   
                                    scrollX  
                                    searchTop
                                    searching={false} 
                                    paging={false}
                                    info={false}
                                />
                                
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
                                            <h6 className="text-right">Order ID</h6>
                                        </td>
                                        <td>{order._id}</td>
                                    </tr>  
                                    <tr>
                                        <td>
                                            <h6 className="text-right">Date</h6>
                                        </td>
                                        <td><FormattedDate iso={order.createdAt} format="dateTime" /></td>
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
                                    <Fab 
                                        size="small" 
                                        className="close" 
                                        color="primary"
                                        sx={{ position: 'absolute', top: 10, right: 10 }}
                                    >
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
