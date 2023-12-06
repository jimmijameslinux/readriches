import React from 'react';
// import logo1 from '../components/img/white_read.png'
import logo2 from '../components/img/rrgold2.png'

// import {useLocation } from 'react-router-dom';

const Logo = ({scrolling}) => {
  // const location = useLocation();
  return (
    <div className="logo">
      <img src={logo2} alt='Logo' width={100} />
    </div>
  );
}

export default Logo;
