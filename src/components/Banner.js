import React, { useEffect, useState } from 'react';
import '../components/css/Banner.css';
import bull from '../components/img/acc_bull.png';

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
        <h1> <span style={{textTransform:"uppercase"}}>
          Read Riches
          </span>
           &nbsp;is...</h1>
        <h2 className='moveh2' style={{color:"#fff"}}>Where<span style={{textTransform:"uppercase",fontWeight:"800",fontSize:"3.5rem",color:"#fff"}}> Finance </span>
        <br />
        Meets 
        <span style={{textTransform:"uppercase",fontWeight:"800",fontSize:"3.5rem",color:"#fff"}}> Creativity </span>
          </h2>
        <div className='btns'>
          <button>Join Us</button>
          <button>Explore</button>
        </div>
        {/* five book imsges */}
        <div className="book-images">
          <div className="book-image">
            <img src="https://images-na.ssl-images-amazon.com/images/I/51a3jyjX5EL._SX331_BO1,204,203,200_.jpg" alt="book" />
          </div>
          <div className="book-image">
            <img src="https://images-na.ssl-images-amazon.com/images/I/51a3jyjX5EL._SX331_BO1,204,203,200_.jpg" alt="book" />
          </div>
          <div className="book-image">
            <img src="https://images-na.ssl-images-amazon.com/images/I/51a3jyjX5EL._SX331_BO1,204,203,200_.jpg" alt="book" />
          </div>
          <div className="book-image">
            <img src="https://images-na.ssl-images-amazon.com/images/I/51a3jyjX5EL._SX331_BO1,204,203,200_.jpg" alt="book" />
          </div>
          <div className="book-image">
            <img src="https://images-na.ssl-images-amazon.com/images/I/51a3jyjX5EL._SX331_BO1,204,203,200_.jpg" alt="book" />
          </div>
        </div>
      </div>
      <div className="card-image_banner" style={{width:"94rem"}}>
        <img src={bull} width={"38%"} alt="bull" style={{
          
        }} />
      </div>
      <div className="banneryellow" >
        <div>
        <p className='p1'>EXPERIENCE</p>
        <p className='p2'>EXCLUSIVITY</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
