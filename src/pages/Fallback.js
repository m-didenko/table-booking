import React from 'react';

const Fallback = () => {
    const containerStyle = {
        minHeight: 'calc(100vh - 350px)',
        alignContent: 'center',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <h1>This page is under construction. Please check back later.</h1>
        </div>
    );
};

export default Fallback;

