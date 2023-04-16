import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
function Header()
{
    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
      <li className="nav-item">
          <a className="nav-link" href="/audio">AudioHub</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/signup">SignUp</a>
        </li>
      </ul>
    </nav>
      
    )
}
export default Header;