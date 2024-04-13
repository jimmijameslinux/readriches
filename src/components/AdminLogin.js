import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{height:"100vh"}}>
            <div className="login" style={{display:"flex",flexDirection:"column",height:"100%"}}>
                <div className="login-container" style={{display:"flex",flexDirection:"column",height:"100%"}}>
                    <h1>Admin Login</h1>
                    <div style={{display:"flex",flexDirection:"column",position:"relative",top:"5rem"}}>
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            navigate('/dashboard')
                        }
                    }>
                        <label for="username">Username</label>
                        <input type="text" placeholder="Username" />
                        <label for="password">Password</label>
                        <input type="password" placeholder="Password" />
                        <button type="submit"
                        >Login</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin