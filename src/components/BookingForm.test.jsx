import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

// Mock the API so Jest doesn’t actually call the backend and make real HTTP requests
// This isolates component and keeps tests fast and predictable 
jest.mock('../services/bookingApi', () => ({
  createBooking: jest.fn(),
}));

describe('BookingForm', () => {
  test('renders the name input', () => {
    // render BookingForm component into virtual DOM 
    render(<BookingForm />);

    // find input associated with 'name' label 
    const nameInput = screen.getByLabelText(/name/i);

    // assert that the name input exists in the document 
    expect(nameInput).toBeInTheDocument();
  });

  test('renders the submit button', () => {
    // renders BookingForm component 
    render(<BookingForm />);

    // Find the submit button by it's accessible role and visible text 
    const submitButton = screen.getByRole('button', {
      name: /book table/i,
    });

    // assert that the submit button is present 
    expect(submitButton).toBeInTheDocument();
  });
});