import { NavLink } from "react-router-dom";
import logo from '../assets/images/LogoWOBG.png'
import background2 from '../assets/images/background2.png'
import template1 from '../assets/images/templatesimages.png'
import template2 from '../assets/images/templatesimages2.png'
import template3 from '../assets/images/templatesimages3.png'
import template4 from '../assets/images/templatesimages4.png'
import template5 from '../assets/images/templatesimages5.png'
import template6 from '../assets/images/templatesimages6.png'

export const Templates = () => {
  return (
    <>
      <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${background2})` }}>

        <div className="absolute top-4 left-4">
        <NavLink to='/'><img src={logo} alt="Logo" className="max-w-32 absolute top-4 left-4" /></NavLink>        </div>

        <div className="absolute top-8">
          <button className="text-yellow-500" onClick={() => alert("What we're creating today?")}>
            What we're creating today?
          </button>
        </div>

        <div className="flex flex-col items-center mt-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-500 p-4 rounded">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


