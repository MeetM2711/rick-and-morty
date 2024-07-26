import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    gender: '',
    species: '',
    type: '',
    episodes: '',
  });

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, articles]);

  const fetchAllCharacters = async () => {
    try {
      const initialResponse = await axios.get('https://rickandmortyapi.com/api/character');
      const totalPages = initialResponse.data.info.pages;
      // console.log('first',totalPages)
      let allCharacters = [...initialResponse.data.results];

      for (let page = 2; page <= totalPages; page++) {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        allCharacters = [...allCharacters, ...response.data.results];
      }

      setArticles(allCharacters);
      setFilteredArticles(allCharacters);
    } catch (error) {
      console.error('Error fetching all characters:', error);
    }
  };

  const applyFilters = () => {
    let filtered = articles;

    if (filters.status) {
      filtered = filtered.filter(article => article.status === filters.status);
    }
    if (filters.location) {
      filtered = filtered.filter(article => article.location.name === filters.location);
    }
    if (filters.gender) {
      filtered = filtered.filter(article => article.gender === filters.gender);
    }
    if (filters.species) {
      filtered = filtered.filter(article => article.species === filters.species);
    }
    if (filters.type) {
      filtered = filtered.filter(article => article.type === filters.type);
    }
    if (filters.episodes) {
      filtered = filtered.filter(article => article.episode.includes(filters.episodes));
    }

    setFilteredArticles(filtered);
  };

  return (
    <MyContext.Provider value={{ name, filteredArticles, filters, setFilters }}>
      {children}
    </MyContext.Provider>
  );
};
