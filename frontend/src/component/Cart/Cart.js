import React, { Fragment } from 'react';
import './cart.css';
import CartItemCard from './CartItemCard.js';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeItemFromCart } from '../../actions/cartAction'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newqty = quantity + 1;
        if (stock <= quantity)
            return;
        dispatch(addToCart(id, newqty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newqty = quantity - 1;
        if (quantity <= 1)
            return;

        dispatch(addToCart(id, newqty))
    }
    const deleteCartItems = (id) => {
        dispatch(removeItemFromCart(id));
    };
    return (
        <Fragment>
            {
                cartItems.length === 0 ? (
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />
                        <Typography>
                            Your Cart Is Empty
                        </Typography>
                        <Link to="/products">View Products</Link>
                    </div>
                ) :
                    <Fragment>

                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {
                                cartItems && cartItems.map((item) => (
                                    <div className="cartContainer" key={item.product}>
                                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                        <div className="cartInput">
                                            <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                        </div>

                                        <p className="cartSubtotal">
                                            {`₹${item.price * item.quantity}`}
                                        </p>
                                    </div>
                                ))
                            }

                            <div className="totalPrice">
                                <div></div>
                                <div className="totalPriceBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price,
                                        0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button>Check Out</button>
                                </div>
                            </div>

                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Cart