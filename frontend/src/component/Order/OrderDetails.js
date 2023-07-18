import React, { Fragment, useEffect } from 'react'
import './orderDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrderDetails } from '../../actions/orderAction'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material';



const OrderDetails = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails)
    const dispatch = useDispatch();
    const alert = useAlert();
    let { id } = useParams();
    // console.log(id);

    useEffect(() => {
        if (error) {
            // console.log("error is ", error);
            alert.error(error);
            dispatch(clearErrors())
        }

        dispatch(getOrderDetails(id));

    }, [dispatch, error, alert, id])
    // if (!order) {
    //     return <Loader />; // Or any other loading state, such as a spinner
    // }
    return (
        <Fragment>
            {
                loading || !order ? <Loader />
                    :
                    (
                        <Fragment>
                            <MetaData title="Order Details" />
                            <div className="orderDetailsPage">
                                <div className="orderDetailsContainer">
                                    <Typography component="h1">
                                        Order #{order && order._id}
                                    </Typography>
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>
                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                        order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="orderDetailsCartItems">
                                    <Typography>Order Items:</Typography>
                                    <div className="orderDetailsCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item.quantity} X ₹{item.price} ={" "}
                                                        <b>₹{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
        </Fragment>
    )
}

export default OrderDetails