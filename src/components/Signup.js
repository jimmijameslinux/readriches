import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../components/css/Signup.css"
import loginsvg from '../components/img/loginsvg.svg';

// import { useHistory } from 'react-router-dom';
// use nodemailer

export default function Signup() {

  const [SignupStatus, setSignupStatus] = useState({ success: null, message: '' });
  const [gotp, setGotp] = useState('');
  const Redirecting = () => {
    // const location = useLocation();
    // const redirect_uri = "/login";
    const redirect_uri = "/otp";
    window.location.href = `${redirect_uri}`
  }

  // const history = useHistory();

  const navigate = useNavigate();
  const HandleSignup = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (password === password2) {
      try {
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the server returns a success message or token, you can redirect here
          // Redirecting();
          setGotp(data.gotp);
          if (response.status === 200) {
            navigate('/otp', { state: { gotp: data.gotp } });
          }

          setSignupStatus({ success: true, message: 'Signup successful!' });
        }
        else {
          const errorData = await response.json();
          console.error('Signup failed:', errorData.error);

          if (response.status === 409) {
            // User with the given email already exists, display a specific error message
            setSignupStatus({ success: false, message: 'User with this email already exists.' });
          } else {
            // Handle other error cases and set a general error message
            setSignupStatus({ success: false, message: errorData.error || 'Signup failed. Please try again.' });
          }
        }
      }
      catch (error) {
        console.error('Error during signup:', error);
        // Handle network errors, etc., and set the state for displaying a notification
        setSignupStatus({ success: false, message: 'Error during signup. Please try again later.' });
      }
    }
    else {
      console.log('Passwords do not match');
      setSignupStatus({ success: false, message: 'Passwords do not match' });
    }
    // navigate('/otp');
    // Redirecting();
  };

  return (
    <main className='signupmain'>
      <div className='signupleftimg'>
        <img src={loginsvg} alt="login" />
      </div>
      <div className='signupright'>
        <h1>Registration</h1>

        {/* login and signup */}

        <form className="form"
          onSubmit={HandleSignup}
        >
          <div className="form-group">
            <label htmlFor="name">First name<span>&#42;</span></label>
            <input type="text" id="name" placeholder="First name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email<span>&#42;</span></label>
            <input type="email" id="email" placeholder="Enter an Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password<span>&#42;</span></label>
            <input type="password" id="password" placeholder="Enter a Password" required />
          </div>
          {/* <div className="form-group">
            <label htmlFor="password2">Confirm Password<span>&#42;</span></label>
            <input type="password" id="password2" placeholder="Confirm Password" required />
          </div> */}
          {/* phone */}
          <div style={{ display: "flex", justifyContent:"space-between" }}>
            <div className="form-group">
              <label htmlFor="phone">Phone Number<span>&#42;</span></label>
              <input type="tel" id="phone" placeholder="Enter a Phone Number" required />
            </div>
            {/* select a country */}
            <div className="form-group">
              <label htmlFor="country">Country<span>&#42;</span></label>
              <select id="country" required>
                <option value="" disabled selected hidden>Select a country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </select>

            </div>
          </div>
          <button type="submit" className="lbtn"
          >Create an account</button>

          <p style={{ display: "flex", justifyContent: "start", gap: "10px", marginTop: "16px" }}>Have an account? <u onClick={() => {
            navigate('/login');
          }} style={{ color: "#007AFF", textDecoration: "none", cursor: "pointer" }}>Login</u></p>

          {SignupStatus.success !== null && (
            <div className={SignupStatus.success ? '' : 'error'}>
              {SignupStatus.message}
              {/* close btn */}
              <span className="close-btn" onClick={() => setSignupStatus({ success: null, message: '' })}>
                <i className="fas fa-times"></i>
              </span>
            </div>
          )}
        </form>
      </div>
    </main>
  )
}
