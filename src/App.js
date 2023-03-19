import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup.js';

export default function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
    </Routes>
</BrowserRouter>
  );

}