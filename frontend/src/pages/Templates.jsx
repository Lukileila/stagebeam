export const Templates = () => {
  return (
    <>
      <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'url("./src/assets/images/background2.png")' }}>

        <div className="absolute top-4 left-4">
          <img src="./src/assets/images/LogoWOBG.png" alt="Logo" className="max-w-32" />
        </div>

        <div className="absolute top-8">
          <button className="text-yellow-500 text-7xl md:font-bold " onClick={() => alert("Get creative")}>
            Get creative!
          </button>
        </div>

        <div className="flex flex-col items-center mt-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-500 p-4 rounded">
              <img src="./src/assets/images/templatesimages.png" alt="Template 1" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src="./src/assets/images/templatesimages2.png" alt="Template 2" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src="./src/assets/images/templatesimages6.png" alt="Template 3" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src="./src/assets/images/templatesimages4.png" alt="Template 4" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src="./src/assets/images/templatesimages5.png" alt="Template 5" className="cursor-pointer w-32 h-32" />
            </div>

            <div className="bg-yellow-500 p-4 rounded">
              <img src="./src/assets/images/templatesimages3.png" alt="Template 6" className="cursor-pointer w-32 h-32" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


