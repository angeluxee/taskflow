import React, { useContext, useEffect } from "react";
import { BoardContext } from "../context/BoardContext";

export const BoardList = () => {
    const { boards, setSelectedBoard } = useContext(BoardContext);

    // useEffect(async () => {
    //     setSelectedBoard(board)

    // }, []); 

    const handleBoardClick = (board) => {
        console.log(`Selected board ID: ${board}`);
        setSelectedBoard(board)
    };

    return (
        <div className="bg-gray-600 h-full">
            <h1>Boards</h1>
            <ul>
                {boards && boards.map(board => (
                    <li key={board._id.$oid}>
                        <button onClick={() => handleBoardClick(board)}>
                            {board.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
