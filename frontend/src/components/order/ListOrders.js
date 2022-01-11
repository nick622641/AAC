import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
import FormattedPrice from '../layouts/FormattedPrice'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

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
                    label: 'Order No',
                    field: 'id',
                    sort: 'disabled'
                },
                {
                    label: 'Quantity',
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
                    label: 'Browse',
                    field: 'actions',
                    sort: 'disabled'
                }
            ],
            rows: []
        }

        orders && orders.forEach( order => {

            data.rows.push({                 
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: <FormattedPrice number={order.totalPrice} />, 
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p className="success">{order.orderStatus}</p>
                : <p className="danger">{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`}>
                        <i className="fa fa-eye" />
                    </Link>    
            })
        })

        return data
    }

    return (

        <Fragment>

            <MetaData title={'My Orders'} />

            <div className="container">

                <div className="wrapper stage">                    

                    <div className="user-form cart">

                        <h1>My Orders</h1>

                        {loading ? <Loader /> : (

                            <MDBDataTable
                                className="mdb-table"
                                data={setOrders()}
                            />

                        )}

                        <Link to="/me"><i className="fa fa-times" /></Link>

                    </div>

                </div>

            </div>

        </Fragment>

    )

}

export default ListOrders
