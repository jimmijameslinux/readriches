import React, { useEffect, useState } from 'react';
import '../components/css/News.css';

const News = ({ newsItems, loading }) => {
  const [scrolling, setScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 385) {
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
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };
  useEffect(() => {
    // Check if news data is loaded
    if (newsItems.length > 0) {
      // Start automatic sliding after data is loaded
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      // Set dataLoaded to true to prevent starting the interval again
      // setDataLoaded(true);

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [newsItems]);


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <div className={`news-container news-panel ${scrolling ? 'news-panelnew' : ''}`}>
      {loading ? (
        <>
          <div className='loading'>
            <div className='spinner'>

            </div>
            <p>Loading news...</p>
          </div>
        </>
      ) : (
        <>
          <div className="carousel">
            {newsItems.map((news, index) => (
              news.title && news.description && news.url && news.img &&
              (
                <div
                  key={index}
                  className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                  style={{ transform: `translateX(${-currentIndex * 100}%)` }}
                >
                  <div style={{ position: 'relative', height: "100%" }}>
                    <img src={news.img} className="newsimg" alt="News" />
                    <a href={news.url} target='blank' style={{ textDecoration: 'none', color: 'black' }}>
                      <h2 style={{ textOverflow: 'ellipsis' }}>{news.title}</h2>
                    </a>
                  </div>
                </div>
              )
                
            ))}
          </div>
          <div className='carouselbtns'>
            <button className="carousel-btn btn1" onClick={handlePrev}>
              &lt;
            </button>
            <button className="carousel-btn btn2" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default News;
