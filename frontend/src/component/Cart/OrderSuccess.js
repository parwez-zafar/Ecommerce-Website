import React, { Fragment } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './orderSuccess.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const OrderSuccess = () => {
    return (

        <Fragment>
            <div className="orderSuccess">
                <CheckCircleIcon />
                <Typography>Your Orde has been Placed successfully</Typography>
                <Link to="/order/me" >View Orders</Link>
            </div>
        </Fragment>
    )
}

export default OrderSuccess