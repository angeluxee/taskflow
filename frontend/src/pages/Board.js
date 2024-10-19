import { React, useState, useEffect } from "react";
import { NoteList } from '../components/NoteList';

const BACKEND = process.env.REACT_APP_API;

export const Board = () => {
    const [notes, setNotes] = useState([]);
    const [types, setTypes] = useState({'To do': 'red', 'Doing': 'blue', 'Done': 'green'});

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${BACKEND}/note`, {
                method: 'GET',
            });
            setNotes(await response.json());
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const updateNotes = async () => {
        await fetchNotes();
    };

    return (
        <div>
            <h1 className="text-center m-12 font-bold text-2xl">Enjoy</h1>
            <div className="m-auto grid grid-cols-3 space-x-4 sm:w-3/4 xl:w-2/4">
                {Object.entries(types).map(([type, color]) => (
                    <NoteList 
                        key={type} 
                        notes={notes} 
                        type={type} 
                        color={color} 
                        updateNotes={updateNotes} 
                    />
                ))}
            </div>
        </div>
    );
}
