import React from 'react';
import '../components/css/Footer.css'; // Import the CSS file
import logo from '../components/img/finallogo.png'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return (
    <footer className={`footer ${location.pathname === '/contact' ? 'footer-fixed' :''} ${location.pathname==='/dashboard'?'footer_dash':''} ${location.pathname==='/membershipcard'?'footer_dash':''}`}>
      <div className="footer-content">

        <div className="footer-section about">
          <img src={logo} alt='Logo' width={100} style={{marginBottom:"10px"}} />
          <p style={{ fontSize: "1rem" }}>
            <b>
              Get in Touch
            </b>
            <br />
            New Delhi, India
          </p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; +91-7017588100 +91-7340283616</span>
            <span><i className="fas fa-envelope"></i> &nbsp;<a style={{color:"#fff",textDecoration:"none"}} href='mailto:readriches@gmail.com'>readriches@gmail.com</a> </span>
          </div>
          <div className="socials" style={{    display:"flex",justifyContent: "space-between",width: "10%"}}>
            <a href="https://www.facebook.com/readriches"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/readriches/"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com/ReadRiches"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
