import { createReducer } from "@reduxjs/toolkit";

const inititalProductState = {
    user: {}
}
export const userReducer = createReducer(inititalProductState, {
    LOGIN_REQUEST: (state, action) => {
        return {
            loading: true,
            isAuthenticated: false,
        };
    },
    LOGIN_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        }
    },
    LOGIN_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
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