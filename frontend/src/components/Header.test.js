import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import Header from './Header'

describe('Header Component', () => {
  it('renders the header with the title', () => {
    // Render the Header component
    render(<Header />)

    // Check if the header title is displayed
    expect(screen.getByText(/ddis checker/i)).toBeInTheDocument()
  })

  it('shows the logout button when the user is logged in', () => {
    // Mock the localStorage to simulate a logged-in user
    const mockUser = { name: 'John Doe' }
    localStorage.setItem('user', JSON.stringify(mockUser))

    // Render the Header component
    render(<Header />)

    // Verify the "Hello" message and Logout button
    expect(screen.getByText(/hello, john doe/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()

    // Clean up localStorage
    localStorage.removeItem('user')
  })

  it('does not show the logout button when the user is not logged in', () => {
    // Ensure no user is logged in
    localStorage.removeItem('user')

    // Render the Header component
    render(<Header />)

    // Check that the Logout button and Hello message are not displayed
    expect(screen.queryByText(/hello/i)).toBeNull()
    expect(screen.queryByText(/logout/i)).toBeNull()
  })

  it('logs out the user when the logout button is clicked', () => {
    // Mock the localStorage to simulate a logged-in user
    const mockUser = { name: 'John Doe' }
    localStorage.setItem('user', JSON.stringify(mockUser))

    // Mock window.dispatchEvent to listen for the storage event
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent')

    // Render the Header component
    render(<Header />)

    // Simulate clicking the Logout button
    const logoutButton = screen.getByText(/logout/i)
    fireEvent.click(logoutButton)

    // Check that the user is logged out
    expect(localStorage.getItem('user')).toBeNull()
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'storage', key: 'user' })
    )

    // Clean up
    dispatchEventSpy.mockRestore()
  })
})
