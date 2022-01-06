import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions';

const ListOrders = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector(state => state.myOrders)

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
                    label: 'Order No',
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
                    label: 'Browse',
                    field: 'actions'
                }
            ],
            rows: []
        }

        orders && orders.forEach( order => {

            data.rows.push({                
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color:'var(--cta-green)' }} >{order.orderStatus}</p>
                    : <p style={{ color:'red' }} >{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`}>
                        <i className="fa fa-eye"/>
                    </Link>    
            })
        })

        return data
    }

    return (

        <Fragment>

            <MetaData title={'My Orders'} />

            <div className="container">

                <div className="wrapper">

                    <h1>My Orders</h1>

                    <div className="user-form cart">

                        {loading ? <Loader /> : (

                            <MDBDataTable
                                className="mdb-table"
                                data={setOrders()}
                            />

                        )}

                        <Link to="/me"><i className="fa fa-times"></i></Link>

                    </div>

                </div>

            </div>

        </Fragment>
    )
}

export default ListOrders
