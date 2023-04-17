import React, { useEffect, useState}  from "react";
import "./NavBar.css";
import metadata from "../data/metadata.json";
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [token, setToken] = useState('')
  const navigate = useNavigate();

  function logOut() {
    setToken('')
    localStorage.setItem('jwtToken', '');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if(token) {
      setToken(token)
    }
  },[token])
    return (
        <div className="navbar">
            {token == '' ? (
                <>
                
            <a className="nav-link" href="/login">Login</a>
          <a className="nav-link" href="/signup">SignUp</a>
          <i className="fab fa-spotify"></i>
            <div className="app-header">{metadata.appName}</div>
            <div className="nav-links"></div>
          </>
            ) : (
                <>
          <a className="nav-link" href="/login" onClick={logOut}>Logout</a>
        
            <i className="fab fa-spotify"></i>
            <div className="app-header">{metadata.appName}</div>
            <div className="nav-links"></div>
            <a className="nav-link" href="/playlist">Playlists</a>
            </>
             )}  
            
        </div>
    );
};

export default NavBar;
