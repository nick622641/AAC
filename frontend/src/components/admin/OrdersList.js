import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector(state => state.allOrders)
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders())

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }   
        if(isDeleted) {
            alert.success('Order deleted successfully')            
            dispatch({ type: DELETE_ORDER_RESET })
            navigate('/admin/orders')
        }
    }, [dispatch, navigate,  alert, error, isDeleted ])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                  
                }
            ],
            rows: []
        }

        orders.forEach( order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p style={{ color:'green' }} >{order.orderStatus}</p>
                : <p style={{ color:'red'   }} >{order.orderStatus}</p>,
                actions: 
                
                    <Fragment>

                        <Link to={`/admin/order/${order._id}`}>
                            <i className="fa fa-eye"></i>
                        </Link> 
                        <i 
                            className="fa fa-trash"
                            onClick={() => deleteOrderHandler(order._id)}
                        />

                    </Fragment> 
            })
        })

        return data
    }

    return (

        <Fragment>

            <MetaData title={'All Orders'} />

            <div className="container">

                <div className="wrapper parent dashboard">

                    <aside><Sidebar /></aside>

                    <article>      

                        <Fragment>

                            <h1>All Orders</h1>

                            <div className="user-form cart mdb-table">

                                {loading ? <Loader /> : (
                                    <MDBDataTable data={setOrders()} />
                                )}
                                <Link to="/dashboard"><i className="fa fa-times"></i></Link>
                                
                            </div>

                        </Fragment>

                    </article>   

                </div>
            </div>
            
        </Fragment>
    )
}

export default OrdersList
