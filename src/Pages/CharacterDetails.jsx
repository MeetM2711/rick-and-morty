import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { article, charactersList } = location.state || {};
  const [character, setCharacter] = useState(article || null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]); // Re-fetch character data when id changes

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (character) {
        try {
          const episodePromises = character.episode.map((url) => axios.get(url));
          const episodeResponses = await Promise.all(episodePromises);
          const episodeNames = episodeResponses.map((res) => res.data.name);
          setEpisodes(episodeNames);
        } catch (error) {
          console.error('Error fetching episodes:', error);
        }
      }
    };

    fetchEpisodes();
  }, [character]); // Re-fetch episodes when character changes

  const handleNavigation = (direction) => {
    if (charactersList && charactersList.length > 0) {
      const currentIndex = charactersList.findIndex(c => c.id === parseInt(id));
      let newIndex = currentIndex;

      if (direction === 'next') {
        newIndex = (currentIndex + 1) % charactersList.length;
      } else if (direction === 'prev') {
        newIndex = (currentIndex - 1 + charactersList.length) % charactersList.length;
      }

      const nextCharacter = charactersList[newIndex];
      navigate(`/characterDetails/${nextCharacter.id}`, { state: { article: nextCharacter, charactersList } });
    }
  };

  if (!character) return <div>Loading...</div>;

  return (
    <section className='bg-[#0d1f2dff] p-4'>
      <div className="container max-w-[1230px] mx-auto px-4">
        <div className="pt-20 flex justify-between items-start text-[#f0ffef]">
          
            <div className="mt-2 p-3 pt-0 bg-[#ffffff14] shadow-2xl">
              <img src={character.image} alt={character.name} className="w-full h-full rounded-b-2xl animate-pulse" />
              <div className='mt-4'>
                <h2 className="text-2xl font-bold text-[#93f373]">{character.name}</h2>
                <p className='text-[#166678] mt-2 font-semibold mr-2'>Status: <span className='text-[#f0ffef]'> {character.status} </span> </p>
                <p className='text-[#166678] mt-2 font-semibold mr-2'>Species: <span className='text-[#f0ffef]'> {character.species} </span> </p>
                <p className='text-[#166678] mt-2 font-semibold mr-2'>Gender: <span className='text-[#f0ffef]'> {character.gender} </span> </p>
              </div>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold text-[#93f373]">Origin and Current Location Details:</h3>
              <p className='text-[#166678] mt-2 font-semibold mr-2'>Origin Location: <span className='text-[#f0ffef]'> {character.origin.name}</span></p>
              <p className='text-[#166678] mt-2 font-semibold mr-2'>Current Location:<span className='text-[#f0ffef]'> {character.location.name}</span></p>
            </div>
          
          <div className="">
            <h3 className="text-2xl pb-5 font-bold text-[#93f373]">Episodes the character is featured in:</h3>
            <div className='pe-10 h-[668px] overflow-y-auto'>
              <ul>
                {episodes.length > 0 ? (
                  episodes.map((episode, index) => (
                    <li className='p-2' key={index}>- {episode}</li>
                  ))
                ) : (
                  <li>Loading episodes...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-[#166678] text-[#f0ffef] rounded"
            onClick={() => handleNavigation('prev')}
          >
            &lt; Previous
          </button>
          <button
            className="px-4 py-2 bg-[#166678] text-[#f0ffef] rounded"
            onClick={() => handleNavigation('next')}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetails;
