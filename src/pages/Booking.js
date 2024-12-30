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
                guests: '',
                occasion: 'Birthday',
            };
    });

    const [availableTimes, setAvailableTimes] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
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
        setValidationErrors((prev) => ({ ...prev, [name]: '' })); // Clear errors on change
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.date) errors.date = 'Date is required.';
        if (!formData.time) errors.time = 'Time is required.';
        if (!formData.guests || formData.guests < 1 || formData.guests > 10) {
            errors.guests = 'Number of guests must be between 1 and 10.';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

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
                validationErrors={validationErrors}
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
