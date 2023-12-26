import React from 'react'
import './css/Membershipcard.css'
import { Tilt } from 'react-tilt';

function Membershipcard() {
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
  return (
    <>
    <div className='body'>
    <div className="box">
    </div>

    <Tilt className="Tilt" options={defaultOptions} >

   <div className="memcard">
      {/* <div className="bank-name">Read Riches Membership Card</div>
      <div className="memcard-no">
         <span>1234</span>
         <span>5678</span>
         <span>1234</span>
         <span>5678</span>
      </div> */}
      <div className="txt-field">
         <div className="holder-name">Daksh Sharma</div>
         <div className="valid"><span>EXP DATE</span><br/>12/29</div>
      </div>
   </div>
</Tilt>
</div>

    </>
  )
}

export default Membershipcard