import { NavLink } from "react-router-dom"

export const Home = () => {




  return (
   

   <>  
   <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: 'url("./src/assets/images/2.png")' }}>
   
   <div className="flex flex-col items-center min-h-screen bg-A26769 text-6D2E46">
      <div className="flex justify-between items-center w-full p-4">
       

      
        <img src="./src/assets/images/LogoEdition2.png" alt="Logo" className="max-w-32" />

        
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-yellow-500 text-zinc-950 rounded">Sign Up</button>
          <button className="px-4 py-2 bg-yellow-500 text-zinc-950 rounded">Already have an account? Log In</button>
        </div>
      </div>

      
      <div className="flex flex-col items-center mt-16">


      


      <NavLink to="controller">
        
 <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-4">Create your first stage</button>

 </NavLink> 

        
        
        
         <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-4">Choose a template</button>
        <button className="px-8 py-4 bg-yellow-500 text-zinc-950 rounded mb-4">Watch tutorial video</button>
      </div>

      
      <div className="fixed bottom-8 right-8">
        <button className="p-4  bg-zinc-950  text-gray-50 rounded-full">Share</button>
      </div>
    </div>

    </div> 

</>


  );
};


