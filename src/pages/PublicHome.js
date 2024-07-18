import React from 'react'
import './PublicHome.css'
import { useNavigate } from 'react-router-dom'

const PublicHome = () => {

  const navigate = new useNavigate();
    
  return (
    <div className='public-home'>
      <h1>Welcome to MyHomeSpace Application</h1>
      <div className='button-class'>
        <div onClick={e => {navigate("/login")}}>Login</div>
        <div onClick={e => {navigate("/register")}}>Register</div>
      </div>
    </div>
  )
}

export default PublicHome
