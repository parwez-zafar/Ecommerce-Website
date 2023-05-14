// import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERROR } from '../constants/productConstants'

// export const productReducer = (state = { products: [] }, action) => {
//     switch (action.type) {
//         case ALL_PRODUCT_REQUEST:
//             return {
//                 loading: true,
//                 product: []
//             }
//         case ALL_PRODUCT_SUCCESS:
//             return {
//                 loading: false,
//                 product: action.payload.product,
//                 productCount: action.payload.productCount,
//             }
//         case ALL_PRODUCT_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }
//         case CLEAR_ERROR:
//             return {
//                 ...state,
//                 error: null,
//             }
//         default:
//             return state
//     }
// }



import { createReducer } from "@reduxjs/toolkit";

const inititalProductState = {
    products: []
}
export const productReducer = createReducer(inititalProductState, {
    ALL_PRODUCT_REQUEST: (state, payload) => {
        return {
            loading: true,
            product: []
        }
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
        return {
            loading: false,
            products: action.payload.products,
            productCount: action.payload.productCount,
            resultPerPage: action.payload.resultPerPage,
        }
    },
    ALL_PRODUCT_FAIL: (state, action) => {
        return {
            loading: false,
            error: action.payload
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },

});

const inititalproductDetailsState = {
    product: []
}
export const productDetailsReducer = createReducer(inititalproductDetailsState, {
    PRODUCT_DETAILS_REQUEST: (state, action) => {
        return {
            loading: true,
            ...state,
        }
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
        return {
            loading: false,
            product: action.payload.product,
        }
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
        return {
            loading: false,
            error: action.payload,
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
})