import React from 'react'
import loginsvg from '../components/img/loginsvg.svg';
import { useNavigate } from 'react-router-dom';
import '../components/css/Newpass.css';

export const NewPass = () => {
    const navigate = useNavigate();
    return (
        <main className='newpassmain'>
            <div className='newpassleftimg'>
                <img src={loginsvg} alt="login" />
            </div>
            <div className='newpassright'>
                <div className='titledesc'>
                    <h1>New Password</h1>
                    <p>Please create a new password that you don’t use on any other site.</p>
                </div>
                {/* newpass and signup */}
                <form className="form">
                    <div className="form-group">
                        {/* <label htmlFor="password">Password</label> */}
                        <input className='createnewpass' type="password"
                            id="password"
                            //  name="password"
                            //  value={password}
                            //  onChange={handlePasswordChange}
                            placeholder="Create new Password"
                            required />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password"
                            id="password"
                            //  name="password"
                            //  value={password}
                            //  onChange={handlePasswordChange}
                            placeholder="Confirm new Password"
                            required />
                    </div>
                    <button type="submit" className="lbtn">Reset Password</button>
                    {/* or */}
                    <div className="or">
                        <hr />
                    </div>

                    <p className='justrem'>Just remember? <u onClick={() => {
                        navigate('/signup');
                    }} style={{ color: "#007AFF", textDecoration: "none", cursor: "pointer" }}>sign up now</u></p>

                </form>
            </div>
        </main>
    )
}
