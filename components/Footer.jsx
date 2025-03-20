import React from 'react';
import './Footer.css'; // Import custom styles

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.propertyplateautimes.com/";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Row */}
      <div className="footer-row">
        {/* Column 1 - Latest News */}
        <div className="footer-column">
          {/* <img
            src="https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/09/03030642/PPTimes_bold.png"
            alt="Company Logo"
            className="footer-logo"
          /> */}
          <ul>
            <li><a href={`${baseUrl}newsshorts/latestnews`}>Latest News</a></li>
            <li><a href={`${baseUrl}newsshorts/infrastructure`}>Infrastructure</a></li>
            <li><a href={`${baseUrl}newsshorts/proptech`}>Proptech</a></li>
            <li><a href={`${baseUrl}economy`}>Economy</a></li>
            <li><a href={`${baseUrl}newsshorts/rera`}>RERA</a></li>
            <li><a href={`${baseUrl}newsshorts/housingfinance`}>Housing Finance</a></li>
            <li><a href={`${baseUrl}newsshorts/regulatory`}>Regulatory</a></li>
          </ul>
        </div>

        {/* Column 2 - Our Brands */}
        <div className="footer-column">
          <h4>Our Brands</h4>
          <ul>
            <li><a href="https://www.propertyplateau.com/">PropertyPlateau</a></li>
            <li><a href="https://propplateau.com/">Propplateau</a></li>
            <li><a href="https://holidayhomes.propertyplateau.com/">Holiday Homes</a></li>
            <li><a href="https://impoexpokart.com/">Impoexpokart</a></li>
            <li><a href="https://latitudeandlongitudegroup.com/">Real Estate Podcasts</a></li>
          </ul>
        </div>

        {/* Column 3 - Our Services */}
        <div className="footer-column">
          <h4>Our Services</h4>
          <ul>
            <li><a href="https://www.propertyplateau.com/plateaukonnect/">Plateau Konnect</a></li>
            <li><a href="https://www.propertyplateau.com/lease-with-us/">Lease with Us</a></li>
            <li><a href="https://www.propertyplateau.com/">Invest in Real Estate</a></li>
            <li><a href="https://www.propertyplateau.com/add-listing-contact/">Sell your home</a></li>
            <li><a href="https://api.whatsapp.com/send/?phone=919156091640&text=Hello,I%2520am%2520interested%2520in%2520Home%2520Interior&type=phone_number&app_absent=0">Vastu Consultation</a></li>
            <li><a href="https://api.whatsapp.com/send/?phone=919156091640&text=Hello,I%2520am%2520interested%2520in%2520Home%2520Interior&type=phone_number&app_absent=0">Home Interior</a></li>
            <li><a href="https://www.propertyplateau.com/NRI-Services-India/">NRI Guide</a></li>
            <li><a href="https://www.propertyplateau.com/facility-management/">Facility Management</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact Us */}
      
        <div className="footer-column">
  <h4>Contact Us</h4>


  <ul className="contact-info">
  <a href='https://www.propertyplateautimes.com/'>
  <img src="https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2025/01/03015741/PPtimes-461x103-1.png" 
    alt="Footer Logo"
    className="footer-contact-logo"
  /></a>
<li>Email: 
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@propertyplateautimes.com" target="_blank">
    contact@propertyplateautimes.com
  </a>
</li>
    <li>Phone: <a href="tel:+919156091640">+91 91560 91640</a></li>
  </ul>

  <h4>Get in Touch</h4>
  <div className="social-icons">
    <a href="https://www.facebook.com/share/15wssCeKVj/" target="_blank" rel="noopener noreferrer">
      <img src="/facebook.svg" alt="Facebook" className="social-icon" />
    </a>
    <a href="https://www.instagram.com/propertyplateautimes?igsh=ZW9kZGJlMXMwbWgy" target="_blank" rel="noopener noreferrer">
      <img src="/instagram.svg" alt="Instagram" className="social-icon" />
    </a>
    <a href="https://whatsapp.com/channel/0029ValQ5IkCcW4wYhAV0k13" target="_blank" rel="noopener noreferrer">
      <img src="/whatsapp.svg" alt="WhatsApp" className="social-icon" />
    </a>
  </div>
</div>

</div>

     

      {/* Footer Bottom Row */}
      <div className="footer-second-row">
        <ul>
          <li><a href={`${baseUrl}Terms-of-use`}>Terms of Use</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href={`${baseUrl}Disclaimer`}>Disclaimer</a></li>
          <li><a href="#">Site Maps</a></li>
          <li><a href="#">RSS Feeds</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
