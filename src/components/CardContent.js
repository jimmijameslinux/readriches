import React, { useEffect, useState, useRef,useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from './Godurl';
import '../components/css/cardcontent.css';
import { ProgressContext } from '../App';
import { set } from 'mongoose';

function CardContent({ loginStatus,userid }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state;
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const { progressValues, setProgressValues,cardvideo,setCardvideo } = useContext(ProgressContext);
  const videoRef = useRef(null);
// store the id in url in a variable
  const cardId = location.pathname.split('/').pop()-1;
  const [cardIdimp, setCardIdimp] = useState(null);
  const [userdashboardid, setUserdashboardid] = useState(null);
 
  useEffect(() => {
    if (video) {
      setCardvideo(video);
    }
  }, [video]);

  useEffect(() => {
    if (location.pathname.startsWith('/home/card/')) {
      if (!loginStatus.success) {
        navigate('/login');
      }
    }
  }, [location.pathname, loginStatus, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!videoRef.current) return;

      switch (event.key) {
        case "ArrowRight":
          videoRef.current.play();
          // setProgressValue((videoRef.current.currentTime / videoRef.current.duration) * 100);
          setTimeout(() => {
            videoRef.current.pause();
          }, 3000);
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 3;
          // setProgressValue((videoRef.current.currentTime / videoRef.current.duration) * 100);
          break;
        default:
          break;
      }
    };

    const video = videoRef.current;
    // console.log(video);
    if (video) {
      document.addEventListener("keydown", handleKeyDown);
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
      video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        setProgressValue(progress);
        setProgressValues(({
          [cardIdimp]: progress
        }));
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // fetch cardid based on video url present in carddata
  useEffect(() => {
    fetch(`${BASE_URL}/dashboard`)
      .then(response => response.json())
      .then(data => {
        const foundCard = data.find((card) => card.video === cardvideo);
        if (foundCard) {
          setCardIdimp(foundCard._id);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [cardvideo]);

  // console.log(cardvideo)

  const formattedProgress = Object.values(progressValues)[0];

  console.log(formattedProgress);
  
  // useEffect(() => {
  //   fetch(`${BASE_URL}/createUserDashboards/${cardIdimp}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       progress: formattedProgress
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log('Success:', data.progressvalue);
  //       // setProgressValues(data.progressvalue);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, [progressValues]);
  console.log(userid);
const [storedProgress, setStoredProgress] = useState(0);
  useEffect(() => {
    if (cardIdimp && userid) {
      fetch(`${BASE_URL}/createUserDashboards/${userid}/${cardIdimp}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: formattedProgress
        })
      })
        .then(response => response.json())
        .then(data => {
          // Handle success if needed
          console.log('Success:', data.progressvalue);
          setStoredProgress(data.progressvalue);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [progressValues]);
  

  
  const handleForwardClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setTimeout(() => {
        videoRef.current.pause();
      }, 3000);
      // setProgressValue((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleBackwardClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 3;
      // setProgressValue((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleProgressClick = (event) => {
    const progressBar = event.target;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;

    console.log(progressBarWidth, clickPosition,progressBarWidth);
  
    // Check if progressBarWidth is zero to prevent division by zero
    if (progressBarWidth === 0) {
      return;
    }
  
    let newProgress = (clickPosition / progressBarWidth) * 100;
  
    // Ensure newProgress is a finite number
    if (!isFinite(newProgress)) {
      return;
    }
  
    setProgressValue(newProgress);
  
    if (videoRef.current && isFinite(videoRef.current.duration)) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };
  
  


  return (
    <div className='cardcontent' style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="card-video" style={{ width: "100%", height: "100vh" }}>
        <video ref={videoRef} style={{ width: "100%", height: "100%" }} muted>
          <source src={video} />
        </video>
        <div id="controls">
          <button onClick={handleBackwardClick}>Backward</button>
          <button onClick={handleForwardClick}>Forward</button>
        </div>
      </div>
      <progress id="progress"
            max="100"
            value={progressValue}
            onClick={handleProgressClick}
            >
        Progress
      </progress>
      {video && !videoLoaded && (
        <div className='carduploadingprogress'>
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default CardContent;
