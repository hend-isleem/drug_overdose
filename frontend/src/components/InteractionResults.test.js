import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InteractionReport from './InteractionResults'

// Mock the InteractionClassification component
jest.mock('./InteractionClassification', () => () => (
  <div data-testid="interaction-classification">
    Mocked InteractionClassification
  </div>
))

describe('InteractionReport Component', () => {
  it('renders the title of the report', () => {
    render(
      <MemoryRouter initialEntries={[{ state: { interactions: [] } }]}>
        <InteractionReport />
      </MemoryRouter>
    )
    expect(screen.getByText(/Drug Interaction Report/i)).toBeInTheDocument()
  })

  it('displays a message when there are no interactions', () => {
    render(
      <MemoryRouter initialEntries={[{ state: { interactions: [] } }]}>
        <InteractionReport />
      </MemoryRouter>
    )
    expect(
      screen.getByText(/No known interactions for the selected medications/i)
    ).toBeInTheDocument()
  })

  it('renders interactions when provided in the state', () => {
    const mockInteractions = [
      {
        severity: 'Major',
        drugs: 'DrugA  DrugB',
        description: 'This is a major interaction description.',
      },
      {
        severity: 'Moderate',
        drugs: 'DrugC  DrugD',
        description: 'This is a moderate interaction description.',
      },
      {
        severity: 'Major',
        drugs: 'DrugE  DrugF',
        description: 'Another major interaction description.',
      },
    ]

    render(
      <MemoryRouter
        initialEntries={[{ state: { interactions: mockInteractions } }]}
      >
        <InteractionReport />
      </MemoryRouter>
    )

    // Use `getAllByText` with a specific selector to only match <h2> elements
    const majorInteractions = screen.getAllByText(/Major Interaction/i, {
      selector: 'h2',
    })
    const moderateInteractions = screen.getAllByText(/Moderate Interaction/i, {
      selector: 'h2',
    })

    // Verify the counts
    expect(majorInteractions).toHaveLength(2) // Two major interactions in mockInteractions
    expect(moderateInteractions).toHaveLength(1) // One moderate interaction in mockInteractions

    // Verify specific interaction details
    expect(
      screen.getByText(/This is a major interaction description/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Another major interaction description/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/This is a moderate interaction description/i)
    ).toBeInTheDocument()
  })
})
