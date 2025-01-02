import React, { useState } from 'react';
import './Navbar.css'; // Ensure this CSS file contains the required styles


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <img src="https://www.propertyplateau.com/wp-content/uploads/2023/07/Property_Plateau_logo_blue.png" alt="Logo" />
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <a href="#">Special Addition</a>
                </li>
                {/* <li className="nav-item">
                    <a href="#">Builders and Projects</a>
                </li> */}
                <li className="nav-item mega-menu-item">
                    <a href="#" onClick={() => setIsMenuOpen(!isMenuOpen)}>Projects</a>
                    {isMenuOpen && (
                        <div className="mega-menu">
                            <div className="mega-menu-content">
                                <div className="mega-menu-column">
                                    <h3>RERA Registered Projects</h3>
                                    <a href="#">RERA Registered Projects In Mumbai</a>
                                    <a href="#">RERA Registered Projects In Delhi</a>
                                    <a href="#">RERA Registered Projects In Noida</a>
                                    <a href="#">RERA Registered Projects In Gurgaon</a>
                                    <a href="#">RERA Registered Projects In Pune</a>
                                    <a href="#">RERA Registered Projects In Bangalore</a>
                                    <a href="#">RERA Registered Projects In Hyderabad</a>
                                    <a href="#">RERA Registered Projects In Chennai</a>
                                    <a href="#">RERA Registered Projects In Thane</a>
                                    <a href="#">RERA Registered Projects In Navi Mumbai</a>
                                </div>
                                <div className="mega-menu-column">
                                    <h3>RERA Registered Projects</h3>
                                    <a href="#">RERA Registered Projects In Mumbai</a>
                                    <a href="#">RERA Registered Projects In Mumbai</a>
                                    <a href="#">RERA Registered Projects In Mumbai</a>                                 
                                  
                                  
                                </div>
                               
                                
                            </div>
                        </div>
                    )}
                </li>
                <li className="nav-item">
                    <a href="#">Taxation and Finance</a>
                </li>
                <li className="nav-item">
                    <a href="#">Trending Stories </a>
                </li>
        
            </ul>
            <button className="post-property-button">Sell or Rent Property</button>
        </nav>
    );
}

export default Navbar;
