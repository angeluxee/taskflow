import React, { createContext, useContext, useState, useEffect } from "react"; 
import { AuthContext } from "./AuthProvider"; 

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const BACKEND = process.env.REACT_APP_API;
    const { token } = useContext(AuthContext);

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
                if(response.ok){
                    fetchBoards();
                }
            }
        }catch(error){
            console.error("Error adding board:", error);

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
                if(response.ok){
                    fetchBoards();
                }
            }
        }catch(error){
            console.error("Error editing board:", error);

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
        
                if (!response.ok) {
                    throw new Error('Failed to create list');
                }
                
                fetchBoards();
                console.log('List created successfully');
                
            }
        } catch (error) {
            console.error("Error adding list:", error);
        }
    };
    const deleteList = async (board_id, list_id) => {
        try {
            if(board_id, list_id){
                const response = await fetch(`${BACKEND}/api/${board_id}/${list_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Failed to delete list');
                }
                
                fetchBoards();
                console.log('List deleted successfully');
                
            }
        } catch (error) {
            console.error("Error deleting list:", error);
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
    
            if (!response.ok) {
                throw new Error('Failed to create note');
            }
            
            fetchBoards();
            console.log('Note created successfully');
            
        } catch (error) {
            console.error("Error adding note:", error);
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
    
                if (response.ok) {
                    const data = await response.json();
                    fetchBoards();
                    console.log(data.message); 
                } else {
                    console.error("Error editing note");
                }
            }
        } catch (error) {
            console.error("Error editing note:", error);
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
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message); 
                    fetchBoards();
                } else {
                    console.error("Error editing note");
                }
            }
        } catch (error) {
            console.error("Error editing note:", error);
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
                    console.log(storedBoardId)
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
            }
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [token]); 
    // useEffect(() => {
    //     const storedBoardId = localStorage.getItem('selectedBoardId');
    //     if (storedBoardId) {
    //         const board = boards.find(b => b._id.$oid === storedBoardId);
    //         if (board) {
    //             setSelectedBoard(board);
    //         }
    //     }
    // }, [boards]);
    return (
        <BoardContext.Provider value={{ boards, selectedBoard, fetchBoards, setSelectedBoard, addNote, editNote, deleteNote, addList, deleteList, editBoard, addBoard}}>
            {children}
        </BoardContext.Provider>
    );
};
