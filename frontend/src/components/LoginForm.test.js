import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginForm from './Login'

// Mock dependencies
jest.mock('axios')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('LoginForm Component', () => {
  const mockNavigate = jest.fn()
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate)
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('renders the login form with email and password fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows an error message when the API call fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    })

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })

    expect(axios.post).toHaveBeenCalledWith('v1/auth/login', {
      email: 'test@example.com',
      password: 'wrongpassword',
    })
  })

  it('navigates to /medication-input on successful login', async () => {
    const mockResponse = {
      data: {
        tokens: {
          access: { token: 'fake-jwt-token' },
        },
        user: { name: 'John Doe' },
      },
    }
    axios.post.mockResolvedValueOnce(mockResponse)

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correctpassword' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    // Wait for the success popup
    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument()
    })

    // Wait for navigation to complete after 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Assert navigation to /medication-input
    expect(mockNavigate).toHaveBeenCalledWith('/medication-input')

    // Verify localStorage update
    const storedUser = JSON.parse(localStorage.getItem('user'))
    expect(storedUser).toEqual({
      email: 'test@example.com',
      token: 'fake-jwt-token',
      name: 'John Doe',
    })
  })

  it('navigates to /register when the register button is clicked', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText(/please register/i))

    expect(mockNavigate).toHaveBeenCalledWith('/register')
  })

  it('redirects to /medication-input if the user is already logged in', () => {
    // Mock localStorage to simulate a logged-in user
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'test@example.com', token: 'fake-jwt-token' })
    )

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/medication-input')

    // Clean up localStorage
    localStorage.clear()
  })
})
