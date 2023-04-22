import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";
import NavBar from "./NavBar";
import Player from "./Player";
import SongList from "./SongList";
// import songs from "../data/songs.json";
import songs_data from "../data/songs_data.json";
import SongDetail from "./SongDetail";
import SongListHeader from "./SongListHeader";
import withAuth from "./withAuth";


// for (let index = 0; index < songs_data.songs.length; index++) {
//   const song = songs_data.songs[index];
//   song.id = index;
// }

const Playlist = (props) => {

const [songs, setSongs] = useState([]);

useEffect(() => {
  const fetchSongs = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.post("http://35.193.89.249:8000/playlist", {
        token: token,
      });
    const songsData = response.data;
    for (let i = 0; i < songsData.length; i++) {
      songsData[i].id = i;
    }
    console.log(songsData)
    setSongs(songsData);
  };
  fetchSongs();
}, []);


  return (
    <React.Fragment>
     
        <NavBar />
        <SongListHeader />
        <SongDetail />
        <SongList songs={songs} />
        <Player />
        <a href="#focused" id="focus-link" hidden>
            Go to playing element
        </a>
    </React.Fragment>
);
};

export default withAuth(Playlist);