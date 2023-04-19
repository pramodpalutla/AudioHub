import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import AudioPlayer from './components/audioplayer';
import Playlist from './components/playlist'
 function App() {

  return (
    <Router>
    <Routes>
        <Route path="/" element={<AudioPlayer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/audio" element ={<AudioPlayer/>} /> 
        <Route path="/myplaylist" element ={<Playlist/>} /> 
    </Routes>
</Router>
  );

}
export default App;