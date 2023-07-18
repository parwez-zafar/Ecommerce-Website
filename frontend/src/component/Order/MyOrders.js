import React, { Fragment, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import './myOrders.css'
import Loader from '../layout/Loader/Loader';


const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user)
    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const columns = [
        {
            field: "id",
            headerName: "Order Id",
            minWidth: 300,
            flex: 1
        },
        {
            field: "status",
            headerName: "status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return (params.row.status === "Delivered"
                    ? "greenColor"
                    : "redColor")
            }
        },
        {
            field: "itemsQty",
            headerName: "Item Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5
        },
        {
            field: 'action',
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                // console.log("id is ", params.id);
                return (
                    <Link to={`/orderDetail/${params.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            }
        }
    ];
    let rows = [

    ];
    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            })
        })
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(myOrders());
    }, [dispatch, error, alert])
    return (

        <Fragment>
            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <MetaData title={`${user.name} - Orders`} />
                        <div className="myOrdersPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableRowSelectionOnClick
                                className='myOrdersTable'
                                autoHeight
                                pageSizeOptions='none'

                            // hideFooter
                            />
                            <Typography id='myOrdersHeading' >{user.name}' Orders</Typography>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default MyOrders