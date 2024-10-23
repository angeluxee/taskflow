import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoutes = () => {
    const { user, loading } = useContext(AuthContext); 

    if (loading) {
        return <div>Verificando autenticación...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;