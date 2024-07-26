import React, { useContext, useEffect, useState } from 'react';
import Card from '../Components/Card/Card';
import SearchButton from '../Components/Search/SearchButton';
import Dropdown from '../Components/DropDown/DropDown';
import { MyContext } from '../Context/Context';
import axios from 'axios';

const Home = () => {
  const { filteredArticles, filters, setFilters } = useContext(MyContext);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results.map(location => location.name));
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSearch = (query) => {
    const searchQuery = query.toLowerCase();
    const filtered = filteredArticles.filter((article) =>
      article.name.toLowerCase().includes(searchQuery)
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="relative py-20">
      <div className="flex w-full">
        <SearchButton handleSearch={handleSearch} />
      </div>
      <div className="flex justify-around my-4">
        <Dropdown
          label="Status"
          options={['Alive', 'Dead', 'unknown']}
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
          options={['Male', 'Female', 'Genderless', 'unknown']}
          selected={filters.gender}
          onSelect={(value) => setFilters({ ...filters, gender: value })}
        />
        <Dropdown
          label="Species"
          options={['Human', 'Alien', 'Robot', 'unknown']}
          selected={filters.species}
          onSelect={(value) => setFilters({ ...filters, species: value })}
        />
        <Dropdown
          label="Type"
          options={['Type1', 'Type2', 'Type3']}
          selected={filters.type}
          onSelect={(value) => setFilters({ ...filters, type: value })}
        />
        <Dropdown
          label="Episodes"
          options={['Episode1', 'Episode2', 'Episode3']}
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
  );
};

export default Home;
