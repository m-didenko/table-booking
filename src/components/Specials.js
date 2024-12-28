import React from "react";
import greekSalad from '../assets/greek-salad.jpg';
import bruschetta from '../assets/bruchetta.svg';
import lemonDessert from '../assets/lemon-dessert.jpg';
import './Specials.css'

function Specials() {
    const specials = [
        {
            id: 1,
            image: greekSalad,
            name: "Greek Salad",
            price: "$12.99",
            description: "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        },
        {
            id: 2,
            image: bruschetta,
            name: "Bruschetta",
            price: "$5.99",
            description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
        },
        {
            id: 3,
            image: lemonDessert,
            name: "Lemon Dessert",
            price: "$5.00",
            description: "This comes straight from grandma's recipe book. Every last ingredient has been sourced and is as authentic as can be imagined.",
        },
    ];

    return (
        <section>
            <h2 style={{ marginTop: "5rem" }}>This week specials!</h2>
            <div className="specials-container">
                {specials.map((special) => (
                    <div className="special-item" key={special.id}>
                        <img src={special.image} alt={special.name} />
                        <h3>{special.name} <span className="price">{special.price}</span></h3>
                        <p>{special.description}</p>
                        <button className="button-primary">Order a delivery</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Specials;
