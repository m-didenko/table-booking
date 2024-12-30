import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Booking from './pages/Booking';
import Fallback from "./pages/Fallback";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<Fallback />} />
                <Route path="/menu" element={<Fallback />} />
                <Route path="/reservations" element={<Booking />} />
                <Route path="/order-online" element={<Fallback />} />
                <Route path="/login" element={<Fallback />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
