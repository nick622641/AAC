import React, { Fragment } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {

    return (

        <Fragment>

            <div
                className="d-flex justify-content-center align-items-center absolute"
                style={{ zIndex: 1, width: "100%", height: "90vh" }}
            >

                <CircularProgress className="loader" color="primary" /> 

            </div>

        </Fragment>

    )
    
}

export default Loader