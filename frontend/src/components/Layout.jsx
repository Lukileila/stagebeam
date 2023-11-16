import {NavLink, Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div className="layout">
        <header>
            <nav>
                <h1>Layout</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="about">About</NavLink>
            </nav>
        </header>
        <main><Outlet/></main>
    </div>
  )
}

export default Layout