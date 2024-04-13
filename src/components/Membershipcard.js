import React, { useState } from 'react'
import './css/Membershipcard.css'
import { Tilt } from 'react-tilt';
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import video1 from '../components/videos/videoplayback.mp4'
import membull from '../components/img/membull.jpg'
import sharemember from '../components/img/sharemember.svg'

function Membershipcard({ loginStatus, name }) {
  const defaultOptions = {
    reverse: false,
    max: 25,
    perspective: 1000,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: true,
    "max-glare": 1,
    // scale should be 1 only
    scale: 1,

  };
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname.startsWith('/membershipcard')) {
    if (!loginStatus.success) {
      navigate('/login');
    }
  }

  const handleShare = async () => {
    // Check if sharing is supported
    if (!navigator.canShare || !navigator.canShare({ files: [new File([], 'dummy.txt')] })) {
      alert('Share functionality is not supported in your browser.');
      return;
    }

    // Generate the shareable link
    const shareLink = `${window.location.origin}/membershipcard`;

    // Membership card image
    const membershipCardImageURL = membull; // Assuming membull is the image URL

    try {
      // Fetch the image as blob
      const response = await fetch(membershipCardImageURL);
      const blob = await response.blob();

      // Convert blob to File
      const membershipCardImageFile = new File([blob], 'membership-card.jpg', { type: 'image/jpeg' });

      // Creating a shareable message with the member name
      const message = `Check out ${name}'s Read Riches Membership Card`;

      // Sharing the message with the image file
      await navigator.share({
        // files: [membershipCardImageFile],
        // title: 'Read Riches Membership Card',
        // text: message,
        url: shareLink,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <>
      <div className='membody'>
        <Sidebar />

        <div className="box">
          <video id="background-video" autoPlay muted loop>
            <source src={video1} />
          </video>

        </div>

        <Tilt className="Tilt" options={defaultOptions} >

          <div className="memcard">
            <div className='someimg' style={{position:"absolute"}}>
              {/* <img src={membull} alt="profile" /> */}
              {/* image chosing option and changing the image on new image selection */}
              <div className="image-upload">
                <label for="file-input">
                <img src={selectedImage || membull} alt="profile" style={{width:"293.2px",aspectRatio:"1",objectFit:"contain"}} />
                </label>
                <input id="filebull" style={{position:"absolute",width:"25px",borderRadius:"50%",aspectRatio:"1"}} type="file" onChange={handleImageChange} />
                </div>
            </div>
            <div className='memname' style={{position:"relative",top:"18rem"}}>
              <h1>{name}</h1>
              <h4>Premium</h4>
              {/* <br /> */}
              <h2>
                Member</h2>
            </div>
            <div className="share">
              <button onClick={handleShare} className="share-btn">
                <img src={sharemember} alt="share" />
              </button>
            </div>
            {/* <div className="bank-name">Read Riches Membership Card</div>
      <div className="memcard-no">
         <span>1234</span>
         <span>5678</span>
         <span>1234</span>
         <span>5678</span>
      </div> */}
            {/* <div className="txt-field">
              <div className="holder-name">Daksh Sharma</div>
              <div className="valid"><span>EXP DATE</span><br />12/29</div>
            </div> */}
          </div>
        </Tilt>
        {/* share link */}

      </div>

    </>
  )
}

export default Membershipcard