import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import StockView from './components/StockView';
import Signup from './components/Signup';
import Membershipcard from './components/Membershipcard';
import { BASE_URL } from './components/Godurl';
import CardContent from './components/CardContent';
import Userdashboard from './components/Userdashboard';
import Billing from './components/Billing';
import OtpVerification from './components/OtpVerification';
import Userprofile from './components/Userprofile';
import AdminLogin from './components/AdminLogin';
// index.js or App.js

// Create a context
export const ProgressContext = createContext();


const App = () => {

  const [loginStatus, setLoginStatus] = useState({ success: null, message: '' });
  // email
  const [email, setEmail] = useState(null);
  // picture
  const [picture, setPicture] = useState(null);

  // name
  const [name, setName] = useState(null);
  const [carddata, setCarddata] = useState([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const [cardvideo, setCardvideo] = useState(null);
  const [userid, setUserid] = useState(null);
  const [newname, setNewname] = useState(null);
  const [impcardid, setImpcardid] = useState([]);
  const [membershipsubscription, setMembershipsubscription] = useState();
  const [subscriptionstartdate, setSubscriptionstartdate] = useState();
  const [subscriptionenddate, setSubscriptionenddate] = useState();
  const [subscriptiontype, setSubscriptiontype] = useState();
  // const location = useLocation();
  const [progressValues, setProgressValues] = useState({});

  const getCarddata = async (e) => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard`, {
        method: "GET",
      })
      const data = await response.json();
      setCarddata(data)
    }
    catch (err) {
      // console.log(err);
    }
    finally {
      setLoading(false); // Set loading to false after fetching data, regardless of success or failure
    }
  }

  // if (loginStatus.success === false || loginStatus.success === null) {
  //   {
  //     setMembershipsubscription(prev => undefined);
  //   }
  // }



  const fetchUserid = async () => {
    try {
      // Fetch userid for Google login
      const googleResponse = await fetch(`${BASE_URL}/google`, {
        method: "GET",
      });
      const googleData = await googleResponse.json();

      // Fetch userid for other login method
      const loginResponse = await fetch(`${BASE_URL}/login`, {
        method: "GET",
      });
      const loginData = await loginResponse.json();

      // Combine data from both endpoints
      const combinedData = [...googleData, ...loginData];
      let currentUser = await combinedData.find((user => user.email === email));
      if (currentUser) {
        setUserid(currentUser._id);
      }
      // setName(currentUser.name);
    } catch (err) {
      console.error("Error fetching userid:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserid();
  }, [loginStatus]);

  useEffect(() => {
    // Simulating data fetching
    getCarddata();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // You can replace this with your actual data fetching logic
  }, [reload]);

  // login status
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // name
  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // picture
  useEffect(() => {
    const storedPicture = sessionStorage.getItem('picture');
    if (storedPicture) {
      setPicture(storedPicture);
    }
  }, []);

  // localstore loginStatus
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem('loginStatus');
    if (storedLoginStatus) {
      setLoginStatus(JSON.parse(storedLoginStatus));
    }
  }, []);

  // localstore userid
  useEffect(() => {
    const storedUserid = sessionStorage.getItem('userid');
    if (storedUserid) {
      setUserid(storedUserid);
    }
  }, []);


  // Update localStorage when loginStatus, email, or picture changes
  useEffect(() => {
    // sessionStorage.setItem('loginStatus', JSON.stringify(loginStatus));


    if (loginStatus.success !== false && loginStatus.success !== null) {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('picture', picture);
      sessionStorage.setItem('userid', userid);
      sessionStorage.setItem('name', name);
      setMembershipsubscription(undefined)
    }
  }, [loginStatus.success, email, picture, userid, name]);

  // getUserid of current logged in user

  // console.log(cardvideo)



  return (
    <Router>
      {/* <div className="app"> */}
      <ProgressContext.Provider value={{ progressValues, setProgressValues, cardvideo, setCardvideo, membershipsubscription, setMembershipsubscription, subscriptionstartdate, setSubscriptionstartdate, subscriptionenddate, setSubscriptionenddate, subscriptiontype, setSubscriptiontype }}>
        <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} name={name} setName={setName} picture={picture} setPicture={setPicture}
          newname={newname}
          setUserid={setUserid}
          email={email}
        />
        <Routes> {/* Wrap your routes in the Routes component */}
          {/* initial route to login */}
          <Route path="/login" element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} setEmail={setEmail} setName={setName} setPicture={setPicture} email={email} picture={picture} name={name} setImpcardid={setImpcardid} />} />
          <Route path="/signup" element={<Signup />} />
          {loginStatus.success !== false && <Route path="/" element={<Main getCarddata={getCarddata} carddata={carddata} reload={reload} setReload={setReload} loading={loading} loginStatus={loginStatus} setCardvideo={setCardvideo} userid={userid} />} />}
          {/* <Route path="/home"  element={<Main getCarddata={getCarddata} carddata={carddata} reload={reload} setReload={setReload}/>} /> Define a route for the Main component */}
          {/* Add more routes for other components/pages */}
          Example:
          <Route path="/about" element={<About />} />
          <Route path="/stockview" element={<StockView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard getCarddata={getCarddata} carddata={carddata} reload={reload} setReload={setReload} />} />
          <Route path="/membershipcard" element={<Membershipcard loginStatus={loginStatus} name={name} />} />
          <Route path="/userprofile" element={<Userprofile loginStatus={loginStatus} email={email} picture={picture} setEmail={setEmail} setPicture={setPicture} userid={userid} setName={setName} name={name} />} />
          <Route path="/home/card/:id" element={<CardContent cardvideo={cardvideo} loginStatus={loginStatus} userid={userid} />} />
          <Route path="/userdashboard" element={<Userdashboard loginStatus={loginStatus} carddata={carddata} userid={userid} />} />
          <Route path="/pricing" element={<Billing userid={userid} />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/admin" element={<AdminLogin />} />
          {/* wrong path 404 */}
          <Route path="*" element={<h1 style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            top: "7rem",
          }}>404 Not Found</h1>} />

        </Routes>
        <Footer />
        {/* </div> */}
      </ProgressContext.Provider>
    </Router>
  );
}

export default App;