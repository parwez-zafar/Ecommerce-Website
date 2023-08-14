import React, { Fragment, useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';



const ProductDetails = () => {


    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview)
    // console.log(product);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");



    const alert = useAlert();



    const increaseQuantity = () => {
        if (quantity >= product.stock) return;
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    };


    const { id } = useParams();
    const addToCartHandeler = async () => {
        await dispatch(addToCart(id, quantity));
        alert.success("Item Added To Cart");
    }

    const submitReviewToggle = () => {
        // open ? setOpen(false) : setOpen(true);
        setOpen(!open);
    }
    // let id = useParams();
    const reviewSubmitHandler = () => {
        const myFrom = new FormData();

        myFrom.set('rating', rating);
        myFrom.set('comment', comment);
        myFrom.set('productId', id);
        dispatch(newReview(myFrom));
        setOpen(false);
    }

    useEffect(() => {

        if (error) {
            return (
                alert.error(error),
                dispatch(clearErrors())
            )
        }
        if (reviewError) {
            return (
                alert.error(reviewError),
                dispatch(clearErrors())
            )
        }

        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));

    }, [dispatch, id, error, alert, success, reviewError])


    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }



    return (
        <Fragment>
            {
                loading
                    ? <Loader />
                    :
                    (
                        <Fragment>
                            <MetaData title={`${product.name} -- ECOMMERCE`} />

                            <div className="productDetails">
                                <div className='leftDiv'>
                                    <div className="CarouselDiv">
                                        <Carousel>
                                            {product.images &&
                                                product.images.map((item, i) => (
                                                    <img
                                                        className="CarouselImage"
                                                        key={i}
                                                        src={item.url}
                                                        alt={`${i} Slide`}
                                                    />
                                                ))}
                                        </Carousel>
                                    </div>

                                </div>

                                <div className='rightDiv'>
                                    <div className="detailsBlock-1">
                                        <h2>{product.name}</h2>
                                        <p>Product # {product._id}</p>
                                    </div>
                                    <div className="detailsBlock-2">
                                        <Rating {...options} />
                                        {" "}
                                        <span>({product.numOfReviews} Reviews)</span>
                                    </div>

                                    <div className="detailsBlock-3">
                                        <h1>{`₹${product.price}`}</h1>
                                        {
                                            (product.stock >= 1) ?
                                                <div className="detailsBlock-3-1">
                                                    <div className="detailsBlock-3-1-1">
                                                        <button onClick={decreaseQuantity} >-</button>
                                                        <input readOnly type="number" value={quantity} />
                                                        <button onClick={increaseQuantity} >+</button>
                                                    </div>
                                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandeler} >Add to Cart</button>

                                                </div>
                                                : ""
                                        }
                                        <p>
                                            Status:{" "}
                                            <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                                                {product.stock < 1 ? "OutOfStock" : "InStock"}
                                            </b>
                                        </p>
                                    </div>

                                    <div className="detailsBlock-4">
                                        Description : <p>{product.description}</p>
                                    </div>

                                    <button onClick={submitReviewToggle} className="submitReview">
                                        Submit Review
                                    </button>

                                </div>
                            </div>

                            <h3 className="reviewHeading">REVIEWS</h3>

                            <Dialog
                                aria-labelledby="simple-dialog-title"
                                open={open}
                                onClose={submitReviewToggle}
                            >
                                <DialogTitle>Submit Review</DialogTitle>
                                <DialogContent className="submitDialog">
                                    <Rating
                                        onChange={(e) => setRating(e.target.value)}
                                        value={rating}
                                        size="large"
                                    />

                                    <textarea
                                        className="submitDialogTextArea"
                                        cols="30"
                                        rows="5"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={submitReviewToggle} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={reviewSubmitHandler} color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>


                            {
                                product.reviews && product.reviews[0]
                                    ?
                                    (

                                        <div className="reviews">
                                            {
                                                product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)
                                            }
                                        </div>
                                    ) : (
                                        <p className='noReviews'> No Reviews Yet</p>
                                    )

                            }
                        </Fragment>
                    )
            }
        </Fragment >
    )
}

export default ProductDetails