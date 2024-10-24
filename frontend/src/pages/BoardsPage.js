import { BoardList } from "../components/BoardList";
import { Board } from "../components/Board";

export const BoardsPage = () => {
    return (
        <div className="grid grid-cols-8 h-screen"> 
            <div className="col-span-1 ">
                <BoardList />
            </div>
            <div className="col-span-7 h-full"> 
                <Board />
            </div>
        </div>
    );
};
