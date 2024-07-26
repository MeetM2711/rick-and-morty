import React, { useContext, useEffect, useState } from 'react';
import Card from '../Components/Card/Card';
import SearchButton from '../Components/Search/SearchButton';
import Dropdown from '../Components/DropDown/DropDown';
import { MyContext } from '../Context/Context';
import axios from 'axios';

const fetchAllPages = async (url) => {
  let allResults = [];
  let nextUrl = url;

  while (nextUrl) {
    const response = await axios.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.info.next;
  }

  return allResults;
};

const Home = () => {
  const { filteredArticles, filters, setFilters } = useContext(MyContext);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState([]);
  const [gender, setGender] = useState([]);
  const [species, setSpecies] = useState([]);
  const [type, setType] = useState([]);
  const [episodes, setEpisode] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const locationsData = await fetchAllPages('https://rickandmortyapi.com/api/location');
      setLocations(locationsData.map(location => location.name));

      const charactersData = await fetchAllPages('https://rickandmortyapi.com/api/character');
      setStatus(Array.from(new Set(charactersData.map(character => character.status))));
      setGender(Array.from(new Set(charactersData.map(character => character.gender))));
      setSpecies(Array.from(new Set(charactersData.map(character => character.species))));
      setType(Array.from(new Set(charactersData.map(character => character.type))));

      const episodesData = await fetchAllPages('https://rickandmortyapi.com/api/episode');
      setEpisode(episodesData.map(episode => episode.name));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (query) => {
    const searchQuery =  query.toLowerCase();
    const filtered = filteredArticles.filter((article) =>
      article.name.toLowerCase().includes(searchQuery)
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="container max-w-[1230px] mx-auto px-4">

      <div className="relative py-20">
        <div className="flex w-full">
          <SearchButton handleSearch={handleSearch} />
        </div>
        <div className="flex justify-around my-4">
          <Dropdown
            label="Status"
            options={status}
            selected={filters.status}
            onSelect={(value) => setFilters({ ...filters, status: value })}
          />
          <Dropdown
            label="Location"
            options={locations}
            selected={filters.location}
            onSelect={(value) => setFilters({ ...filters, location: value })}
          />
          <Dropdown
            label="Gender"
            options={gender}
            selected={filters.gender}
            onSelect={(value) => setFilters({ ...filters, gender: value })}
          />
          <Dropdown
            label="Species"
            options={species}
            selected={filters.species}
            onSelect={(value) => setFilters({ ...filters, species: value })}
          />
          <Dropdown
            label="Type"
            options={type}
            selected={filters.type}
            onSelect={(value) => setFilters({ ...filters, type: value })}
          />
          <Dropdown
            label="Episodes"
            options={episodes}
            selected={filters.episodes}
            onSelect={(value) => setFilters({ ...filters, episodes: value })}
          />
          <button onClick={() => setFilters({
            status: '',
            location: '',
            gender: '',
            species: '',
            type: '',
            episodes: '',
          })}>Clear All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredArticles.map((article, index) => (
            <Card
              key={index}
              article={article}
              index={index}
              articles={filteredArticles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
