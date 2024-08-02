import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeadPage from './pages/DeadPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<DeadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
