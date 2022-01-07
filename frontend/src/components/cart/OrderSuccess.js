import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

const OrderSuccess = () => {

    return (

        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="container parent" style={{ minHeight: "60vh", alignItems: "center" }}>

                <div className="wrapper stage">

                    <div className="user-form text-center">                

                        <h1>Your Order has been placed successfully.</h1>

                        <p>
                            <i 
                                className="fa fa-check-circle"
                                style={{ fontSize: "136px", color: "#5cdb5c" }}
                            />
                        </p>

                        <Link to="/orders/me">Go to Orders</Link>

                        <Link to="/"><i className="fa fa-times"/></Link>

                    </div>

                </div>

            </div>
      
        </Fragment>

    )
    
}

export default OrderSuccess
