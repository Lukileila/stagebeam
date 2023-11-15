// Imports for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Imports for pages
import Layout from './components/Layout.jsx';
import Error from './pages/Error.jsx';

// Imports for state management
import {useState, useEffect} from 'react';

/* const { DEV, BACKEND_URL_DEPLOY, BACKEND_URL_DEV } = import.meta.env;   // Maybe implement later */



const App = () => {


return (
 
    <BrowserRouter>
     <Layout>
      <Routes>
        <Route path='/' element={<Component/> }/>       
        <Route path="*" element={<Error/>} />        
      </Routes>
      </Layout>
    </BrowserRouter>
  
)
};

export default App;

