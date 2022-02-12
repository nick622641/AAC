import React, { Fragment }  from 'react'
import IconButton           from '@mui/material/IconButton'
import TwitterIcon          from '@mui/icons-material/Twitter'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'

const Social = () => {

    return (

        <Fragment>

            <IconButton color="primary">
                <FacebookOutlinedIcon/>
            </IconButton>
            
            <IconButton color="primary">
                <TwitterIcon/>
            </IconButton>

        </Fragment>

    )

}

export default Social
