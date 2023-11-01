import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {

  return <>
          <Navbar/>
            <div className="content-wrapper">
                <Outlet/>
                </div>
         </>
}

export default Layout