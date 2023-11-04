import React, { Fragment, useEffect } from 'react';
import './productList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Loader from '../layout/Loader/Loader';
import { deleteOrder, getAllOrder, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order)

    // console.log(useSelector((state) => state.products));
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))

    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Order Deleted Successfully")
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(getAllOrder());
    }, [dispatch, error, alert, deleteError, isDeleted, navigate])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,


            renderCell: (params) => {
                const cellClassName = params.row.status === 'Delivered' ? 'greenColor' : 'redColor';

                return (
                    <div className={cellClassName}>
                        {params.value}
                    </div>
                );
            },

        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: 'action',
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.row.id}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.row.id)}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            }
        }
    ]


    let rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });


    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <div className="dashboard">
                            <Sidebar />
                            <div className="productListContainer">
                                <h1 id="productListHeading">ALL ORDERS</h1>

                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    // initialState={{

                                    //     pagination: { paginationModel: { pageSize: 5 } },
                                    // }}
                                    pageSizeOptions={`[5, 10, 25]`}
                                />
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default OrderList;