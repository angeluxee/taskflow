import React, { createContext, useContext, useState, useEffect } from "react"; 
import { AuthContext } from "./AuthProvider"; 
import toast from 'react-hot-toast';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const BACKEND = process.env.REACT_APP_API;
    const { token, checkAuthentication } = useContext(AuthContext);

    const deleteBoard = async (board_id) => {
        try{
            if(board_id){
                const response = await fetch(`${BACKEND}/api/${board_id}`,{
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },                   
                });
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to delete board");
                    return;
                }
                await fetchBoards();
                toast.success("Board deleted successfully");
            }
        }catch(error){
            console.error("Error deleting board:", error);
            toast.error("An error occurred while deleting the board");
        }
    }

    const addBoard = async (title) => {
        try{
            if(title){
                const response = await fetch(`${BACKEND}/api/board`,{
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },                   
                    body: JSON.stringify({title: title})        
                });
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to create board");
                    return;
                }
                await fetchBoards();
                toast.success("Board created successfully");
            }
        }catch(error){
            console.error("Error adding board:", error);
            toast.error("An error occurred while creating the board");
        }
    }

    const editBoard = async (board_id, title) => {
        try{
            if(board_id && title){
                const response = await fetch(`${BACKEND}/api/${board_id}`,{
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },                   
                    body: JSON.stringify({title: title})
                });
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to update board");
                    return;
                }
                await fetchBoards();
                toast.success("Board updated successfully");
            }
        }catch(error){
            console.error("Error editing board:", error);
            toast.error("An error occurred while updating the board");
        }
    }

    const addList = async (board_id, title, color) => {
        try {
            if(board_id, title){
                const response = await fetch(`${BACKEND}/api/${board_id}/list`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        color: color
                    }) 
                });
        
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to create list");
                    return;
                }
                await fetchBoards();
                toast.success("List created successfully");
            }
        } catch (error) {
            console.error("Error adding list:", error);
            toast.error("An error occurred while creating the list");
        }
    };

    const editList = async (board_id, list_id, title) => {
        try{
            if(board_id && title && list_id){
                const response = await fetch(`${BACKEND}/api/${board_id}/${list_id}`,{
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },                   
                    body: JSON.stringify({title: title})
                });
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to update list");
                    return;
                }
                await fetchBoards();
                toast.success("List updated successfully");
            }
        }catch(error){
            console.error("Error editing list:", error);
            toast.error("An error occurred while updating the list");
        }
    }

    const deleteList = async (board_id, list_id) => {
        try {
            if(board_id, list_id){
                const response = await fetch(`${BACKEND}/api/${board_id}/${list_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to delete list");
                    return;
                }
                await fetchBoards();
                toast.success("List deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting list:", error);
            toast.error("An error occurred while deleting the list");
        }
    };

    const addNote = async (board_id, list_id, title = '', description = '') => {
        try {
            let requestBody = {};
            if (title || description) {
                requestBody = {
                    title: title,
                    description: description
                };
            }
            
            const response = await fetch(`${BACKEND}/api/${board_id}/${list_id}/note`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody) 
            });
    
            if(!response.ok){
                checkAuthentication()
                toast.error("Failed to create note");
                return;
            }
            await fetchBoards();
            toast.success("Note created successfully");
            
        } catch (error) {
            console.error("Error adding note:", error);
            toast.error("An error occurred while creating the note");
        }
    };
    
    const editNote = async (board_id, list_id, note_id, title, description) => {
        try {
            if (board_id && list_id && note_id && title && description) {
                const response = await fetch(`${BACKEND}/api/${board_id}/${list_id}/${note_id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description
                    })
                });
                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to update note");
                    return;
                }
                await fetchBoards();
                toast.success("Note updated successfully");
            }
        } catch (error) {
            console.error("Error editing note:", error);
            toast.error("An error occurred while updating the note");
        }
    };

    const deleteNote = async (board_id, list_id, note_id) => {
        try {
            if (board_id && list_id && note_id) {
                const response = await fetch(`${BACKEND}/api/${board_id}/${list_id}/${note_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if(!response.ok){
                    checkAuthentication()
                    toast.error("Failed to delete note");
                    return;
                }
                await fetchBoards();
                toast.success("Note deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("An error occurred while deleting the note");
        }
    };

    const fetchBoards = async () => {
        try {
            const response = await fetch(`${BACKEND}/api/board`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setBoards(data); 
                const storedBoardId = localStorage.getItem('selectedBoardId');
                if (storedBoardId) {
                    const board = data.find(b => b._id.$oid === storedBoardId);
                    if (board) {
                        setSelectedBoard(board);
                    }
                } else {
                    if (data.length > 0) {
                        setSelectedBoard(data[0]);
                        localStorage.setItem('selectedBoardId', data[0]._id.$oid);
                    }
                }
                return data;  
            } else {
                console.error('Error fetching boards');
                toast.error("Failed to fetch boards");
            }
        } catch (error) {
            console.error('Error fetching boards:', error);
            toast.error("An error occurred while fetching boards");
        }
    };

    useEffect(() => {
        if (token) {
            fetchBoards();
        } else {
            setBoards([]);
            setSelectedBoard(null);
            localStorage.removeItem('selectedBoardId');
        }
    }, [token]); ; 

    return (
        <BoardContext.Provider value={{ boards, selectedBoard, fetchBoards, setSelectedBoard, addNote, editNote, deleteNote, addList, deleteList, editBoard, addBoard, deleteBoard, editList}}>
            {children}
        </BoardContext.Provider>
    );
};