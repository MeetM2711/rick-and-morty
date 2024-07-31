import React, { useState } from 'react';

const SearchButton = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="flex items-center w-1/2  ">
      <input
        type="search"
        value={query}
        maxLength={25}
        onChange={handleInputChange}
        className="w-full px-4 py-2 text-[#f0ffef] bg-[#ffffff14] border rounded-lg"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchButton;
