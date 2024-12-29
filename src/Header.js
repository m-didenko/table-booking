import logo from './assets/logo.svg';

import React, { useState } from 'react';
import NavigationLinks from "./components/NavigationLinks";
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
                <NavigationLinks onClick={closeMenu} />
            </nav>
            <button className="burger" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
}

export default Header;
