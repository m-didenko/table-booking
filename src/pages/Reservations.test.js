import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reservations from './Reservations';
import { fetchAPI, submitAPI } from '../utils/Api';

// Mock the fetchAPI and submitAPI functions
jest.mock('../utils/Api', () => ({
    fetchAPI: jest.fn(),
    submitAPI: jest.fn(),
}));

describe('Reservations Component', () => {
    beforeEach(() => {
        fetchAPI.mockClear();
        submitAPI.mockClear();
    });

    test('renders the form with initial state', () => {
        render(<Reservations />);

        expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of Guests:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Occasion:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit Reservation/i })).toBeInTheDocument();
    });

    test('updates form data on input change', () => {
        render(<Reservations />);

        fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-12-01' } });
        fireEvent.change(screen.getByLabelText(/Number of Guests:/i), { target: { value: '4' } });

        expect(screen.getByLabelText(/Date:/i).value).toBe('2024-12-01');
        expect(screen.getByLabelText(/Number of Guests:/i).value).toBe('4');
    });

    test('displays available times when date is selected', async () => {
        fetchAPI.mockReturnValueOnce(['17:00', '18:30']);

        render(<Reservations />);

        fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-12-01' } });

        await waitFor(() => {
            expect(fetchAPI).toHaveBeenCalledWith(new Date('2024-12-01'));
            expect(screen.getByText(/17:00/i)).toBeInTheDocument();
            expect(screen.getByText(/18:30/i)).toBeInTheDocument();
        });
    });

    test('shows confirmation modal on successful submission', async () => {
        fetchAPI.mockReturnValueOnce(['17:00', '18:30']);
        submitAPI.mockReturnValueOnce(true);

        render(<Reservations />);

        fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-12-01' } });
        fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: '17:00' } });
        fireEvent.change(screen.getByLabelText(/Number of Guests:/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/Occasion:/i), { target: { value: 'Anniversary' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Reservation/i }));

        await waitFor(() => {
            expect(submitAPI).toHaveBeenCalledWith({
                date: '2024-12-01',
                time: '17:00',
                guests: 2,
                occasion: 'Anniversary',
            });
            expect(screen.getByText(/Reservation Confirmed/i)).toBeInTheDocument();
        });
    });

    test('shows error message on failed submission', async () => {
        fetchAPI.mockReturnValueOnce(['17:00', '18:30']);
        submitAPI.mockReturnValueOnce(false);

        render(<Reservations />);

        fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-12-01' } });
        fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: '17:00' } });
        fireEvent.change(screen.getByLabelText(/Number of Guests:/i), { target: { value: '2' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Reservation/i }));

        await waitFor(() => {
            expect(submitAPI).toHaveBeenCalledWith({
                date: '2024-12-01',
                time: '17:00',
                guests: 2,
                occasion: 'Birthday',
            });
            expect(screen.queryByText(/Reservation Confirmed/i)).not.toBeInTheDocument();
            expect(screen.getByText(/Failed to submit the reservation/i)).toBeInTheDocument();
        });
    });
});
