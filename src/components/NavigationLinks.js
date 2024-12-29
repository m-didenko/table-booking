import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/order-online', label: 'Order Online' },
    { path: '/login', label: 'Login' },
];

const NavigationLinks = ({ onClick }) => {
    const location = useLocation();

    return (
        <ul>
            {links.map((link) => (
                <li key={link.path}>
                    <Link
                        to={link.path}
                        onClick={onClick}
                        className={location.pathname === link.path ? 'active' : ''}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavigationLinks;
