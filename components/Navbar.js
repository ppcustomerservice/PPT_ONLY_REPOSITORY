"use client";

import React, { useState } from "react";
import './Navbar.css';
import Link from 'next/link';


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to trigger the Google Translate language change
  const translateLanguage = (lang) => {
    const googleTranslateCombo = document.querySelector(".goog-te-combo");
    if (googleTranslateCombo) {
      googleTranslateCombo.value = lang; // Set the selected language in Google Translate dropdown
      googleTranslateCombo.dispatchEvent(new Event("change")); // Trigger the change event to switch language
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.propertyplateautimes.com/";


  return (
    <div>
      <nav className="navbar">
        <div className="left-section">
          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <span className="cross">✕</span> : <span className="hamburger-icon">☰</span>}
          </div>
        </div>

        <div className="logo">
          <a href="/">
            <img src="https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/09/03030642/PPTimes_bold.png" alt="Logo" style={{ cursor: 'pointer' }} />
          </a>
        </div>

        <div className="nav-items">
        <a href={`${baseUrl}new-properties`}>New Properties</a>
        <a href={`${baseUrl}newsshorts/latestnews`}>Latest News</a>
        <a href={`${baseUrl}newsshorts/infrastructure`}>Infrastructure</a>
        <a href={`${baseUrl}newsshorts/proptech`}>Proptech</a>
        <a href={`${baseUrl}newsshorts/rera`}>RERA</a>
        <a href={`${baseUrl}newsshorts/housingfinance`}>Housing Finance</a>
        <a href={`${baseUrl}newsshorts/regulatory`}>Regulatory</a>

          {/* Language Dropdown Button */}
          {/* <div className="language-dropdown" onClick={toggleDropdown}>
            <button className="language-dropdown-button">Language</button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <p onClick={() => translateLanguage('en')}>English</p>
                <p onClick={() => translateLanguage('hi')}>Hindi</p>
                <p onClick={() => translateLanguage('mr')}>Marathi</p>
              </div>
            )}
          </div> */}
        </div>

        <div className="right-section">
          <button
            className="subscribe"
            onClick={() => window.location.href = 'https://whatsapp.com/channel/0029ValQ5IkCcW4wYhAV0k13'}
          >
            Join Our Newsletter
          </button>
        </div>
      </nav>

      {/* Sidebar Menu Drawer */}
      <div className={`menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <button className="close-btn" onClick={toggleMenu}>✕</button>
        </div>
        <ul className="menu-links">
        <h1 style={{ fontWeight: 'bold', fontSize: '22px' }}>
        Category
        </h1>
          <li><a href="newsshorts/latestnews">Latest News</a></li>
          <li><a href="newsshorts/infrastructure">Infrastructure</a></li>
          <li><a href="newsshorts/proptech">Proptech</a></li>
          <li><a href="newsshorts/rera">RERA</a></li>
          <li><a href="newsshorts/housingfinance">Housing Finance</a></li>
          <li><a href="newsshorts/regulatory">Regulatory</a></li>

          <li className="brand-section-title">Our Brands</li>
          <li><a href="https://www.propertyplateau.com/" target="_blank" rel="noopener noreferrer">Property Plateau</a></li>
          <li><a href="https://propplateau.com/" target="_blank" rel="noopener noreferrer">Prop Plateau</a></li>
          <li><a href="https://holidayhomes.propertyplateau.com/" target="_blank" rel="noopener noreferrer">Holiday Homes</a></li>
          <li><a href="https://latitudeandlongitudegroup.com/" target="_blank" rel="noopener noreferrer">Latitude and Longitude</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
