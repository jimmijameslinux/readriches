import React from 'react'
// import { useLocation } from 'react-router-dom'

const Redirecting = () => {
  // const location = useLocation();
  const redirect_uri = "home";
  window.location.href = `${redirect_uri}`
}


export default function Login() {
  return (
    <div>
        <h1>Login</h1>
        <button onClick={Redirecting}>Login</button>
    </div>
  )
}
