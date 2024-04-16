import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../components/css/Signup.css"
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
          if(response.status === 200)
          {
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
    <div style={{width:"30%",position:"relative"}}>
        <h1>Signup</h1>
          
          {/* login and signup */}

          <form className="form" 
          onSubmit={HandleSignup}
          >
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter Email" required />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter Password" required />
              </div>
              <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input type="password" id="password2" placeholder="Confirm Password" required />
              </div>
              <button type="submit" className="btn"
              >Sign Up</button>
              <p>Already have an account? <u onClick={()=>{
                navigate('/login');
              }} style={{textDecoration:"underline",color:"purple",cursor:"pointer"}}>Login</u></p>

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
