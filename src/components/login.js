import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/css/bootstrap.min.css"
import Header from './header';
import Footer from './footer';
import axios from 'axios';



export default function Login(props) {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    axios.post('http://localhost:8000/login', {
      email: email,
      password: password
    })
      .then(function(response) {
        console.log("login")
      })
      .catch(function(error) {
        // Handle any errors that occur during the request
      });
  }

  return (
    <div className="maincontainer">
      {/* <Header></Header> */}
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    {/* <Footer></Footer> */}
    </div>
  )
}