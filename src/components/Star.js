// StarComponent.jsx

import React from 'react';
import star from '../assets/star.png';

const Star = ({ count }) => {
    // Create an array of the given count
    const starsArray = Array.from({ length: count });

    return (
        <div style={{ gap: '1px' }}>
            {starsArray.map((_, index) => (
                <img key={index} src={star} alt="star" style={{ width: '12px', height: '12px' }} />
            ))}
        </div>
    );
};

export default Star;