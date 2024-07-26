import React from 'react';

const FilterButton = ({ filterName, handleFilter }) => {
  return (
    <button
      className="border-2 border-gray-400 rounded-full px-4 py-2 m-2 text-black"
      onClick={() => handleFilter(filterName)}
    >
      {filterName}
    </button>
  );
};

export default FilterButton;
