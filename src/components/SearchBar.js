import React, { useState } from 'react';
import '../components/css/SearchBar.css';

import search_icon from '../components/img/search_icon.svg'

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
      <img src={search_icon} width='25px' alt='search-icon'/>
      <input
        type="text"
        placeholder="Search By The Company"
        value={searchQuery}
        onChange={handleInputChange}
        title='Search'
      />
      {/* <button onClick={handleSearchClick}>
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
