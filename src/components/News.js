import React, { useEffect, useState } from 'react';
import '../components/css/News.css';
import founderarrow from '../components/img/founderarrow.png'


const News = ({ newsItems, loading }) => {
  const [scrolling, setScrolling] = useState(false);
  // const [dataLoaded, setDataLoaded] = useState(false);


  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 385) {
  //       setScrolling(true);
  //     } else {
  //       setScrolling(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(newsItems.length / itemsPerPage));
    // smooth transition
  };

  const handlePrev = () => {
    setCurrentPage(
      (prevPage) => (prevPage - 1 + Math.ceil(newsItems.length / itemsPerPage)) % Math.ceil(newsItems.length / itemsPerPage)
    );
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


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
  // check if img is loaded true/false
  // const [imgLoaded, setImgLoaded] = useState(true);
  // const handleImageLoaded = () => {
  //   setImgLoaded(false);
  // };

  // console.log(imgLoaded);

  return (
    <>
      <h2 style={{marginBottom:"3rem",width:"100%",textAlign:"center",textTransform:"uppercase",color:"#fff"}}>Latest News</h2>
      <div className={`news-container news-panel ${scrolling ? 'news-panelnew' : ''}`}>
        {loading ? (
          <>
            <div className='loading'>
              <div className='spinner'>

              </div>
              <p style={{ color: "#fff" }}>Loading news...</p>
            </div>
          </>
        ) : (
          <>
            <div className='carouselbtns'>
              <button className="carousel-btn btn1" onClick={handlePrev}>
                <img src={founderarrow} alt="" />
              </button>
              <button className="carousel-btn btn2" onClick={handleNext}>
                <img src={founderarrow} alt="" />
              </button>
            </div>
            <div className="carousel" >
              {newsItems.slice(startIndex, endIndex).map((news, index) => (
                news.title && news.description && news.url && news.img && news.source &&
                (
                  <div
                    key={index}
                    className={`carousel-item`}
                  >
                    <div style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "43%",
                      overflow: "hidden",
                    }}>
                      <img src={news.img} className="newsimg" alt="Image unavailable" />
                    </div>
                    <a className='newslink' href={news.url} target='blank'>
                      <span style={{ color: "#bdc1c6" }}>{news.source}</span>
                      <h2 style={{ textOverflow: 'ellipsis' }}>{news.title}</h2>
                    </a>
                  </div>
                )

              ))}

            </div>
          </>
        )}
      </div>
    </>
  );
};

export default News;
