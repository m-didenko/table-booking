// StarComponent.jsx

import React from 'react';
import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';
import './About.css'

const About = () => {
    return (
        <div className="about-container">
            <div className="about-text-section">
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
            </div>
            <div className="about-image-section">
                <img src={about1} alt="Chefs talking in kitchen" />
                <img src={about2} alt="Kitchen interior" />
            </div>
        </div>
    );
};

export default About;