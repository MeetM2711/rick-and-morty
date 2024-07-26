import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ article, index, articles }) => {
  return (
    <div className="relative flex flex-col  py-20 justify-between mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={article.image} alt="card-image" className="w-full h-full object-contain" />
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 items-start">
          <div className='col-span-2'>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {article.name}
            </h5>
          </div>
          <div className='text-right'>
            <h6>{article.status} - {article.species}</h6>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <div className='text-left'>
            <p className="block font-sans font-semibold text-base antialiased leading-relaxed text-inherit">
              Last known location:
            </p>
            {article.location.name}
          </div>
          <div className='text-right'>
            <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-inherit">
              First seen in:
            </p>
            {article.origin.name}
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 w-full">
        <Link to={`/characterDetails/${index}`} state={{ article, articles, index }}>
          <button className="bg-slate-700 w-full text-white py-2 px-4 rounded-lg">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
