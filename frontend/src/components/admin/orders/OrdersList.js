import React, { Fragment, useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { allOrders, deleteOrder, clearErrors } from '../../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../../constants/orderConstants'
import MetaData from '../../layouts/MetaData'
import Loader from '../../layouts/Loader'
import Sidebar from '../Sidebar'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { Tooltip } from '@mui/material'
import FormattedDate from '../../layouts/FormattedDate'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const OrdersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector( state => state.allOrders )
    const { isDeleted              } = useSelector( state => state.order )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

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
        
    }, [dispatch, navigate,  alert, error, isDeleted])

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
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150                  
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'disabled',
                    width: 100
                },
                {
                    label: 'Qty',
                    field: 'numOfItems',
                    sort: 'asc',
                    width: 75
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
                }                
            ],
            rows: []
        }

        orders && orders.forEach( order => {
            data.rows.push({  
                actions: 
                <Fragment>  
                    <CopyToClipboard text={order._id}>
                        <IconButton onClick={() => alert.success('ID Copied')}>
                            <Tooltip title="Copy ID" arrow>
                                <ContentCopyIcon color="primary" />  
                            </Tooltip>
                        </IconButton>                    
                    </CopyToClipboard> 
                    <Link to={`/admin/order/${order._id}`}>
                        <Tooltip title="Update" arrow>
                            <IconButton>
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Link> 
                    <Tooltip title="Delete" arrow>
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(order._id)
                            }}
                        >
                            <DeleteOutlineIcon color="danger" />
                        </IconButton> 
                    </Tooltip>  
                </Fragment>,                
                date: <FormattedDate iso={ order.paidAt} />,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`, 
                status: order.orderStatus                
            })
        })

        return data
    }

    return (

        <Fragment>

            <MetaData title={'All Orders'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}> 

                        {loading ? <Loader /> : (     

                            <Fragment>

                                <div className="user-form cart">

                                    <h1>All Orders</h1>                                

                                    <MDBDataTableV5 
                                        data={setOrders()}   
                                        fullPagination   
                                        scrollX  
                                        // scrollY   
                                        searchTop
                                        searchBottom={false}  
                                    />   

                                    <Link to="/admin/dashboard">
                                        <Fab 
                                            size="small" 
                                            className="close" 
                                            color="primary"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </Link>

                                    <Tooltip title="Expand" arrow>
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
