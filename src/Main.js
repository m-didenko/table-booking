import bruschetta from './assets/restaurantfood.jpg';

function Main() {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="text-content">
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                        <button>Reserve a table</button>
                    </div>
                    <div className="image-content">
                        <img src={bruschetta} alt="Bruschetta" />
                    </div>
                </div>
            </section>

            <section>
                <h2>Our Specials</h2>
                <ul>
                    <li>
                        <h3>Grilled Lemon Chicken</h3>
                        <p>Succulent chicken grilled to perfection with a zesty lemon marinade.</p>
                    </li>
                    <li>
                        <h3>Fresh Greek Salad</h3>
                        <p>
                            Crisp vegetables, olives, and feta cheese tossed in a light lemon dressing.
                        </p>
                    </li>
                    <li>
                        <h3>Signature Lemon Tart</h3>
                        <p>A sweet and tangy dessert that’s the perfect end to any meal.</p>
                    </li>
                </ul>
            </section>

            <section>
                <h2>Visit Us</h2>
                <p>
                    We are located at 123 Lemon Street, Citrusville. Open daily from 10 AM to 10 PM.
                </p>
                <a href="/contact">Get Directions</a>
            </section>
        </main>
    );
}

export default Main;
