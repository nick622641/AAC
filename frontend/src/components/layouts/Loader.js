import React, { Fragment, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }

    return (

        <Fragment>

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                invisible={true}
                open={open}
                onClick={handleClose}
            >

                <CircularProgress className="loader" color="primary" /> 

            </Backdrop>             

        </Fragment>

    )
    
}

export default Loader