import logo from './assets/logo.svg';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Little Lemon Logo" />
            </div>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
                    <li><Link to="/reservations" onClick={closeMenu}>Reservations</Link></li>
                    <li><Link to="/order-online" onClick={closeMenu}>Order Online</Link></li>
                    <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                </ul>
            </nav>
            <button className="burger" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
}

export default Header;
