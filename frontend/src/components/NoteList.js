import React from "react";
import { Note } from './Notee';

export const NoteList = ({ notes, type, color, updateNotes }) => {
    const BACKEND = process.env.REACT_APP_API;

    const addEmptyNote = async () => {
        try {
            const newNote = {
                title: "Title",
                description: "Description",
                type: type
            };

            const response = await fetch(`${BACKEND}/note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });
            updateNotes();  
        } catch (error) {
            console.error("Error creating new note:", error);
        }
    };

    const handleDrop = async (event) => {
        event.preventDefault(); 
        const noteInfo = JSON.parse(event.dataTransfer.getData('noteInfo'));
        try {
            const response = await fetch(`${BACKEND}/note/${noteInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title : noteInfo.title,
                    description : noteInfo.description,
                    type : type
                 }), 
            });
            updateNotes();

        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div 
            className="note-list"
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
        >
            <div className="flex items-center space-x-2 text-sm font-semibold">
                <div className={`bg-${color}-300 rounded-full p-1 px-2 text-gray-700 flex items-center space-x-1`}>
                    <span className={`h-2.5 w-2.5 bg-${color}-400 rounded-full`}></span>
                    <span>{type}</span>
                </div>
                <span className="text-gray-400">{notes.filter(note => note['type'] === type).length}/{notes.length}</span>
            </div>
            {notes
                .filter(note => note['type'] === type)
                .map((note) => (
                    <Note key={note['_id']['$oid']} note={note} updateNotes={updateNotes} />
                ))
            }
            <div className="mt-2 flex justify-center">
                <button 
                    className="text-gray-300 border border-gray-300 rounded-md w-full py-2 transition hover:bg-gray-100"
                    onClick={addEmptyNote}
                >
                    + Add
                </button>
            </div>
        </div>
    );
};
