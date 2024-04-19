import React from 'react'
import howtopayarrow from '../components/img/howtopayarrow.svg'
import '../components/css/upipay.css'

export const Upipay = () => {
  return (
    <div className='upipay'>
      <div className='upipayheading'>
        <h1>Set up UPI Autopay</h1>
        <p>You can change this recurring payment anytime in your settings.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <div className='setupi'>
          <div style={{ display: "flex"}}>
            <p style={{color:"#333333"}}>Set Upi</p>
          </div>
          <span>
            <img style={{rotate:"90deg"}} src={howtopayarrow} alt="howtopayarrow" />
          </span>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <form>
            <input className='upiid' type="text" placeholder="Enter UPI ID" />
          <button type="submit" className="upibtn">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
