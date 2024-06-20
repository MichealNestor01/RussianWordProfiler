import { Link, useLocation } from "react-router-dom";

const NavBarItem = ({ title, path }) => {
  const location = useLocation();
  return (
    <Link
      className={`nav-bar-item ${
        location.pathname === path ? "active" : "inactive"
      }`}
      to={path}
    >
      {title}
    </Link>
  );
};

export default NavBarItem;
