import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'url("./src/assets/images/background.png")' }}>

        {/* Logo at the top left */}
        <img src="./src/assets/images/logoblue.png" alt="Logo" className="max-w-32 absolute top-4 left-4" />

        <div className="flex flex-col items-center">

          {/* Move Sign Up and Log In buttons to the top right */}
          <div className="absolute top-4 right-4 flex gap-4">
            <button className="px-4 py-2 bg-emerald-400 text-zinc-950 rounded">Sign Up</button>
            <button className="px-4 py-2 bg-emerald-400 text-zinc-950 rounded">Already have an account? Log In</button>
          </div>

          <div className="flex justify-between items-center w-full p-4">
            {/* Content */}
          </div>

          <div className="flex flex-col items-center mt-16">
            {/* Action buttons in the absolute center */}
            <NavLink to="controller">
              <button className="px-8 py-4 bg-emerald-400 text-zinc-950 rounded mb-4">Create your first stage</button>
            </NavLink>

            <NavLink to="templates">
              <button className="px-8 py-4 bg-emerald-400 text-zinc-950 rounded mb-4">Choose a template</button>
            </NavLink>

            <NavLink to="watchtutorialvideo">
              <button className="px-8 py-4 bg-emerald-400 text-zinc-950 rounded mb-4">Watch tutorial video</button>
            </NavLink>
          </div>
        </div>

        {/* Share button at the bottom right */}
        <div className="fixed bottom-8 right-8">
          <button className="p-4 bg-zinc-950 text-gray-50 rounded-full">Share</button>
        </div>

      </div>
    </>
  );
};

