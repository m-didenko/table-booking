import restFood from './assets/restaurantfood.jpg';
import bruschetta from './assets/bruchetta.svg'
import greekSalad from './assets/greek-salad.jpg'
import lemonDessert from './assets/lemon-dessert.jpg'

function Main() {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="text-content">
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                        <button className="button-primary">Reserve a table</button>
                    </div>
                    <div className="image-content">
                        <img src={restFood} alt="Bruschetta" />
                    </div>
                </div>
            </section>

            <section>
                <h2 style={{ marginTop: "5rem" }}>This week specials!</h2>
                <div className="specials-container">
                    <div className="special-item">
                        <img src={greekSalad} alt="Greek Salad" />
                            <h3>Greek Salad <span className="price">$12.99</span></h3>
                            <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                            <button className="button-primary">Order a delivery</button>
                    </div>
                    <div className="special-item">
                        <img src={bruschetta} alt="Bruschetta" />
                            <h3>Bruschetta <span className="price">$5.99</span></h3>
                            <p>Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
                        <button className="button-primary">Order a delivery</button>
                    </div>
                    <div className="special-item">
                        <img src={lemonDessert} alt="Lemon Dessert" />
                            <h3>Lemon Dessert <span className="price">$5.00</span></h3>
                            <p>This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
                        <button className="button-primary">Order a delivery</button>
                    </div>
                </div>

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
