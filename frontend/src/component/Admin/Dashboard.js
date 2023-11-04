import React, { Fragment, useEffect } from 'react';
import Sidebar from './Sidebar.js';
import './dashboard.css'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction.js';
import Loader from '../layout/Loader/Loader.js';
import { getAllOrder } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';

Chart.register(CategoryScale);



const Dashboard = () => {
    const { loading, products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    let outOfStock = 0;
    products && products.forEach((item) => {
        if (item.stock === 0)
            outOfStock += 1;
    });
    let totalAmount = 0;
    orders && orders.forEach(item => {
        totalAmount += item.totalPrice;
    })
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products && products.length - outOfStock],

            },
        ],
    };

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrder());
        dispatch(getAllUsers());
    }, [dispatch])
    return (
        <Fragment>
            {
                loading ? <Loader />
                    :
                    <div className="dashboard">
                        <MetaData title="Dashboard - Admin Panel" />
                        <Sidebar />

                        <div className="dashboardContainer">
                            <Typography component="h1">Dashboard</Typography>

                            <div className="dashboardSummary">
                                <div>
                                    <p>
                                        {/* Total Amount <br /> ₹{totalAmount} */}
                                        Total Amount <br /> ₹{totalAmount}

                                    </p>
                                </div>
                                <div className="dashboardSummaryBox2">
                                    <Link to="/admin/products">
                                        <p>Product</p>
                                        <p>{products && products.length}</p>
                                    </Link>
                                    <Link to="/admin/orders">
                                        <p>Orders</p>
                                        <p>{orders && orders.length}</p>
                                    </Link>
                                    <Link to="/admin/users">
                                        <p>Users</p>
                                        <p>{users && users.length}</p>
                                    </Link>
                                </div>
                            </div>

                            <div className="lineChart">
                                <Line data={lineState} />
                            </div>

                            <div className="doughnutChart">
                                <Doughnut data={doughnutState} />
                            </div>
                        </div>
                    </div>

            }
        </Fragment>
    )
}

export default Dashboard