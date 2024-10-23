import { BoardList } from "../components/BoardList";
import { Board } from "../components/Board";

export const BoardsPage = () => {
    return (
        <div className="grid grid-cols-8 h-screen"> {/* Contenedor principal con altura de pantalla */}
            <div className="col-span-1"> {/* Ajusta la columna según sea necesario */}
                <BoardList />
            </div>
            <div className="col-span-7 h-full"> {/* Asegúrate de que el Board ocupe toda la altura */}
                <Board />
            </div>
        </div>
    );
};
