import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Board } from './pages/Board';
import { Login } from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Board/>} />
            <Route path='/login' element={<Board/>} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/profile' element={<Login/>} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
