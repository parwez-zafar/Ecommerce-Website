import axios from 'axios';
import {
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from '../constants/userConstants';
const token = localStorage.getItem('authToken');
// Login User
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }

        }
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );
        // console.log("user ", data.token);
        localStorage.setItem('authToken', data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}

// Register User
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/register`, userData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
    }
    catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}


// Load user
export const loadUser = () => async (dispatch) => {
    // console.log("auth token", localStorage.getItem('authToken'));
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const config = {

            headers: {
                authorization: localStorage.getItem('authToken'),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }

        }
        const { data } = await axios.get(`/api/v1/me`, config)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.message });
    }
}



// LOGOUT user
export const logout = () => async (dispatch) => {
    try {


        localStorage.removeItem('authToken')
        await axios.get(`/api/v1/logout`)
        // localStorage.setItem('aut')

        dispatch({ type: LOGOUT_SUCCESS });
    }
    catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.message });
    }
}



//Update Profile
export const updateUserProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });


        const config = {

            headers: {
                authorization: localStorage.getItem('authToken'),
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            }

        }
        console.log("entered", userData);
        const { data } = await axios.put(`/api/v1/me/update`, userData, config);
        console.log("Data is ", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        // console.log(error);
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
}




//Update Password
export const updateUserPassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {

            headers: {
                authorization: localStorage.getItem('authToken'),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }

        }

        const { data } = await axios.put(`/api/v1/password/update`, password, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
}


// forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        );
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    }
    catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
    }
}




// reset Password
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        //  const config = { headers: { "Content-Type": "multipart/form-data" } };
        // const config = { headers: { "Content-Type": "multipart/form-data" } };
        const config = { headers: { "Content-Type": "application/json", "authorization": token } }


        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            password,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
}




// get all users (Admin)
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        };
        const { data } = await axios.get(`/api/v1/admin/users`, config)
        // console.log("data in action", data);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    }
    catch (error) {
        // console.log(error.response.data.message);
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
}

// get users Details (Admin)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        };
        const { data } = await axios.get(`/api/v1/admin/user/${id}`, config)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.message });
    }
}



//Update user (Admin)
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json", "authorization": token } };

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}




//Delete user (Admin)
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        };

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`, config);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}



