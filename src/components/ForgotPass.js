import React from 'react'
import '../components/css/Forgetpass.css'
import loginsvg from '../components/img/loginsvg.svg';
import { useNavigate } from 'react-router-dom';


const ForgotPass = () => {
    const navigate = useNavigate();

    const handleForgetPass = async (e) => {
        navigate('/newpass')
    }
    return (
        <main className='forgetpassmain'>
            <div className='forgetpassleftimg'>
                <img src={loginsvg} alt="login" />
            </div>
            <div className='forgetpassright'>
                <div className='titledesc'>
                    <h1>Forgot Password?</h1>
                    <p>No worries! Just enter your email and we’ll send you a reset password link</p>
                </div>
                {/* forgetpass and signup */}
                <form className="form" onSubmit={handleForgetPass}>
                    <div className="form-group">
                        <input type="email" id="email" placeholder="Hello@gmail.com" required />
                    </div>
                    <button type="submit" className="lbtn">Send Recovery email</button>
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

export default ForgotPass