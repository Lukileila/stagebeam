import { NavLink, useNavigate } from 'react-router-dom';
import { LogOutButton } from '../components/LogOutButton.jsx';
import logo from '../assets/images/LogoWOBG.png';
import background2 from '../assets/images/background2.png';
import template1 from '../assets/images/templatesimages.png';
import template2 from '../assets/images/templatesimages2.png';
import template3 from '../assets/images/templatesimages6.png';
import template4 from '../assets/images/templatesimages4.png';
import template5 from '../assets/images/templatesimages5.png';
import template6 from '../assets/images/templatesimages3.png';
import showTemplates from '../data/showTemplates.json';
import { useUserContext } from '../context/UserContext';

const images = [
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
];

export const Templates = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const setupTemplate = (template) => {
    localStorage.setItem('activeScenes', JSON.stringify(template.scenes));
    localStorage.setItem('activeObjects', JSON.stringify(template.scenes[0]));
    navigate('/controller');
  };

  return (
    <>
      <div
        className='relative bg-cover bg-center h-screen'
        style={{ backgroundImage: `url(${background2})` }}
      >
        <div className='flex justify-between items-center pl-6 pr-10 pt-4'>
          <NavLink to='/'>
            <img src={logo} alt='Logo' className='max-w-32 block' />
          </NavLink>

          <div className='flex items-center gap-4'>
            {user ? (
              <>
                <div className='text-xl text-yellow-500'>
                  Welcome back {user.name}
                </div>
                <LogOutButton />
              </>
            ) : (
              <>
                <NavLink
                  to='/signuppage'
                  className='px-4 py-2 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded'
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to='/loginpage'
                  className='px-4 py-2 hover:bg-yellow-600 bg-yellow-500 text-zinc-950 rounded'
                >
                  Already have an account? Log In
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className='flex flex-col items-center mt-16'>
          <div className='text-yellow-500 text-xl font-bold text-center mb-16'>
            What are we creating today?
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {showTemplates.map((template, i) => (
              <div
                key={template.id}
                id={template.id}
                className='bg-yellow-500 p-4 rounded'
                onClick={() => setupTemplate(template)}
              >
                <img
                  src={images[i]}
                  alt='Template 1'
                  className='cursor-pointer w-32 h-32'
                />
              </div>
            ))}
            {/* <div className="bg-yellow-500 p-4 rounded">
              <img src={template1} alt="Template 1" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src={template2} alt="Template 2" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src={template6} alt="Template 3" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src={template4} alt="Template 4" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src={template5} alt="Template 5" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src={template3} alt="Template 6" className="cursor-pointer w-32 h-32" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
