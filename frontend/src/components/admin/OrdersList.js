import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import Modal from '../modals/Modal'
import Confirm from '../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

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
                    sort: 'disabled',
                    width: 200
                },
                {
                    label: 'Qty',
                    field: 'numOfItems',
                    sort: 'asc',
                    width: 74
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100                  
                }
            ],
            rows: []
        }

        orders && orders.forEach( order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`, 
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <span className="success">{order.orderStatus}</span>
                : <span className="danger">{order.orderStatus}</span>,
                actions:                 
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`}>
                            <IconButton>
                            <   VisibilityIcon fontSize="default" />
                            </IconButton>
                        </Link> 
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(order._id)
                            }}
                        >
                            <DeleteOutlineIcon sx={{ color: "red" }} />
                        </IconButton>            
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

                                    <MDBDataTableV5 
                                        data={setOrders()}   
                                        fullPagination   
                                        scrollX  
                                        scrollY   
                                        searchTop
                                        searchBottom={false}  
                                    />                              

                                )}

                                <Link to="/dashboard">
                                    <Fab size="small" className="close" color="primary">
                                        <CloseIcon />
                                    </Fab>
                                </Link>
                                
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
