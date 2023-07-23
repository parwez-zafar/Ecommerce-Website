import React, { Fragment } from 'react';
import Sidebar from './Sidebar.js';
import './dashboard.css'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);



const Dashboard = () => {

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, 4000],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                // data: [outOfStock, products.length - outOfStock],
                data: [2, 10],
            },
        ],
    };
    return (
        <Fragment>
            <div className="dashboard">
                <MetaData title="Dashboard - Admin Panel" />
                <Sidebar />

                <div className="dashboardContainer">
                    <Typography component="h1">Dashboard</Typography>

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                {/* Total Amount <br /> ₹{totalAmount} */}
                                Total Amount <br /> ₹{200}

                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                {/* <p>{products && products.length}</p> */}
                                <p>{50}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                {/* <p>{orders && orders.length}</p> */}
                                <p>{4}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                {/* <p>{users && users.length}</p> */}
                                <p>{2}</p>
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
        </Fragment>
    )
}

export default Dashboard