import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { List } from "./List";

export const Board = () => {
    const { selectedBoard, addList } = useContext(BoardContext);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (selectedBoard) {
            setLists(selectedBoard.lists);
        }
    }, [selectedBoard]);
    const addNewList = async () => {
        try {
            await addList(selectedBoard._id.$oid, 'New List');
        } catch (error) {
            console.error("Error creating new note:", error);
        }
    };
    return (
        <div className="h-full bg-gray-500"> 
            <div className="bg-gray-100 p-4 mb-10">
                <h1>{selectedBoard ? selectedBoard.title : 'Selecciona un tablero'}</h1>
            </div>
            <div className="flex p-4 space-x-4 overflow-x-auto"> 
                {lists.map(list => (
                    <List key={list._id.$oid} list={list} />
                ))}
                <button 
                className="flex bg-gray-100 p-4 rounded-lg cursor-pointer h-12 w-72 hover:bg-gray-200  justify-center items-center"
                onClick={addNewList}
                >
                    Add new list
                </button>
            </div>
        </div>
    );
};
