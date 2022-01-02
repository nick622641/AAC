import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="container">

                <div className="wrapper text-center">
                
                    <img src="/images/order_success.png" alt="Order Success" style={{ maxWidth: "100px" }} />

                    <h2>Your Order has been placed successfully.</h2>

                    <Link to="/orders/me">Go to Orders</Link>
                </div>

            </div>
      
        </Fragment>
    )
}

export default OrderSuccess
