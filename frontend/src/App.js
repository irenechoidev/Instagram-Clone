import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeadPage from './pages/DeadPage';
import Likes from './pages/Likes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/likes/:postId' element={<Likes />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<DeadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
