import React from "react";
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
const songs = [] 

songs.push(songs_data.songs[0])
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