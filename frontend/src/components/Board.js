import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { AuthContext } from "../context/AuthProvider";
import { List } from "./List";

export const Board = () => {
    const { selectedBoard, addList } = useContext(BoardContext);
    const { logout } = useContext(AuthContext);
    const [lists, setLists] = useState([]);
    const [addingList, setAddingList] = useState(false);

    const colors = [
        'rose',
        'amber',
        'emerald',
        'cyan',
        'indigo',
        'teal',
        
    ]
    useEffect(() => {
        if (selectedBoard) {
            setLists(selectedBoard.lists);
        }
    }, [selectedBoard]);
    const addNewList = async (color) => {
        try {
            await addList(selectedBoard._id.$oid, 'New List', color);
            setAddingList(false)
        } catch (error) {
            console.error("Error creating new note:", error);
        }
    };
    return (
        <div className="h-full bg-board flex flex-col"> 
            <div className="bg-gray-100 p-4 mb-10 flex items-center">
                <h1 className="text-lg font-bold text-gray-700">{selectedBoard ? selectedBoard.title : 'Selecciona un tablero'}</h1>
                <button 
                    className="ml-auto mr-4 bg-red-200 p-2 rounded-lg px-4 hover:bg-red-300 transition duration-300 text-gray-800 font-semibold "
                    onClick={() =>{
                        logout();
                    }}
                    >
                    
                    Log out
                </button>
            </div>
            <div className="flex p-4 space-x-4 overflow-x-auto overflow-y-hidden flex-grow">
                {lists.map(list => (
                    <List key={list._id.$oid} list={list} />
                ))}
                {addingList ? (
                    <div className="flex bg-gray-100 p-4 rounded-lg cursor-pointer h-12 w-72 items-center justify-center gap-4">
                        {colors.map(color => (
                            <button 
                            key={color}
                            className={`bg-${color}-300 w-8 h-8 rounded-md`}
                            onClick={() => {
                                addNewList(color);
                            }}
                            ></button>

                        ))}
                    </div>
                ):(
                    <button 
                    className="flex bg-gray-100 p-4 rounded-lg cursor-pointer h-12 w-72 hover:bg-gray-200 justify-center items-center flex-shrink-0"
                    onClick={() => {
                        setAddingList(true)}
                    }
                    >
                        Add new list
                    </button>
                    
                )}

            </div>
        </div>
    );
};
