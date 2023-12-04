import { NavLink } from 'react-router-dom';
import logo from '../assets/images/LogoWOBG.png';
import backgroundDashboard from '../assets/images/backgroundDashboard.png';
import { LogOutButton } from '../components/LogOutButton.jsx';
import show1 from '../assets/images/show1.png';
import show2 from '../assets/images/show2.png';
import show3 from '../assets/images/show3.png';
import show4 from '../assets/images/show4.png';

export const Dashboard = () => {
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
          <div className="card bg-yellow-500 m-4 p-10 w-64 h-64 flex flex-col items-center">
            <img src={show1} alt="Card 1" className="w-full h-full object-cover mb-2" />
            <div className="text-black text-center font-bold">Show 1</div>
          </div>

          <div className="card bg-yellow-500 m-4 p-10 w-64 h-64 flex flex-col items-center">
            <img src={show2} alt="Card 2" className="w-full h-full object-cover mb-2" />
            <div className="text-black text-center font-bold">Show 2</div>
          </div>

          <div className="card bg-yellow-500 m-4 p-10 w-64 h-64 flex flex-col items-center">
            <img src={show3} alt="Card 3" className="w-full h-full object-cover mb-2" />
            <div className="text-black text-center font-bold">Show 3</div>
          </div>

          <div className="card bg-yellow-500 m-4 p-10 w-64 h-64 flex flex-col items-center">
            <img src={show4} alt="Card 4" className="w-full h-full object-cover mb-2" />
            <div className="text-black text-center font-bold">Show 4</div>
          </div>
        </div>
      </div>
    </div>
  );
};