import restFood from './assets/restaurantfood.jpg';
import About from "./components/About";
import Specials from "./components/Specials";
import PeopleSay from "./components/PeopleSay";

function Main() {
    return (
        <main>
            <section aria-labelledby="restaurant-intro">
                <div className="container">
                    <div className="text-content">
                        <h1 id="restaurant-intro">Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>
                            We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                        </p>
                        <button
                            className="button-primary"
                            aria-label="Reserve a table by clicking this button"
                        >
                            Reserve a table
                        </button>
                    </div>
                    <div className="image-content">
                        <img
                            src={restFood}
                            alt="Delicious Bruschetta served on a plate"
                        />
                    </div>
                </div>
            </section>
            <Specials />
            <PeopleSay />
            <About />
        </main>
    );
}

export default Main;
