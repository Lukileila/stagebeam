import { NavLink } from 'react-router-dom';
import logo from '../assets/images/LogoWOBG.png'

export const Dashboard = () => {
  return (
    <>
      <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'url("./src/assets/images/backgroundDashboard.png")' }}>
        
        

        <NavLink to='/'><img src={logo} alt="Logo" className="max-w-32 absolute top-4 left-4" /></NavLink>
        <div className="flex flex-col items-start absolute top-4 left-4" style={{ marginTop: '8cm' }}>
          <button className="px-4 py-2 bg-yellow-500 text-zinc-950 rounded mb-2">My Saved Stages</button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2">  Shared with:  </button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2">Share  Now</button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2">Second Set</button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2"> +   New  Stage   </button>
          <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-2">   Threads   </button>
        </div>

        {/* Content should be right side (70% of the screen) */}
        <div className="w-70% ml-48"> 
          {/* Here goes dashboard mobile thing */}
        </div>
      </div>
    </>
  );
};




