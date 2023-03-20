import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Header()
{
    return (
      <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul class="navbar-nav">
      <li class="nav-item">
          <a class="nav-link" href="#">AudioHub</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/signup">SignUp</a>
        </li>
      </ul>
    </nav>
      
    )
}
export default Header;