import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservations.css';
import Modal from '../components/Modal';
import { fetchAPI, submitAPI } from '../utils/Api';

const Reservations = () => {
    const [formData, setFormData] = useState(() => {
        // Retrieve initial form data from local storage if available
        const savedFormData = localStorage.getItem('reservationFormData');
        return savedFormData
            ? JSON.parse(savedFormData)
            : {
                date: '',
                time: '',
                guests: 1,
                occasion: 'Birthday',
            };
    });

    const [availableTimes, setAvailableTimes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // Initialize times with today's available times
    const initializeTimes = () => {
        const today = new Date();
        return fetchAPI(today);
    };

    // Update available times based on the selected date
    const updateTimes = (date) => {
        const selectedDate = new Date(date);
        setAvailableTimes(fetchAPI(selectedDate));
    };

    useEffect(() => {
        // Set initial available times for today
        setAvailableTimes(initializeTimes());
    }, []);

    useEffect(() => {
        if (formData.date) {
            updateTimes(formData.date);
        }
    }, [formData.date]);

    useEffect(() => {
        // Save form data to local storage whenever it changes
        localStorage.setItem('reservationFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = submitAPI(formData);
        if (success) {
            // Add the new booking time to the available times (if needed)
            if (!availableTimes.includes(formData.time)) {
                setAvailableTimes((prevTimes) => [...prevTimes, formData.time]);
            }
            setIsModalOpen(true);
        } else {
            alert('Failed to submit the reservation. Please try again.');
        }
        setIsSubmitting(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/'); // Redirect to home page
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
                        disabled={!formData.date || availableTimes.length === 0}
                    >
                        <option value="" disabled>
                            {formData.date && availableTimes.length === 0
                                ? 'No times available'
                                : 'Select a time'}
                        </option>
                        {availableTimes.map((time) => (
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
                <button type="submit" className="reservations-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
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
