import React from 'react';

function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search drugs..." />
            <button type="submit">Search</button>
        </div>
    );
}

export default SearchBar;
