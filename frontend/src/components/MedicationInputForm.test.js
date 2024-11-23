import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import MedicationInputForm from './MedicationInputForm'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('axios')

describe('MedicationInputForm Component', () => {
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useNavigate.mockImplementation(() => mockNavigate)
    localStorage.setItem(
      'user',
      JSON.stringify({ token: 'mock-valid-token' }) // Replace with a real or mock token as required
    )
  })

  it('renders the form with input and buttons', () => {
    render(
      <MemoryRouter>
        <MedicationInputForm />
      </MemoryRouter>
    )

    expect(
      screen.getByPlaceholderText(/enter a drug name/i)
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /check interactions/i })
    ).toBeInTheDocument()
  })

  it('adds a drug to the list when "Add" button is clicked', () => {
    render(
      <MemoryRouter>
        <MedicationInputForm />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/enter a drug name/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Aspirin')).toBeInTheDocument()
  })

  it('sends a real request and navigates to interaction results on success', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        interactions: [
          { drug1: 'Aspirin', drug2: 'Ibuprofen', interaction: 'High risk' },
        ],
      },
    })

    render(
      <MemoryRouter>
        <MedicationInputForm />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/enter a drug name/i)
    const addButton = screen.getByRole('button', { name: /add/i })
    const checkButton = screen.getByRole('button', {
      name: /check interactions/i,
    })

    // Add drugs
    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)
    fireEvent.change(input, { target: { value: 'Ibuprofen' } })
    fireEvent.click(addButton)

    // Click "Check Interactions"
    fireEvent.click(checkButton)

    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/interaction-results', {
        state: {
          interactions: [
            { drug1: 'Aspirin', drug2: 'Ibuprofen', interaction: 'High risk' },
          ],
        },
      })
    })
  })

  it('shows an error message when the API call fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { status: 500, data: { message: 'An error occurred.' } },
    })

    render(
      <MemoryRouter>
        <MedicationInputForm />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/enter a drug name/i)
    const addButton = screen.getByRole('button', { name: /add/i })
    const checkButton = screen.getByRole('button', {
      name: /check interactions/i,
    })

    // Add drugs
    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)
    fireEvent.change(input, { target: { value: 'Ibuprofen' } })
    fireEvent.click(addButton)

    // Click "Check Interactions"
    fireEvent.click(checkButton)

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument()
    })
  })
})
