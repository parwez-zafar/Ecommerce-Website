// import React from 'react'
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAdmin, children: children }) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const alert = useAlert();
    if (loading === false) {

        if (isAdmin === true) {
            if (isAdmin === true && user.role === 'admin') {
                return children;
            }
            else {
                alert.error("Only Admin Can Access This URL")
                navigate('/login')
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
}
