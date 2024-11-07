import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login'; // Adjust the import path as necessary

describe('Login Component', () => {
  test('successful form submission with email and password', () => {
    const { getByLabelText, getByText } = render(<Login />);
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.submit(getByText('Login'));

    // Check console log for output (mock console.log to test this)
    const consoleSpy = jest.spyOn(console, 'log');
    expect(consoleSpy).toHaveBeenCalledWith('Login with:', 'test@example.com', 'password123');
  });

  test('form submission fails without password', () => {
    const { getByLabelText, getByText, getByRole } = render(<Login />);
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    // Do not change the password input to simulate failing scenario
    fireEvent.submit(getByText('Login'));

    // Check if validation or error message appears (assuming you have error handling for empty fields)
    // For demonstration, assuming an error element appears
    expect(screen.queryByText('Password is required')).toBeInTheDocument();
  });
});
