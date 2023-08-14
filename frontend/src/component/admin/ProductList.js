import React, { Fragment, useEffect } from 'react';
import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product)

    // console.log(useSelector((state) => state.products));
    const deleteProductHandler = (id) => {
        // console.log("id is ", id);
        dispatch(deleteProduct(id))

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
            alert.success("Product Deleted Successfully")
            navigate('/admin/dashboard');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts());
    }, [dispatch, error, alert, deleteError, isDeleted, navigate])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                // console.log("id is ", params.row.id);
                // const id = useParams();
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.row.id}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.row.id)}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            }
        }
    ]


    let rows = [];
    // console.log("Products is ", products);
    products &&
        products.forEach((item, index) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    // console.log("size ", rows.length);

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <div className="dashboard">
                            <Sidebar />
                            <div className="productListContainer">
                                <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList