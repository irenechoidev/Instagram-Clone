import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeadPage from './pages/DeadPage';
import Likes from './pages/Likes';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/likes/:postId' element={<Likes />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<DeadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
