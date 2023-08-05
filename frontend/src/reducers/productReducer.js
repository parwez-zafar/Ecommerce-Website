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

const inititalProductsState = {
    products: []
}
export const productsReducer = createReducer(inititalProductsState, {
    ALL_PRODUCT_REQUEST: (state, action) => {
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
            filteredProductsCount: action.payload.filteredProductsCount,
        }
    },
    ALL_PRODUCT_FAIL: (state, action) => {
        return {
            loading: false,
            error: action.payload
        }
    },
    ADMIN_PRODUCT_REQUEST: (state, action) => {
        return {
            loading: true,
            product: []
        }
    },
    ADMIN_PRODUCT_SUCCESS: (state, action) => {
        return {
            loading: false,
            products: action.payload,
        }
    },
    ADMIN_PRODUCT_FAIL: (state, action) => {
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
});



const initialNewProductState = {

}

export const newProductReducer = createReducer(initialNewProductState, {
    NEW_PRODUCT_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
        return {
            loading: false,
            success: action.payload.success,
            product: action.payload.product
        }
    },
    NEW_PRODUCT_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    NEW_PRODUCT_RESET: (state, action) => {
        return {
            ...state,
            success: false,
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
})



const inititalProductState = {

}

export const productReducer = createReducer(inititalProductState, {
    DELETE_PRODUCT_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isDeleted: action.payload
        }
    },
    DELETE_PRODUCT_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    DELETE_PRODUCT_RESET: (state, action) => {
        return {
            ...state,
            isDeleted: false,
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
})

const initialNewReviewState = {

}

export const newReviewReducer = createReducer(initialNewReviewState, {
    NEW_REVIEW_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
        return {
            loading: false,
            success: action.payload
        }
    },
    NEW_REVIEW_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    NEW_REVIEW_RESET: (state, action) => {
        return {
            ...state,
            success: false,
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    },
})