import React, { useContext, useEffect } from "react";
import { BoardContext } from "../context/BoardContext";
import { Note } from "./Note";
export const List = ({list}) => {
    const { selectedBoard, addNote, deleteNote } = useContext(BoardContext);
    const color = 'red'
    useEffect(() => {

    }, []); 

    const addEmptyNote = async () => {
        try {
            await addNote(selectedBoard._id.$oid, list._id.$oid);
        } catch (error) {
            console.error("Error creating new note:", error);
        }
    };

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

    return (
        <div 
        className="bg-gray-100 p-4 rounded-xl w-72 "
        onDrop={handleDrop} 
        onDragOver={handleDragOver} 
        >
            <div className="flex items-center space-x-2 text-sm font-semibold">
                <div className={`bg-${color}-300 rounded-full p-1 px-2 text-gray-700 flex items-center space-x-1`}>
                    <span className={`h-2.5 w-2.5 bg-${color}-400 rounded-full`}></span>
                    <span>{list.title}</span>
                </div>
                <span className="text-gray-400">12</span>
            </div>
                {list.notes.map((note => (
                    <Note key={note._id.$oid} list_id={list._id.$oid} note={note}/>
                )))}
            <div className="mt-2 flex justify-center">
                <button 
                    className="text-gray-500 border border-gray-300 rounded-md w-full py-2 transition hover:bg-gray-50"
                    onClick={addEmptyNote}
                >
                    + Add
                </button>
            </div>
        </div>
    );
};
