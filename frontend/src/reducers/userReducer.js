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






const inititalProfileState = {}
export const profileReducer = createReducer(inititalProfileState, {
    UPDATE_PROFILE_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isUpdated: action.payload,
        };
    },
    UPDATE_PROFILE_RESET: (state, action) => {
        return {
            ...state,
            isUpdated: false,
        };
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },

    UPDATE_PASSWORD_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isUpdated: action.payload,
        };
    },
    UPDATE_PASSWORD_RESET: (state, action) => {
        return {
            ...state,
            isUpdated: false,
        };
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        }
    }

});





const inititalForgotPasswordState = {}
export const forgotPasswordReducer = createReducer(inititalForgotPasswordState, {
    FORGOT_PASSWORD_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            message: action.payload,
        };
    },
    FORGOT_PASSWORD_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
        }
    },

    RESET_PASSWORD_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            success: action.payload
        }
    },

    RESET_PASSWORD_FAIL: (state, action) => {
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
    }

});