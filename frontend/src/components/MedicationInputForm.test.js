import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import MedicationInputForm from './MedicationInputForm'

describe('MedicationInputForm', () => {
  test('allows a user to add drugs to the list', () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    )

    const input = screen.getByPlaceholderText('Enter a drug name')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Aspirin')).toBeInTheDocument()
  })

  test("enables 'Check Interactions' button only after adding two drugs", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    )

    const input = screen.getByPlaceholderText('Enter a drug name')
    const addButton = screen.getByText('Add')
    const checkButton = screen.getByText('Check Interactions')

    // Initially, the button should be disabled
    expect(checkButton).toBeDisabled()

    // Add the first drug
    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)
    expect(checkButton).toBeDisabled() // Button still disabled after one drug

    // Add the second drug
    fireEvent.change(input, { target: { value: 'Ibuprofen' } })
    fireEvent.click(addButton)
    expect(checkButton).toBeEnabled() // Button should be enabled now
  })

  test('allows a user to remove a drug from the list', () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    )

    const input = screen.getByPlaceholderText('Enter a drug name')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)

    const removeButton = screen.getByText('✖')
    fireEvent.click(removeButton)

    expect(screen.queryByText('Aspirin')).toBeNull()
  })

  test('allows a user to reset the drug list', () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    )

    const input = screen.getByPlaceholderText('Enter a drug name')
    const addButton = screen.getByText('Add')
    const resetButton = screen.getByText('Start over')

    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)
    fireEvent.click(resetButton)

    expect(screen.queryByText('Aspirin')).toBeNull()
  })

  test("disables 'Check Interactions' button after resetting the drug list", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    )

    const input = screen.getByPlaceholderText('Enter a drug name')
    const addButton = screen.getByText('Add')
    const checkButton = screen.getByText('Check Interactions')
    const resetButton = screen.getByText('Start over')

    // Add two drugs
    fireEvent.change(input, { target: { value: 'Aspirin' } })
    fireEvent.click(addButton)
    fireEvent.change(input, { target: { value: 'Ibuprofen' } })
    fireEvent.click(addButton)

    // Button should be enabled
    expect(checkButton).toBeEnabled()

    // Reset the drug list
    fireEvent.click(resetButton)

    // Button should be disabled again
    expect(checkButton).toBeDisabled()
  })
})
