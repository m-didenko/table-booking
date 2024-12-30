import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { fetchAPI, submitAPI } from '../utils/Api';
import BookingForm from '../components/BookingForm';
import './Booking.css';

const Booking = () => {
    const [formData, setFormData] = useState(() => {
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

    const initializeTimes = () => {
        const today = new Date();
        return fetchAPI(today);
    };

    const updateTimes = (date) => {
        const selectedDate = new Date(date);
        setAvailableTimes(fetchAPI(selectedDate));
    };

    useEffect(() => {
        setAvailableTimes(initializeTimes());
    }, []);

    useEffect(() => {
        if (formData.date) {
            updateTimes(formData.date);
        }
    }, [formData.date]);

    useEffect(() => {
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
        navigate('/');
    };

    return (
        <div className="reservations-container">
            <h1 id="reservations-title">Reservations</h1>
            <BookingForm
                formData={formData}
                availableTimes={availableTimes}
                isSubmitting={isSubmitting}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
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

export default Booking;
