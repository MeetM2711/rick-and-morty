import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EpisodePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        setEpisodes(response.data.results);
      } catch (error) {
        console.error("Error fetching episode data:", error);
      }
    };

    fetchEpisodes();
  }, []);

  useEffect(() => {
    const filtered = episodes.filter(episode =>
      episode.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEpisodes(filtered);
  }, [searchQuery, episodes]);

  const fetchCharacters = async (episodeId) => {
    setSelectedEpisode(episodeId);
    try {
      const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      const characterUrls = episodeResponse.data.characters;

      const charactersPromises = characterUrls.map(url => axios.get(url));
      const charactersResponses = await Promise.all(charactersPromises);
      setCharacters(charactersResponses.map(res => res.data));
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
    setDrawerOpen(true);
  };

  const handleCharacterClick = (id) => {
    navigate(`/characterDetails/${id}`);
  };

  return (
    <div className="container max-w-[1230px] mx-auto px-4">

      <div className='py-20'>

        <div className="search-bar mb-4">
          <div className='w-full'>

            <input
              type="search"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border w-full  border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="episodes-list grid grid-cols-4 gap-4">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <div key={episode.id} className="episode-card flex flex-col gap-3 justify-between p-4 border border-gray-300 rounded mb-2">
                <h2 className="text-xl font-bold">{episode.name}</h2>
                <p className="text-sm text-gray-600">{episode.air_date}</p>
                <p className="text-sm text-gray-600">Episode: {episode.episode}</p>
                <button
                  onClick={() => fetchCharacters(episode.id)}
                  className="bg-slate-700 w-full text-white py-2 px-4 rounded-lg"
                >
                  Show characters location
                </button>
              </div>
            ))
          ) : (
            <p>No episodes found</p>
          )}
        </div>


        {drawerOpen && (
          <div className="fixed top-[60px] right-0 w-1/3 h-full bg-white shadow-lg p-4 overflow-y-auto">
            <button onClick={() => setDrawerOpen(false)} className="mb-4 p-2 bg-gray-200 rounded">Close</button>
            <h2 className="text-xl font-bold mb-4">Characters</h2>
            <div className="characters-list">
              {characters.length > 0 ? (
                characters.map(character => (
                  <div key={character.id} className="character-card flex items-center gap-3 p-2 border border-gray-300 rounded mb-2 cursor-pointer" onClick={() => handleCharacterClick(character.id)}>
                    <img src={character.image} alt={character.name} className="w-16 rounded-full h-16 object-cover mb-2" />
                    <h3 className="text-lg font-semibold">{character.id}-{character.name}</h3>
                  </div>
                ))
              ) : (
                <p>No characters found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodePage;
