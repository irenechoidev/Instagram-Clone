import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeadPage from './pages/DeadPage';
import Followers from './pages/Followers';
import Likes from './pages/Likes';
import Register from './pages/Register';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/followers/:username' element={<Followers />} />
        <Route path='/likes/:postId' element={<Likes />} />
        <Route path='/post/:postId' element={<PostDetails />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<DeadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
