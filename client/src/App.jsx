import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Verification from './components/Verification';
import Home from './components/Home';
import ShowListing from './components/ShowListing';
import SellerHome from './components/seller/SellerHome';
import CreateListing from './components/seller/CreateListing';
import UpdateListing from './components/seller/UpdateListing';
import AppBar from './components/AppBar';
import Chat from './components/Chat';
import Gig from './components/Gig';
import CreateGig from './components/CreateGig';
import MyGigs from './components/MyGigs';
import UpdateGig from './components/UpdateGig';
import Inbox from './components/Inbox';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import Footer from './components/Footer';
import About from './components/About';

export const base_url = import.meta.env.VITE_BASE_URL;

export default function App() {

  return (
    <div className="min-h-screen bg-white">
      <Router>
        <AppBar />
        <div className="flex ">
          <div className="flex flex-col w-full mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home/updateprofile" element={<UpdateProfile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/gigs" element={<Gig />} />
              <Route path="/home/:id" element={<ShowListing />} />
              <Route path="/home/mygigs" element={<MyGigs />} />
              <Route path="/update-gig/:id" element={<UpdateGig />} />
              <Route path="/home/create-gig" element={<CreateGig />} />
              <Route path="/home/:id/chat" element={<Chat />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/seller/home" element={<SellerHome />} />
              <Route path="/seller/create-listing" element={<CreateListing />} />
              <Route path="/seller/update-listing/:id" element={<UpdateListing />} />
              <Route path="/About" element={<About />} />
            </Routes>
            <Footer/>
          </div>
        </div>
      </Router>
    </div>
  );
}

library.add(fab, fas, far)