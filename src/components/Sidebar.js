import React from 'react';
 import '../components/css/Sidebaruserdashboard.css'; // Stylesheet for Sidebar
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Sidebar = () => {
    const location = useLocation();
    return (
        <div className="sidebar user" style={{backgroundColor: '#1e6e76'}}>
            
            <ul className="sidenav-links">
                <li>
                    <Link to="/userdashboard"  className={`${location.pathname === '/userdashboard' ? 'active' : ''}`}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/userprofile" className={`${location.pathname === '/userprofile' ? 'active' : ''}`}>User Profile</Link>
                </li>
                <li>
                    <Link to="/membershipcard" className={`${location.pathname === '/membershipcard' ? 'active' : ''}`}>Membership Card</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
