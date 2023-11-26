import React, { useEffect, useState } from 'react';
import '../components/css/Banner.css';

const Banner = () => {
  // const [scrolling, setScrolling] = useState(false);
  const [bannerHeight, setBannerHeight] = useState('100vh');
  const [bannerWidth, setBannerWidth] = useState('100%');

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setScrolling(true);
  //       setBannerHeight('60vh'); // Reduce the height on scroll
  //       setBannerWidth('80%');   // Reduce the width on scroll
  //     } else {
  //       setScrolling(false);
  //       setBannerHeight('100vh'); // Reset the height
  //       setBannerWidth('100%');   // Reset the width
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
    

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  return (
    <div
      className={`banner`}
      style={{
        height: bannerHeight,
        width: bannerWidth,
      }}
    >
      <div className="card-content_banner">
        <h1>Welcome to Our Website</h1>
        <button>Learn More</button>
      </div>
    </div>
  );
}

export default Banner;
