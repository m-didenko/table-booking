import React from 'react';
import { Link } from 'react-router-dom';

const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/order-online', label: 'Order Online' },
    { path: '/login', label: 'Login' },
];

const NavigationLinks = ({ onClick }) => {
    return (
        <ul>
            {links.map((link) => (
                <li key={link.path}>
                    <Link to={link.path} onClick={onClick}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavigationLinks;