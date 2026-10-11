import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import PlaceDetails from './pages/PlaceDetails';
import Friends from './pages/Friends';
import FriendRequests from './pages/FriendRequests';
import UserProfile from './pages/UserProfile';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Marketing & Auth Preview Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Application Core Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/places/:id" element={<PlaceDetails />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/requests" element={<FriendRequests />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/profile" element={<MyProfile />} />

        {/* 404 Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
