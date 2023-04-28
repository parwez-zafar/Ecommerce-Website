import React from 'react'
// import { Link } from 'react-router-dom'
// import { CgMouse } from 'react-icons/cg';
import './Home.css'
import Product from './Product.js'

const product = {
    name: 'Red Shirt',
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: 3000,
    _id: "prwzProduct"
}

const Home = () => {
    return (
        <>

            {/* <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS HERE</h1>

                <Link type='button' to='/'>

                    Shop < CgMouse />

                </Link >

            </div > */}

            <div className="conteiner" id="contener">
                <Product product={product} />
            </div>

        </>
    )
}

export default Home