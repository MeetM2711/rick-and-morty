import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { article } = location.state || {};
  const [character, setCharacter] = useState(article || null);
  const [episodes, setEpisodes] = useState([]);
  const [episodesId, setEpisodesId] = useState([]);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!character) {
        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
          setCharacter(response.data);
        } catch (error) {
          console.error('Error fetching character details:', error);
        }
      }
    };

    fetchCharacterDetails();
  }, [character, id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (character) {
        try {
          const episodePromises = character.episode.map((episodeUrl) => axios.get(episodeUrl));
          const episodeResponses = await Promise.all(episodePromises);
          const episodeNames = episodeResponses.map((res) => res.data.name);
          const episodeIds = episodeResponses.map((res) => res.data.id);
          setEpisodes(episodeNames);
          setEpisodesId(episodeIds);
        } catch (error) {
          console.error('Error fetching episodes:', error);
        }
      }
    };

    fetchEpisodes();
  }, [character]);

  if (!character) return <div>Loading...</div>;

  return (
    <section className='bg-gray-900 p-5'>
      <div className="container max-w-[1230px] mx-auto px-4">
        <div className="pt-20 flex justify-between text-white">
          <div>
            <div className="flex items-center space-x-4">
              <img src={character.image} alt={character.name} className="w-32 h-32 rounded-lg" />
              <div>
                <h2 className="text-2xl font-bold">{character.name}</h2>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Origin and Current Location Details:</h3>
              <p>Origin Location: {character.origin.name}</p>
              <p>Current Location: {character.location.name}</p>
            </div>
          </div>
          <div className="mt-6 ">
              <h3 className="text-2xl pb-5 font-bold">Episodes the character is featured in:</h3>
            <div className='pe-10  h-[668px] overflow-y-auto '>
              <ul>
                {episodes.length > 0 ? (
                  episodes.map((episode, index) => (
                    <li className='p-2' key={index}>{episodesId[index]} - {episode}</li>
                  ))
                ) : (
                  <li>Loading episodes...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetails;
