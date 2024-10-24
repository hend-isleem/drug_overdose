import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WarningsDisplay from './WarningsDisplay';
import axios from 'axios';

function Home() {
  const [warnings, setWarnings] = useState([]);
  const [alternatives, setAlternatives] = useState([]);

  const handleSearch = async (medication) => {
    try {
      // Placeholder URL: Replace 'API_ENDPOINT' with your actual endpoint
      const response = await axios.get(`API_ENDPOINT?medication=${medication}`);
      setWarnings(response.data.warnings);  // Adjust based on how your API returns warnings
      setAlternatives(response.data.alternatives); // Assume alternatives are part of the same API response
    } catch (error) {
      console.error('Error fetching interactions:', error);
      setWarnings([]);
      setAlternatives([]);
    }
  };

  return (
    <div>
      <h1>Welcome to Our Healthcare System</h1>
      <p>Check drug interactions easily with our tool.</p>
      <SearchBar onSubmit={handleSearch} />
      <WarningsDisplay warnings={warnings} alternatives={alternatives} />
    </div>
  );
}


export default Home;




