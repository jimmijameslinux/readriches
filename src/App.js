import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';


const App = () => {
  const [carddata, setCarddata] = useState([]);
  const getCarddata = async(e) => {
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
      })
      const data = await response.json();
      console.log(data);
      setCarddata(data)
    }
    catch (err) {
      // console.log(err);
    }
  }

  
  return (
    <Router>
      {/* <div className="app"> */}

        <Navbar />
        <Routes> {/* Wrap your routes in the Routes component */}
          <Route path="/"  element={<Main getCarddata={getCarddata} carddata={carddata} />} /> {/* Define a route for the Main component */}
          {/* Add more routes for other components/pages */}
          Example:
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard getCarddata = {getCarddata} carddata={carddata}  />} />
          {/* wrong path 404 */}
          <Route path="*" element={<h1 style={{position: "fixed",
        width: "100%",
        height: "100vh",
        top: "7rem",}}>404 Not Found</h1>} />
         
        </Routes>
        <Footer />
      {/* </div> */}
    </Router>
  );
}

export default App;
