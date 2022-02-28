import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const OrderSuccess = () => {

    return (

        <Fragment>

            <MetaData title={'Order Success'} noIndex={true} />

            <div className="container parent" style={{ minHeight: "60vh", alignItems: "center" }}>

                <div className="wrapper d-flex">

                    <div className="user-form text-center">                

                        <h1>Your Order has been placed successfully.</h1>

                        <p>
                            <CheckCircleIcon sx={{ fontSize:136, color: "var(--cta-green)" }} />                    
                        </p>

                        <Link to="/orders/me">Go to Orders</Link>

                        <Link to="/">                              
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
      
        </Fragment>

    )
    
}

export default OrderSuccess
