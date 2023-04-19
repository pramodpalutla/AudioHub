import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
    return (props) => {
      // Check if a valid JWT token exists in local storage
      const token = localStorage.getItem('jwtToken');
  
      if (!token) {
        // If there is no token, redirect to login page
        return <Navigate to="/login" replace />;
      }
  
      // If token exists, render the component passed to this HOC
      return <Component {...props} />;
    };
  };
  
  export default withAuth;