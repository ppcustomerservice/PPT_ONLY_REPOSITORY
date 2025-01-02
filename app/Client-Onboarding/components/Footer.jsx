import React from 'react';
import './Footer.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', width: '100%' }}>
      {/* First Row */}
      <div className="footer-row" style={{ display: 'flex', flexWrap: 'wrap', padding: '40px 20px', borderBottom: '1px solid #333' }}>
        {/* First Column - Company Logo and News Links */}
        <div className="footer-column" style={{ flex: '1 1 25%', marginBottom: '20px' }}>
          <img
            src="https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/09/03030642/PPTimes_bold.png"
            alt="Company Logo"
            style={{ width: '250px', marginBottom: '15px' }}
          />
          <ul>
            <li><a href={`${baseUrl}newsshorts/latestnews`} style={{ color: '#fff', textDecoration: 'none' }}>Latest News</a></li>
            <li><a href={`${baseUrl}newsshorts/infrastructure`} style={{ color: '#fff', textDecoration: 'none' }}>Infrastructure</a></li>
            <li><a href={`${baseUrl}newsshorts/proptech`} style={{ color: '#fff', textDecoration: 'none' }}>Proptech</a></li>
            <li><a href={`${baseUrl}economy`} style={{ color: '#fff', textDecoration: 'none' }}>Economy</a></li>
            <li><a href={`${baseUrl}newsshorts/rera`} style={{ color: '#fff', textDecoration: 'none' }}>RERA</a></li>
            <li><a href={`${baseUrl}newsshorts/housingfinance`} style={{ color: '#fff', textDecoration: 'none' }}>Housing Finance</a></li>
            <li><a href={`${baseUrl}newsshorts/regulatory`} style={{ color: '#fff', textDecoration: 'none' }}>Regulatory</a></li>
          </ul>
        </div>

        {/* Second Column - Our Brands */}
        <div className="footer-column" style={{ flex: '1 1 25%', marginBottom: '20px' }}>
          <h4>Our Brands</h4>
          <ul>
            <li><a href='https://www.propertyplateau.com/' style={{ color: '#fff', textDecoration: 'none' }}>PropertyPlateau</a></li>
            <li><a href='https://propplateau.com/' style={{ color: '#fff', textDecoration: 'none' }}>Propplateau</a></li>
            <li><a href='https://holidayhomes.propertyplateau.com/' style={{ color: '#fff', textDecoration: 'none' }}>Holiday Homes</a></li>
            <li><a href='https://impoexpokart.com/' style={{ color: '#fff', textDecoration: 'none' }}>Impoexpokart</a></li>
            <li><a href='https://latitudeandlongitudegroup.com/' style={{ color: '#fff', textDecoration: 'none' }}>Real Estate Podcasts</a></li>
          </ul>
        </div>

        {/* Third Column - Our Services */}
        <div className="footer-column" style={{ flex: '1 1 25%', marginBottom: '20px' }}>
          <h4>Our Services</h4>
          <ul>
            <li><a href='https://www.propertyplateau.com/plateaukonnect/' style={{ color: '#fff', textDecoration: 'none' }}>Plateau Konnect</a></li>
            <li><a href='https://www.propertyplateau.com/lease-with-us/' style={{ color: '#fff', textDecoration: 'none' }}>Lease with Us</a></li>
            <li><a href='https://www.propertyplateau.com/' style={{ color: '#fff', textDecoration: 'none' }}>Invest in Real Estate</a></li>
            <li><a href='https://www.propertyplateau.com/add-listing-contact/' style={{ color: '#fff', textDecoration: 'none' }}>Sell your home</a></li>
            <li><a href='https://api.whatsapp.com/send/?phone=919156091640&text=Hello,I%2520am%2520interested%2520in%2520Vastu%2520Consultation' style={{ color: '#fff', textDecoration: 'none' }}>Vastu Consultation</a></li>
            <li><a href='https://api.whatsapp.com/send/?phone=919156091640&text=Hello,I%2520am%2520interested%2520in%2520Home%2520Interior' style={{ color: '#fff', textDecoration: 'none' }}>Home Interior</a></li>
            <li><a href='https://api.whatsapp.com/send/?phone=919156091640&text=Hello,I%2520am%2520interested%2520in%2520Painting%2520Services' style={{ color: '#fff', textDecoration: 'none' }}>Painting Services</a></li>
            <li><a href='https://www.propertyplateau.com/NRI-Services-India/' style={{ color: '#fff', textDecoration: 'none' }}>NRI Guide</a></li>
            <li><a href='https://www.propertyplateau.com/facility-management/' style={{ color: '#fff', textDecoration: 'none' }}>Facility Management</a></li>
          </ul>
        </div>

        {/* Fourth Column - Newsletter */}
        <div className="footer-column" style={{ flex: '1 1 25%', marginBottom: '20px' }}>
          <h4>Join Our Newsletter</h4>
          <div className="newsletter-box" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="email" placeholder="Email" className="newsletter-input" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555' }} />
            <input type="text" placeholder="Phone Number" className="newsletter-input" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555' }} />
            <button type="submit" className="newsletter-submit" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#555', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
          </div>
        </div>
      </div>

      {/* Second Row - Footer Links */}
      <div className="footer-links-row" style={{ textAlign: 'center', padding: '20px 10px', borderBottom: '1px solid #333' }}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Use</a></li>
          <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a></li>
          <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Disclaimer</a></li>
          <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Site Maps</a></li>
          <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>RSS Feeds</a></li>
        </ul>
      </div>

      {/* Third Row - Copyright */}
      <div className="footer-copyright-row" style={{ textAlign: 'center', padding: '10px', backgroundColor: '#111' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>© 2024 Property Plateau. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
