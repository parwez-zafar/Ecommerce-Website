// import React from 'react'
// import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

export const ProtectedRoute = ({ isAdmin, children }) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const alert = useAlert();
    if (loading)
        return <Loader />



    if (isAdmin === true) {
        if (isAdmin === true && user && user.role === 'admin') {
            return children;
        }
        else {
            alert.error("Only Admin Can Access This SECTION")
            navigate('/account')
        }
    }
    else {
        if (isAuthenticated) {
            return children;
        }
        else {
            navigate('/login')
        }
    }

}
