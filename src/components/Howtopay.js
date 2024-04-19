import React from 'react'
import '../components/css/Howtopay.css'
import mastercard from '../components/img/mastercard.svg'
import visa from '../components/img/visa.svg'
import phonepay from '../components/img/phonepay.svg'
import bhim from '../components/img/bhim.svg'
import gpay from '../components/img/gpay.svg'
import howtopayarrow from '../components/img/howtopayarrow.svg'
import { useNavigate } from 'react-router-dom'

export const Howtopay = () => {
  const navigate = useNavigate()
  return (
    <div className='howtopay'>
      <div className='howtopayheading'>
        <h1>Choose how to pay</h1>
        <p>Your payment is encrypted and you can change your payment method at anytime</p>
        <p>Secure for peace of mind.
          cancel easily online</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <div className='creditdebit' onClick={
          () => navigate('/creditdebit')
        }>
          <div style={{ display: "flex"}}>
            <p>Credit or Debit card</p>
            <div>
              <img src={mastercard} alt="mastercard" />
              <img src={visa} alt="visa" />
            </div>
          </div>
          <span>
            <img src={howtopayarrow} alt="howtopayarrow" />
          </span>
        </div>
        <div className='upi' onClick={
          () => navigate('/upipay')
        }>
          <div style={{ display: "flex" }}>
            <p>Upi Auto Pay</p>
            <div>
              <img src={phonepay} alt="phonepay" />
              <img src={bhim} alt="bhim" />
              <img src={gpay} alt="gpay" />
            </div>
          </div>
          <span>
            <img src={howtopayarrow} alt="howtopayarrow" />
          </span>
        </div>
      </div>
    </div>
  )
}
