import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For `useNavigate` to work
import Booking from './Booking';
import { fetchAPI, submitAPI } from '../utils/Api';

// Mock API utilities
jest.mock('../utils/Api', () => ({
    fetchAPI: jest.fn(),
    submitAPI: jest.fn(),
}));

describe('Booking Component', () => {
    beforeEach(() => {
        fetchAPI.mockImplementation(() => ['12:00 PM', '1:00 PM', '2:00 PM']); // Mock available times
        submitAPI.mockImplementation(() => true); // Mock successful submission
    });

    test('renders the component with form elements', () => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        );

        // Verify form elements are present
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
        expect(screen.getByText(/submit reservation/i)).toBeInTheDocument();
    });

    test('validates form fields before submission', async () => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        );

        // Attempt to submit without filling out the form
        fireEvent.click(screen.getByText(/submit reservation/i));

        // Expect validation errors
        expect(await screen.findByText(/date is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/time is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/please select a valid number of guests/i)).toBeInTheDocument();
    });

    test('submits the form successfully when valid data is provided', async () => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        );

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-31' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00 PM' } });
        fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

        // Submit the form
        fireEvent.click(screen.getByText(/submit reservation/i));

        // Expect the success modal to appear
        expect(await screen.findByText(/reservation confirmed/i)).toBeInTheDocument();
    });

    test('handles submission failure', async () => {
        submitAPI.mockImplementationOnce(() => false); // Mock submission failure

        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        );

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-31' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00 PM' } });
        fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

        // Submit the form
        fireEvent.click(screen.getByText(/submit reservation/i));

        // Expect an alert to be shown
        await waitFor(() =>
            expect(window.alert).toHaveBeenCalledWith('Failed to submit the reservation. Please try again.')
        );
    });

    test('updates available times when date changes', async () => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        );

        // Change the date
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-31' } });

        // Expect fetchAPI to be called with the new date
        await waitFor(() => expect(fetchAPI).toHaveBeenCalledWith(new Date('2024-12-31')));
    });
});
