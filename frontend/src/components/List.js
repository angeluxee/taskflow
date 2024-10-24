import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { Note } from "./Note";
export const List = ({list}) => {
    const { selectedBoard, addNote, deleteNote, deleteList } = useContext(BoardContext);
    const [editingList, setEditingList] = useState(false)

    const handleDrop = async (event) => {
        event.preventDefault(); 
        const noteInfo = JSON.parse(event.dataTransfer.getData('noteInfo'));
        try {
            await deleteNote(noteInfo.board_id, noteInfo.list_id, noteInfo.id);
            await addNote(noteInfo.board_id, list._id.$oid, noteInfo.title, noteInfo.description)

        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDelete = async () => {
        await deleteList(selectedBoard._id.$oid, list._id.$oid);
    };
    return (
        <div 
            className="bg-gray-100 p-4 rounded-xl w-72 flex-shrink-0 h-fit max-h-full"
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
        >
            <div className="flex items-center justify-between text-sm font-semibold"> 
                <div className="flex items-center space-x-2"> 
                    <div 
                        className={`bg-${list.color}-300 rounded-full p-1 px-2 text-gray-700 flex items-center space-x-1`}
                        onClick={() => {
                            setEditingList(true)
                        }}
                    >
                        <span className={`h-2.5 w-2.5 bg-${list.color}-400 rounded-full`}></span>
                        <span>{list.title}</span>
                    </div>
                    <span className="text-gray-400">12</span>
                </div>
                <button
                    onClick={handleDelete}
                    className="p-2 hover:bg-gray-200 text-gray-300 rounded-full w-10 h-10 flex transition duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
    
            {list.notes.map((note => (
                <Note key={note._id.$oid} list_id={list._id.$oid} note={note} />
            )))}
            <div className="mt-2 flex justify-center">
                <button 
                    className="text-gray-500 border border-gray-300 rounded-md w-full py-2 transition hover:bg-gray-50"
                    onClick={async () => {
                        await addNote(selectedBoard._id.$oid, list._id.$oid);
                    }}
                >
                    + Add
                </button>
            </div>
        </div>
    );
    
};
