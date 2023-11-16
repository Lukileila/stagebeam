// Imports for routing
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
import { About } from "./pages/About.jsx";
import Error from './pages/Error.jsx';

// Imports for state management
import {useState, useEffect} from 'react';

/* const { DEV, BACKEND_URL_DEPLOY, BACKEND_URL_DEV } = import.meta.env;   // Maybe implement later */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home />}/>
      <Route path="about" element={<About />}/>
{/*       <Route path="*" element={<Error/>} />     */}    
    </Route>

  )
);


const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export default App;

