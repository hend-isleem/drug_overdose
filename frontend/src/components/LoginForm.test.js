import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import LoginForm from './Login'

describe('LoginForm', () => {
  test('renders Login form fields', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      )
    })

    const usernameInput = screen.getByLabelText(/Username:/i)
    const passwordInput = screen.getByLabelText(/Password:/i)
    const loginButton = screen.getByRole('button', { name: /Login/i })

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  test('handles form submission with valid credentials', () => {
    // Set up localStorage with test user data
    localStorage.setItem(
      'user',
      JSON.stringify({ username: 'testuser', password: 'password123' })
    )

    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText(/Username:/i)
    const passwordInput = screen.getByLabelText(/Password:/i)
    const loginButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)

    expect(alertMock).toHaveBeenCalledWith('Login successful!')

    alertMock.mockRestore()
  })

  // New test for login attempt with missing password
  test('fails to login when password is missing and correctly detects failure', () => {
    // Set up localStorage with test user data
    localStorage.setItem(
      'user',
      JSON.stringify({ username: 'testuser', password: 'password123' })
    )

    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const usernameInput = screen.getByLabelText(/Username:/i)
    const loginButton = screen.getByRole('button', { name: /Login/i })

    // Enter only username, leaving password empty
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.click(loginButton)

    // Expect no "Login successful!" alert to appear, indicating login failure
    expect(alertMock).not.toHaveBeenCalledWith('Login successful!')

    // Check for the specific alert message for invalid credentials
    expect(alertMock).toHaveBeenCalledWith('Invalid credentials.')

    alertMock.mockRestore()
  })
})
