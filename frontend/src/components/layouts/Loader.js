import React, { Fragment } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {

    return (

        <Fragment>

            <div
                className="d-flex justify-content-center align-items-center absolute"
                style={{ zIndex: 1, width: "100%", height: "90vh", background: 'white', top:0, left:0 }}
            >

                <CircularProgress className="loader" color="primary" /> 

            </div>

        </Fragment>

    )
    
}

export default Loader