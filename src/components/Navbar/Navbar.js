import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-items">
            <li className="navbar-item">
              <Link to="/" className="navbar-link" onClick={toggleNavbar}>
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/allRecords" className="navbar-link" onClick={toggleNavbar}>
                All Records
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/studentDetail" className="navbar-link" onClick={toggleNavbar}>
                Add Students
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/logout" className="navbar-link" onClick={toggleNavbar}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleNavbar}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
