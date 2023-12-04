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
      <div>
        <div className="flex flex-col justify-end mt-8">
          <button className="px-4 py-2 bg-yellow-500 text-zinc-950 rounded mb-2 w-fit">My Shows</button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2 w-fit">  Shared with:  </button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2 w-fit">Share  Now</button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2 w-fit">Second Set</button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2 w-fit"> +   New  Stage   </button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2 w-fit">   Threads   </button>
        </div>

        {/* Content should be right side (70% of the screen) */}
        <div className="w-[70%] ml-48"> 
          
        </div>
      </div>
    </div>
  );
};




