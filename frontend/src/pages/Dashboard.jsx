import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/LogoWOBG.png';
import backgroundDashboard from '../assets/images/backgroundDashboard.png';
import { LogOutButton } from '../components/LogOutButton.jsx';
import getShowsData from '../data/FakeUserData/get_shows.json'

export const Dashboard = () => {
 const [savedShows, setSavedShows] = useState([]);

 useEffect(() => {
    


    fetch('../data/FakeUserData/get_shows.json')
      .then((response) => response.json())
      .then((data) => setSavedShows(data))
      .catch((error) => console.error('Error fetching data:', error));
 }, []);

 return (
    <div className='h-screen flex flex-col' style={{ backgroundImage: `url(${backgroundDashboard})` }}>
      <div className='flex justify-between items-center pl-6 pr-10 pt-4'>
        <NavLink to='/'><img src={logo} alt="Logo" className="max-w-32 block" /></NavLink>
        <div className="flex items-center">
          <LogOutButton />
        </div>
      </div>

      <div className="flex flex-col items-center h-full">
        <div className="mb-4 text-xl font-bold text-yellow-500">Your saved shows:</div>

        <div className="flex">
          {savedShows.length > 0 ? (
            savedShows.map((show) => (
              <div key={show.id} className="card bg-yellow-500 m-4 p-10 w-64 h-64 flex flex-col items-center">
                <img src={show.thumbnailURL} alt={`Card ${show.id}`} className="w-full h-full object-cover mb-2" />
                <div className="text-black text-center font-bold">{show.name}</div>
              </div>
            ))
          ) : (
            <div className="text-xl text-gray-500">No shows saved.</div>
          )}
        </div>
      </div>
    </div>
 );
};