// Login.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component Tests', () => {
  test('successful login', async () => {
    const mockOnLogin = jest.fn();
    const { getByLabelText, getByRole } = render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'user@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    });
  });

  test('login fails without email and password', async () => {
    const mockOnLogin = jest.fn();
    const { getByRole } = render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.click(getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(mockOnLogin).not.toHaveBeenCalled();
    });
  });
});
w
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component Tests', () => {
  test('successful login', async () => {
    const mockOnLogin = jest.fn();
    const { getByLabelText, getByRole } = render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'user@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    });
  });

  test('login fails without email and password', async () => {
    const mockOnLogin = jest.fn();
    const { getByRole } = render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.click(getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(mockOnLogin).not.toHaveBeenCalled();
    });
  });

  // Snapshot test
  test('Login component snapshot', () => {
    const { asFragment } = render(<Login onLogin={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
