import React from 'react';
import '../components/css/Footer.css'; // Import the CSS file
import logo from '../components/img/finallogo.png'
import { useLocation } from 'react-router-dom';
import twitternew from '../components/img/twitternew.png'

const Footer = () => {
  const location = useLocation();
  return (
    <footer className={`footer ${location.pathname === '/contact' ? 'footer_contact' :''} ${location.pathname==='/dashboard'?'footer_dash':''} ${location.pathname==='/login' || location.pathname==='/forgotpass'||location.pathname==='/newpass'|| location.pathname==='/signup'?'footer_dash':''}  ${location.pathname==='/userdashboard'  ?'footer_fixed':''}  ${location.pathname==='/userprofile'  ?'footer_fixed':''} ${location.pathname=== '/home/card/'?'footer_dash':''} ${location.pathname==='/otp'?'footer_dash':'' } ${location.pathname.startsWith('/home/card') ? 'footer_dash' :''}`}>
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
            <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/readriches?igsh=MXY3ZnBmOWRjMWMwZA==" target='_blank'><i className="fab fa-instagram"></i></a>
            <a href="https://x.com/ReadRiches?t=RwnqDBwEFI5s4Twnx1KSMw&s=09" target='_blank'  style={{marginTop:"2px"}}>
              <img src={twitternew} alt='twitter' width={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
