// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { productReducer } from './reducers/productReducer';

// const reducer = combineReducers({
//     products: productReducer,
// });

// let initialState = {};

// const middleware = [thunk];

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;




import { configureStore } from "@reduxjs/toolkit";
import { productDetailsReducer, productReducer } from './reducers/productReducer';


const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,

    },  // it can use multiple reducer and combine itself
});

export default store;