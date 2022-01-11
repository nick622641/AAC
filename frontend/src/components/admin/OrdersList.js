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
import FormattedPrice from '../layouts/FormattedPrice'

const OrdersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector( state => state.allOrders )
    const { isDeleted              } = useSelector( state => state.order )

    useEffect(() => {

        dispatch(allOrders())

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }   
        if(isDeleted) {
            alert.success('Order Deleted Successfully')            
            dispatch({ type: DELETE_ORDER_RESET })
        }
        
    }, [dispatch, navigate,  alert, error, isDeleted ])

    const deleteOrderHandler = (id) => {
        if ( window.confirm("Are you Sure?") === true ) {
            dispatch(deleteOrder(id))
        }         
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'disabled'
                },
                {
                    label: 'Qty',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'disabled'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'disabled'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled'                  
                }
            ],
            rows: []
        }

        orders && orders.forEach( order => {
            data.rows.push({
                id: <small>{order._id}</small>,
                numOfItems: order.orderItems.length,
                amount: <FormattedPrice number={order.totalPrice} />, 
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p className="success">{order.orderStatus}</p>
                : <p className="danger">{order.orderStatus}</p>,
                actions:                 
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`}>
                            <i className="fa fa-eye" />
                        </Link> 
                        &nbsp; &nbsp;
                        <i 
                            className="fa fa-trash-o"
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

                    <aside>

                        <Sidebar />

                    </aside>

                    <article>      

                        <Fragment>

                            <div className="user-form cart">

                                <h1>All Orders</h1>

                                {loading ? <Loader /> : (

                                    <MDBDataTable 
                                        className="mdb-table"
                                        data={setOrders()} 
                                    />

                                )}

                                <Link to="/dashboard"><i className="fa fa-times" /></Link>
                                
                            </div>

                        </Fragment>

                    </article>   

                </div>

            </div>
            
        </Fragment>

    )
    
}

export default OrdersList
