import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
            const data = await response.json()
            localStorage.setItem("accessToken", data.access_token);
            setUser(data.user)
            // localStorage.setItem("refreshToken", response.data.refresh);
            return true; 
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
            console.error("Las contraseñas no coinciden");
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
             
            return await login(email, password);; 
        } catch (error) {
            console.error("Register failed", error);
            return false; 
        }
    };

    useEffect(() => {
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
                    logout();
                    console.log('Error en la respuesta')
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

        checkAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider value={{token, user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
