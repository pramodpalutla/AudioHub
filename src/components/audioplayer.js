import React, { useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Header from './header';
import Footer from './footer';
import "../App.css";

const AudioPlayerScreen = (props) => {
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   const audioRef = useRef(null);

  //   const togglePlay = () => {
  //     setIsPlaying(!isPlaying);
  //     if (!isPlaying) {
  //       audioRef.current.play();
  //     } else {
  //       audioRef.current.pause();
  //     }
  //   };

  return (
    <div className='maincontainer'>
      <Header></Header>
      <div style={{bottom:0, width:"100vw", position: 'absolute', display: 'flex', justifyContent: 'center'}}>
      <AudioPlayer
        autoPlay
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        onPlay={e => console.log("onPlay")}
      // other props here
      />
      </div>

    </div>
  );
};

export default AudioPlayerScreen;