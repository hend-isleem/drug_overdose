// App.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';  // Assuming App is the component that contains the login or fetch functionality
import axios from 'axios';

jest.mock('axios');  // This mocks the axios module

// Now write the test case
test('fetches data and displays it on successful response', async () => {
  const data = { results: [{ id: 1, name: 'Bob' }] };
  axios.get.mockResolvedValue({ data });  // Mock the Axios get method

  const { getByText, getByTestId } = render(<App />);
  
  // Assume you have a button in your App that triggers the Axios call
  fireEvent.click(getByText('Fetch Data'));

  await waitFor(() => {
    // Check if the data is displayed correctly
    expect(getByTestId('user-name')).toHaveTextContent('Bob');
  });
});

