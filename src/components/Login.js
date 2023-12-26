import React,{useState,useEffect} from 'react'
import "../components/css/Login.css"
import { jwtDecode } from 'jwt-decode';

// import { useLocation } from 'react-router-dom'

// toast.configure();
const Redirecting = () => {
  // const location = useLocation();
  const redirect_uri = "home";
  window.location.href = `${redirect_uri}`
}

export default function Login({loginStatus,setLoginStatus,setEmail}) {
  const HandleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    setEmail(email);
    
    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Assuming the server returns a success message or token, you can redirect here
        Redirecting();
      } else {
        console.error('Login failed');
        setLoginStatus({ success: false, message: 'Login failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus({ success: false, message: 'Error during login' });
      // Handle network errors, etc.
    }
  };

  const HandleLoginGoogle = async (response) => {
    // console.log(response.credential);
    var userobj = jwtDecode(response.credential);
    console.log(userobj);
    setEmail(userobj.name);

    try {
      const response = await fetch('http://localhost:3001/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userobj.email })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Assuming the server returns a success message or token, you can redirect here
        Redirecting();
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

  useEffect( () => {
    // global google
    if(window.google)
    window.google.accounts.id.initialize({
      client_id: '586580843313-t10e9v048f1qqktvrensdit0ikqp5hv2.apps.googleusercontent.com',
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
  }, []);

  return (
    <main className='loginmain'>
    <div style={{width:"30%",position:"relative"}}>
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
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            {/* login as google btn */}
            <div id="google-login-button"></div>
            {/* login status */}
            {loginStatus.success !== null && (
            <div className={loginStatus.success ? '' : 'error'}>
              {loginStatus.message}
              {/* close btn */}
              <span className="close-btn" onClick={() => setLoginStatus({ success: null, message: '' })}>
                <i className="fas fa-times"></i>
              </span>
            </div>
          )}
        </form>
    </div>
    </main>
  )
}
