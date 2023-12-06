// Card.js
import React, { useState } from 'react';
import { Tilt } from 'react-tilt';
import '../components/css/Card.css';
// import { hover } from '@testing-library/user-event/dist/hover';
const Card = ({ company_name, title, images, images2, primarycolor, secondarycolor, category }) => {
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

  // hover
  const handleMouseOver = () => {

    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const blankPage = () => {
    window.location.href = `home/${company_name}`
  };
  return (
    <Tilt className="Tilt" options={defaultOptions} >
      <div className="card"
        // style={{background:"transparent"}}
        // Code made by @
        style={{ background: !hover ? `linear-gradient(180deg, ${primarycolor}, ${secondarycolor} 100%)` : `radial-gradient(${primarycolornew} 1%, ${secondarycolor})` }}
        onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={blankPage}>
        <img src={`http://localhost:3001/${images}`} className='companylogo' alt="Placeholder" />
        <div className="card-image">
          <img src={`http://localhost:3001/${images2}`} className='onhover' alt="Placeholder" />
        </div>
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
