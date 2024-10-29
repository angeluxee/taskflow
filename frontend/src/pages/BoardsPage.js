import { BoardList } from "../components/BoardList";
import { Board } from "../components/Board";

export const BoardsPage = () => {
    return (
        <div className="h-screen flex flex-col sm:grid sm:grid-cols-8">
            <div className="sm:col-span-2 xl:col-span-1 order-first lg:order-first">
                <BoardList />
            </div>
            <div className="sm:col-span-6 xl:col-span-7 h-full">
                <Board />
            </div>
        </div>
    );
};
