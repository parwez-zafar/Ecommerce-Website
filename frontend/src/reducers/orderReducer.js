import { createReducer } from "@reduxjs/toolkit";



const initialState = {

}
export const newOrderReducer = createReducer(initialState, {
    CREATE_ORDER_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
        }
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
        return {
            loading: false,
            order: action.payload,
        }
    },
    CREATE_ORDER_FAIL: (state, action) => {
        return {
            loading: false,
            error: action.payload
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null
        }
    }
})


const initialMyOrdersState = {
    orders: [],
}
export const myOrdersReducer = createReducer(initialMyOrdersState, {
    MY_ORDERS_REQUEST: (state, action) => {
        return {
            loading: true
        }
    },
    MY_ORDERS_SUCCESS: (state, action) => {
        return {
            loading: false,
            orders: action.payload
        }
    },
    MY_ORDERS_FAIL: (state, action) => {
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
    }
})



const initialOrdersDetailsState = {
    orders: {},
}
export const orderDetailsReducer = createReducer(initialOrdersDetailsState, {
    ORDER_DETAILS_REQUEST: (state, action) => {
        return {
            loading: true,
        }
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
        return {
            loading: false,
            order: action.payload
        }
    },
    ORDER_DETAILS_FAIL: (state, action) => {
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
    }
})