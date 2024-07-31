import React from 'react';

const Dropdown = ({ label, options, selected, onSelect }) => {
  return (
    <div className="dropdown group relative inline-block">
      <button className="dropbtn group-hover:bg-cyan-800 bg-[#166678] text-[#f0ffef] text-md font-normal  cursor-pointer p-2 rounded-xl">
        {label}: {selected || 'All'}
      </button>
      <div className="dropdown-content rounded-lg group-hover:block hidden absolute -left-1/2 bg-gray-800 text-[#f0ffef] w-full min-w-[300px]  z-[1] max-h-[300px] overflow-y-auto">
        <button className='text-[#f0ffef] no-underline block px-4 border-2 border-[#166678] bg-[#ffffff14] hover:text-black rounded-lg m-1 py-3 hover:bg-[#f1f1f1]' onClick={() => onSelect('')}>Clear {label}</button>
        <div className='grid grid-cols-2'>
          {options.length > 0 ? (
            <>
              {options.map((option, index) => (
                <button className='border-2 text-[#f0ffef] border-[#166678] bg-[#ffffff14] rounded-lg m-1 p-2 ' key={index} onClick={() => onSelect(option)}>
                  <span className='m-1'>
                    {option}
                  </span>
                </button>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}; 

export default Dropdown;
