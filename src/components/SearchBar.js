import React, { useState } from 'react';
import '../components/css/SearchBar.css';

const SearchBar = ({ onSearch, onCategoryChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
    // Set the selected category to "All" when the user starts typing
    onCategoryChange('All', true);
  };

  const handleSearchClick = () => {
    // Trigger the search callback with the current search query
    onSearch(searchQuery);
    // You can add additional logic here if needed
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {/* <button onClick={handleSearchClick}>
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
