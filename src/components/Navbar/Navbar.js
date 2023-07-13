import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SchoolIcon from "@mui/icons-material/School";

const Navbar = () => {
  let token = sessionStorage.getItem("token"); // Retrieve token from session storage
  let isToken = false; // Flag to check if token exists
  if (token) {
    isToken = true;
  }
  const [isOpen, setIsOpen] = useState(false); // State to manage navbar open/close
  const navigate = useNavigate(); // React Router navigation

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle navbar open/close
  };

  const removeToken = () => {
    sessionStorage.removeItem("token"); // Remove token from session storage
    navigate("/login"); // Navigate to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* <img style={{ width: "100px", height: "85px" }} src={logo} /><span >Student Detail App</span> */}
          <SchoolIcon
            style={{ width: "45px", height: "45px", paddingRight: "10px" }}
          />
          <span>Student Detail App</span>
        </Link>
        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <ul className="navbar-items">
            {isToken ? ( // Check if token exists
              <>
                <li className="navbar-item">
                  <Link to="/" className="navbar-link" onClick={toggleNavbar}>
                    Home
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link
                    to="/allRecords"
                    className="navbar-link"
                    onClick={toggleNavbar}
                  >
                    All Records
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link
                    to="/studentDetail"
                    className="navbar-link"
                    onClick={toggleNavbar}
                  >
                    Add Students
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/" className="navbar-link" onClick={removeToken}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-item">
                  <Link
                    to="/login"
                    className="navbar-link"
                    onClick={toggleNavbar}
                  >
                    Login
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link
                    to="/register"
                    className="navbar-link"
                    onClick={toggleNavbar}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleNavbar}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
