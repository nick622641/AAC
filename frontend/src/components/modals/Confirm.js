import React, { Fragment } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

const Confirm = (props) => {

    return (

        <Fragment>

            <h3>{props.message}?</h3> 

            <div className="text-center">        

                <ButtonGroup variant="contained">
                    <Button
                        onClick={() => {
                            props.onConfirm()
                            props.onBackdropClick()
                        }}
                    >
                        OK
                    </Button>
                    <Button
                        onClick={props.onBackdropClick}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                </ButtonGroup>

            </div>   
            
        </Fragment>

    )

}

export default Confirm
