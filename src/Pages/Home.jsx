import React, { useContext, useEffect, useState } from "react";
import Card from "../Components/Card/Card";
import SearchButton from "../Components/Search/SearchButton";
import Dropdown from "../Components/DropDown/DropDown";
import { MyContext } from "../Context/Context";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const { filters, setFilters } = useContext(MyContext);
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState([]);
  const [gender, setGender] = useState([]);
  const [species, setSpecies] = useState([]);
  const [type, setType] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentData, setRecentData] = useState([]);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchData();
    loadRecentData();
  }, []);

  const fetchData = async () => {
    try {
      const locationsData = await fetchAllPages(
        "https://rickandmortyapi.com/api/location"
      );
      setLocations(["None", ...locationsData.map((location) => location.name)]);

      const charactersData = await fetchAllPages(
        "https://rickandmortyapi.com/api/character"
      );
      setAllCharacters(charactersData);
      setFilteredCharacters(charactersData); // Initially set filteredCharacters to all characters
      setStatus([
        "None",
        ...Array.from(
          new Set(charactersData.map((character) => character.status))
        ),
      ]);
      setGender([
        "None",
        ...Array.from(
          new Set(charactersData.map((character) => character.gender))
        ),
      ]);
      setSpecies([
        "None",
        ...Array.from(
          new Set(charactersData.map((character) => character.species))
        ),
      ]);
      setType([
        "None",
        ...Array.from(
          new Set(charactersData.map((character) => character.type))
        ),
      ]);

      const episodesData = await fetchAllPages(
        "https://rickandmortyapi.com/api/episode"
      );
      setEpisodes(["None", ...episodesData.map((episode) => episode.name)]); // Include 'None' option
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadRecentData = () => {
    const recentData = JSON.parse(sessionStorage.getItem("recentData")) || [];
    console.log("resentData ====>", recentData);
    setRecentData(recentData);
  };

  const handleRemoveCharacter = (id) => {
    // Remove the character from session storage
    const updatedRecentData = recentData.filter(
      (character) => character.id !== id
    );
    sessionStorage.setItem("recentData", JSON.stringify(updatedRecentData));

    // Update the state
    setRecentData(updatedRecentData);
  };

  useEffect(() => {
    filterCharacters();
  }, [filters, allCharacters]);

  const filterCharacters = () => {
    let filtered = [...allCharacters];

    if (filters.status) {
      filtered = filtered.filter(
        (character) => character.status === filters.status
      );
    }
    if (filters.location) {
      filtered = filtered.filter(
        (character) => character.location.name === filters.location
      );
    }
    if (filters.gender) {
      filtered = filtered.filter(
        (character) => character.gender === filters.gender
      );
    }
    if (filters.species) {
      filtered = filtered.filter(
        (character) => character.species === filters.species
      );
    }
    if (filters.type) {
      filtered = filtered.filter(
        (character) => character.type === filters.type
      );
    }
    if (filters.episodes) {
      const selectedEpisode = episodes.find((e) => e === filters.episodes);
      if (selectedEpisode) {
        filtered = filtered.filter((character) =>
          character.episode.some((ep) =>
            ep.includes(selectedEpisode.id.toString())
          )
        );
      }
    }

    setFilteredCharacters(filtered);
    setCurrentPage(1); // Reset to the first page after filtering

    console.log("Filtered Characters:", filtered);
  };

  const handleSearch = (query) => {
    const searchQuery = query.toLowerCase();
    const filtered = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery)
    );
    setFilteredCharacters(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-4 py-2 border rounded-xl bg-[#ffffff14] text-[#f0ffef] ${
              currentPage === i ? "bg-[#93f373] text-white " : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 2) {
        pageNumbers.push(
          <button
            key={1}
            className={`px-4 py-2 border rounded-xl bg-[#ffffff14] text-[#f0ffef] ${
              currentPage === 1 ? "bg-[#93f373] text-white" : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
      }

      if (currentPage > 3) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-4 py-2 border rounded-xl bg-[#ffffff14] text-[#f0ffef] ${
              currentPage === i ? "bg-[#93f373] text-white" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }

      if (currentPage < totalPages - 1) {
        pageNumbers.push(
          <button
            key={totalPages}
            className={`px-4 py-2 border rounded-xl bg-[#ffffff14] text-[#f0ffef] ${
              currentPage === totalPages ? "bg-[#93f373] text-white" : ""
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto pt-20 p-4">
      <div className="flex justify-between gap-10">
        <SearchButton handleSearch={handleSearch} />
        <div className="flex justify-between gap-1 items-center my-4">
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

          <button
            className="group-hover:bg-cyan-800 bg-[#166678] text-[#f0ffef] text-md font-normal  cursor-pointer p-2 rounded-xl"
            onClick={() =>
              setFilters({
                status: null,
                location: null,
                gender: null,
                species: null,
                type: null,
                episodes: null,
              })
            }
          >
            Clear All
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold my-4 text-[#93f373]">
            Recent Data
          </h2>
          <div className="text-xl font-semibold text-[#f0ffef]">
            {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredCharacters.length)}/
            {filteredCharacters.length} records
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {recentData.slice(-5).map((character, index) => (
            <div class="flex flex-col gap-2text-[10px]  sm:text-xs ">
              <div class="succsess-alert cursor-default flex justify-between items-center w-full h-12 sm:h-14 rounded-lg bg-[#ffffff14] px-[10px]">
                <Link
                  to={`/characterDetails/${character.id}`}
                  state={{ article: character, charactersList: recentData }}
                >
                  <div className="flex gap-4 items-center">
                    <div>
                      <img
                        src={character.image}
                        alt="card-image"
                        className="w-[40px] h-[40px] rounded-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {character.name}
                      </h3>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => handleRemoveCharacter(character.id)}
                  className="text-red-500 ml-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {filteredCharacters.length === 0 ? (
        <div className="text-red-500 text-2xl fonr-semibold text-center mt-4">
          Results not available
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-10">
            {paginatedCharacters.map((character, index) => (
              <Card
                key={index}
                article={character}
                index={index}
                articles={paginatedCharacters}
              />
            ))}
          </div>
          <div className="flex justify-center gap-3  items-center mt-4   text-[#f0ffef]">
            {currentPage > 1 && (
              <button
                className={`px-4 py-2 border  bg-[#166678] rounded-xl`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt; Prev
              </button>
            )}
            <div className="flex space-x-2 rounded-xl">
              {renderPageNumbers()}
            </div>
            {currentPage < totalPages && (
              <button
                className={`px-4 py-2 border bg-[#166678] rounded-xl`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next &gt;
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
