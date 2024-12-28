import React from 'react';
import person1 from '../assets/person1.png';
import person2 from '../assets/person2.png';
import person3 from '../assets/person3.png';
import person4 from '../assets/person4.png';
import Star from './Star';
import './PeopleSay.css'

function PeopleSay() {
    const reviews = [
        {
            id: 1,
            image: person2,
            name: "Maria Sanchez",
            rating: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            image: person1,
            name: "Antony Clifton",
            rating: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 3,
            image: person4,
            name: "Tamika Jackson",
            rating: 4,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 4,
            image: person3,
            name: "Brandon Ming",
            rating: 5,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ];

    return (
        <section className="people-say-section">
            <h2>What people say about us!</h2>
            <div className="people-say-container">
                {reviews.map((review) => (
                    <div className="people-say-item" key={review.id}>
                        <img src={review.image} alt={review.name} />
                        <h3>{review.name}</h3>
                        <Star count={review.rating} />
                        <p>"{review.text}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PeopleSay;
