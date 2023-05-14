import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStarts from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const ProductDetails = ({ match }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productDetails)
    // console.log(product);
    const alert = useAlert();

    useEffect(() => {

        if (error) {
            return (
                alert.error(error),
                dispatch(clearErrors)
            )
        }
        dispatch(getProductDetails(id));

    }, [dispatch, id, error, alert])


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    }

    return (
        <>
            {
                loading
                    ? <Loader />
                    :
                    (
                        <>
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
                                        <ReactStarts {...options} />
                                        {" "}
                                        <span>({product.numOfReviews} Reviews)</span>
                                    </div>

                                    <div className="detailsBlock-3">
                                        <h1>{`₹${product.price}`}</h1>
                                        <div className="detailsBlock-3-1">
                                            <div className="detailsBlock-3-1-1">
                                                <button>-</button>
                                                <input type="number" value={1} />
                                                <button>+</button>
                                            </div>
                                            <button>Add to Cart</button>

                                        </div>
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

                                    <button className="submitReview">
                                        Submit Review
                                    </button>

                                </div>
                            </div>

                            <h3 className="reviewHeading">REVIEWS</h3>
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
                        </>
                    )
            }
        </>
    )
}

export default ProductDetails