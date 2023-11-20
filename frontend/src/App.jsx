// Imports for routing   // Should i add here "import {link} ?"
import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
// Import for layout
import Layout from './components/Layout.jsx';
// Imports for pages
import { Home } from "./pages/Home.jsx";
import { Share } from "./pages/Share.jsx";
import { WatchTutorialVideo } from "./pages/WatchTutorialVideo.jsx";
import { About } from "./pages/About.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Controller } from "./pages/Controller.jsx";
import { Beamer } from "./pages/Beamer.jsx";
import { Error } from './pages/Error.jsx';
import { Templates } from "./pages/Templates.jsx";









// Imports for state management
import {useState, useEffect} from 'react';


/* const { DEV, BACKEND_URL_DEPLOY, BACKEND_URL_DEV } = import.meta.env;   // Maybe implement later */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home />}/> {/*Landing Page*/}
      <Route path="templates" element={<Templates />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="controller" element={<Controller />}/>
      <Route path="beamer" element={<Beamer />}/>
      <Route path="about" element={<About />}/>
      <Route path="*" element={<Error/>} />  
      <Route path="share" element={<Share />}/>  
      <Route path="watchtutorialvideo" element={<WatchTutorialVideo />}/>   
    </Route>

  )
);


const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export default App;

