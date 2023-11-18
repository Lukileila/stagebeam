export const Home = () => {

  return (
    <div className="flex flex-col items-center min-h-screen bg-A26769 text-6D2E46">
      <div className="flex justify-between items-center w-full p-4">
       

      {/* for logo */}
        <img src="./src/assets/images/logo.png" alt="Logo" className="max-w-32" />

        
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-rose-400 text-pink-950 rounded">Sign Up</button>
          <button className="px-4 py-2 bg-rose-400 text-pink-950 rounded">Already have an account? Log In</button>
        </div>
      </div>

      
      <div className="flex flex-col items-center mt-16">
        <button className="px-8 py-4 bg-rose-400 text-pink-950 rounded mb-4">Create your first stage</button>
        <button className="px-8 py-4 bg-rose-400 text-pink-950 rounded mb-4">Choose a template</button>
        <button className="px-8 py-4 bg-rose-400 text-pink-950 rounded mb-4">Watch tutorial video</button>
      </div>

      
      <div className="fixed bottom-8 right-8">
        <button className="p-4  bg-rose-400  text-pink-950 rounded-full">Share</button>
      </div>
    </div>
  );
};


