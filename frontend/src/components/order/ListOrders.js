import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'

const ListOrders = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector( state => state.myOrders )

    useEffect(() => {

        dispatch(myOrders())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Browse',
                    field: 'actions',
                    sort: 'disabled',
                    width: 100
                },
                {
                    label: 'Order No',
                    field: 'id',
                    sort: 'disabled',
                    width: 200
                },
                {
                    label: 'Quantity',
                    field: 'numOfItems',
                    sort: 'asc',
                    width: 100
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
                    <Link to={`/order/${order._id}`}>
                        <IconButton>
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Link>,             
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`, 
                status: order.orderStatus                   
            })
        })

        return data
    }

    return (

        <Fragment>

            <MetaData title={'My Orders'} noIndex={true} />

            {loading ? <Loader /> : (                     

                <div className="container">

                    <div className="wrapper d-flex">                                     

                        <div className="user-form cart">

                            <h1>My Orders</h1>                        

                            <MDBDataTableV5
                                data={setOrders()}
                                fullPagination   
                                scrollX  
                                // scrollY   
                                searchTop
                                searchBottom={false}  
                            />                       

                            <Link to="/me">                              
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

            )}

        </Fragment>

    )

}

export default ListOrders
