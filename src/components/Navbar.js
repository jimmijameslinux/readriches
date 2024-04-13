import React,{ useEffect, useState } from 'react';
import '../components/css/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import '../components/css/Trading.css'
import { set } from 'mongoose';
// import TradingViewTicker from './TradingViewTicker';
// import { set } from 'mongoose';

const Navbar = ({loginStatus,setLoginStatus,name,setName,picture,setPicture,newname,setUserid,email}) => {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [show, doShow] = useState(false);

  useEffect(() => {
  // const navLinks = document.querySelector('.nav-links-mobile');
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
  // const navLinks1 = document.querySelector('.nav-links');
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

  // console.log(newname)
  return (
  <>
    <nav className={`navbar ${scrolling ? 'navbar-scrolled' : ''} ${location.pathname.startsWith('/home/card/') ? 'nonavbar' : ''} ${location.pathname === '/membershipcard' ? 'navbar_top' : ''} ${location.pathname === '/userprofile' ? 'navbar_top' : ''} ${location.pathname !== '/login' ? 'navbar-white' : ''} ${location.pathname === '/dashboard' ? 'navbar_dash' : ''} ${location.pathname==='/about'?'navbar_top':''}  ${location.pathname==='/login'?'navbar_top':''} ${location.pathname==='/signup'?'navbar_top':''} ${location.pathname==='/userdashboard'?'navbar_top':''} ${location.pathname==='/pricing'?'navbar_top':''} ${location.pathname === '/otp' ? 'nonavbar' : ''}`}>

      <Logo scrolling={scrolling} />
      <ul className="nav-links-mobile">
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/" onClick={navlinclickfunc} title='Home'>Home</Link>
        </li>
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/about' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/about" onClick={navlinclickfunc} title='About Us'>About Us</Link>
        </li>
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/stockview' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/stockview" onClick={navlinclickfunc} title='Stocks'>Stocks</Link>
        </li>
        <li>
          <Link className={`nav-link ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/contact' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/contact" onClick={navlinclickfunc} title='Contact Us'>Contact Us</Link>
        </li>
      </ul>
      {/*  */}
      <ul className="nav-links">
        <li>
          <Link className={`${location.pathname === '/stockview' ? 'nav-link-stock' : 'nav-link'}  ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/" onClick={navlinclickfunc} title='Home'>Home</Link>
        </li>
        <li>
          <Link className={`${location.pathname === '/stockview' ? 'nav-link-stock' : 'nav-link'} ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/about' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/about" onClick={navlinclickfunc} title='About Us'>About Us</Link>
        </li>
        <li>
          <Link className={`${location.pathname === '/stockview' ? 'nav-link-stock' : 'nav-link'} ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/stockview' ? 'activestock' : ''} ${location.pathname === '/stockview' && scrolling ? 'activescrolled' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/stockview" onClick={navlinclickfunc} title='Stocks'>Stocks</Link>
        </li>
        <li>
          <Link className={`${location.pathname === '/stockview' ? 'nav-link-stock' : 'nav-link'} ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/contact' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} to="/contact" onClick={navlinclickfunc} title='Contact Us'>Contact Us</Link>
        </li>
        {/* Pricing, to='/pricing' */}
        <li>
          <Link className={`${location.pathname === '/stockview' ? 'nav-link-stock' : 'nav-link'} ${scrolling ? 'nav-links-scrolled' : ''} ${location.pathname === '/pricing' ? 'active' : ''} ${location.pathname !== '/' ? 'nav-link-white' : ''}`} onClick={navlinclickfunc} to="/pricing" title='Pricing'>Pricing</Link>
        </li>
      </ul>

      {/*  */}
      
      {/* <div id="tv-miniwidget-iframe-container" style={{border:"none",display:`${scrolling?'block':'none'}`}}></div> */}
{/* <TradingViewTicker /> */}
      <button className="nav-mobile-menu" onClick={Hamburger} type="button">
        <i className="fas fa-bars" />
      </button>
      {/* {
        email!==null&&
      <p style={{color:"white"}} className="email">{email}</p>
      } */}
      {
        // show profile icon if user is logged in
        loginStatus.success!==null&&loginStatus.success!==false
        ?
        <div className="profile"onClick={
          ()=>{
            doShow(!show);
          }
        }>
            {
              picture==="null"|picture===null?
              <i className="fas fa-user" title={!email?name:email}></i>
              :
              <img className='profilelogo' src={picture} alt='error' title={newname===null?name:newname} />
              
              }
          <div className={`${show?"profilecontentvisible":"profilecontent"}`}>
            <Link to="/userdashboard" title='Dashboard'>User Dashboard</Link>
          </div>

        </div>
        :
        <div className="profile">
          <Link to="/login">
            {/* <i className="fas fa-sign-in" title='login'></i> */}
            <button className="loginbtn">Login</button>
          </Link>
        </div>

      }

      {
        loginStatus.success!==null&&loginStatus.success!==false
        &&
        
        <div className="logout">
          <Link to="/login" onClick={() => 
            {
              setName(null);
              setLoginStatus({ success: null, message: '' })
              setPicture(null);
              sessionStorage.removeItem('email');
              sessionStorage.removeItem('loginStatus');
              sessionStorage.removeItem('picture');
              sessionStorage.removeItem('creditscore');
              sessionStorage.removeItem('userid');
              sessionStorage.removeItem('name');
              setUserid(null);  
            }
            }>
              {
                loginStatus.success!==null&&
            // <i className="fas fa-sign-out" title='logout'></i>
            <button className="logoutbtn">Logout</button>
              }
          </Link>
        </div>
        
      }
    </nav>
  </>
  );
}

export default Navbar;
