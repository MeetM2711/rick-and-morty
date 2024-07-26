import React from 'react';
import './App.css';
import Home from './Pages/Home';
import CharacterDetails from './Pages/CharacterDetails';
import LocationPage from './Pages/LocationPage';
import EpisodesPage from './Pages/EpisodesPage';
import ContactUsPage from './Pages/ContactUsPage';
import AboutUsPage from './Pages/AboutUsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyProvider } from './Context/Context';
import Header from './Components/Header/Header';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characterDetails/:id" element={<CharacterDetails />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
