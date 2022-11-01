import React from 'react'
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/Sidebar/Sidebar';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Playlist from './pages/Playlist/Playlist';
import Watchlater from './pages/WacthLater/Watchlater';
import History from './pages/History/History';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import Liked from "./pages/Liked/Liked";
import Video from "./pages/Video/Video";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className='border-box  scroll-smooth'>
    <BrowserRouter>
    <Toaster
     position="bottom-center"
     reverseOrder={false}
     toastOptions={{
    // Define default options
      duration: 2000,
    }}
    />
       <Navbar />
       <Sidebar />
       <Routes>
          
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/video/:id" element={<Video />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/history" element={<History />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/watchlater" element={<Watchlater/>} />
              <Route path="/liked" element={<Liked/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    </div>

  )
}

export default App