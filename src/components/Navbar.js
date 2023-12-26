import React,{ useEffect, useState } from 'react';
import '../components/css/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import '../components/css/Trading.css'
import TradingViewTicker from './TradingViewTicker';
import { set } from 'mongoose';

const Navbar = ({loginStatus,setLoginStatus,email,setEmail}) => {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
  const navLinks = document.querySelector('.nav-links-mobile');
  // console.log(navLinks);
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const scriptId = 'tradingview-widget-script';

  //   // Check if the script has already been added
  //   if (!document.getElementById(scriptId)) {
  //     const script = document.createElement('script');
  //     script.id = scriptId;
  //     script.type = 'text/javascript';
  //     script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  //     script.async = true;

  //     // You might need to adjust the configuration based on your requirements
  //     script.innerHTML = JSON.stringify({
  //       symbols: [
  //         {
  //           proName: 'OANDA:SPX500USD',
  //           title: 'S&P 500',
  //         },
  //         {
  //           proName: 'OANDA:EURUSD',
  //           title: 'EUR/USD',
  //         },
  //       ],
  //       colorTheme: 'light',
  //       isTransparent: false,
  //       displayMode: 'adaptive',
  //       locale: 'en',
  //     });

  //     // Append the script to the specific container within the component
  //     const scriptContainer = document.getElementById('tv-miniwidget-iframe-container');
  //     if (scriptContainer) {
  //       scriptContainer.appendChild(script);
  //     }
  //   }
  // }, []);

 
  const navLinks = document.querySelector('.nav-links-mobile');
  // console.log(navLinks);
  const navLinks1 = document.querySelector('.nav-links');
  // console.log(navLinks1);
  const Hamburger = () => {
    if(navLinks.style.transform !== 'translateX(-100%)')
    {
      navLinks.style.transform = 'translateX(-100%)';
    }
    else{
      navLinks.style.transform = 'translateX(0%)';

    }
    // console.log('clicked');
  }

  const navlinclickfunc = () => {
    navLinks.style.transform = 'translateX(-100%)';
  }
  return (
  <>
    <nav className={`navbar ${scrolling ? 'navbar-scrolled' : ''} ${location.pathname === '/membershipcard' ? 'nonavbar' : ''} ${location.pathname !== '/login' ? 'navbar-white' : ''} ${location.pathname === '/dashboard' ? 'navbar_dash' : ''} ${location.pathname!=='/'&&'/dashboard'&&'/about'&&'/contact'?'navbar_top':''}`}>

      <Logo scrolling={scrolling} />
      <ul className="nav-links-mobile">
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/" onClick={navlinclickfunc}>Home</Link>
        </li>
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/about' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/about" onClick={navlinclickfunc}>About Us</Link>
        </li>
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/stockview' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/stockview" onClick={navlinclickfunc}>Stocks</Link>
        </li>
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/contact' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/contact" onClick={navlinclickfunc}>Contact Us</Link>
        </li>
      </ul>
      {/*  */}
      <ul className="nav-links">
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/" onClick={navlinclickfunc}>Home</Link>
        </li>
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/about' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/about" onClick={navlinclickfunc}>About Us</Link>
        </li>
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/stockview' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/stockview" onClick={navlinclickfunc}>Stocks</Link>
        </li>
        <li>
          <Link className={`nav-link nav-links-scrolled ${location.pathname === '/contact' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/contact" onClick={navlinclickfunc}>Contact Us</Link>
        </li>
      </ul>

      {/*  */}
      
      {/* <div id="tv-miniwidget-iframe-container" style={{border:"none",display:`${scrolling?'block':'none'}`}}></div> */}
{/* <TradingViewTicker /> */}
      <button className="nav-mobile-menu" onClick={Hamburger} type="button">
        <i className="fas fa-bars" />
      </button>
      {
        email!==null&&
      <p style={{color:"white"}} className="email">{email}</p>
      }

      {
        // loginStatus.success!==false
        // &&
        
        // <div className="logout">
        //   <Link to="/" onClick={() => 
        //     {
        //       setEmail(null);
        //       setLoginStatus({ success: null, message: '' })
        //     }
        //     }>
        //     <i className="fas fa-sign-out-alt"></i>
        //   </Link>
        // </div>
        
      }
    </nav>
  </>
  );
}

export default Navbar;
