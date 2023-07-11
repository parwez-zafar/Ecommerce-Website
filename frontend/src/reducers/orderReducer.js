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
            loading: true,
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