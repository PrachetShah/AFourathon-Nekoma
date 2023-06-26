import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  let token = sessionStorage.getItem("token");
  let isToken = false;
  if (token) {
    isToken = true;
  }
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>
        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <ul className="navbar-items">
            <li className="navbar-item">
              <Link to="/home" className="navbar-link" onClick={toggleNavbar}>
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
            {isToken ? (
              <li className="navbar-item">
                <Link to="/" className="navbar-link" onClick={removeToken}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="navbar-item">
                  <Link to="/login" className="navbar-link" onClick={toggleNavbar}>
                    Login
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link
                    to="/register"
                    className="navbar-link"
                    onClick={toggleNavbar}
                    style={{
                      border: "2px solid black",
                      borderRadius: "50%",
                      padding: "5px 10px",
                    }}
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
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
