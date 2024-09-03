import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/Context';

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [residents, setResidents] = useState([]);
  const [residentsLoading, setResidentsLoading] = useState(false);
  const [residentsError, setResidentsError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { articles } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllLocations = async () => {
      const pages = 7; // Total number of pages
      let allLocations = [];
      setLoading(true);

      try {
        for (let page = 1; page <= pages; page++) {
          const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          allLocations = [...allLocations, ...data.results];
        }
        setLocations(allLocations);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLocations();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowResidents = (residentUrls) => {
    setResidentsLoading(true);
    setResidentsError(null);

    Promise.all(residentUrls.map(url => fetch(url).then(res => res.json())))
      .then(residentsData => {
        setResidents(residentsData);
        setResidentsLoading(false);
        setIsDrawerOpen(true);
      })
      .catch(error => {
        setResidentsError(error);
        setResidentsLoading(false);
      });
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleCharacterClick = (character) => {
    navigate(`/characterDetails/${character.id}`, { state: { article: character } });
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container max-w-[1230px] mx-auto px-4">
      <div className="location-page py-20">
        <div className="location-list">
          <div className="flex w-full">
            <input
              type="search"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input border w-full bg-[#ffffff14] border-gray-300 rounded p-2 mb-4"
            />
          </div>
          <div className="location-list grid grid-cols-4 gap-4">
            {filteredLocations.length > 0 ? (
              filteredLocations.map(location => (
                <div key={location.id} className="flex flex-col gap-3 justify-between location-card border bg-[#166678] border-gray-300 rounded p-4 mb-2">
                  <h2 className="text-xl text-[#93f373] font-bold">{location.name}</h2>
                  <p className="text-[#79e7ff] mt-2 font-semibold mr-2">Type: <span className="text-[#f0ffef]">{location.type}</span></p>
                  <p className="text-[#79e7ff] mt-2 font-semibold mr-2">Dimension: <span className="text-[#f0ffef]">{location.dimension}</span></p>
                  <p className="text-[#79e7ff] mt-2 font-semibold mr-2">Created: <span className="text-[#f0ffef]">{new Date(location.created).toLocaleDateString()}</span></p>
                  <button
                    onClick={() => handleShowResidents(location.residents)}
                    className="btn"
                  >
                    Show characters location
                  </button>
                </div>
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>
        </div>
        {isDrawerOpen && (
          <div className="drawer fixed right-0 top-[60px] drop-shadow-2xl flex h-full">
            <div className="drawer-content bg-[#0d1f2dff] h-full p-4 pt-7 overflow-y-auto">
              <button
                onClick={handleDrawerClose}
                className="close-button bg-[#166678] text-white py-1 px-2 rounded mb-4"
              >
                Close
              </button>
              {residentsLoading && <div>Loading residents...</div>}
              {residentsError && <div>Error loading residents: {residentsError.message}</div>}
              {residents.length > 0 ? (
                residents.map(resident => (
                  <div
                    key={resident.id}
                    className="items-center resident-card border bg-[#ffffff14] border-gray-300 text-[#f0ffef] cursor-pointer rounded p-4 mb-2 flex"
                    onClick={() => handleCharacterClick(resident)}
                  >
                    <img src={resident.image} alt={resident.name} className="w-16 rounded-full h-16 object-cover mb-2" />
                    <div className="ml-5">
                      <h3 className="text-lg font-bold">{resident.name}</h3>
                      <p>ID: {resident.id}</p>
                    </div>
                  </div>
                ))
              ) : (
                !residentsLoading && <div>No residents to show</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPage;
