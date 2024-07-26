
import React from 'react';

const Dropdown = ({ label, options, selected, onSelect }) => {
    return (
        <div className="dropdown group relative inline-block">
            <button className="dropbtn group-hover:bg-[#3e8e41] bg-[#4CAF50] text-[white] text-base cursor-pointer p-4 border-[none]">
                {label}: {selected || 'All'}
            </button>
            <div className="dropdown-content group-hover:block hidden absolute  bg-[#f9f9f9] w-full min-w-[300px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] z-[1]">
                <button className='text-[black] no-underline block px-4 py-3 hover:bg-[#f1f1f1]' onClick={() => onSelect('')}>Clear {label}</button>
                <div className='grid grid-cols-2 '>
                    {options.map((option, index) => (

                        <button className='border-2 rounded-lg m-1 p-2' key={index} onClick={() => onSelect(option)}>
                            <span className='m-1'>
                                {option}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
