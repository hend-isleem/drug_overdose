import React from 'react';
import { render } from '@testing-library/react';
import Search from './Search';

describe('Search Component Tests', () => {
  test('fetching interactions successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ warning: 'Interactions may increase side effects.' })
    });

    const { getByPlaceholderText, getByText } = render(<Search />);
    fireEvent.change(getByPlaceholderText('Enter first medication'), { target: { value: 'Aspirin' } });
    fireEvent.click(getByText('Search'));
    fireEvent.change(getByPlaceholderText('Enter second medication'), { target: { value: 'Ibuprofen' } });
    fireEvent.click(getByText('Check Interactions'));

    await waitFor(() => {
      expect(getByText('Interactions may increase side effects.')).toBeInTheDocument();
    });
  });

  test('interaction fetch fails with network error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getByPlaceholderText, getByText, findByText } = render(<Search />);
    fireEvent.change(getByPlaceholderText('Enter first medication'), { target: { value: 'Aspirin' } });
    fireEvent.click(getByText('Search'));
    fireEvent.change(getByPlaceholderText('Enter second medication'), { target: { value: 'Ibuprofen' } });
    fireEvent.click(getByText('Check Interactions'));

    const errorText = await findByText('Error fetching data.');
    expect(errorText).toBeInTheDocument();
  });

  // Snapshot test for Search component
  test('Search component snapshot', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
});



