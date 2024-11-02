import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoutes = () => {
    const { user, loading } = useContext(AuthContext); 

    if (loading) {
        return <div>Verificando autenticación...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;