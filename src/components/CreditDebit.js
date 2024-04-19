import React from 'react'
import '../components/css/creditdebit.css'
import creditdebitcard from '../components/img/creditdebitcard.svg'

export const CreditDebit = () => {
    return (
        <div className='creditdebitpay'>
            <div className='creditdebitpayheading'>
                <h1>Set up credit card or debit card</h1>
            </div>
            <form>
                <div style={{display:"flex",position:"relative"}}>
                <input className='creditdebitid' type="text" placeholder="Card Number" />
                <img src={creditdebitcard} alt="creditdebitcard" style={{position:"absolute",right:"20px",top:"40%"}} />
                </div>
                <div style={{ display: "flex", width: "55%", justifyContent: "space-between" }}>
                    <input className='creditdebitid' style={{ width: "358px",paddingRight:"15px",display:"block" }} type="date" placeholder="Expiration Date" />
                    <input className='creditdebitid' style={{ width: "358px" }} type="text" placeholder="CVV" />
                </div>
                <input className='creditdebitid' type="text" placeholder="Name on the card" />
                <button type="submit" className="creditdebitbtn">Submit</button>
            </form>
        </div>
    )
}
