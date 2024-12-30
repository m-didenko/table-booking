import React from 'react';

const BookingForm = ({ formData, availableTimes, isSubmitting, onChange, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="reservations-form"
            aria-labelledby="reservations-title"
        >
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-describedby="date-help"
                />
                <span id="date-help" className="visually-hidden">
                    Please select a date for your reservation.
                </span>
            </div>
            <div className="form-group">
                <label htmlFor="time">Time:</label>
                <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={onChange}
                    required
                    aria-required="true"
                    aria-disabled={!formData.date || availableTimes.length === 0}
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
                    onChange={onChange}
                    min="1"
                    max="10"
                    required
                    aria-required="true"
                    aria-describedby="guests-help"
                />
                <span id="guests-help" className="visually-hidden">
                    Enter the number of guests (between 1 and 10).
                </span>
            </div>
            <div className="form-group">
                <label htmlFor="occasion">Occasion:</label>
                <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={onChange}
                    required
                    aria-required="true"
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>
            </div>
            <button
                type="submit"
                className="reservations-button"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-live="polite"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
            </button>
        </form>
    );
};

export default BookingForm;
