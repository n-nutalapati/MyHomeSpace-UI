import { useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({ data }) => {

  const [showSubMenu, setShowSubMenu] = useState([]);

  const navigate = useNavigate();

  const handleSubMenuOnEnter = (subMenuId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subMenuId] = true;
      return arr;
    });
  };

  const handleSubMenuOnLeave = (subMenuId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subMenuId] = false;
      return arr;
    });
  };


  const loadChildren = (subMenu) => {
    return (
      <ul className="sub-menu">
        {subMenu.map((subitem, id) => (
          <li
            key={id}
            // onMouseEnter={(event) => handleSubMenuOnEnter(subitem.id)}
            // onMouseLeave={(event) => handleSubMenuOnLeave(subitem.id)}
          >
            <a href={subitem.url} target="_blank" rel="noopener noreferrer">
              {subitem.name}
            </a>
            {subitem.children &&
              loadChildren(subitem.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <div className="menu-container">
        <ul className="menu-hdr">
          {data.map((item, i) => (
            <li
              className="menu-items"
              key={i}
              onMouseEnter={(event) => handleSubMenuOnEnter(item.id)}
              onMouseLeave={(event) => handleSubMenuOnLeave(item.id)}
            >
              {item.name}
              {item.children &&
                showSubMenu[item.id] &&
                loadChildren(item.children)}
            </li>
          ))}
        </ul>
      </div>
      {/* <Link to="edit-menu"> */}
        <button className="btn" onClick={(e)=>navigate("/edit-menu")}>Edit</button>
      {/* </Link> */}
    </div>
  );
};

export default NavBar;
