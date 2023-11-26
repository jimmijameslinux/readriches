// Card.js
import React,{useState} from 'react';
import { Tilt } from 'react-tilt';
import '../components/css/Card.css';
const Card = ({ company_name, title, images, images2, primarycolor,secondarycolor }) => {
  const defaultOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };
  console.log(images2)

  const [hover, setHover] = useState(false);

  // hover
  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Tilt className="Tilt" options={defaultOptions} >
      <div className="card" style={{background:`linear-gradient(180deg, ${primarycolor}, ${secondarycolor} 100%)`}} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <img src={`http://localhost:3001/${images}`} className='companylogo' alt="Placeholder" />
      <div className="card-image">
        <img src={`http://localhost:3001/${images2}`} className='onhover' alt="Placeholder" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <a className='card-title-content'>{hover?title:company_name}</a>
        </div>
      </div>
      </div>
    </Tilt>
  );
}

export default Card;
