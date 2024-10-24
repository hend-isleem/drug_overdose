import React, { useState } from 'react';

function SearchBar({ onSubmit }) {
  const [medication, setMedication] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(medication);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter medication"
        value={medication}
        onChange={e => setMedication(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
