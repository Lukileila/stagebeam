import background3 from '../assets/images/background3.png'



export const WatchTutorialVideo = () => {
  return (
    <>
     <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${background3})` }}>

        // <div className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${background3})` }}> </div>
       
      </div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button className="bg-yellow-500 w-420 h-240 rounded overflow-hidden">
          <img src="./src/assets/images/preparingtutorial2.png" alt="Your Image" className="w-full h-full object-cover" />
        </button>
      </div>
    </>
  );
};

