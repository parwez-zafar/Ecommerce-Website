import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { CgMouse } from 'react-icons/cg';
import './Home.css'
import Product from './Product.js';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
// const product = {
//     name: 'Red Shirt',
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: 3000,
//     _id: "prwzProduct"
// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector((state) => state.products)
    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])



    return (
        <>
            {loading
                ? <Loader />
                : <>
                    <MetaData title="ECOMMERCE" />
                    {/* <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS HERE</h1>

                <Link type='button' to='/'>

                    Shop < CgMouse />

                </Link >

            </div > */}

                    <div className="conteiner" id="contener">
                        {
                            products && products.map((product) => {
                                return (
                                    <Product product={product} key={product._id} />
                                )
                            })
                        }

                    </div>

                </>}
        </>
    )
}

export default Home