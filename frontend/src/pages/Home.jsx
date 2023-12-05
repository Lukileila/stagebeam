import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import logo from '../assets/images/LogoWOBG.png';
import background from '../assets/images/background.png';
import { LogOutButton } from '../components/LogOutButton.jsx';

export const Home = () => {
  const { user, loadingUser } = useUserContext();
  const navigate = useNavigate();

  const setEmptyStage = () => {
    localStorage.removeItem('activeScenes');
    localStorage.removeItem('activeObjects');
    navigate('/controller');
  };

  if (loadingUser)
    return (
      <div
        className='relative bg-cover bg-center h-screen'
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='flex items-center justify-between mx-6 pt-4'>
          <NavLink to='/'>
            <img src={logo} alt='Logo' className='max-w-32' />
          </NavLink>
          <div className='flex gap-4'>
            <NavLink
              to='signuppage'
              className='px-4 py-2 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded'
            >
              Sign Up
            </NavLink>
            <NavLink
              to='loginpage'
              className='px-4 py-2 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded'
            >
              Already have an account? Log In
            </NavLink>
          </div>
        </div>
        <div className='text-yellow-500 text-2xl font-bold flex items-center justify-center align-middle h-[60vh] mt-20'>
          Loading...
        </div>
      </div>
    );

  return (
    <>
      <div
        className='relative bg-cover bg-center h-screen'
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='flex items-center justify-between pl-6 pr-10 pt-4'>
          <NavLink to='/'>
            <img src={logo} alt='Logo' className='max-w-32' />
          </NavLink>
          <div className='flex gap-4 items-center'>
            {/* Must see how this should be written!!! */}
            {user ? (
              <>
                <div className='text-yellow-500 text-xl'>
                  Welcome back {user.name}
                </div>
                <LogOutButton />
              </>
            ) : (
              <>
                <NavLink
                  to='signuppage'
                  className='px-4 py-2 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded'
                >
                  Sign Up
                </NavLink>

                <NavLink
                  to='loginpage'
                  className='px-4 py-2 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded'
                >
                  Already have an account? Log In
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* <div className='flex justify-between items-center w-full p-4'></div> */}

        <div className='flex flex-col justify-center items-center mt-16 h-[70vh]'>
          <button
            onClick={setEmptyStage}
            className='px-8 py-4 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded mb-4 w-[28ch] block text-center'
          >
            Create your first stage
          </button>

          <NavLink
            to='templates'
            className='px-8 py-4 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded mb-4 w-[28ch] block text-center'
          >
            Choose a template
          </NavLink>

          {/* <NavLink
            to='watchtutorialvideo'
            className='px-8 py-4 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded mb-4 w-[28ch] block text-center'
          >
            Watch tutorial video
          </NavLink> */}

          {user && (
            <NavLink
              to='dashboard'
              className='px-8 py-4 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded mb-4 w-[28ch] block text-center'
            >
              Go to Dashboard
            </NavLink>
          )}
        </div>
      </div>

      {/* <div className='fixed bottom-8 right-8'>
        <NavLink to='share'>
          <button className='p-4 bg-zinc-950 text-gray-50 rounded-full'>
            Share
          </button>
        </NavLink>
      </div> */}
      {/* </div> */}
    </>
  );
};
