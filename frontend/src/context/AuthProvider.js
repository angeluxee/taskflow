import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const BACKEND = process.env.REACT_APP_API;
    const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await fetch(`${BACKEND}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            });
            if(response.ok){
                const data = await response.json()
                localStorage.setItem("accessToken", data.access_token);
                setToken(data.access_token);
                setUser(data.user)
                navigate('/boards')
                // localStorage.setItem("refreshToken", response.data.refresh);
                return true; 
            }

        } catch (error) {
            console.error("Login failed", error);
            return false; 
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('accessToken');
    }

    const register = async (username, email, password, confPassword) => {
        if (password !== confPassword) {
            console.error("The passwords do not match. Please try again.");
            toast.error('The passwords do not match. Please try again.')
            return false; 
        }
        try {
            console.log(username, email, password, confPassword)
            const response = await fetch(`${BACKEND}/api/register`, {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),

            });
            if(response.ok){
                return await login(email, password);; 
            }else{
                const error = await response.json()
                console.log(error.error)
                toast.error(error.error)
            }
        } catch (error) {
            toast.error("Register failed");
            console.error("Register failed", error);
            return false; 
        }
    };
    const checkAuthentication = async () => {
        if (!token) {
            logout();
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND}/api/token/verify`, {
                method : 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(!response.ok){
                toast.error('Your session has expired. Please login again.');
                logout();
            }else {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            logout();
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        checkAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider value={{token, user, loading, login, register, logout, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};
