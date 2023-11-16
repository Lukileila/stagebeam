import {NavLink, Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div className="layout">
        <header>
            <nav className="bg-black text-white text-xs">
                 <NavLink to="/">Home</NavLink> | 
                | <NavLink to="templates">Templates</NavLink>  | 
                | <NavLink to="dashboard">Dashboard</NavLink>  | 
                | <NavLink to="controller">Controller</NavLink>  | 
                | <NavLink to="beamer">Beamer</NavLink>  | 
                | <NavLink to="about">About</NavLink>  | 
                | <NavLink to="error">Error</NavLink>
                  <span>← Navigation for development purposes only.</span>
            </nav>
        </header>
        <main><Outlet/></main>
    </div>
  )
}

export default Layout