import React, { useState } from 'react';

const SearchButton = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="flex items-center w-full">
      <input
        type="search"
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Search..."
      />
       
    </div>
  );
};

export default SearchButton;
