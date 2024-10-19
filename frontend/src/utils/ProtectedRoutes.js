import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const ProtectedRoutes = () => {
    const BACKEND = process.env.REACT_APP_API;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                
                const response = await axios.post(`${BACKEND}/api/token/verify`, {}, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                setIsAuthenticated(response.data.valid);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (loading) {
        return <div>Verificando autenticación...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;