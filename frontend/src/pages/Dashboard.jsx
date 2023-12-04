


import { NavLink } from 'react-router-dom';
import logo from '../assets/images/LogoWOBG.png'
import backgroundDashboard from '../assets/images/backgroundDashboard.png'
import { LogOutButton } from '../components/LogOutButton.jsx';

export const Dashboard = () => {
  return (
    <div className='h-screen' style={{ backgroundImage: `url(${backgroundDashboard})` }}>
      <div className='flex justify-between items-center pl-6 pr-10 pt-4'>
          <NavLink to='/'><img src={logo} alt="Logo" className="max-w-32 block" /></NavLink>
          <LogOutButton />
      </div>
     
       
       
      </div>
   
  );
};