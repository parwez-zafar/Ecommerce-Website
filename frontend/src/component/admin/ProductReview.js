import React, { Fragment, useEffect, useState } from 'react';
import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { clearErrors, deleteReview, getAllReviews } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import './productReview.css'

const ProductReview = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, error, reviews } = useSelector((state) => state.productReviews)
    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    // console.log(useSelector((state) => state.products));
    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(reviewId, productId));

    }
    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId))
    }
    const [productId, setProductId] = useState("")
    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId))
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review Deleted Successfully")
            navigate('/admin/reviews');
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, error, alert, deleteError, isDeleted, navigate, productId])

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,

        },

        {
            field: "user",
            headerName: "User",
            minWidth: 350,
            flex: 0.6,

        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,

        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
            renderCell: (params) => {
                const cellClassName = params.row.rating >= 3 ? 'redColor' : 'greenColor';

                return (
                    <div className={cellClassName}>
                        {params.value}
                    </div>
                );
            },

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

                        <Button onClick={() => deleteReviewHandler(params.row.id)}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            }
        }
    ]


    let rows = [];
    // console.log("Products is ", products);
    if (Array.isArray(reviews)) {
        reviews.forEach((item, index) => {
            rows.push({
                id: item._id,
                user: item.name,
                comment: item.comment,
                rating: item.rating,
            });
        });
    }

    // console.log("size ", rows.length);

    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <div className="dashboard">
                            <Sidebar />
                            <div className="productReviewsContainer">
                                <form
                                    className="productReviewsForm"
                                    onSubmit={productReviewsSubmitHandler}
                                >
                                    <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                                    <div>
                                        <StarIcon />
                                        <input
                                            type="text"
                                            placeholder="Product Id"
                                            required
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || productId === "" ? true : false
                                        }
                                    >
                                        Search
                                    </Button>
                                </form>

                                {reviews && reviews.length > 0 ? (
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        disableSelectionOnClick
                                        className="productListTable"
                                        autoHeight
                                    />
                                ) : (
                                    <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                                )}
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}


export default ProductReview;