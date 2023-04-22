import React, { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Header()

{
  //const token = localStorage.getItem('jwtToken');
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
      <a className="nav-link" href="/audio">AudioHub</a>
    //   <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
    //   <ul className="navbar-nav">
    //     {token != '' ? (
    //       <>
    //       <li className="nav-item">
    //       <a className="nav-link" href="/audio">AudioHub</a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="/login" onClick={logOut}>Logout</a>
    //     </li>
    //       </>
    //     ) : (
    //       <>
    //       <li className="nav-item">
    //       <a className="nav-link" href="/login">Login</a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="/signup">SignUp</a>
    //     </li>
    //       </>
    //     )}
    //   </ul>
    // </nav>
      
    );
}
export default Header;