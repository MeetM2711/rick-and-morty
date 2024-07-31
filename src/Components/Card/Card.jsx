import React from "react";
import { Link } from "react-router-dom";

const Card = ({ article, index, articles }) => {
  const handleCardClick = () => {
    const characterData = {
      id: article.id,
      name: article.name,
      status: article.status,
      species: article.species,
      gender: article.gender,
      origin: article.origin.name,
      location: article.location.name,
      image: article.image,
    };

    saveToRecent(characterData);
  };

  const saveToRecent = (character) => {
    let recentData = JSON.parse(sessionStorage.getItem("recentData")) || [];

    // Remove the character if it already exists
    recentData = recentData.filter((item) => item.id !== character.id);

    // Add the new character data to the beginning of the array
    recentData.unshift(character);

    // Keep only the last 5 records
    if (recentData.length > 5) {
      recentData.pop();
    }

    sessionStorage.setItem("recentData", JSON.stringify(recentData));
  };

  return (
    <div class="card mt-2 bg-[#166678]" onClick={handleCardClick}>
      <div class="heading">
        <div className="image-con flex items-center gap-3">
          <div>
          <img
            src={article.image}
            alt="card-image"
            className="animate-pulse transition-transform"
          />
          </div>
          <div className="flex flex-col justify-center items-start">
            <div>
              <h2 className="text-xl font-semibold text-[#93f373]">
                {article.name}
              </h2>
            </div>
            <div className="mt-2">
              <h6>
                {article.status} - {article.species}
              </h6>
            </div>
        <div className="pt-2"> 
          <div className="flex flex-col mt-1">
            <div className="flex gap-2">
              <p className="block  text-[#79e7ff] font-semibold ">
              Location: 
              </p>
              {article.location.name}
            </div>
            <div className="mt-2 flex gap-2">
              <p className="block  text-[#79e7ff] font-semibold ">
              Origin: 
              </p>
              {article.origin.name}
            </div>
          </div>
        </div>
          </div>
        </div>
        <div className="p-2 my-4 pb-3 pt-0  w-full">
          <Link
            to={`/characterDetails/${article.id}`}
            state={{ article, charactersList: articles }}
          >
            <button class="btn w-full ">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
