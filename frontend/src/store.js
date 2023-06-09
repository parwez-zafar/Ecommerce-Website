// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { productDetailsReducer, productReducer } from './reducers/productReducer';
// import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
// import { cartReducer } from './reducers/cartReducer';

// const reducer = combineReducers({
//     products: productReducer,
//     productDetails: productDetailsReducer,
//     user: userReducer,
//     profile: profileReducer,
//     forgotPassword: forgotPasswordReducer,
//     cart: cartReducer
// });

// let initialState = {
//     cart: {
//         carItems: localStorage.getItem("cartItems")
//             ?
//             JSON.parse(localStorage.getItem("cartItems"))
//             : []

//     }
// };

// const middleware = [thunk];

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;




import { configureStore } from "@reduxjs/toolkit";
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer } from './reducers/orderReducer';
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ?
            JSON.parse(localStorage.getItem("cartItems"))
            : [],

        shippingInfo: localStorage.getItem("shippingInfo")
            ?
            JSON.parse(localStorage.getItem("shippingInfo"))
            :
            {},
    },

};

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        profile: profileReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer


    },  // it can use multiple reducer and combine itself
    preloadedState: initialState
});

export default store;