import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Board } from './pages/Board';
import { BoardsPage } from './pages/BoardsPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { AuthProvider } from './context/AuthProvider'; 
import { BoardProvider } from './context/BoardContext'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <BoardProvider>
          <Routes>
            <Route path='/' element={<Board />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/boards' element={<BoardsPage />} />
              <Route path='/board' element={<Board />} /> 
            </Route>
          </Routes>
        </BoardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
