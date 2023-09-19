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
});



const initialAllOrdersState = {
    orders: [],
}
export const allOrdersReducer = createReducer(initialAllOrdersState, {
    ALL_ORDERS_REQUEST: (state, action) => {
        return {
            loading: true
        }
    },
    ALL_ORDERS_SUCCESS: (state, action) => {
        return {
            loading: false,
            orders: action.payload
        }
    },
    ALL_ORDERS_FAIL: (state, action) => {
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


const OrdersState = {}
export const OrdersReducer = createReducer(OrdersState, {
    UPDATE_ORDER_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isUpdated: action.payload
        }
    },
    UPDATE_ORDER_RESET: (state, action) => {
        return {
            ...state,
            isUpdated: false
        }
    },
    UPDATE_ORDER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    DELETE_ORDER_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },

    DELETE_ORDER_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isDeleted: action.payload
        }
    },
    DELETE_ORDER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },
    DELETE_ORDER_RESET: (state, action) => {
        return {
            ...state,
            isDeleted: false
        }
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    }
})
