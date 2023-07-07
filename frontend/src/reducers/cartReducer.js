import { createReducer } from "@reduxjs/toolkit";


const initialCartState = (
    { cartItems: [] }
);

export const cartReducer = createReducer(initialCartState, {
    ADD_TO_CART: (state, action) => {
        const item = action.payload;

        const isItemExist = state.cartItems.find(
            (i) => i.product === item.product
        );

        if (isItemExist) {
            return {
                ...state,
                cartItems: state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                )
            }
        }
        else {
            return {
                ...state,
                cartItems: [...state.cartItems, item],

            }
        }
    },
    REMOVE_CART_ITEM: (state, action) => {
        return {
            ...state,
            cartItems: state.cartItems.filter((i) => i.product !== action.payload)
        }
    }
})