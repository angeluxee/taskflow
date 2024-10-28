import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import TaskFlowLogo from '../assets/taskflow.png';
import editIcon from '../assets/edit.png';

export const BoardList = () => {
    const { boards, setSelectedBoard, editBoard, selectedBoard, addBoard, deleteBoard } = useContext(BoardContext);
    const [title, setTitle] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [boardId, setBoardId] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [boardToDelete, setBoardToDelete] = useState(null);

    const handleBoardClick = (board) => {
        console.log(`Selected board ID: ${board._id.$oid}`);
        localStorage.setItem('selectedBoardId', board._id.$oid);
        setSelectedBoard(board);
    };

    const handleBlur = async () => {
        if (title.trim() !== '' && title != originalTitle) {
            await editBoard(boardId, title);
        }
        setBoardId('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title.trim() !== '' && title != originalTitle) {
            await editBoard(boardId, title);
        }
        setBoardId('');
    };

    return (
        <div className="bg-boardList h-full p-6">
            <div className="p-4 mb-10">
                <img src={TaskFlowLogo} alt="Task Flow Logo" />
            </div>
            <div>
                <h1 className="text-lg font-bold mb-4 text-white">Your boards</h1>
            </div>
            <ul className="space-y-2">
                {boards && boards.map(board => (
                    <li key={board._id.$oid} className="border group relative border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        {boardId === board._id.$oid ? (
                         <div className="relative"> 
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} 
                                    onBlur={handleBlur} 
                                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300"
                                    autoFocus
                                />
                            </form>
                        </div>
                            
                        ) : (
                            <div>
                            <button
                                onClick={() => handleBoardClick(board)}
                                className={`w-full text-left px-4 py-2 rounded-lg bg-white hover:bg-gray-100 focus:outline-none transition-colors duration-200 ${
                                    selectedBoard && selectedBoard._id.$oid === board._id.$oid
                                        ? 'ring-2 ring-focus'
                                        : ''
                                }`}
                            >
                                {board.title}
                            </button>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <img
                                    className="h-6 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full cursor-pointer"
                                    src={editIcon}
                                    alt="Edit icon"
                                    onClick={() => {
                                        setTitle(board.title);
                                        setOriginalTitle(board.title);
                                        setBoardId(board._id.$oid);
                                    }}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => {
                                        setBoardToDelete(board._id.$oid);
                                        setDeleting(true)
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>

                        )}
     
                    </li>
                ))}
                    <li className="border group relative border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <button
                                onClick={async () => {
                                    await addBoard('New Board');
                                }}
                                className="w-full font-semibold text-boardList text-center px-4 py-2 rounded-lg bg-white hover:bg-gray-200 focus:outline-none transition-colors duration-200"
                        >
                            New Board +
                        </button>
                    </li>
            </ul>

            {deleting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
                        <p className="mb-6">Do you really want to delete this board?</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-600"
                            onClick={async () => {
                                await deleteBoard(boardToDelete);
                                setDeleting(false);

                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => {
                                setDeleting(false);
                            }}
                            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
