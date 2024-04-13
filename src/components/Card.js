// Card.js
import React, { useState, useEffect,useContext } from 'react';
import { Tilt } from 'react-tilt';
import a from "../components/uploads/logoimage-1700935500583.png"
import { useNavigate } from 'react-router-dom';
import '../components/css/Card.css';
import { BASE_URL } from './Godurl';
import { ProgressContext } from '../App';

// import 'bootstrap/dist/css/bootstrap.min.css';

// import { hover } from '@testing-library/user-event/dist/hover';
const Card = ({ index, company_name, title, images, images2, primarycolor, secondarycolor, category,
  creditscore,
  setCreditscore,
  cardmouseeventdisable,
  loginStatus,
  setalertlogin,
  setalertcreditscore,
  video,
  userid,
  cardcontentprogress,
  setCardcontentprogress
}) => {
  const defaultOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: true,
    "max-glare": 1,
  };

  // console.log(images2)

  const [hover, setHover] = useState(false);
  const primarycolornew = "#fff";

  const navigate = useNavigate();
  const { setCardvideo,membershipsubscription } = useContext(ProgressContext);
 
  useEffect(() => {
    setCardvideo(video);
  }
    , [video, setCardvideo]);
  // console.log(video);

  // hover
  const handleMouseOver = () => {

    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  console.log(membershipsubscription)


  const goToCardContent = () => {
    // fetch creditscore
    if (loginStatus.success===null||loginStatus.success===false) {
      setalertlogin(true);
      return;
    }
    const response = fetch(`${BASE_URL}/creditscore/${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.creditscore >= 0||membershipsubscription==true) {
            sessionStorage.setItem('creditscore', data.creditscore);
            navigate(`/home/card/${index+1}`
            , { state: { video: video } }
            );
          }
          else {
            setalertcreditscore(true);
          }
        });
      }
    });

  };


  return (
    <Tilt className="Tilt" options={defaultOptions} >

      <div className="card" title={company_name}
        // style={{background:"transparent"}}
        // Code made by @
        style={{
          background: !hover ? `linear-gradient(180deg, ${primarycolor}, ${secondarycolor} 100%)` : `radial-gradient(${primarycolornew} 1%, ${secondarycolor})`,
          filter: !hover && `drop-shadow(0px 0px 0px  ${secondarycolor})`,
        }}
        onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={goToCardContent}>
        <div className='tages' style={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <span style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "#eee", borderRadius: "5rem", width: "fit-content", fontSize: "13px", padding: hover ? "2px" : "0", paddingInline: hover ? "4px" : "0", display: "flex", fontWeight: "bolder" }} className='tages-content'>{hover ? category : ''}</span>
        </div>
        <img src={`${images}`} className='companylogo' alt="Placeholder" />
        <div className="card-image">
          <img src={`${images2}`} className='onhover' alt="Placeholder" />
        </div>
        {/* video div */}
        {/* <div className="card-video">
          <video src={video} autoPlay loop muted />
        </div> */}
        <div className="card-content">
          <div className="card-title">
            <span className='card-title-category' style={{ paddingInline: hover && "0.3rem", letterSpacing: ".1em", fontSize: ".625rem", opacity: ".7", borderRadius: ".375rem", backgroundColor: "rgb(0 0 0)", color: "#fff" }}>{hover ? category : ''}</span>
            <a style={{ display: "block" }} className='card-title-content'>{hover ? title : company_name}</a>
          </div>
        </div>
      </div>
    </Tilt>
  );


}
export default Card;
