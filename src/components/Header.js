import "./Header.css";
import Logo from "../assets/channels4_profile.jpg";
import personLogo from "../assets/icons/person.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UserService from "../service/UserService";

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  let menuRef = useRef();
  const isAuthenticated = UserService.isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    let handler = (e) => {
      if (isAuthenticated && !menuRef.current.contains(e.target)) {
        setDisplayMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      navigate("/");
    }
  };

  return (
    <header>
      <div className="header-top">
        <div className="title-logo">
          <Link to={isAuthenticated ? "/home" : "/"}>
            <img src={Logo} alt="Logo" />
          </Link>
          <span>Welcome 2 My HomePage</span>
        </div>
        {isAuthenticated && (
          <div className="profile" ref={menuRef}>
            <div
              className="user-logo"
              onClick={() => setDisplayMenu(!displayMenu)}
            >
              <img src={personLogo} alt="person" />
            </div>
            <div
              className={`profile-list ${displayMenu ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                {UserService.isAdmin() && (
                  <li>
                    <Link to="/admin/users">Manage</Link>
                  </li>
                )}
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
