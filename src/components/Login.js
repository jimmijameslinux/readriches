import React, { useState, useEffect, useContext } from 'react'
import "../components/css/Login.css"
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../App';
// import { set } from 'mongoose';


// import { useLocation } from 'react-router-dom'

// toast.configure();

export default function Login({ loginStatus, setLoginStatus, setEmail, setName, setPicture, email, picture, name, setImpcardid }) {
  // const Redirecting = async () => {
  //   // const location = useLocation();
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   // const redirect_uri = "/";
  //   // window.location.href = `${redirect_uri}`;
  const navigate = useNavigate();
  const { membershipsubscription, subscriptionstartdate, subscriptionenddate, subscriptiontype } = useContext(ProgressContext);
  // }
  const fetchCardDataAndCreateUserDashboards = async (userid) => {
    try {

      // Create user dashboards for each cardId
      const userDashboardResponse = await fetch('http://localhost:3001/createUserDashboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid })
      });

      const userDashboardData = await userDashboardResponse.json();
      if (userDashboardResponse.ok) {
        // console.log(userDashboardData); // Log the server's message
        // array of userDashboardData ids
        const userDashboardIds = userDashboardData.map(userDashboard => userDashboard.card);
        // console.log(userDashboardIds);
        setImpcardid(userDashboardIds);
      } else {
        console.error(userDashboardData.error || 'Failed to create user dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // create createmembershipsubscription
  const createMembershipSubscription = async (userid) => {
    try {
      const response = await fetch('http://localhost:3001/createUserSubscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userid,
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        console.error(data.error || 'Failed to create membership subscription');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  // /////
  const HandleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    setEmail(email);

    try {
      const loginResponse = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        console.log(data);
        console.log(data.email);
        console.log(data.picture);
        console.log(data.name);
        setEmail(data.email);
        setPicture(data.picture);
        setName(data.name);
        // setUserid(data._id);
        setLoginStatus({ success: true, message: 'Login successful' });
        sessionStorage.setItem('loginStatus', JSON.stringify({ success: true, message: 'Login successful' }));
        // Assuming the server returns a success message or token, you can redirect here
        fetchCardDataAndCreateUserDashboards(data._id);
        // createMembershipSubscription(data._id);
        navigate('/');

      } else if (loginResponse.status === 404) {
        console.error('Login failed');
        console.log(loginResponse);
        setLoginStatus({ success: false, message: 'Login failed User not found' });
      }
      else if (loginResponse.status === 401) {
        console.error('Login failed');
        console.log(loginResponse);
        setLoginStatus({ success: false, message: 'Login failed Password incorrect' });
      }
      else if (loginResponse.status === 500) {
        console.error('Login failed');
        console.log(loginResponse);
        setLoginStatus({ success: false, message: 'Login failed Internal server error' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus({ success: false, message: 'Error during login' });
      // Handle network errors, etc.
    }
  };

  const HandleLoginGoogle = async (googleResponse) => {
    // console.log(googleResponse.credential);
    var userobj = jwtDecode(googleResponse.credential);
    // console.log(userobj);


    // console.log(userobj.email,userobj.name,userobj.picture);

    try {
      const response = await fetch('http://localhost:3001/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userobj.email,
          name: userobj.name,
          picture: userobj.picture,
        })
      });


      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLoginStatus({ success: true, message: 'Login successful' });
        setEmail(data.email);
        setPicture(data.picture);
        setName(data.name);
        sessionStorage.setItem('loginStatus', JSON.stringify({ success: true, message: 'Login successful' }));
        // Assuming the server returns a success message or token, you can redirect here
        fetchCardDataAndCreateUserDashboards(data._id);
        // createMembershipSubscription(data._id);
        navigate('/');
      } else {
        console.error('Login failed');
        setLoginStatus({ success: false, message: 'Login failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus({ success: false, message: 'Error during login' });
      // Handle network errors, etc.
    }
  }

  useEffect(() => {
    // global google
    if (window.google)
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: HandleLoginGoogle
      });

    // Render the Google login button
    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      {
        theme: 'filled_blue',
        size: 'large',
        text: 'continue_with',
        height: '50px',
        locale: 'en',
        callback: HandleLoginGoogle,
      }
    );
  }, [HandleLoginGoogle]);

  return (
    <main className='loginmain'>
      <div style={{ width: "30%", position: "relative" }}>
        <h1>Login</h1>

        {/* login and signup */}
        <form className="form" onSubmit={HandleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" required />
          </div>
          <button type="submit" className="btn">Login</button>
          <p>Don't have an account? <u onClick={() => {
            navigate('/signup');
          }} style={{ textDecoration: "underline", color: "purple", cursor: "pointer" }}>Sign Up</u></p>
          {/* login as google btn */}
          <div id="google-login-button" style={{ marginTop: "1rem" }}></div>
          {/* login status */}
          {loginStatus.success !== null && (
            <div className={loginStatus.success ? '' : 'error'}>
              {loginStatus.message}
              {/* close btn */}
              <span className="close-btn" onClick={() =>
              (
                setLoginStatus({ success: null, message: '' }),
                sessionStorage.setItem('loginStatus', JSON.stringify({ success: true, message: 'Login successful' }))
              )
              }>
                <i className="fas fa-times"></i>
              </span>
            </div>
          )}
        </form>
      </div>
    </main>
  )
}
