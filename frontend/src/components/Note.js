import React, { useState, useContext} from "react";
import editIcon from '../assets/edit.png';
import binIcon from '../assets/bin.png';
import { BoardContext } from "../context/BoardContext";
export const Note = ({ list_id, note, updateNotes }) => {
    const {editNote, deleteNote, selectedBoard} = useContext(BoardContext);
    const [edit, setEdit] = useState(false); 
    const [title, setTitle] = useState(note.title); 
    const [description, setDescription] = useState(note.description); 
    const BACKEND = process.env.REACT_APP_API;
    const [originalTitle, setOriginalTitle] = useState(note.title);
    const [originalDescription, setOriginalDescription] = useState(note.description);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(title === originalTitle && description === originalDescription){
                console.log('Sin cambios')
            }else{
                await editNote(selectedBoard._id.$oid, list_id, note._id.$oid, title, description);
                setOriginalTitle(title) ;
                setOriginalDescription(description);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const secondHandleSubmit = async (event) => {
        handleSubmit(event);
        openMenu();
    }
    const handleDelete = async (event) => {
        event.preventDefault(); 

        try {
            deleteNote(selectedBoard._id.$oid, list_id, note._id.$oid)            
        } catch (error) {
            console.error('Error:', error); 
        }
    };
    
    const openMenu = () => {
        setEdit(!edit);
    };
    const resetDefault = () => {
        setTitle(originalTitle);
        setDescription(originalDescription);
    }
    const handleDragStart = (event) => {
        const noteInfo = JSON.stringify({
            id: note._id.$oid,
            title: note.title,
            description: note.description,
            list_id: list_id,
            board_id: selectedBoard._id.$oid
        });
    
        event.dataTransfer.setData('noteInfo', noteInfo); 

    };
    

        return (
        <>
            <form 
                className="border bg-white rounded-lg shadow-md mt-2 grid p-2 group relative" 
                onSubmit={handleSubmit} 
                draggable 
                onDragStart={handleDragStart}
                style={{ overflow: 'hidden' }} 
            >
                <img 
                    className="h-6 p-1 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full cursor-pointer" 
                    src={editIcon}
                    alt="Edit icon"
                    onClick={() => setEdit(!edit)} 
                />
                <input 
                    type="text" 
                    className="text-lg font-bold outline-none hover:bg-gray-50 rounded-lg p-2 w-full" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    onBlur={handleSubmit}
                />
                <p 
                    className="outline-none rounded-lg p-2 w-full max-h-max overflow-y-auto" 
                    style={{ 
                        whiteSpace: 'pre-wrap', 
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word' 
                    }} 
                >
                    {description}
                </p>

                {/* <input 
                    type="text" 
                    className="outline-none hover:bg-gray-50 rounded-lg p-2 w-full" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    onBlur={handleSubmit} 
                /> */}
            </form>

            {edit && (
                <div className="fixed inset-0 bg-blue-100 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="p-6 rounded-2xl shadow-lg w-2/4 bg-fuchsia-50">
                        <form onSubmit={secondHandleSubmit}>
                            <div className="flex">
                                <h2 className="text-xl font-bold mb-4">Edit Note</h2>
                                <button
                                    onClick={handleDelete}
                                    className="ml-auto p-2 bg-red-200 hover:bg-red-300 text-red-700 rounded-full w-10 h-10 flex items-center justify-center transition duration-300 ease-in-out"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input 
                                    id="title" 
                                    type="text" 
                                    className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 outline-none focus:bg-gray-100"
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea 
                                    id="description" 
                                    className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 outline-none focus:bg-gray-100"
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    rows={6}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500 transition duration-300 ease-in-out" 
                                    onClick={() => {
                                        openMenu();     
                                        resetDefault(); 
                                    }}                                
                                    >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 ease-in-out"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
