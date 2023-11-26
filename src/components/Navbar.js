import React,{ useEffect, useState } from 'react';
import '../components/css/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import '../components/css/Trading.css'
import TradingViewTicker from './TradingViewTicker';

const Navbar = () => {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
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
  return (
  <>
    <nav className={`navbar ${scrolling ? 'navbar-scrolled' : ''} ${location.pathname !== '/' ? 'navbar-white' : ''} ${location.pathname === '/dashboard' ? 'navbar_dash' : ''} ${location.pathname!=='/'&&'/dashboard'&&'/about'&&'/contact'?'navbar_top':''}`}>

      <Logo scrolling={scrolling} />
      <ul className="nav-links nav-links-mobile">
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/">Home</Link>
        </li>
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/about' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/about">About Us</Link>
        </li>
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/contact' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/contact">Contact Us</Link>
        </li>
      </ul>
      {/* <div id="tv-miniwidget-iframe-container" style={{border:"none",display:`${scrolling?'block':'none'}`}}></div> */}
<TradingViewTicker />

    </nav>
  </>
  );
}

export default Navbar;
