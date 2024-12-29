import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservations.css';
import Modal from '../components/Modal';

const Reservations = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 1,
        occasion: 'Birthday',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/'); // Redirect to home page
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 17; hour <= 23; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 30) {
                const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                times.push(time);
            }
        }
        return times;
    };

    return (
        <div className="reservations-container">
            <h1>Reservations</h1>
            <form onSubmit={handleSubmit} className="reservations-form">
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a time</option>
                        {generateTimeOptions().map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Number of Guests:</label>
                    <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="occasion">Occasion:</label>
                    <select
                        id="occasion"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        required
                    >
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                    </select>
                </div>
                <button type="submit" className="reservations-button">
                    Submit Reservation
                </button>
            </form>

            {isModalOpen && (
                <Modal
                    title="Reservation Confirmed"
                    message={`You have reserved for ${formData.guests} guest(s) on ${formData.date} at ${formData.time} for a ${formData.occasion}.`}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default Reservations;