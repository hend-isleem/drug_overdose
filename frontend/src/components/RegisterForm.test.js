import '@testing-library/jest-dom'

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import RegisterForm from './RegisterForm'
import '@testing-library/jest-dom' // Import for jest-dom matchers

jest.mock('axios') // Mock axios for API testing

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('RegisterForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks() // Reset mocks after each test
  })

  it('renders the form with inputs and button', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    // Check if all form elements are present
    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument()
  })

  it('shows an error if fields are empty', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument()
  })
  it('sends a request and shows success message on successful registration', async () => {
    jest.useFakeTimers() // Enable fake timers at the start of the test

    axios.post.mockResolvedValueOnce({ status: 201 }) // Mock a successful response

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name:/i), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText(/email:/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password:/i), {
      target: { value: 'password123' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    // Wait for the success popup to appear
    await waitFor(() =>
      expect(screen.getByText(/registration successful!/i)).toBeInTheDocument()
    )

    // Fast-forward the setTimeout
    jest.runAllTimers() // Advance all timers

    // Verify navigation to /login
    expect(mockNavigate).toHaveBeenCalledWith('/login')

    jest.useRealTimers() // Restore real timers after the test
  })

  it('shows an error message on failed registration', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Registration failed!' } },
    }) // Mock a failed API response

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name:/i), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText(/email:/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password:/i), {
      target: { value: 'password123' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/registration failed!/i)).toBeInTheDocument()
    })
  })

  it('handles network errors gracefully', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error')) // Mock a network error

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name:/i), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText(/email:/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password:/i), {
      target: { value: 'password123' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    // Wait for error message
    await waitFor(() => {
      expect(
        screen.getByText(/network error. please try again later./i)
      ).toBeInTheDocument()
    })
  })

  it('redirects to medication input page if user is logged in', () => {
    // Mock localStorage
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify({ token: 'mockToken' }))

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/medication-input')
  })
})
