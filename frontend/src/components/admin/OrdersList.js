import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'

const OrdersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector( state => state.allOrders )
    const { isDeleted              } = useSelector( state => state.order )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,  setId ] = useState('')

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

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
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
                    sort: 'asc'
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
                amount: `$${order.totalPrice}`, 
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <span className="success">{order.orderStatus}</span>
                : <span className="danger">{order.orderStatus}</span>,
                actions:                 
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`}>
                            <i className="fa fa-eye" />
                        </Link> 
                        &nbsp; &nbsp;
                        <i 
                            className="fa fa-trash-o"
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(order._id)
                            }}
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

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteOrderHandler(id)} 
                        message="Delete Order"
                    />
                }
            />
            
        </Fragment>

    )
    
}

export default OrdersList
