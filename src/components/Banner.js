import React, { useEffect, useState } from 'react';
import '../components/css/Banner.css';
import bull from '../components/img/a-bull-in-corporate-coat--wearing-specs--smiling--playing-with-business-3d-model-of-graphs-and-ch.png';
import bullbg from '../components/img/mike-kononov-lFv0V3_2H6s-unsplash 1.png'
import aviation from '../components/img/aviation.png';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  // const [scrolling, setScrolling] = useState(false);
  const [bannerHeight, setBannerHeight] = useState('100vh');
  const [bannerWidth, setBannerWidth] = useState('100%');
  const navigate = useNavigate();

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
        {/* <h1>
          <span style={{ textTransform: "capitalize" }}>
            Place where finance meets
          </span>
          <span style={{ textTransform: "capitalize", color: "#C1F8FF" }}> Creativity </span>
        </h1> */}
        <span className="Place-where-finance-meets-creativity">
          Place where finance meets
          creativity
        </span>
        <p>
          we serve you with the best applied drafts of companies. from real-time market analytics to precise fair pricing, we redefine
          financial empowerment
        </p>
        {/* <div className='btns'>
          <button>Join Us</button>
          <button>Explore</button>
        </div> */}
        <button className="frame" onClick={() => {
          navigate('/pricing');
        }
        }>
          <div className="text-wrapper">Join us</div>
        </button>
        {/* five book imsges */}
        {/* <div className="book-images">
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
        </div> */}
      </div>
      <div className="card-image_banner">
        <img className='bullbg' src={bullbg} alt="bull" style={{

        }} />
        <img className='bullimg' src={bull} alt="bull" style={{

        }} />
        <span className='bullreport' id='bullrep1'>
          {/* <img src={aviation} alt="deloitte" /> */}
          Moat and Risks
        </span>
        <span className='bullreport' id='bullrep2'>
          {/* <img src={aviation} alt="deloitte" /> */}
          Operating margin
        </span>
        <span className='bullreport' id='bullrep3'>
          DCF valuation
        </span>
      </div>
      <div className="banneryellow" >
        <div>
          <p className='p1'>EXPERIENCE</p>
          <p className='p2'>EXCLUSIVITY</p>
        </div>
      </div>
      <div className='emptybox'>
      </div>
    </div>
  );
}

export default Banner;
