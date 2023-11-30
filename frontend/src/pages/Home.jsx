import { NavLink } from "react-router-dom";
import {useUserContext} from '../context/UserContext'
import logo from '../assets/images/LogoWOBG.png'
import background from '../assets/images/background.png'

export const Home = () => {
  const {user} = useUserContext();
  return (
    <>
      <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${background})` }}>

        
      <NavLink to='/'><img src={logo} alt="Logo" className="max-w-32 absolute top-4 left-4" /></NavLink>
        <div className="flex flex-col items-center">

          
          <div className="absolute top-4 right-4 flex gap-4">

            {/* TEST started here adding more NavLinks */}
          <div className="text-yellow-500">Hello {user ? user.name : 'there!'}</div>
            <NavLink to="signuppage">
          <button className="px-4 py-2 bg-yellow-500 text-zinc-950 rounded">Sign Up</button>
          </NavLink>


          <NavLink to="loginpage">
            <button className="px-4 py-2 bg-yellow-500 text-zinc-950 rounded">Already have an account? Log In</button>
            </NavLink>

          </div>

          <div className="flex justify-between items-center w-full p-4">
           
          </div>

          <div className="flex flex-col items-center mt-16">
           
            <NavLink to="controller">
              <button className="px-8 py-4  bg-yellow-500 text-zinc-950 rounded mb-4">Create your first stage</button>
            </NavLink>

            <NavLink to="templates">
              <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-4">Choose a template</button>
            </NavLink>

            <NavLink to="watchtutorialvideo">
              <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-4">Watch tutorial video</button>
            </NavLink>



            {user && <NavLink to="dashboard">
              <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-4">Go to Dashboard</button>
            </NavLink>}





          </div>
        </div>

        
        <div className="fixed bottom-8 right-8">


        <NavLink to="share">


          <button className="p-4 bg-zinc-950 text-gray-50 rounded-full">Share</button>

          </NavLink>

        </div>

      </div>
    </>
  );
};



