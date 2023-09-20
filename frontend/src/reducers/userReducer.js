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




    UPDATE_USER_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    UPDATE_USER_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isUpdated: action.payload,
        }
    },
    UPDATE_USER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    },
    UPDATE_USER_RESET: (state, action) => {
        return {
            ...state,
            isUpdated: false,
        }
    },
    DELETE_USER_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true
        }
    },
    DELETE_USER_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            isDeleted: action.payload.success,
            message: action.payload.message
        }
    },
    DELETE_USER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    },
    DELETE_USER_RESET: (state, action) => {
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



// All User Reducer

const inititalALLUserState = {
    users: []
}
export const allUserReducer = createReducer(inititalALLUserState, {
    ALL_USERS_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
        }
    },
    ALL_USERS_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            users: action.payload,
        };
    },
    ALL_USERS_FAIL: (state, action) => {
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


// User Details Reducer

const inititalUserDetailsState = {
    user: {}
}
export const userDetailsReducer = createReducer(inititalUserDetailsState, {
    USER_DETAILS_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
        }
    },
    USER_DETAILS_SUCCESS: (state, action) => {
        return {
            ...state,
            loading: false,
            user: action.payload,
        };
    },
    USER_DETAILS_FAIL: (state, action) => {
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


