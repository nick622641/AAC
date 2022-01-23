import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {

    const steps = [
        'Shipping',
        'Confirm',
        'Payment',
    ]
    let activeStep 
    if (shipping)     { activeStep = 0 }
    if (confirmOrder) { activeStep = 1 }
    if (payment)      { activeStep = 2 }

    return (

        <Fragment>

            <Box sx={{ mb: 2 }}>
        
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>  

            </Box>

        </Fragment>

    )

}

export default CheckoutSteps
