import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeadPage from './pages/DeadPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<DeadPage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
