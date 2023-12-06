import { useEffect, useState } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import logo from '../assets/images/LogoWOBG.png';
import backgroundDashboard from '../assets/images/backgroundDashboard.png';
import { LogOutButton } from '../components/LogOutButton.jsx';
import { useUserContext } from '../context/UserContext';

// Eventually delete this when fetching from backend
import getShowsData from '../data/FakeUserData/get_shows.json';

export const Dashboard = () => {
  const { loadingUser, user, setUser } = useUserContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('http://localhost:3000/shows')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUser((prev) => ({ ...prev, shows: data }));
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  const setupShow = (show) => {
    localStorage.setItem('activeScenes', JSON.stringify(show.scenes));
    localStorage.setItem('activeObjects', JSON.stringify(show.scenes[0]));
    navigate('/controller');
  };

  if (loadingUser)
    return (
      <div
        className='h-screen flex flex-col'
        style={{ backgroundImage: `url(${backgroundDashboard})` }}
      >
        <div className='flex justify-between items-center pl-6 pr-10 pt-4'>
          <NavLink to='/'>
            <img src={logo} alt='Logo' className='max-w-32 block' />
          </NavLink>
          <LogOutButton />
        </div>
        <div className='text-yellow-500 text-2xl font-bold text-center mt-20'>
          Loading...
        </div>
      </div>
    );

  if (!loadingUser && !user) return <Navigate to='/' />;

  return (
    <div
      className='h-screen flex flex-col'
      style={{ backgroundImage: `url(${backgroundDashboard})` }}
    >
      <div className='flex justify-between items-center pl-6 pr-10 pt-4'>
        <NavLink to='/'>
          <img src={logo} alt='Logo' className='max-w-32 block' />
        </NavLink>
        <div className='flex gap-4 items-center'>
          <div className='text-xl'>Welcome back {user.name}</div>
          <LogOutButton />
        </div>
      </div>

      <div className='flex flex-col items-center h-full mt-16'>
        <div className='mb-4 text-xl font-bold text-yellow-500'>
          Your saved shows:
        </div>

        <div className='flex flex-wrap max-w-[1280px] justify-center'>
          {/* Iterating over mock data, replace with the commented out code below */}
          {getShowsData.map((show) => (
            <div
              key={show.id}
              className='bg-yellow-500 m-4 p-4 pb-10 w-64 aspect-square flex flex-col items-center justify-between rounded hover:cursor-pointer'
              onClick={() => setupShow(show)}
            >
              <div className='h-full'>
                <img
                  src={show.scenes[0].thumbnail}
                  alt={`Card ${show.name}`}
                  className='w-full h-4/5 p-4 object-cover mb-2 bg-black rounded'
                />
                <p className='text-black grow text-center font-bold mt-6 text-xl'>
                  {show.name}
                </p>
              </div>
            </div>
          ))}
          {/* {user.shows.length ? user.shows.map((show) => (
              <div
                key={show.id}
                className='bg-yellow-500 m-4 p-4 pb-10 w-64 aspect-square flex flex-col items-center justify-between rounded hover:cursor-pointer'
                onClick={() => setupShow(show)}
              >
                <div className='h-full'>
                  <img
                    src={show.scenes[0].thumbnail}
                    alt={`Card ${show.name}`}
                    className='w-full h-4/5 p-4 object-cover mb-2 bg-black rounded'
                  />
                  <p className='text-black grow text-center font-bold mt-6 text-xl'>
                    {show.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className='text-xl text-gray-500'>No shows saved.</div>
          )} */}
        </div>
      </div>
    </div>
  );
};
