import { createReducer } from "@reduxjs/toolkit";

const inititalUserState = {
    user: {}
}
export const userReducer = createReducer(inititalUserState, {
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
    REGISTER_USER_REQUEST: (state, action) => {
        return {
            loading: true,
            isAuthenticated: false,
        };
    },
    REGISTER_USER_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        }
    },
    REGISTER_USER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        }
    },

    LOAD_USER_REQUEST: (state, action) => {
        return {
            loading: true,
            isAuthenticated: false,
        };
    },
    LOAD_USER_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        }
    },
    LOAD_USER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        }
    },
    LOGOUT_SUCCESS: (state, action) => {
        return {
            loading: false,
            user: null,
            isAuthenticated: false
        }

    },

    LOGOUT_FAIL: (state, action) => {
        return {
            ...state,
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
