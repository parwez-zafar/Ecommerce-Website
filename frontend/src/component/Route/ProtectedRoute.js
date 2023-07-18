// import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    if (isAuthenticated) {
        return children;
    }
    else {
        navigate('/login')
    }
}
