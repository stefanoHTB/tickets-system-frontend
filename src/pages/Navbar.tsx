import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
        <li><Link to="/"><h5>SUBMIT TICKET</h5></Link></li>
        <li><Link to="/admin"><h5>ADMIN PANEL</h5></Link></li>

    </nav>
  )
}

export default Navbar