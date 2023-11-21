//This file is for routing

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
import { Dashboard } from "./pages/Dashboard.jsx";
import { Controller } from "./pages/Controller.jsx";
import { Beamer } from "./pages/Beamer.jsx";
import { Templates } from "./pages/Templates.jsx";
import { NotFound } from './pages/NotFound.jsx';

// Imports for state management
import {useState, useEffect} from 'react';


/* const { DEV, BACKEND_URL_DEPLOY, BACKEND_URL_DEV } = import.meta.env;   // Maybe implement later */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/> {/*Landing Page*/}
      <Route path="templates" element={<Templates />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="controller" element={<Controller />}/>
      <Route path="beamer" element={<Beamer />}/>
      <Route path="about" element={<About />}/>
      <Route path="*" element={<NotFound/>} /> 
    </Route>

  )
);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export default App;

