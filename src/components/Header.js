import "./Header.css";
import Logo from "../assets/channels4_profile.jpg"
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Header = ({data}) => {
  const nav_data = data;
  return (
    <header>
      <div className="header-top">
        <Link to='/'><img src={Logo} alt="Logo"/></Link>
        <span>Welcome 2 My Space</span>
      </div>
      <NavBar data={nav_data} />
    </header>
  )
}

export default Header
