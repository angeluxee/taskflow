import React from "react";
const BACKEND = process.env.REACT_APP_API;

export const getBoard = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BACKEND}/board`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
            throw new Error('Error fetching board data');
        }

        const data = await response.json();  
        return data;  
        
    } catch (error) {
        console.error('Error fetching board:', error);
        return null;  
    }
}
