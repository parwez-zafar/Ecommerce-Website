import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './checkoutSteps.css'
const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            lebel: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            lebel: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            lebel: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ]

    const stepsStye = {
        boxSizing: "border-box"
    }

    return (

        <Fragment>
            <Stepper
                alternativeLabel activeStep={activeStep} style={stepsStye}
            >
                {
                    steps.map((item, index) => (
                        <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>

                            <StepLabel style={{
                                color: activeStep >= index ? 'tomato' : 'rgba(0, 0, 0, 0.439)'
                            }}
                                icon={item.icon}>{item.lebel} </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>

        </Fragment >
    )
}

export default CheckoutSteps